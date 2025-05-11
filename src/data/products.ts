
export type Brand = {
  id: string;
  name: string;
  logoUrl: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
};

export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductReview = {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  price: number;
  discount?: number;
  images: ProductImage[];
  brand: Brand;
  category: Category;
  specifications: { [key: string]: string };
  stockCount: number;
  reviews: ProductReview[];
  rating: number;
  isFeatured?: boolean;
};

export const brands: Brand[] = [
  {
    id: "brand-01",
    name: "Kawasaki",
    logoUrl: "https://cdn.pixabay.com/photo/2013/07/12/14/09/kawasaki-148239_960_720.png",
  },
  {
    id: "brand-02",
    name: "Ducati",
    logoUrl: "https://cdn.pixabay.com/photo/2013/07/12/12/30/ducati-145859_960_720.png",
  },
  {
    id: "brand-03",
    name: "Honda",
    logoUrl: "https://cdn.pixabay.com/photo/2013/07/12/12/30/honda-145857_960_720.png",
  },
  {
    id: "brand-04",
    name: "Yamaha",
    logoUrl: "https://cdn.pixabay.com/photo/2014/04/02/10/45/yamaha-304670_960_720.png",
  },
  {
    id: "brand-05",
    name: "BMW",
    logoUrl: "https://cdn.pixabay.com/photo/2013/07/12/15/33/bmw-150151_960_720.png",
  },
  {
    id: "brand-06",
    name: "KTM",
    logoUrl: "https://cdn.pixabay.com/photo/2013/07/12/14/09/ktm-148241_960_720.png",
  },
  {
    id: "brand-07",
    name: "Suzuki",
    logoUrl: "https://cdn.pixabay.com/photo/2017/03/05/21/43/suzuki-2120437_960_720.png",
  },
  {
    id: "brand-08",
    name: "TVS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/TVS_Motor_Company_Logo.svg/2560px-TVS_Motor_Company_Logo.svg.png",
  },
  {
    id: "brand-09",
    name: "Royal Enfield",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Royal_Enfield_logo.svg/2560px-Royal_Enfield_logo.svg.png",
  },
  {
    id: "brand-10",
    name: "Triumph",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Triumph_Motorcycles_Ltd_logo.svg/2560px-Triumph_Motorcycles_Ltd_logo.svg.png",
  },
];

export const categories: Category[] = [
  {
    id: "category-01",
    name: "Sport Bikes",
    description: "High-performance bikes designed for speed and agility on the track.",
  },
  {
    id: "category-02",
    name: "Cruiser Bikes",
    description: "Comfortable bikes designed for long-distance riding on highways.",
  },
  {
    id: "category-03",
    name: "Adventure Bikes",
    description: "Versatile bikes designed for both on-road and off-road riding.",
  },
  {
    id: "category-04",
    name: "Naked Bikes",
    description: "Sport bikes without fairings for a more upright riding position.",
  },
  {
    id: "category-05",
    name: "Touring Bikes",
    description: "Bikes designed for long-distance travel with comfort features.",
  },
  {
    id: "category-06",
    name: "Retro Bikes",
    description: "Modern bikes with classic styling and vintage aesthetics.",
  },
  {
    id: "category-07",
    name: "Off-Road Bikes",
    description: "Bikes designed specifically for off-road riding and competitions.",
  },
];

// Generate 70+ products
const generateProducts = (): Product[] => {
  const products: Product[] = [];
  
  // Helper function to generate random reviews
  const generateReviews = (count: number): ProductReview[] => {
    const reviews: ProductReview[] = [];
    const names = ["Rahul", "Priya", "Vikram", "Deepika", "Arjun", "Neha", "Rajesh", "Ananya", "Karan", "Meera"];
    
    for (let i = 0; i < count; i++) {
      const rating = Math.floor(Math.random() * 3) + 3; // 3-5 stars
      reviews.push({
        id: `review-${Math.random().toString(36).substr(2, 9)}`,
        userName: names[Math.floor(Math.random() * names.length)],
        rating,
        comment: `Great bike! ${rating === 5 ? "Absolutely love it!" : "Very satisfied with the performance."}`,
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString().split('T')[0],
      });
    }
    
    return reviews;
  };

  // Sport Bikes
  products.push(
    {
      id: "product-01",
      name: "Kawasaki Ninja ZX-10R",
      slug: "kawasaki-ninja-zx-10r",
      description: "The Kawasaki Ninja ZX-10R is a supersport motorcycle designed for high-performance riding on tracks and streets.",
      features: [
        "998cc liquid-cooled 4-stroke engine",
        "Electronic throttle valves with cruise control",
        "Showa Balance Free Front Fork (BFF)",
        "Kawasaki Quick Shifter (KQS)",
        "Öhlins electronic steering damper",
      ],
      price: 1599000,
      discount: 5,
      images: [
        {
          id: "img-01-01",
          url: "https://cdn.pixabay.com/photo/2015/09/08/21/02/superbike-930715_960_720.jpg",
          alt: "Kawasaki Ninja ZX-10R Front View"
        },
        {
          id: "img-01-02",
          url: "https://cdn.pixabay.com/photo/2018/01/24/18/05/motorcycle-3104364_960_720.jpg",
          alt: "Kawasaki Ninja ZX-10R Side View"
        }
      ],
      brand: brands[0], // Kawasaki
      category: categories[0], // Sport Bikes
      specifications: {
        "Engine": "998cc, liquid-cooled, 4-stroke",
        "Power": "203 PS @ 13,500 rpm",
        "Torque": "114.9 Nm @ 11,200 rpm",
        "Transmission": "6-speed",
        "Weight": "207 kg",
        "Fuel Capacity": "17 liters",
      },
      stockCount: 8,
      reviews: generateReviews(5),
      rating: 4.7,
      isFeatured: true
    },
    {
      id: "product-02",
      name: "Ducati Panigale V4",
      slug: "ducati-panigale-v4",
      description: "The Ducati Panigale V4 is the most powerful production bike from Ducati, derived directly from MotoGP experience.",
      features: [
        "1,103 cc Desmosedici Stradale V4 engine",
        "Ducati Power Launch (DPL)",
        "Ducati Quick Shift (DQS) up/down",
        "Öhlins NIX-30 fork, TTX36 shock, and steering damper",
        "Brembo Stylema® monobloc calipers",
      ],
      price: 2695000,
      images: [
        {
          id: "img-02-01",
          url: "https://cdn.pixabay.com/photo/2018/10/26/22/55/motorcycle-3774533_960_720.jpg",
          alt: "Ducati Panigale V4 Front View"
        },
        {
          id: "img-02-02",
          url: "https://cdn.pixabay.com/photo/2017/07/01/04/53/motorcycle-2460595_960_720.jpg",
          alt: "Ducati Panigale V4 Side View"
        }
      ],
      brand: brands[1], // Ducati
      category: categories[0], // Sport Bikes
      specifications: {
        "Engine": "1,103cc, Desmosedici Stradale V4",
        "Power": "214 PS @ 13,000 rpm",
        "Torque": "124 Nm @ 9,500 rpm",
        "Transmission": "6-speed",
        "Weight": "195 kg",
        "Fuel Capacity": "16 liters",
      },
      stockCount: 5,
      reviews: generateReviews(7),
      rating: 4.9,
      isFeatured: true
    }
  );

  // Cruiser Bikes
  products.push(
    {
      id: "product-03",
      name: "Royal Enfield Classic 350",
      slug: "royal-enfield-classic-350",
      description: "The Royal Enfield Classic 350 is a modern classic motorcycle that combines vintage aesthetics with modern engineering.",
      features: [
        "349cc air-cooled single-cylinder engine",
        "Classic post-war British styling",
        "Dual-channel ABS",
        "Comfortable riding position",
        "Timeless design with modern features",
      ],
      price: 193000,
      discount: 2,
      images: [
        {
          id: "img-03-01",
          url: "https://cdn.pixabay.com/photo/2017/10/29/13/31/motorcycle-2899747_960_720.jpg",
          alt: "Royal Enfield Classic 350 Front View"
        },
        {
          id: "img-03-02",
          url: "https://cdn.pixabay.com/photo/2019/07/16/08/44/royal-enfield-4341001_960_720.jpg",
          alt: "Royal Enfield Classic 350 Side View"
        }
      ],
      brand: brands[8], // Royal Enfield
      category: categories[1], // Cruiser Bikes
      specifications: {
        "Engine": "349cc, air-cooled, single-cylinder",
        "Power": "20.2 PS @ 6,100 rpm",
        "Torque": "27 Nm @ 4,000 rpm",
        "Transmission": "5-speed",
        "Weight": "195 kg",
        "Fuel Capacity": "13 liters",
      },
      stockCount: 25,
      reviews: generateReviews(12),
      rating: 4.3,
      isFeatured: true
    },
    {
      id: "product-04",
      name: "Triumph Bonneville Bobber",
      slug: "triumph-bonneville-bobber",
      description: "The Triumph Bonneville Bobber combines classic 'bobber' style with modern performance and technology.",
      features: [
        "1200cc liquid-cooled parallel-twin engine",
        "Unique floating aluminum seat pan",
        "Hidden monoshock rear suspension",
        "Ride-by-wire throttle with multiple riding modes",
        "LED lighting and ABS braking system",
      ],
      price: 1290000,
      images: [
        {
          id: "img-04-01",
          url: "https://cdn.pixabay.com/photo/2018/10/26/22/55/motorcycle-3774534_960_720.jpg",
          alt: "Triumph Bonneville Bobber Front View"
        },
        {
          id: "img-04-02",
          url: "https://cdn.pixabay.com/photo/2018/04/25/18/08/motorcycle-3350257_960_720.jpg",
          alt: "Triumph Bonneville Bobber Side View"
        }
      ],
      brand: brands[9], // Triumph
      category: categories[1], // Cruiser Bikes
      specifications: {
        "Engine": "1,200cc, liquid-cooled, parallel-twin",
        "Power": "77 PS @ 6,100 rpm",
        "Torque": "106 Nm @ 4,000 rpm",
        "Transmission": "6-speed",
        "Weight": "228 kg",
        "Fuel Capacity": "12 liters",
      },
      stockCount: 7,
      reviews: generateReviews(6),
      rating: 4.6
    }
  );
  
  // Adventure Bikes
  products.push(
    {
      id: "product-05",
      name: "BMW R 1250 GS Adventure",
      slug: "bmw-r-1250-gs-adventure",
      description: "The BMW R 1250 GS Adventure is the ultimate long-distance travel enduro that allows ambitious travelers to go beyond boundaries.",
      features: [
        "1254cc boxer twin engine with ShiftCam Technology",
        "Adjustable windshield and seat height",
        "Dynamic ESA (Electronic Suspension Adjustment)",
        "Multiple riding modes with Hill Start Control",
        "LED adaptive headlight with daytime running light",
      ],
      price: 2150000,
      discount: 3,
      images: [
        {
          id: "img-05-01",
          url: "https://cdn.pixabay.com/photo/2020/05/13/21/23/bmw-5169387_960_720.jpg",
          alt: "BMW R 1250 GS Adventure Front View"
        },
        {
          id: "img-05-02",
          url: "https://cdn.pixabay.com/photo/2016/08/25/13/56/motorcycle-1619507_960_720.jpg",
          alt: "BMW R 1250 GS Adventure Side View"
        }
      ],
      brand: brands[4], // BMW
      category: categories[2], // Adventure Bikes
      specifications: {
        "Engine": "1,254cc, air/liquid-cooled, boxer twin",
        "Power": "136 PS @ 7,750 rpm",
        "Torque": "143 Nm @ 6,250 rpm",
        "Transmission": "6-speed",
        "Weight": "268 kg",
        "Fuel Capacity": "30 liters",
      },
      stockCount: 4,
      reviews: generateReviews(9),
      rating: 4.8,
      isFeatured: true
    }
  );
  
  // Generate more products to reach 70+ total
  const existingProductCount = products.length;
  const remainingProductsNeeded = 70 - existingProductCount;
  
  // Generate additional product names
  const generateProductNames = () => {
    const models = [
      "Fireblade", "Ninja", "Hayabusa", "Monster", "Scrambler", "SuperSport", 
      "Streetfighter", "Dominar", "Apache", "Pulsar", "Duke", "RC", 
      "Interceptor", "Continental GT", "Meteor", "Bullet", "RE", "Tiger", 
      "Street Triple", "Speed Triple", "Daytona", "Rocket", "Thunderbird", 
      "Z", "R", "CBR", "CB", "YZF-R", "MT", "GSX-R", "GSX-S", "V-Strom",
      "Versys", "Vulcan", "Intruder", "Boulevard", "FZ", "FZS", "R15", 
      "S1000", "F850", "F750", "G310", "Diavel", "Panigale", "Multistrada", 
      "Hypermotard", "SuperAdventure", "Adventure", "X-Pulse", "Xtreme",
    ];
    
    const suffixes = [
      "600", "650", "750", "900", "1000", "1100", "1200", "1250", "1300",
      "160", "200", "250", "300", "350", "390", "400", "500", "Sport",
      "Pro", "RS", "RR", "S", "R", "GT", "Adventure", "Touring", "Classic",
      "Urban", "Elite", "Premium", "Limited Edition", "Gold Line", "Black Edition",
    ];
    
    const productNames: string[] = [];
    
    brands.forEach(brand => {
      models.forEach(model => {
        suffixes.forEach(suffix => {
          productNames.push(`${brand.name} ${model} ${suffix}`);
        });
      });
    });
    
    // Shuffle and slice to get random product names
    return productNames
      .sort(() => 0.5 - Math.random())
      .slice(0, remainingProductsNeeded);
  };
  
  const additionalProductNames = generateProductNames();
  
  // Motorcycle Types with sample images
  const bikeTypes = [
    { 
      type: "Sport",
      images: [
        "https://cdn.pixabay.com/photo/2019/10/12/07/53/motorcycles-4543638_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/07/13/15/56/motorbike-843286_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/09/09/21/35/motorcycle-933021_960_720.jpg"
      ]
    },
    { 
      type: "Cruiser",
      images: [
        "https://cdn.pixabay.com/photo/2016/03/27/17/59/vintage-1283299_960_720.jpg",
        "https://cdn.pixabay.com/photo/2014/04/24/11/17/motorcycle-331403_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/09/05/07/49/motorcycle-924018_960_720.jpg"
      ]
    },
    { 
      type: "Adventure",
      images: [
        "https://cdn.pixabay.com/photo/2019/09/03/08/28/motorcycle-4449535_960_720.jpg",
        "https://cdn.pixabay.com/photo/2019/08/05/00/53/motorcycle-4385252_960_720.jpg",
        "https://cdn.pixabay.com/photo/2015/09/18/22/20/motorcycle-946508_960_720.jpg"
      ]
    },
    { 
      type: "Naked",
      images: [
        "https://cdn.pixabay.com/photo/2017/07/01/04/53/motorcycle-2460595_960_720.jpg",
        "https://cdn.pixabay.com/photo/2016/11/18/17/04/motorcycle-1835799_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/06/30/23/27/motorcycle-3508051_960_720.jpg"
      ]
    },
    { 
      type: "Touring",
      images: [
        "https://cdn.pixabay.com/photo/2017/07/31/14/45/moto-2558321_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/03/01/13/41/motorcycle-3191111_960_720.jpg",
        "https://cdn.pixabay.com/photo/2018/04/23/11/21/motorcycle-3344331_960_720.jpg"
      ]
    }
  ];
  
  // Generate additional products
  for (let i = 0; i < remainingProductsNeeded; i++) {
    const productName = additionalProductNames[i];
    const nameParts = productName.split(' ');
    const brandName = nameParts[0];
    
    // Find brand from name
    const brand = brands.find(b => b.name === brandName) || brands[Math.floor(Math.random() * brands.length)];
    
    // Determine category
    let categoryIndex = Math.floor(Math.random() * categories.length);
    
    // Choose bike type and images based on category
    const bikeTypeIndex = Math.min(categoryIndex, bikeTypes.length - 1);
    const bikeType = bikeTypes[bikeTypeIndex];
    
    // Generate price (between ₹80,000 and ₹3,000,000)
    const price = Math.floor(80000 + Math.random() * 2920000);
    
    // Generate stock (between 1 and 20)
    const stockCount = Math.floor(1 + Math.random() * 20);
    
    // Add discount to some products
    const discount = Math.random() > 0.7 ? Math.floor(2 + Math.random() * 10) : undefined;
    
    // Generate reviews (between 0 and 15)
    const reviewCount = Math.floor(Math.random() * 16);
    const reviews = generateReviews(reviewCount);
    
    // Calculate average rating
    const rating = reviews.length > 0 
      ? Number((reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)) 
      : 0;
    
    // Generate product features
    const engineSizes = ["125cc", "150cc", "200cc", "250cc", "300cc", "400cc", "500cc", "650cc", "750cc", "900cc", "1000cc", "1100cc", "1200cc"];
    const engineSize = engineSizes[Math.floor(Math.random() * engineSizes.length)];
    
    const baseFeatures = [
      `${engineSize} engine`,
      "LED lighting",
      "Digital instrument cluster",
      "ABS braking system",
    ];
    
    const additionalFeatures = [
      "Traction control system",
      "Quick shifter",
      "Multiple riding modes",
      "Bluetooth connectivity",
      "USD front forks",
      "Adjustable suspension",
      "Radial brake calipers",
      "Slipper clutch",
      "Navigation system",
      "Heated grips",
      "Cruise control",
      "Keyless ignition",
    ];
    
    // Randomly select 1-4 additional features
    const selectedAdditionalFeatures = additionalFeatures
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(1 + Math.random() * 4));
    
    const features = [...baseFeatures, ...selectedAdditionalFeatures];
    
    // Generate slug from product name
    const slug = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Generate images
    const imageUrls = [
      bikeType.images[Math.floor(Math.random() * bikeType.images.length)],
      bikeType.images[Math.floor(Math.random() * bikeType.images.length)]
    ];
    
    // Add the product
    products.push({
      id: `product-${(existingProductCount + i + 1).toString().padStart(2, '0')}`,
      name: productName,
      slug,
      description: `The ${productName} is a high-performance motorcycle designed for enthusiasts who demand the best in technology and riding experience.`,
      features,
      price,
      discount,
      images: [
        {
          id: `img-${(existingProductCount + i + 1).toString().padStart(2, '0')}-01`,
          url: imageUrls[0],
          alt: `${productName} Front View`
        },
        {
          id: `img-${(existingProductCount + i + 1).toString().padStart(2, '0')}-02`,
          url: imageUrls[1],
          alt: `${productName} Side View`
        }
      ],
      brand,
      category: categories[categoryIndex],
      specifications: {
        "Engine": `${engineSize}, ${Math.random() > 0.5 ? "liquid" : "air"}-cooled`,
        "Power": `${Math.floor(20 + Math.random() * 180)} PS @ ${Math.floor(6 + Math.random() * 8)},${Math.floor(Math.random() * 10)}00 rpm`,
        "Torque": `${Math.floor(20 + Math.random() * 120)} Nm @ ${Math.floor(3 + Math.random() * 8)},${Math.floor(Math.random() * 10)}00 rpm`,
        "Transmission": `${Math.floor(5 + Math.random() * 2)}-speed`,
        "Weight": `${Math.floor(130 + Math.random() * 180)} kg`,
        "Fuel Capacity": `${Math.floor(10 + Math.random() * 20)} liters`,
      },
      stockCount,
      reviews,
      rating,
      isFeatured: Math.random() > 0.9 // 10% chance to be featured
    });
  }
  
  return products;
};

export const products = generateProducts();

// Featured products for homepage
export const featuredProducts = products.filter(product => product.isFeatured);

// Top-rated products
export const topRatedProducts = [...products]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

// Best selling products (those with low stock, implying they sell well)
export const bestSellingProducts = [...products]
  .sort((a, b) => a.stockCount - b.stockCount)
  .slice(0, 6);

// New arrivals (use some random products)
export const newArrivals = [...products]
  .sort(() => 0.5 - Math.random())
  .slice(0, 6);

// Special offers (products with discounts)
export const specialOffers = products.filter(product => product.discount);
