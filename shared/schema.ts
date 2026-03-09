import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ecoProducts = pgTable("eco_products", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  plasticSavedPerUnit: integer("plastic_saved_per_unit").notNull(), // grams
  carbonSavedPerUnit: real("carbon_saved_per_unit").notNull(), // kg
  source: text("source").notNull(), // local/imported
});

export const insertEcoProductSchema = createInsertSchema(ecoProducts).omit({ id: true });

export type EcoProduct = typeof ecoProducts.$inferSelect;
export type InsertEcoProduct = z.infer<typeof insertEcoProductSchema>;

// Request types
export const impactReportRequestSchema = z.object({
  productId: z.string({ required_error: "Product is required" }),
  quantity: z.number({ required_error: "Quantity is required" }).min(1, "Quantity must be at least 1"),
});

export type ImpactReportRequest = z.infer<typeof impactReportRequestSchema>;

export type ImpactReportResponse = {
  product_name: string;
  quantity: number;
  plastic_saved_kg: number;
  carbon_avoided_kg: number;
  impact_statement: string;
};
