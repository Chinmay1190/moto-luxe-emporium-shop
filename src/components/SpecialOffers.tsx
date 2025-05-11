
import { useState } from "react";
import { Link } from "react-router-dom";
import { specialOffers, Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function SpecialOffers() {
  const [products] = useState<Product[]>(specialOffers);
  
  if (products.length === 0) return null;
  
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Special Offers</h2>
            <p className="text-muted-foreground max-w-2xl">
              Limited-time deals on premium motorcycles. Don't miss these incredible savings!
            </p>
          </div>
          <Button asChild variant="ghost" className="mt-4 md:mt-0">
            <Link to="/offers" className="flex items-center">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
