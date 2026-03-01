import { pgTable, serial, text, integer, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  isNew: boolean("is_new").default(false),
  isSignature: boolean("is_signature").default(false),
  isLimited: boolean("is_limited").default(false),
  images: jsonb("images").notNull().$type<string[]>(), // Array of URLs
  category: text("category").notNull(),
  fitNotes: text("fit_notes"),
  materialAndCare: text("material_and_care"),
});

export const productVariants = pgTable("product_variants", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  sku: text("sku").notNull(),
  stock: integer("stock").notNull().default(0),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  theme: text("theme").default('default'), // To support essential vs ceremonial
});

export const collectionProducts = pgTable("collection_products", {
  id: serial("id").primaryKey(),
  collectionId: integer("collection_id").notNull(),
  productId: integer("product_id").notNull(),
});

export const lookbooks = pgTable("lookbooks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  featuredProductIds: jsonb("featured_product_ids").$type<number[]>(),
});

// Define types and schemas
export const insertProductSchema = createInsertSchema(products);
export const insertProductVariantSchema = createInsertSchema(productVariants);
export const insertCollectionSchema = createInsertSchema(collections);
export const insertLookbookSchema = createInsertSchema(lookbooks);

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type ProductVariant = typeof productVariants.$inferSelect;
export type InsertProductVariant = z.infer<typeof insertProductVariantSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type Lookbook = typeof lookbooks.$inferSelect;
export type InsertLookbook = z.infer<typeof insertLookbookSchema>;

// Shared Response Types
export type ProductResponse = Product & { variants: ProductVariant[] };
