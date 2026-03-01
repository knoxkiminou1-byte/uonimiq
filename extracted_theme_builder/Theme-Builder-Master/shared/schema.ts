import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // price in cents
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull(),
  isNewDrop: boolean("is_new_drop").default(false),
  isFeatured: boolean("is_featured").default(false),
  inStock: boolean("in_stock").default(true),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  handle: text("handle").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const lookbookItems = pgTable("lookbook_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCollectionSchema = createInsertSchema(collections).omit({ id: true });
export const insertLookbookItemSchema = createInsertSchema(lookbookItems).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Collection = typeof collections.$inferSelect;
export type InsertCollection = z.infer<typeof insertCollectionSchema>;

export type LookbookItem = typeof lookbookItems.$inferSelect;
export type InsertLookbookItem = z.infer<typeof insertLookbookItemSchema>;

export type ProductResponse = Product;
export type CollectionResponse = Collection;
export type LookbookItemResponse = LookbookItem;
