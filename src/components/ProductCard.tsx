
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { formatPrice, getDiscountedPrice } from "@/lib/formatters";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const discountedPrice = product.discount 
    ? getDiscountedPrice(product.price, product.discount)
    : product.price;
  
  return (
    <div className="group bg-card rounded-lg overflow-hidden border shadow-sm product-card-hover animate-fade-in">
      <div className="relative aspect-square overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <img 
            src={product.images[0].url} 
            alt={product.images[0].alt} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        {product.discount && (
          <Badge variant="destructive" className="absolute top-2 right-2">
            {product.discount}% OFF
          </Badge>
        )}
        {product.stockCount < 5 && (
          <Badge variant="secondary" className="absolute top-2 left-2">
            Limited Stock
          </Badge>
        )}
      </div>
      
      <div className="p-4 space-y-3">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold line-clamp-2 text-balance hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center space-x-1">
          {Array(5).fill(null).map((_, i) => (
            <Star 
              key={i} 
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) 
                  ? "text-yellow-500 fill-yellow-500" 
                  : i < product.rating 
                    ? "text-yellow-500 fill-yellow-500 opacity-60" 
                    : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-sm text-muted-foreground ml-1">
            ({product.reviews.length})
          </span>
        </div>
        
        <div className="flex items-baseline space-x-2">
          <span className="text-lg font-semibold">
            {formatPrice(discountedPrice)}
          </span>
          {product.discount && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        
        <div className="pt-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full group transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => addItem(product)}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
