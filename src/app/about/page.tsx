import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { Ecosystem } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { ButtonLink } from "@/components/Button";
import { Mockup } from "@/components/mockups/Mockup";

export const metadata: Metadata = {
  title: "About",
  description: "CloudTech Collection is an official CloudTech Analytics initiative: an extension of the CloudTech brand for the people who work, learn and build with us.",
};

const PRINCIPLES = [
  { t: "Brand first", b: "Every piece carries the same CloudTech mark, colours and care as our software and our work for clients." },
  { t: "Made to be worn", b: "Pieces chosen to look right in a client meeting, at a conference or on a university stage." },
  { t: "For our people", b: "Our team, our learners, our clients and partners: the people who make the work happen." },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro eyebrow="About the Collection" title="More Than Merchandise">
        CloudTech Collection is an extension of the CloudTech brand, created for the people who work with us, learn with us, build with us and believe in what
        we&apos;re building.
      </PageIntro>
      <section className="bg-white pb-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="relative aspect-[4/5] overflow-hidden">
            <Mockup spec={{ mockup: "embroidery", palette: "navy", label: "The CloudTech mark, embroidered in gold" }} className="absolute inset-0 h-full w-full" />
          </Reveal>
          <Reveal delay={100}>
            <p className="font-serif text-[1.9rem] leading-[1.35] text-navy">This is not simply merchandise. It is a way to carry the CloudTech identity beyond the screen.</p>
            <p className="mt-6 text-[1.04rem] leading-relaxed text-muted">
              CloudTech Analytics is a technology, data and digital solutions company. We build data platforms and AI for organisations, run CloudTech Academy for
              people learning data, and make products such as The Counsel and The Manifest. The Collection is how that work shows up in the room: on the team at a
              pitch, on a speaker at a conference, on a learner at graduation.
            </p>
            <ul className="mt-10 space-y-6">
              {PRINCIPLES.map((p) => (
                <li key={p.t} className="border-l border-gold pl-5">
                  <p className="font-semibold text-navy">{p.t}</p>
                  <p className="mt-1 text-[0.96rem] leading-relaxed text-muted">{p.b}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/collection" arrow>
                Explore Collection
              </ButtonLink>
              <ButtonLink href="/request?kind=general" variant="outline">
                Contact us
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
      <Ecosystem />
    </>
  );
}
