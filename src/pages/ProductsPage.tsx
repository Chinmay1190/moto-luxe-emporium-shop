
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { products, brands, categories, Product } from "@/data/products";
import { ChevronDown, ChevronUp, Filter, X, SlidersHorizontal } from "lucide-react";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");
  const brandId = searchParams.get("brand");
  const search = searchParams.get("search");
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(brandId ? [brandId] : []);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categoryId ? [categoryId] : []);
  const [sortOption, setSortOption] = useState("featured");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const productsPerPage = 12;
  
  // Find min and max prices from all products
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));
  
  // Initialize price range with min and max values
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  // Filter and sort products
  useEffect(() => {
    let result = [...products];
    
    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(searchLower) || 
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.name.toLowerCase().includes(searchLower) ||
          product.category.name.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter(product => selectedBrands.includes(product.brand.id));
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0) {
      result = result.filter(product => selectedCategories.includes(product.category.id));
    }
    
    // Filter by price range
    result = result.filter(
      product => {
        const discountedPrice = product.discount 
          ? Math.round(product.price - (product.price * product.discount / 100))
          : product.price;
        return discountedPrice >= priceRange[0] && discountedPrice <= priceRange[1];
      }
    );
    
    // Sort products
    switch (sortOption) {
      case "price_asc":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount/100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount/100) : b.price;
          return priceA - priceB;
        });
        break;
      case "price_desc":
        result.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount/100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount/100) : b.price;
          return priceB - priceA;
        });
        break;
      case "newest":
        // Since we don't have real date data, we'll use id as a proxy
        result.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
      default:
        // Put featured products first
        result.sort((a, b) => {
          if (a.isFeatured === b.isFeatured) return 0;
          return a.isFeatured ? -1 : 1;
        });
    }
    
    setFilteredProducts(result);
    setPage(1); // Reset to first page when filters change
  }, [search, selectedBrands, selectedCategories, priceRange, sortOption]);
  
  // Set visible products based on pagination
  useEffect(() => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setVisibleProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, page]);
  
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  const handleBrandToggle = (brandId: string) => {
    setSelectedBrands(prev => 
      prev.includes(brandId)
        ? prev.filter(id => id !== brandId)
        : [...prev, brandId]
    );
  };
  
  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  
  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setSortOption("featured");
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold">
                  {search 
                    ? `Search Results for "${search}"` 
                    : categoryId 
                      ? `${categories.find(c => c.id === categoryId)?.name || 'Products'}`
                      : brandId
                        ? `${brands.find(b => b.id === brandId)?.name || 'Products'}`
                        : 'All Superbikes'}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border rounded p-2 bg-background"
                  >
                    <option value="featured">Featured</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filters - Desktop */}
              <div className="hidden md:block space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold flex items-center">
                    <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    className="h-8 text-xs"
                  >
                    Clear All
                  </Button>
                </div>
                
                {/* Price Range Filter */}
                <div className="space-y-3 border-b pb-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Price Range</h4>
                  </div>
                  
                  <div className="px-2">
                    <Slider
                      min={minPrice}
                      max={maxPrice}
                      step={1000}
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      className="my-6"
                    />
                    
                    <div className="flex items-center justify-between">
                      <Input 
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value >= minPrice && value <= priceRange[1]) {
                            setPriceRange([value, priceRange[1]]);
                          }
                        }}
                        className="w-20 h-8 text-xs"
                      />
                      <span className="text-muted-foreground mx-2">to</span>
                      <Input 
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) => {
                          const value = parseInt(e.target.value);
                          if (!isNaN(value) && value <= maxPrice && value >= priceRange[0]) {
                            setPriceRange([priceRange[0], value]);
                          }
                        }}
                        className="w-20 h-8 text-xs"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Brand Filter */}
                <div className="space-y-3 border-b pb-4">
                  <h4 className="font-medium">Brands</h4>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {brands.map(brand => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`brand-${brand.id}`}
                          checked={selectedBrands.includes(brand.id)}
                          onCheckedChange={() => handleBrandToggle(brand.id)}
                        />
                        <Label 
                          htmlFor={`brand-${brand.id}`}
                          className="text-sm cursor-pointer flex-grow"
                        >
                          {brand.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="space-y-3">
                  <h4 className="font-medium">Categories</h4>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <Label 
                          htmlFor={`category-${category.id}`}
                          className="text-sm cursor-pointer flex-grow"
                        >
                          {category.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Filters - Mobile */}
              {isFilterOpen && (
                <div className="fixed inset-0 z-50 bg-background md:hidden animate-fade-in">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h3 className="font-semibold flex items-center">
                        <SlidersHorizontal className="h-4 w-4 mr-2" /> Filters
                      </h3>
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={handleClearFilters}
                        >
                          Clear All
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => setIsFilterOpen(false)}
                        >
                          <X className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1 overflow-auto p-4 space-y-6">
                      {/* Price Range Filter */}
                      <div className="space-y-3 border-b pb-4">
                        <h4 className="font-medium">Price Range</h4>
                        <div className="px-2">
                          <Slider
                            min={minPrice}
                            max={maxPrice}
                            step={1000}
                            value={priceRange}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                            className="my-6"
                          />
                          
                          <div className="flex items-center justify-between">
                            <Input 
                              type="number"
                              value={priceRange[0]}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value >= minPrice && value <= priceRange[1]) {
                                  setPriceRange([value, priceRange[1]]);
                                }
                              }}
                              className="w-24 h-8"
                            />
                            <span className="text-muted-foreground mx-2">to</span>
                            <Input 
                              type="number"
                              value={priceRange[1]}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (!isNaN(value) && value <= maxPrice && value >= priceRange[0]) {
                                  setPriceRange([priceRange[0], value]);
                                }
                              }}
                              className="w-24 h-8"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {/* Brand Filter */}
                      <div className="space-y-3 border-b pb-4">
                        <h4 className="font-medium">Brands</h4>
                        <div className="space-y-3 max-h-60 overflow-y-auto">
                          {brands.map(brand => (
                            <div key={brand.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`mobile-brand-${brand.id}`}
                                checked={selectedBrands.includes(brand.id)}
                                onCheckedChange={() => handleBrandToggle(brand.id)}
                              />
                              <Label 
                                htmlFor={`mobile-brand-${brand.id}`}
                                className="cursor-pointer flex-grow"
                              >
                                {brand.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Category Filter */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Categories</h4>
                        <div className="space-y-3">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`mobile-category-${category.id}`}
                                checked={selectedCategories.includes(category.id)}
                                onCheckedChange={() => handleCategoryToggle(category.id)}
                              />
                              <Label 
                                htmlFor={`mobile-category-${category.id}`}
                                className="cursor-pointer flex-grow"
                              >
                                {category.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border-t">
                      <Button 
                        className="w-full"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Products Grid */}
              <div className="md:col-span-3">
                {visibleProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {visibleProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-semibold mb-2">No products found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search query
                    </p>
                    <Button 
                      onClick={handleClearFilters} 
                      variant="link" 
                      className="mt-4"
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8 space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <Button
                        key={pageNum}
                        variant={pageNum === page ? "default" : "outline"}
                        onClick={() => setPage(pageNum)}
                        className={pageNum === page ? "bg-primary text-primary-foreground" : ""}
                      >
                        {pageNum}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
