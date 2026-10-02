-- Let admins delete a request sent by mistake (spam, duplicates, tests). Everyone else still cannot.
grant delete on public.collection_requests to authenticated;
drop policy if exists "admins delete collection requests" on public.collection_requests;
create policy "admins delete collection requests" on public.collection_requests for delete using (public.is_admin());
