import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { products, productVariants, collections, collectionProducts, lookbooks } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.products.list.path, async (req, res) => {
    const allProducts = await storage.getProducts();
    res.json(allProducts);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.get(api.collections.list.path, async (req, res) => {
    const allCollections = await storage.getCollections();
    res.json(allCollections);
  });

  app.get(api.collections.get.path, async (req, res) => {
    const collection = await storage.getCollectionBySlug(req.params.slug);
    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }
    res.json(collection);
  });

  app.get(api.lookbooks.list.path, async (req, res) => {
    const allLookbooks = await storage.getLookbooks();
    res.json(allLookbooks);
  });

  // Seed database route (internal utility)
  app.post("/api/seed", async (req, res) => {
    try {
      await seedDatabase();
      res.json({ message: "Database seeded successfully" });
    } catch (e) {
      res.status(500).json({ message: "Error seeding database", error: String(e) });
    }
  });

  // Automatically seed database on startup
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await db.select().from(products);
  if (existingProducts.length === 0) {
    console.log("Seeding database...");
    
    // Create Collections
    const [obsidianCore] = await db.insert(collections).values({
      title: "Obsidian Core",
      slug: "obsidian-core",
      description: "The foundational pieces of the house. Cut from darkness.",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853",
      theme: "default"
    }).returning();

    const [stormLine] = await db.insert(collections).values({
      title: "Storm Line",
      slug: "storm-line",
      description: "Embrace the elements. Outerwear and resilience.",
      image: "https://images.unsplash.com/photo-1549439602-43ebca2327af",
      theme: "ceremonial"
    }).returning();

    // Create Products
    const [p1] = await db.insert(products).values({
      title: "Crown Obsidian Hoodie",
      slug: "crown-obsidian-hoodie",
      description: "A heavy-weight luxury hoodie featuring the signature crowned lion crest. Designed with an oversized drop-shoulder fit.",
      price: "195.00",
      isSignature: true,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
        "https://images.unsplash.com/photo-1578587018452-892bacefd3f2"
      ],
      category: "Hoodies",
      fitNotes: "Oversized fit. Size down for a standard fit.",
      materialAndCare: "100% Heavyweight French Terry Cotton. Dry clean only."
    }).returning();

    const [p2] = await db.insert(products).values({
      title: "Ember Glow Tee",
      slug: "ember-glow-tee",
      description: "A washed charcoal tee with subtle amber accents and a vintage drape.",
      price: "85.00",
      isNew: true,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab"
      ],
      category: "Tees",
      fitNotes: "Boxy fit.",
      materialAndCare: "100% Cotton. Machine wash cold, lay flat to dry."
    }).returning();

    const [p3] = await db.insert(products).values({
      title: "Storm Violet Trench",
      slug: "storm-violet-trench",
      description: "An imposing, weather-resistant trench coat. Black outer shell with electric violet lining.",
      price: "450.00",
      isLimited: true,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5"
      ],
      category: "Outerwear",
      fitNotes: "True to size. Tailored for layering.",
      materialAndCare: "Water-resistant gabardine. Dry clean only."
    }).returning();

    // Create Variants
    await db.insert(productVariants).values([
      { productId: p1.id, size: "S", color: "Obsidian", sku: "COH-S", stock: 10 },
      { productId: p1.id, size: "M", color: "Obsidian", sku: "COH-M", stock: 15 },
      { productId: p1.id, size: "L", color: "Obsidian", sku: "COH-L", stock: 20 },
      { productId: p2.id, size: "S", color: "Charcoal", sku: "EGT-S", stock: 5 },
      { productId: p2.id, size: "M", color: "Charcoal", sku: "EGT-M", stock: 8 },
      { productId: p3.id, size: "M", color: "Black/Violet", sku: "SVT-M", stock: 3 },
      { productId: p3.id, size: "L", color: "Black/Violet", sku: "SVT-L", stock: 2 },
    ]);

    // Link Products to Collections
    await db.insert(collectionProducts).values([
      { collectionId: obsidianCore.id, productId: p1.id },
      { collectionId: obsidianCore.id, productId: p2.id },
      { collectionId: stormLine.id, productId: p3.id },
      { collectionId: stormLine.id, productId: p1.id }, // Also fits outerwear vibes visually maybe
    ]);

    // Create a Lookbook
    await db.insert(lookbooks).values({
      title: "Campaign 01: The Storm Gathers",
      description: "An introduction to the house. Shot on location in the obsidian desert under violet skies.",
      image: "https://images.unsplash.com/photo-1507676184212-d0c30a51fb3e",
      featuredProductIds: [p1.id, p3.id]
    });
    
    console.log("Database seeded.");
  }
}
