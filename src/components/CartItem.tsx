
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash, Plus, Minus } from "lucide-react";
import { CartItem } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { formatPrice, getDiscountedPrice } from "@/lib/formatters";

interface CartItemProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (newQuantity > item.product.stockCount) return;
    
    setIsUpdating(true);
    setTimeout(() => {
      updateQuantity(item.product.id, newQuantity);
      setIsUpdating(false);
    }, 300);
  };
  
  const price = item.product.discount 
    ? getDiscountedPrice(item.product.price, item.product.discount)
    : item.product.price;
  
  const totalPrice = price * item.quantity;
  
  return (
    <div className="flex flex-col sm:flex-row py-6 border-b animate-fade-in">
      {/* Product Image */}
      <div className="w-full sm:w-1/4 md:w-1/6 mb-4 sm:mb-0">
        <Link to={`/product/${item.product.slug}`} className="block aspect-square relative overflow-hidden rounded-md">
          <img 
            src={item.product.images[0].url} 
            alt={item.product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>
      
      {/* Product Details */}
      <div className="flex-1 px-0 sm:px-4">
        <div className="flex flex-col h-full justify-between">
          <div>
            <Link to={`/product/${item.product.slug}`} className="text-lg font-medium hover:text-primary transition-colors">
              {item.product.name}
            </Link>
            <p className="text-muted-foreground text-sm">
              {item.product.brand.name}
            </p>
          </div>
          
          <div className="mt-2 sm:mt-0 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center mt-4 sm:mt-0">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 text-center w-10">{item.quantity}</span>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-8 w-8"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={item.quantity >= item.product.stockCount || isUpdating}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="mt-4 sm:mt-0 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="text-lg font-semibold">
                {formatPrice(totalPrice)}
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => removeItem(item.product.id)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
