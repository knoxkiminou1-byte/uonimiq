import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { db } from "./db";
import { products, collections, lookbookItems } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    const items = await storage.getProducts();
    res.json(items);
  });

  app.get(api.products.get.path, async (req, res) => {
    const item = await storage.getProduct(Number(req.params.id));
    if (!item) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(item);
  });

  app.get(api.collections.list.path, async (req, res) => {
    const items = await storage.getCollections();
    res.json(items);
  });

  app.get(api.collections.get.path, async (req, res) => {
    const item = await storage.getCollectionByHandle(req.params.handle);
    if (!item) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.json(item);
  });

  app.get(api.lookbook.list.path, async (req, res) => {
    const items = await storage.getLookbookItems();
    res.json(items);
  });

  // Seed database if empty
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    await db.insert(collections).values([
      {
        handle: "hoodies",
        title: "Hoodies",
        description: "Heavyweight obsidian comfort.",
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"
      },
      {
        handle: "outerwear",
        title: "Outerwear",
        description: "Cut from darkness.",
        imageUrl: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop"
      },
      {
        handle: "essentials",
        title: "Essentials",
        description: "The core of the house.",
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
      }
    ]);

    await db.insert(products).values([
      {
        title: "Obsidian Crown Hoodie",
        description: "A heavyweight hoodie featuring the subtle crowned lion embroidery. Cut for a relaxed but structured fit.",
        price: 18500,
        imageUrl: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
        category: "Hoodies",
        isNewDrop: true,
        isFeatured: true,
        inStock: true
      },
      {
        title: "Storm Violet Trench",
        description: "A commanding outer layer with deep violet ambient tones inside the lapels. Premium water-resistant finish.",
        price: 45000,
        imageUrl: "https://images.unsplash.com/photo-1520975954732-57dd22299614?q=80&w=800&auto=format&fit=crop",
        category: "Outerwear",
        isNewDrop: true,
        isFeatured: false,
        inStock: true
      },
      {
        title: "Ember Glow Tee",
        description: "Minimalist black tee with a subtle amber highlight on the seam.",
        price: 6500,
        imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
        category: "Tees",
        isNewDrop: false,
        isFeatured: false,
        inStock: true
      }
    ]);

    await db.insert(lookbookItems).values([
      {
        title: "Campaign 01",
        imageUrl: "https://images.unsplash.com/photo-1509631179647-0c67297ea28f?q=80&w=1200&auto=format&fit=crop"
      },
      {
        title: "Campaign 02",
        imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop"
      }
    ]);
  }

  return httpServer;
}
