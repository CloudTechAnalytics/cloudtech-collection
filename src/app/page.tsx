import { Academy } from "@/components/Academy";
import { CorporateKit, SignatureCollection } from "@/components/Collection";
import { CorporateOrders } from "@/components/CorporateOrders";
import { BrandStory, Ecosystem, Faq, Hero, HowItWorks } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <SignatureCollection />
      <CorporateKit />
      <Academy />
      <CorporateOrders />
      <BrandStory />
      <Ecosystem />
      <Faq />
    </>
  );
}
