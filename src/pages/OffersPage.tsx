
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { specialOffers } from "@/data/products";
import { formatPrice } from "@/lib/formatters";

const OffersPage = () => {
  // Total savings calculation
  const totalSavings = specialOffers.reduce((acc, product) => {
    if (product.discount) {
      const discountAmount = (product.price * product.discount) / 100;
      return acc + discountAmount;
    }
    return acc;
  }, 0);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Exclusive deals on premium motorcycles. Limited time offers!
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Current Promotions</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Get complimentary accessories worth ₹10,000 with select bikes</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Free extended warranty on all premium motorcycles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Zero down payment and low interest EMI options available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span>
                  <span>Trade-in your old bike and get extra ₹20,000 off</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Savings Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-1">Total Products on Sale</p>
                  <p className="text-2xl font-bold">{specialOffers.length} Items</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Potential Savings Up To</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatPrice(totalSavings)}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Offer Valid Until</p>
                  <p className="font-medium">June 30, 2025</p>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Featured Offers</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {specialOffers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {specialOffers.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold mb-2">No special offers at the moment</h3>
              <p className="text-muted-foreground">
                Please check back later for new deals and promotions
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OffersPage;
