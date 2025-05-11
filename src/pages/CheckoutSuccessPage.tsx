
import { useEffect } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CheckoutSuccessPage = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;
  
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // If no order details (if someone navigates directly to this page), redirect to home
  if (!orderDetails) {
    return <Navigate to="/" replace />;
  }
  
  // Generate random order ID
  const orderId = `ORD${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            
            <div className="bg-card border rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Order Number</h3>
                  <p className="font-medium">{orderId}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Date</h3>
                  <p className="font-medium">{new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Name</h3>
                  <p className="font-medium">{orderDetails.firstName} {orderDetails.lastName}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Email</h3>
                  <p className="font-medium">{orderDetails.email}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Shipping Address</h3>
                  <p className="font-medium">{orderDetails.address}, {orderDetails.city}, {orderDetails.state}, {orderDetails.pincode}</p>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">Payment Method</h3>
                  <p className="font-medium capitalize">{orderDetails.paymentMethod.replace('_', ' ')}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <p>
                We've sent you a confirmation email with all the details of your order. 
                You can also track your order status through your email.
              </p>
              
              <p className="text-muted-foreground">
                If you have any questions about your order, please contact our customer service.
              </p>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild>
                <Link to="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutSuccessPage;
