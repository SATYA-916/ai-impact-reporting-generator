import { motion } from "framer-motion";
import { Leaf, Wind, Recycle, Droplets, Share2, Download } from "lucide-react";
import type { z } from "zod";
import type { api } from "@shared/routes";
import { Button } from "@/components/ui/button";

type ReportResponse = z.infer<typeof api.impactReport.generate.responses[200]>;

interface ReportCardProps {
  report: ReportResponse;
  onReset: () => void;
}

export function ReportCard({ report, onReset }: ReportCardProps) {
  // Animation variants
  const containerVars = {
    hidden: { opacity: 0, y: 40 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.1,
        ease: [0.21, 0.47, 0.32, 0.98],
        duration: 0.6
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 flex flex-col h-full">
        <motion.div variants={itemVars} className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Impact Analysis</h3>
              <p className="text-muted-foreground text-sm">Generated for {report.product_name}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/5 hover:text-primary">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <motion.div variants={itemVars} className="bg-white dark:bg-white/5 border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Recycle className="w-4 h-4" />
              <span className="text-sm font-medium">Plastic Saved</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {report.plastic_saved_kg.toFixed(1)}
              </span>
              <span className="text-muted-foreground font-medium">kg</span>
            </div>
          </motion.div>

          <motion.div variants={itemVars} className="bg-white dark:bg-white/5 border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Wind className="w-4 h-4" />
              <span className="text-sm font-medium">Carbon Avoided</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-4xl md:text-5xl font-bold text-foreground">
                {report.carbon_avoided_kg.toFixed(1)}
              </span>
              <span className="text-muted-foreground font-medium">kg CO₂e</span>
            </div>
          </motion.div>
        </div>

        <motion.div variants={itemVars} className="mb-10">
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-primary/10">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
              </svg>
            </div>
            <p className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 pl-6 text-balance relative z-10 italic">
              {report.impact_statement}
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVars} className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Droplets className="w-3 h-3" />
            Based on lifecycle analysis data
          </div>
          <Button 
            onClick={onReset}
            variant="outline" 
            className="rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-medium"
          >
            Calculate Another
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
