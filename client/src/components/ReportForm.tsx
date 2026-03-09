import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProducts, type ImpactReportRequest } from "@/hooks/use-eco";
import { Loader2, Sparkles, Package, Hash } from "lucide-react";
import { motion } from "framer-motion";

interface ReportFormProps {
  onSubmit: (data: ImpactReportRequest) => void;
  isGenerating: boolean;
}

export function ReportForm({ onSubmit, isGenerating }: ReportFormProps) {
  const { data: products, isLoading: isLoadingProducts } = useProducts();

  const form = useForm<ImpactReportRequest>({
    resolver: zodResolver(api.impactReport.generate.input),
    defaultValues: {
      quantity: 1,
    },
  });

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="bg-white dark:bg-card rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-accent" />
      
      <div className="mb-8">
        <h2 className="font-display text-3xl font-bold text-foreground mb-2">Measure Impact</h2>
        <p className="text-muted-foreground text-balance">
          Select a product and quantity to instantly calculate the environmental benefits of your sustainable choice.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
                  <Package className="w-4 h-4 text-primary" />
                  Eco Product
                </FormLabel>
                <Select 
                  disabled={isLoadingProducts || isGenerating} 
                  onValueChange={field.onChange} 
                  value={field.value || ""}
                >
                  <FormControl>
                    <SelectTrigger className="h-14 rounded-2xl bg-secondary/30 border-border/50 focus:ring-primary/20 focus:border-primary transition-all">
                      <SelectValue placeholder={isLoadingProducts ? "Loading products..." : "Select a product"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-xl border-border/50 shadow-lg shadow-black/5">
                    {products?.map((product) => (
                      <SelectItem 
                        key={product.id} 
                        value={product.id.toString()}
                        className="rounded-lg cursor-pointer focus:bg-primary/5 focus:text-primary transition-colors py-3"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{product.name}</span>
                          <span className="text-xs text-muted-foreground">Source: {product.source}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-sm font-semibold flex items-center gap-2 text-foreground/80">
                  <Hash className="w-4 h-4 text-primary" />
                  Quantity (Units)
                </FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min={1}
                    className="h-14 rounded-2xl bg-secondary/30 border-border/50 focus:ring-primary/20 focus:border-primary transition-all text-lg" 
                    placeholder="Enter quantity" 
                    disabled={isGenerating}
                    value={field.value || ""} 
                    onChange={e => field.onChange(e.target.value === "" ? undefined : parseInt(e.target.value, 10))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            disabled={isGenerating || isLoadingProducts}
            className="w-full h-14 rounded-2xl font-display font-semibold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing Impact...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Generate Report
                <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform text-accent" />
              </span>
            )}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
