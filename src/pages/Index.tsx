
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CategoryHighlights } from "@/components/CategoryHighlights";
import { SpecialOffers } from "@/components/SpecialOffers";
import { BrandShowcase } from "@/components/BrandShowcase";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16">
        <Hero />
        <FeaturedProducts />
        <CategoryHighlights />
        <SpecialOffers />
        <BrandShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
