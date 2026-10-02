import { Academy } from "@/components/Academy";
import { CorporateKit, SignatureCollection } from "@/components/Collection";
import { CorporateOrders } from "@/components/CorporateOrders";
import { BrandStory, Ecosystem, Faq, Hero } from "@/components/sections";

export default function Home() {
  return (
    <>
      <Hero />
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
