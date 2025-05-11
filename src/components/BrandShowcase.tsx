
import { brands } from "@/data/products";
import { Link } from "react-router-dom";

export function BrandShowcase() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Top Motorcycle Brands</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We partner with the world's leading motorcycle manufacturers to bring you the best rides.
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 items-center justify-items-center">
          {brands.map((brand, index) => (
            <Link 
              key={brand.id} 
              to={`/brand/${brand.id}`}
              className="flex justify-center items-center p-4 h-24 w-full hover:opacity-80 transition-opacity"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={brand.logoUrl} 
                alt={brand.name} 
                className="max-h-full max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
