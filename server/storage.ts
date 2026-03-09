import mongoose from "mongoose";
import { type EcoProduct } from "@shared/schema";

const ecoProductSchema = new mongoose.Schema({
  name: String,
  plastic_saved_per_unit: Number,
  carbon_saved_per_unit: Number,
  source: String,
});

// Use the existing model if already defined
export const EcoProductModel = mongoose.models.ecoProducts || mongoose.model("ecoProducts", ecoProductSchema, "ecoProducts");

export interface IStorage {
  getProducts(): Promise<any[]>;
  getProduct(id: string): Promise<any | null>;
}

export class MongoStorage implements IStorage {
  async getProducts() {
    const products = await EcoProductModel.find({}).exec();
    return products.map(p => ({
      id: p._id.toString(),
      name: p.name,
      plasticSavedPerUnit: p.plastic_saved_per_unit,
      carbonSavedPerUnit: p.carbon_saved_per_unit,
      source: p.source
    }));
  }

  async getProduct(id: string) {
    try {
      const p = await EcoProductModel.findById(id).exec();
      if (!p) return null;
      return {
        id: p._id.toString(),
        name: p.name,
        plasticSavedPerUnit: p.plastic_saved_per_unit,
        carbonSavedPerUnit: p.carbon_saved_per_unit,
        source: p.source
      };
    } catch (err) {
      return null;
    }
  }
}

export const storage = new MongoStorage();
