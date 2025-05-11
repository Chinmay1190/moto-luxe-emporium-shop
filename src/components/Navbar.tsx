
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Menu, X, Search, BadgeIndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { categories } from "@/data/products";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => document.getElementById("searchInput")?.focus(), 100);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results page
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-sm shadow-md"
          : "bg-background/50 backdrop-blur-sm"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BadgeIndianRupee className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">SpeedBikes</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 items-center">
            <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <div className="group relative">
              <div className="text-sm font-medium hover:text-primary transition-colors cursor-pointer">
                Categories
              </div>
              <div className="absolute left-0 mt-2 w-48 bg-card shadow-lg rounded-md overflow-hidden z-10 hidden group-hover:block animate-fade-in">
                <div className="py-2">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 hover:bg-accent transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link to="/products" className="text-sm font-medium hover:text-primary transition-colors">
              All Products
            </Link>
            <Link to="/offers" className="text-sm font-medium hover:text-primary transition-colors">
              Special Offers
            </Link>
            <Link to="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full text-xs w-5 h-5 flex items-center justify-center animate-scale-in">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4 animate-fade-in">
            <div className="w-full max-w-3xl">
              <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <Input
                  id="searchInput"
                  type="text" 
                  placeholder="Search for bikes..." 
                  className="flex-1"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
                <Button variant="ghost" size="icon" onClick={toggleSearch}>
                  <X className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        )}
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-background/90 backdrop-blur-md z-50 md:hidden animate-fade-in">
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-4 border-b">
                <Link to="/" className="flex items-center space-x-2" onClick={toggleMenu}>
                  <BadgeIndianRupee className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold">SpeedBikes</span>
                </Link>
                <Button variant="ghost" size="icon" onClick={toggleMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex flex-col p-4 space-y-4">
                <Link to="/" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                  Home
                </Link>
                <div className="space-y-2">
                  <div className="text-lg font-medium">Categories</div>
                  <div className="pl-4 space-y-2">
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.id}`}
                        className="block hover:text-primary"
                        onClick={toggleMenu}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link to="/products" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                  All Products
                </Link>
                <Link to="/offers" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                  Special Offers
                </Link>
                <Link to="/contact" className="text-lg font-medium hover:text-primary" onClick={toggleMenu}>
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
