# CloudTech Collection

The official CloudTech merchandise collection, an initiative of [CloudTech Analytics](https://www.cloudtechanalytics.com). Intended address: **collection.cloudtechanalytics.com**.

The site is a premium brand showroom, not a shop: every piece leads to **Request This Item**, and CloudTech confirms availability, payment and delivery directly. Corporate and bulk orders go through their own form.

## Stack

Next.js (App Router), TypeScript, Tailwind CSS v4, Supabase (the same project as CloudTech Academy), lucide-react icons. Fonts: Cormorant Garamond and Inter.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build; every page except /request is static
npm run lint
```

## Pages

| Page | What it is |
| --- | --- |
| `/` | Hero, Signature Collection, Corporate Kit, brand story, Academy Collection, ecosystem |
| `/collection` | Every piece, grouped: Signature, teams and events, Academy |
| `/collection/[slug]` | Product page: gallery, finish, size, quantity, and the request form |
| `/corporate` | Corporate and bulk orders, with the corporate request form |
| `/academy` | The Academy Collection (Coming soon) |
| `/about` | More Than Merchandise, and the CloudTech ecosystem |
| `/request` | General order request (`?kind=kit` for the Corporate Kit, `?item=<slug>` to preselect a piece) |
| `/admin` | Requests list for CloudTech admins (not indexed) |

## Products and prices

Everything is in [`src/data/products.ts`](src/data/products.ts). Each product has a name, slug, line (`signature`, `corporate`, `academy`), category, description, details, `price`, images, sizes, variants, `available` and `featured`.

- **Price:** whole naira, e.g. `price: 25000`. `null` shows "Price on request".
- **Add a product:** add an entry; its page is generated automatically.
- **Launch the Academy Collection:** set `available: true` on its pieces.
- **Real photos:** put the file in `public/products/` and replace the image with `{ src: "/products/polo-front.jpg", alt: "…" }`. Until then each image is a drawn studio mockup (`{ mockup: "polo", palette: "navy", view: "front" }`) from `src/components/mockups/`.

## Requests

Forms call the Supabase function `submit_collection_request()`, which validates every field, limits each email to 8 requests an hour, saves the request and returns a reference such as `CTC-7K3M9Q`. Nobody can read or insert requests directly; only CloudTech admins can read and update them.

- **Database:** [`supabase/migrations/0001_collection_requests.sql`](supabase/migrations/0001_collection_requests.sql), already applied to the shared project. It uses the Academy's `public.is_admin()`.
- **Admin:** sign in at `/admin` with a CloudTech Academy admin account (a profile with `role = 'admin'`). Requests can be filtered by status, marked contacted / confirmed / fulfilled / closed, annotated, answered by email or WhatsApp, and exported to CSV.

The Supabase URL and anon key are public by design and are built in; set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to override them, and `NEXT_PUBLIC_SITE_URL` if the address changes.

## Later

The data model leaves room for Paystack payments (the Academy already has a Paystack integration in the same Supabase project), customer accounts, order tracking, inventory, discount codes, quotations and personalised items. None of these are built yet; requests are the first version on purpose.
