
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductDetail } from "@/components/ProductDetail";
import { products, Product, topRatedProducts } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star } from "lucide-react";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    
    // Find product by slug
    const foundProduct = products.find(p => p.slug === slug);
    
    if (foundProduct) {
      setProduct(foundProduct);
      document.title = `${foundProduct.name} - SpeedBikes`;
    }
    
    setIsLoading(false);
  }, [slug]);
  
  // If product is not found, show not found message
  if (!isLoading && !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you are looking for does not exist or has been removed.
            </p>
            <Link 
              to="/products" 
              className="text-primary hover:underline"
            >
              Browse all products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (isLoading || !product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="container mx-auto px-4 py-16">
            <div className="animate-pulse space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-muted h-[400px] rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-6 bg-muted rounded w-1/4"></div>
                  <div className="h-10 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                  <div className="h-8 bg-muted rounded w-1/3"></div>
                  <div className="h-24 bg-muted rounded"></div>
                  <div className="h-12 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Filter related products (same category or brand, excluding current product)
  const relatedProducts = products
    .filter(p => 
      (p.category.id === product.category.id || p.brand.id === product.brand.id) && 
      p.id !== product.id
    )
    .slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="flex text-sm mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li>
                <Link 
                  to={`/category/${product.category.id}`} 
                  className="text-muted-foreground hover:text-primary"
                >
                  {product.category.name}
                </Link>
              </li>
              <li className="text-muted-foreground">/</li>
              <li className="text-foreground font-medium truncate max-w-[200px]">
                {product.name}
              </li>
            </ol>
          </nav>
          
          {/* Product Detail */}
          <ProductDetail product={product} />
          
          {/* Tabs Section */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="description"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4 h-auto"
                >
                  Description
                </TabsTrigger>
                <TabsTrigger 
                  value="specifications"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4 h-auto"
                >
                  Specifications
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:shadow-none py-3 px-4 h-auto"
                >
                  Reviews ({product.reviews.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="pt-6">
                <div className="prose max-w-none dark:prose-invert">
                  <p className="mb-4">{product.description}</p>
                  <h3 className="text-xl font-semibold mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2 text-primary">•</span> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="flex justify-between items-center py-3 border-b"
                    >
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="pt-6">
                <div className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 bg-muted/50 p-6 rounded-lg flex flex-col items-center justify-center">
                      <div className="text-4xl font-bold mb-2">
                        {product.rating.toFixed(1)}
                      </div>
                      <div className="flex items-center mb-2">
                        {Array(5).fill(null).map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating) 
                                ? "text-yellow-500 fill-yellow-500" 
                                : i < product.rating 
                                  ? "text-yellow-500 fill-yellow-500 opacity-60" 
                                  : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Based on {product.reviews.length} reviews
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      {product.reviews.length > 0 ? (
                        <div className="space-y-4">
                          {product.reviews.map(review => (
                            <div key={review.id} className="border-b pb-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h4 className="font-semibold">{review.userName}</h4>
                                  <div className="flex items-center">
                                    {Array(5).fill(null).map((_, i) => (
                                      <Star 
                                        key={i} 
                                        className={`h-4 w-4 ${
                                          i < review.rating 
                                            ? "text-yellow-500 fill-yellow-500" 
                                            : "text-muted-foreground"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                  {review.date}
                                </span>
                              </div>
                              <p className="text-sm">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                          <p className="text-muted-foreground">
                            Be the first to review this product
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Related Products</h2>
              <Link to="/products" className="text-primary hover:underline">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.length > 0 ? (
                relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                topRatedProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
