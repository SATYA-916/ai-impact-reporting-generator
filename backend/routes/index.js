

import { storage, EcoProductModel } from "../models/storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";
import { connectDB } from "../utils/db.js";
import * as dotenv from "dotenv";

dotenv.config();

// Using Gemini API key from environment
if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable is required");
}

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

export async function registerRoutes(
  httpServer,
  app) {
  // Connect to MongoDB
  await connectDB();

  // Seed data if empty
  try {
    const count = await EcoProductModel.countDocuments();
    if (count === 0) {
      await EcoProductModel.insertMany([
        {
          name: "Compostable Food Packaging Box",
          plastic_saved_per_unit: 15,
          carbon_saved_per_unit: 0.03,
          source: "local"
        },
        {
          name: "Bamboo Toothbrush",
          plastic_saved_per_unit: 10,
          carbon_saved_per_unit: 0.01,
          source: "imported"
        },
        {
          name: "Reusable Shopping Bag",
          plastic_saved_per_unit: 50,
          carbon_saved_per_unit: 0.1,
          source: "local"
        }]
      );
      console.log("Seeded database with initial products");
    }
  } catch (err) {
    console.error("Error seeding database:", err);
  }

  app.get(api.products.list.path, async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post(api.impactReport.generate.path, async (req, res) => {
    try {
      const input = api.impactReport.generate.input.parse(req.body);
      const product = await storage.getProduct(input.productId);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const quantity = input.quantity;
      const plastic_saved_g = product.plasticSavedPerUnit * quantity;
      const plastic_saved_kg = plastic_saved_g / 1000;
      const carbon_avoided_kg = product.carbonSavedPerUnit * quantity;

      const prompt = `Generate a short sustainability impact statement using this data:
Product: ${product.name}
Quantity: ${quantity}
Plastic saved: ${plastic_saved_kg} kg
Carbon avoided: ${carbon_avoided_kg} kg CO2

Return only a short paragraph.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
      });

      const impact_statement = response.text || "Impact statement generation failed.";

      res.status(200).json({
        product_name: product.name,
        quantity,
        plastic_saved_kg,
        carbon_avoided_kg,
        impact_statement
      });
    } catch (err) {
      console.error("Error generating report:", err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.')
        });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  return httpServer;
}