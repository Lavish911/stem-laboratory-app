import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const searchQuerySchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  minPrice: z.string().optional(),
  maxPrice: z.string().optional(),
  ageGroup: z.string().optional(),
});

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  // Get featured products
  app.get("/api/products/featured", async (req, res) => {
    try {
      const products = await storage.getFeaturedProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch featured products" });
    }
  });

  // Search products
  app.get("/api/products/search", async (req, res) => {
    try {
      const query = searchQuerySchema.parse(req.query);
      
      let products = await storage.getProducts();
      
      // Apply search query
      if (query.q) {
        products = await storage.searchProducts(query.q);
      }
      
      // Apply category filter
      if (query.category) {
        products = products.filter(p => 
          p.category.toLowerCase().includes(query.category!.toLowerCase())
        );
      }
      
      // Apply price filters
      if (query.minPrice) {
        const minPrice = parseFloat(query.minPrice);
        products = products.filter(p => parseFloat(p.price) >= minPrice);
      }
      
      if (query.maxPrice) {
        const maxPrice = parseFloat(query.maxPrice);
        products = products.filter(p => parseFloat(p.price) <= maxPrice);
      }
      
      // Apply age group filter
      if (query.ageGroup) {
        products = products.filter(p => 
          p.ageGroup.toLowerCase().includes(query.ageGroup!.toLowerCase())
        );
      }
      
      res.json(products);
    } catch (error) {
      res.status(400).json({ error: "Invalid search parameters" });
    }
  });

  // Get single product
  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProductById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Get products by category
  app.get("/api/categories/:category/products", async (req, res) => {
    try {
      const products = await storage.getProductsByCategory(req.params.category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by category" });
    }
  });

  // Get all categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
