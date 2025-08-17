import { sql } from "drizzle-orm";
import { pgTable, text, varchar, decimal, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  category: text("category").notNull(),
  subcategory: text("subcategory"),
  ageGroup: text("age_group").notNull(),
  imageUrl: text("image_url").notNull(),
  specifications: jsonb("specifications"),
  safetyInfo: text("safety_info"),
  inStock: integer("in_stock").notNull().default(0),
  featured: integer("featured").default(0), // 0 or 1 for boolean
});

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  productCount: integer("product_count").default(0),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  price: string;
  name: string;
  imageUrl: string;
};

export type Cart = {
  items: CartItem[];
  total: string;
  itemCount: number;
};
