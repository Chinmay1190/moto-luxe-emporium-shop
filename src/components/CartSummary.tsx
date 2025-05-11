
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatters";
import { useToast } from "@/components/ui/use-toast";

export function CartSummary() {
  const { total, itemCount, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Calculate taxes (GST in India is typically 18% for luxury goods)
  const taxRate = 0.18;
  const taxAmount = total * taxRate;
  
  // Calculate shipping fee (free for orders above ₹50,000)
  const freeShippingThreshold = 50000;
  const baseShippingFee = 1500;
  const shippingFee = total > freeShippingThreshold ? 0 : baseShippingFee;
  
  // Calculate grand total
  const grandTotal = total + taxAmount + shippingFee;
  
  const handleCheckout = () => {
    if (itemCount === 0) {
      toast({
        title: "Cannot proceed",
        description: "Your cart is empty. Add items before checkout.",
        variant: "destructive",
      });
      return;
    }
    
    setIsCheckingOut(true);
    
    // Simulate processing checkout
    setTimeout(() => {
      setIsCheckingOut(false);
      navigate("/checkout");
    }, 1000);
  };
  
  return (
    <div className="bg-card rounded-lg border p-6 sticky top-20">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Taxes (18% GST)</span>
          <span>{formatPrice(taxAmount)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shippingFee === 0 ? (
              <span className="text-green-600 dark:text-green-400">FREE</span>
            ) : (
              formatPrice(shippingFee)
            )}
          </span>
        </div>
        
        {shippingFee > 0 && total > 0 && (
          <div className="text-sm text-muted-foreground italic">
            Add {formatPrice(freeShippingThreshold - total)} more for free shipping
          </div>
        )}
        
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>{formatPrice(grandTotal)}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            (Including all taxes and shipping fees)
          </div>
        </div>
        
        <div className="pt-4 space-y-3">
          <Button 
            className="w-full"
            onClick={handleCheckout}
            disabled={isCheckingOut || itemCount === 0}
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="outline" size="sm">
              <Link to="/products">Continue Shopping</Link>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={clearCart}
              disabled={itemCount === 0}
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        <div className="text-center text-xs text-muted-foreground">
          <p>We accept all major credit cards, UPI, and net banking options.</p>
        </div>
      </div>
    </div>
  );
}
