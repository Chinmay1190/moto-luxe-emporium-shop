
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://cdn.pixabay.com/photo/2018/01/24/18/05/motorcycle-3104364_960_720.jpg"
          alt="Hero Image"
          className="w-full h-full object-cover brightness-[0.3]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-3xl space-y-6 animate-fade-in">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight tracking-tighter">
              Experience the Ultimate <span className="text-primary">Superbike</span> Collection
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Premium motorcycles for enthusiasts who demand excellence
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="font-semibold">
              <Link to="/products">
                Explore Collection
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link to="/offers">Special Offers</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
}
