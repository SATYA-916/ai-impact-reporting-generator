import { z } from 'zod';
import { ecoProducts, impactReportRequestSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      responses: {
        200: z.array(z.custom<typeof ecoProducts.$inferSelect>()),
      },
    },
  },
  impactReport: {
    generate: {
      method: 'POST' as const,
      path: '/api/impact-report' as const,
      input: impactReportRequestSchema,
      responses: {
        200: z.object({
          product_name: z.string(),
          quantity: z.number(),
          plastic_saved_kg: z.number(),
          carbon_avoided_kg: z.number(),
          impact_statement: z.string()
        }),
        400: errorSchemas.validation,
        404: errorSchemas.notFound,
        500: errorSchemas.internal,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ImpactReportRequest = z.infer<typeof impactReportRequestSchema>;
export type ImpactReportResponse = z.infer<typeof api.impactReport.generate.responses[200]>;
