
import { useState } from "react";
import { formatPrice, getDiscountedPrice } from "@/lib/formatters";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, ChevronRight, ChevronLeft, Heart, Share, Star, Check, AlertTriangle } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  
  const discountedPrice = product.discount 
    ? getDiscountedPrice(product.price, product.discount) 
    : product.price;
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };
  
  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const handleAddToCart = () => {
    setIsAddingToCart(true);
    setTimeout(() => {
      addItem(product, quantity);
      setIsAddingToCart(false);
    }, 500);
  };
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };
  
  const stockLevel = () => {
    if (product.stockCount > 10) return { text: "In Stock", color: "text-green-600 dark:text-green-400" };
    if (product.stockCount > 0) return { text: `Only ${product.stockCount} left`, color: "text-amber-600 dark:text-amber-400" };
    return { text: "Out of Stock", color: "text-destructive" };
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
      {/* Left Column - Images */}
      <div className="space-y-4">
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-muted">
          <img
            src={product.images[currentImageIndex].url}
            alt={product.images[currentImageIndex].alt}
            className="h-full w-full object-cover animate-fade-in"
          />
          
          {product.images.length > 1 && (
            <>
              <Button 
                variant="secondary"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 opacity-80 hover:opacity-100"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="secondary"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-8 w-8 opacity-80 hover:opacity-100"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
          
          {product.discount && (
            <Badge variant="destructive" className="absolute top-2 right-2">
              {product.discount}% OFF
            </Badge>
          )}
        </div>
        
        {product.images.length > 1 && (
          <div className="flex space-x-2 overflow-auto pb-2">
            {product.images.map((image, index) => (
              <button
                key={image.id}
                className={`relative flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all ${
                  currentImageIndex === index 
                    ? "border-primary ring-1 ring-primary" 
                    : "border-muted hover:border-primary/50"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Right Column - Details */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Badge variant="outline" className="bg-primary/10">
              {product.category.name}
            </Badge>
            <div className="text-sm text-muted-foreground">
              {product.brand.name}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center mt-2 space-x-1">
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
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">
              {formatPrice(discountedPrice)}
            </span>
            {product.discount && (
              <span className="text-xl text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          
          {product.discount && (
            <p className="text-sm font-medium text-green-600 dark:text-green-400">
              You save {formatPrice(product.price - discountedPrice)} ({product.discount}%)
            </p>
          )}
        </div>
        
        <div className="space-y-4 border-t border-b py-4">
          <p className="text-sm text-muted-foreground">{product.description}</p>
          
          <div className="grid grid-cols-2 gap-y-2 gap-x-6">
            {Object.entries(product.specifications).slice(0, 6).map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{key}:</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center">
          <div className={`flex items-center mr-4 ${stockLevel().color}`}>
            {product.stockCount > 0 ? (
              <Check className="h-4 w-4 mr-1" />
            ) : (
              <AlertTriangle className="h-4 w-4 mr-1" />
            )}
            <span>{stockLevel().text}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            SKU: {product.id}
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-r-none"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || product.stockCount === 0}
            >
              -
            </Button>
            <div className="w-12 text-center">
              {quantity}
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-l-none"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= product.stockCount || product.stockCount === 0}
            >
              +
            </Button>
          </div>
          
          <Button 
            className="flex-1"
            onClick={handleAddToCart}
            disabled={isAddingToCart || product.stockCount === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {isAddingToCart ? "Adding..." : "Add to Cart"}
          </Button>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Heart className="h-4 w-4" />
          </Button>
          
          <Button variant="outline" size="icon" className="h-10 w-10">
            <Share className="h-4 w-4" />
          </Button>
        </div>
        
        <ul className="space-y-2">
          {product.features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm">
              <Check className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
