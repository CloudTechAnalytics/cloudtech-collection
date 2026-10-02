import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page py-28 text-center">
      <p className="eyebrow">Page not found</p>
      <span className="gold-rule mx-auto mt-4" />
      <h1 className="display mt-6 text-[3rem] text-navy">This page isn&apos;t part of the collection.</h1>
      <p className="mt-4 text-muted">It may have moved, or the address may be mistyped.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/#collection" arrow>
          Explore Collection
        </ButtonLink>
      </div>
    </section>
  );
}
