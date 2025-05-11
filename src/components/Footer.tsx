
import { Link } from "react-router-dom";
import { BadgeIndianRupee, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card text-card-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <BadgeIndianRupee className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SpeedBikes</span>
            </div>
            <p className="text-muted-foreground">
              Premium superbikes for enthusiasts. Experience the thrill of speed with our world-class motorcycles.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((category) => (
                <li key={category.id}>
                  <Link 
                    to={`/category/${category.id}`} 
                    className="hover:text-primary transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="hover:text-primary transition-colors">
                  View All
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/offers" className="hover:text-primary transition-colors">
                  Special Offers
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="hover:text-primary transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-primary transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-primary transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            <form className="space-y-2">
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email address" 
                  className="rounded-r-none"
                />
                <Button type="submit" className="rounded-l-none">
                  Subscribe
                </Button>
              </div>
            </form>
            
            <div className="mt-6 space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>info@speedbikes.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <span>123 MG Road, Bangalore, Karnataka, India - 560001</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} SpeedBikes. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <img src="https://cdn.pixabay.com/photo/2018/05/08/21/29/paypal-3384015_960_720.png" 
                alt="PayTM" className="h-8" />
              <img src="https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_960_720.png" 
                alt="PayPal" className="h-8" />
              <img src="https://cdn.pixabay.com/photo/2013/04/01/21/32/visa-99071_960_720.png" 
                alt="Visa" className="h-8" />
              <img src="https://cdn.pixabay.com/photo/2015/08/26/22/02/mastercard-908860_960_720.png" 
                alt="Mastercard" className="h-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
