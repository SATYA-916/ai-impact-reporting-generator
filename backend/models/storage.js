import mongoose from "mongoose";


const ecoProductSchema = new mongoose.Schema({
  name: String,
  plastic_saved_per_unit: Number,
  carbon_saved_per_unit: Number,
  source: String
});

// Use the existing model if already defined
export const EcoProductModel = mongoose.models.ecoProducts || mongoose.model("ecoProducts", ecoProductSchema, "ecoProducts");






export class MongoStorage {
  async getProducts() {
    const products = await EcoProductModel.find({}).exec();
    return products.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      plasticSavedPerUnit: p.plastic_saved_per_unit,
      carbonSavedPerUnit: p.carbon_saved_per_unit,
      source: p.source
    }));
  }

  async getProduct(id) {
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