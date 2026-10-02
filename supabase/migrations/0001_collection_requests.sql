-- CloudTech Collection: order and corporate requests.
-- Runs in the same Supabase project as CloudTech Academy and reuses its admin role
-- (public.profiles.role = 'admin', checked by public.is_admin()), so Academy admins can see requests.
--
-- Anyone can send a request, but only through submit_collection_request(), which checks every field.
-- Nobody can read requests except admins.

create table if not exists public.collection_requests (
  id            uuid primary key default gen_random_uuid(),
  reference     text not null unique,
  kind          text not null check (kind in ('item', 'corporate', 'kit', 'general')),
  status        text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'fulfilled', 'closed')),
  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) <= 200),
  phone         text not null default '' check (char_length(phone) <= 40),
  organization  text not null default '' check (char_length(organization) <= 160),
  -- [{ product, slug, quantity, size, variant }]
  items         jsonb not null default '[]',
  products      text[] not null default '{}',
  quantity      int check (quantity is null or quantity between 1 and 100000),
  event_date    date,
  location      text not null default '' check (char_length(location) <= 200),
  message       text not null default '' check (char_length(message) <= 4000),
  admin_note    text not null default '',
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists collection_requests_created_idx on public.collection_requests (created_at desc);
create index if not exists collection_requests_email_idx on public.collection_requests (lower(email), created_at desc);

alter table public.collection_requests enable row level security;
drop policy if exists "admins read collection requests" on public.collection_requests;
create policy "admins read collection requests" on public.collection_requests for select using (public.is_admin());
drop policy if exists "admins update collection requests" on public.collection_requests;
create policy "admins update collection requests" on public.collection_requests for update using (public.is_admin()) with check (public.is_admin());
revoke insert, delete on public.collection_requests from anon, authenticated;

-- Validates and saves a request. Returns its reference, e.g. CTC-7K3M9Q.
create or replace function public.submit_collection_request(p jsonb)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_kind   text := coalesce(p ->> 'kind', 'general');
  v_name   text := trim(coalesce(p ->> 'name', ''));
  v_email  text := lower(trim(coalesce(p ->> 'email', '')));
  v_phone  text := trim(coalesce(p ->> 'phone', ''));
  v_items  jsonb := coalesce(p -> 'items', '[]');
  v_qty    int;
  v_date   date;
  v_ref    text;
  v_alpha  constant text := '23456789ABCDEFGHJKMNPQRSTUVWXYZ';
begin
  if v_kind not in ('item', 'corporate', 'kit', 'general') then raise exception 'Unknown request type.'; end if;
  if char_length(v_name) < 2 then raise exception 'Please enter your name.'; end if;
  if v_email !~ '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then raise exception 'Please enter a valid email address.'; end if;
  if v_kind in ('item', 'kit') and char_length(v_phone) < 7 then raise exception 'Please enter a phone number so we can confirm your order.'; end if;
  if jsonb_typeof(v_items) <> 'array' or jsonb_array_length(v_items) > 30 then raise exception 'Too many items in one request.'; end if;
  if v_kind = 'item' and jsonb_array_length(v_items) = 0 then raise exception 'Choose at least one item.'; end if;
  begin
    v_qty := nullif(p ->> 'quantity', '')::int;
    v_date := nullif(p ->> 'event_date', '')::date;
  exception when others then
    raise exception 'Please check the quantity and date.';
  end;
  -- Simple flood protection: at most 8 requests per email address per hour.
  if (select count(*) from public.collection_requests where lower(email) = v_email and created_at > now() - interval '1 hour') >= 8 then
    raise exception 'We''ve received several requests from this email in the last hour. We''ll be in touch soon.';
  end if;

  loop
    v_ref := 'CTC-';
    for i in 1..6 loop
      v_ref := v_ref || substr(v_alpha, 1 + floor(random() * length(v_alpha))::int, 1);
    end loop;
    exit when not exists (select 1 from public.collection_requests where reference = v_ref);
  end loop;

  insert into public.collection_requests (reference, kind, name, email, phone, organization, items, products, quantity, event_date, location, message)
  values (
    v_ref, v_kind, v_name, v_email, left(v_phone, 40),
    left(trim(coalesce(p ->> 'organization', '')), 160),
    v_items,
    coalesce(array(select left(x, 80) from jsonb_array_elements_text(coalesce(p -> 'products', '[]')) x limit 20), '{}'),
    v_qty, v_date,
    left(trim(coalesce(p ->> 'location', '')), 200),
    left(trim(coalesce(p ->> 'message', '')), 4000)
  );
  return v_ref;
end;
$$;

revoke execute on function public.submit_collection_request(jsonb) from public;
grant execute on function public.submit_collection_request(jsonb) to anon, authenticated;

-- Keeps updated_at current when an admin changes a request.
create or replace function public.collection_requests_touch()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
drop trigger if exists collection_requests_touch on public.collection_requests;
create trigger collection_requests_touch before update on public.collection_requests
  for each row execute function public.collection_requests_touch();
