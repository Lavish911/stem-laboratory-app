import { type Product, type InsertProduct, type Category, type InsertCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Product operations
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | undefined>;
  getProductsByCategory(category: string): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  searchProducts(query: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Category operations
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
}

export class MemStorage implements IStorage {
  private products: Map<string, Product>;
  private categories: Map<string, Category>;

  constructor() {
    this.products = new Map();
    this.categories = new Map();
    this.seedData();
  }

  private seedData() {
    // Seed categories
    const categories: InsertCategory[] = [
      {
        name: "Chemistry Sets",
        description: "Complete chemistry experiment kits with safety equipment",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        productCount: 18
      },
      {
        name: "Robotics Kits",
        description: "Build and program robots with advanced sensors",
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        productCount: 15
      },
      {
        name: "Arduino Projects",
        description: "Electronics and programming experiments",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        productCount: 25
      },
      {
        name: "Lab Manuals",
        description: "Educational guides and digital resources",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        productCount: 27
      }
    ];

    categories.forEach(cat => this.createCategory(cat));

    // Seed products
    const products: InsertProduct[] = [
      {
        name: "Advanced Chemistry Explorer Kit",
        description: "50+ experiments covering acids, bases, crystallization, and chemical reactions. Includes safety equipment and detailed manual.",
        price: "10799.00",
        category: "Chemistry Sets",
        subcategory: "Advanced",
        ageGroup: "High School (15-18)",
        imageUrl: "https://pixabay.com/get/gfc907b024b731aa22039ccc76bdb321801f9874c6daf85b26cbfb1218d28d7dbbfcc4a4d1449b30e392fb5bf5bbbe4dd17de3ed65367ea10ac9bfdb60ce8a1eb_1280.jpg",
        specifications: {
          experiments: 50,
          safetyEquipment: true,
          manual: "200-page illustrated guide",
          chemicals: "15 safe chemicals included"
        },
        safetyInfo: "Adult supervision required. Safety goggles and gloves included.",
        inStock: 25,
        featured: 1
      },
      {
        name: "Smart Robotics Starter Kit",
        description: "Build and program your own robot with sensors, motors, and visual programming interface. Perfect for beginners.",
        price: "15799.00",
        category: "Robotics Kits",
        subcategory: "Beginner",
        ageGroup: "Middle School (12-14)",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          sensors: "Ultrasonic, light, sound sensors",
          motors: "2 servo motors included",
          programming: "Visual block-based programming",
          connectivity: "Bluetooth enabled"
        },
        safetyInfo: "Small parts - not suitable for children under 12.",
        inStock: 18,
        featured: 1
      },
      {
        name: "Arduino Innovation Lab",
        description: "Complete Arduino ecosystem with sensors, LEDs, motors, and step-by-step project guides for 25+ experiments.",
        price: "8299.00",
        category: "Arduino Projects",
        subcategory: "Complete Kit",
        ageGroup: "High School (15-18)",
        imageUrl: "https://pixabay.com/get/g1e6533cd013261489410e16dba84aa5785e8fc84a38495a1997bab985dc4d82eddcd30cf715a3db885fdd3c74e8bec9b39a2c2472691d121c26375e5e7778bf0_1280.jpg",
        specifications: {
          board: "Arduino Uno R3 compatible",
          components: "200+ electronic components",
          projects: "25 guided projects",
          software: "Arduino IDE compatible"
        },
        safetyInfo: "Basic electronics safety knowledge recommended.",
        inStock: 32,
        featured: 1
      },
      {
        name: "Digital Microscope Kit",
        description: "400x magnification with USB connectivity for digital viewing and photography.",
        price: "6649.00",
        category: "Lab Equipment",
        subcategory: "Microscopy",
        ageGroup: "Middle School (12-14)",
        imageUrl: "https://pixabay.com/get/g957420471dbdd1e7b75c1385fdaa57c2042f854b4e9490cddacd8fe88659adce7ab2e1cbf38b1796e998e2292242bb669be2ca6459e077da08767170faeb417b_1280.jpg",
        specifications: {
          magnification: "40x to 400x",
          connectivity: "USB 2.0",
          software: "Windows and Mac compatible",
          specimens: "Prepared slides included"
        },
        safetyInfo: "Handle glass slides with care.",
        inStock: 15,
        featured: 0
      },
      {
        name: "Solar Energy Lab Kit",
        description: "Learn renewable energy with solar panels, batteries, and measurement tools.",
        price: "12139.00",
        category: "Physics Kits",
        subcategory: "Energy",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          solarPanel: "6V 2W solar panel",
          battery: "Rechargeable NiMH battery",
          multimeter: "Digital multimeter included",
          experiments: "15 energy experiments"
        },
        safetyInfo: "Do not stare directly at LED lights.",
        inStock: 22,
        featured: 0
      },
      {
        name: "Electronics Breadboard Kit",
        description: "Complete circuit building kit with resistors, LEDs, and components.",
        price: "4989.00",
        category: "Arduino Projects",
        subcategory: "Components",
        ageGroup: "Middle School (12-14)",
        imageUrl: "https://pixabay.com/get/g6ed375a41060b32fd28b18a479122e53ca1f1920ddcdf39a805a44e5631c91c13f82fc6fd23f3e5ec028bb545a71625b9a7dd1323d102493316be130690213b8_1280.jpg",
        specifications: {
          breadboard: "830 tie-points",
          resistors: "Assorted values 1/4W",
          leds: "Various colors and sizes",
          wires: "Jumper wire assortment"
        },
        safetyInfo: "Low voltage components - safe for educational use.",
        inStock: 45,
        featured: 0
      },
      {
        name: "Organic Chemistry Lab Set",
        description: "Explore organic compounds with safe household chemicals and advanced molecular models.",
        price: "9399.00",
        category: "Chemistry Sets",
        subcategory: "Organic",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          experiments: 35,
          molecularModels: "3D molecular modeling kit",
          chemicals: "12 organic compounds",
          manual: "150-page detailed guide"
        },
        safetyInfo: "Adult supervision required. Well-ventilated area recommended.",
        inStock: 20,
        featured: 0
      },
      {
        name: "Crystal Growing Science Kit",
        description: "Grow beautiful crystals while learning about crystallization and mineral formation.",
        price: "3759.00",
        category: "Chemistry Sets",
        subcategory: "Crystallography",
        ageGroup: "Elementary (8-11)",
        imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          crystalTypes: "Salt, sugar, epsom, and colored crystals",
          growthTime: "3-14 days depending on crystal",
          magnifyingGlass: "Included for observation",
          specimens: "Display containers included"
        },
        safetyInfo: "Non-toxic materials. Adult supervision recommended.",
        inStock: 38,
        featured: 0
      },
      {
        name: "Advanced Humanoid Robot Kit",
        description: "Build a walking, talking robot with AI capabilities and smartphone control.",
        price: "24799.00",
        category: "Robotics Kits",
        subcategory: "Advanced",
        ageGroup: "College (18+)",
        imageUrl: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          sensors: "Gyroscope, accelerometer, camera",
          motors: "18 servo motors for movement",
          programming: "Python and C++ compatible",
          connectivity: "WiFi and Bluetooth",
          ai: "Voice recognition and response"
        },
        safetyInfo: "Complex assembly required. 16+ years recommended.",
        inStock: 8,
        featured: 1
      },
      {
        name: "Drone Building Workshop Kit",
        description: "Assemble and program your own quadcopter drone with flight control systems.",
        price: "18999.00",
        category: "Robotics Kits",
        subcategory: "Aerial",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          flightTime: "15 minutes per charge",
          camera: "HD 720p camera included",
          range: "100m control range",
          programming: "Block-based flight programming",
          safety: "Propeller guards included"
        },
        safetyInfo: "Outdoor use recommended. Follow local drone regulations.",
        inStock: 12,
        featured: 0
      },
      {
        name: "IoT Home Automation Kit",
        description: "Connect and control household devices using Arduino and smartphone integration.",
        price: "11799.00",
        category: "Arduino Projects",
        subcategory: "IoT",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          microcontroller: "ESP32 with WiFi",
          sensors: "Temperature, humidity, motion, light",
          relays: "4-channel relay module",
          app: "Custom smartphone app included",
          protocols: "WiFi, MQTT, HTTP"
        },
        safetyInfo: "Electrical connections require adult supervision.",
        inStock: 25,
        featured: 0
      },
      {
        name: "LED Matrix Display Kit",
        description: "Create scrolling text, animations, and games on programmable LED displays.",
        price: "6299.00",
        category: "Arduino Projects",
        subcategory: "Display",
        ageGroup: "Middle School (12-14)",
        imageUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          matrix: "32x32 RGB LED matrix",
          controller: "Arduino compatible controller",
          projects: "15 example projects",
          software: "Visual programming interface"
        },
        safetyInfo: "Bright LEDs - avoid direct eye exposure.",
        inStock: 30,
        featured: 0
      },
      {
        name: "Renewable Energy Experiment Lab",
        description: "Comprehensive manual covering solar, wind, and hydroelectric energy experiments.",
        price: "2899.00",
        category: "Lab Manuals",
        subcategory: "Energy",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          pages: "280 pages full color",
          experiments: "45 hands-on experiments",
          digitalAccess: "Online videos and simulations",
          materials: "Component list for each experiment"
        },
        safetyInfo: "Educational content only - equipment sold separately.",
        inStock: 50,
        featured: 0
      },
      {
        name: "Advanced Physics Lab Manual",
        description: "University-level physics experiments covering mechanics, waves, and modern physics.",
        price: "4299.00",
        category: "Lab Manuals",
        subcategory: "Physics",
        ageGroup: "College (18+)",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          pages: "450 pages with diagrams",
          experiments: "65 laboratory experiments",
          theory: "Comprehensive theoretical background",
          calculations: "Step-by-step problem solving"
        },
        safetyInfo: "Suitable for advanced students and educators.",
        inStock: 35,
        featured: 0
      },
      {
        name: "Weather Station Building Kit",
        description: "Build your own digital weather station with multiple sensors and data logging.",
        price: "13999.00",
        category: "Arduino Projects",
        subcategory: "Environmental",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          sensors: "Temperature, humidity, pressure, wind speed",
          display: "LCD display with real-time data",
          logging: "SD card data storage",
          wireless: "WiFi weather data transmission",
          power: "Solar powered option included"
        },
        safetyInfo: "Outdoor installation requires weatherproofing.",
        inStock: 18,
        featured: 1
      },
      {
        name: "Microbiology Lab Starter Kit",
        description: "Explore the microscopic world with prepared slides, cultures, and staining materials.",
        price: "8799.00",
        category: "Chemistry Sets",
        subcategory: "Biology",
        ageGroup: "High School (15-18)",
        imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          slides: "25 prepared microscope slides",
          cultures: "Safe bacterial culture samples",
          stains: "Methylene blue and iodine stains",
          petriDishes: "Sterile petri dishes included",
          manual: "Microbiology experiment guide"
        },
        safetyInfo: "Sterile technique instructions included. Adult supervision required.",
        inStock: 22,
        featured: 0
      },
      {
        name: "Solar Robot Building Challenge",
        description: "Multiple solar-powered robot designs that teach renewable energy and mechanics.",
        price: "7899.00",
        category: "Robotics Kits",
        subcategory: "Solar",
        ageGroup: "Middle School (12-14)",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
        specifications: {
          robots: "6 different robot configurations",
          solarPanel: "Small photovoltaic cell",
          gears: "Gear reduction system",
          assembly: "No tools required",
          educational: "Solar energy learning guide"
        },
        safetyInfo: "Small parts present. Recommended for ages 10+.",
        inStock: 28,
        featured: 0
      }
    ];

    products.forEach(prod => this.createProduct(prod));
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductById(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      product => product.featured === 1
    );
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.products.values()).filter(
      product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = { 
      ...insertProduct, 
      id,
      subcategory: insertProduct.subcategory ?? null,
      specifications: insertProduct.specifications ?? null,
      safetyInfo: insertProduct.safetyInfo ?? null,
      inStock: insertProduct.inStock ?? 0,
      featured: insertProduct.featured ?? null
    };
    this.products.set(id, product);
    return product;
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryById(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id,
      productCount: insertCategory.productCount ?? null
    };
    this.categories.set(id, category);
    return category;
  }
}

export const storage = new MemStorage();
