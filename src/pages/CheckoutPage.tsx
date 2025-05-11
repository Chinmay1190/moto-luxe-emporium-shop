
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckoutForm } from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";
import { CartItemRow } from "@/components/CartItem";
import { formatPrice } from "@/lib/formatters";
import { Link, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const { items, total } = useCart();
  
  // If cart is empty, redirect to cart page
  if (items.length === 0) {
    return <Navigate to="/cart" replace />;
  }
  
  // Calculate taxes (GST in India is typically 18% for luxury goods)
  const taxRate = 0.18;
  const taxAmount = total * taxRate;
  
  // Calculate shipping fee (free for orders above ₹50,000)
  const freeShippingThreshold = 50000;
  const baseShippingFee = 1500;
  const shippingFee = total > freeShippingThreshold ? 0 : baseShippingFee;
  
  // Calculate grand total
  const grandTotal = total + taxAmount + shippingFee;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Checkout</h1>
            <Button asChild variant="ghost">
              <Link to="/cart">Back to Cart</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CheckoutForm />
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border p-6 space-y-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4 py-3 border-b">
                      <div className="h-16 w-16 flex-shrink-0 relative rounded overflow-hidden">
                        <img 
                          src={item.product.images[0].url} 
                          alt={item.product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-semibold">
                        {formatPrice((item.product.discount 
                          ? Math.round(item.product.price - (item.product.price * item.product.discount / 100)) 
                          : item.product.price) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3 pt-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Taxes (18% GST)</span>
                    <span>{formatPrice(taxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <span className="text-green-600 dark:text-green-400">FREE</span>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
