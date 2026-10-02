import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="container-page py-28 text-center">
      <p className="kicker">Page not found</p>
      <h1 className="mt-6 font-serif text-[2.6rem] leading-[1.1] tracking-[-0.015em] text-ink sm:text-[3rem]">This page isn&apos;t part of the collection.</h1>
      <p className="mt-4 text-muted">It may have moved, or the address may be mistyped.</p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/#collection" arrow>
          Explore the collection
        </ButtonLink>
      </div>
    </section>
  );
}
