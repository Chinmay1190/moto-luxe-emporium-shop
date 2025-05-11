
import { Link } from "react-router-dom";
import { categories } from "@/data/products";
import { Button } from "@/components/ui/button";

// Category images (mapped to ensure we have an image for each category)
const categoryImages = [
  "https://cdn.pixabay.com/photo/2015/09/09/21/35/motorcycle-933021_960_720.jpg", // Sport
  "https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_960_720.jpg", // Cruiser
  "https://cdn.pixabay.com/photo/2019/09/03/08/28/motorcycle-4449535_960_720.jpg", // Adventure
  "https://cdn.pixabay.com/photo/2016/11/18/17/04/motorcycle-1835799_960_720.jpg", // Naked
  "https://cdn.pixabay.com/photo/2018/03/01/13/41/motorcycle-3191111_960_720.jpg", // Touring
  "https://cdn.pixabay.com/photo/2018/10/26/22/55/motorcycle-3774533_960_720.jpg", // Retro
  "https://cdn.pixabay.com/photo/2015/09/18/22/20/motorcycle-946508_960_720.jpg", // Off-Road
];

export function CategoryHighlights() {
  return (
    <section className="py-16 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Browse By Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our extensive range of motorcycles by category to find your perfect ride.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/category/${category.id}`} 
              className="group relative h-64 rounded-lg overflow-hidden shadow-md animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img 
                src={categoryImages[index % categoryImages.length]} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 brightness-75 group-hover:brightness-90"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white mb-2">
                  {category.name}
                </h3>
                <p className="text-white/80 mb-4 text-sm line-clamp-2">
                  {category.description}
                </p>
                <div className="transform translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Button variant="secondary" size="sm">
                    View Collection
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
