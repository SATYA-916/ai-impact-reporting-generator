import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ReportForm } from "@/components/ReportForm";
import { ReportCard } from "@/components/ReportCard";
import { useGenerateReport, type ImpactReportRequest } from "@/hooks/use-eco";
import type { z } from "zod";
import type { api } from "@shared/routes";
import { Leaf, TreePine } from "lucide-react";

type ReportResponse = z.infer<typeof api.impactReport.generate.responses[200]>;

export default function Home() {
  const [report, setReport] = useState<ReportResponse | null>(null);
  const { mutate: generateReport, isPending } = useGenerateReport();
  const resultsRef = useRef<HTMLDivElement>(null);

  const triggerConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2E7D32', '#10B981', '#A3E635']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2E7D32', '#10B981', '#A3E635']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  const handleSubmit = (data: ImpactReportRequest) => {
    setReport(null); // Clear previous
    generateReport(data, {
      onSuccess: (result) => {
        setReport(result);
        triggerConfetti();
        // Scroll to results on mobile
        setTimeout(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  };

  return (
    <div className="min-h-screen bg-grid-pattern relative pb-20">
      {/* Decorative background blurs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary/10 text-primary">
            <TreePine className="w-8 h-8 animate-float" />
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6">
            AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Impact Reports</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground text-balance">
            Instantly translate your eco-friendly product choices into tangible environmental metrics. See the real difference you're making.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <ReportForm onSubmit={handleSubmit} isGenerating={isPending} />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7" ref={resultsRef}>
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glass-card rounded-[2rem] p-12 flex flex-col items-center justify-center min-h-[400px] text-center border-dashed"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                    <Leaf className="w-12 h-12 text-primary animate-bounce relative z-10" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Analyzing Lifecycle Data</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Our AI is calculating the plastic reduction and carbon offsets for your selection...
                  </p>
                </motion.div>
              ) : report ? (
                <motion.div key="result">
                  <ReportCard report={report} onReset={() => setReport(null)} />
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hidden lg:flex flex-col items-center justify-center min-h-[500px] rounded-[2rem] border-2 border-dashed border-border/60 bg-white/40 dark:bg-black/20 p-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 text-muted-foreground">
                    <Leaf className="w-8 h-8 opacity-50" />
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground mb-2">Awaiting Selection</h3>
                  <p className="text-muted-foreground max-w-sm text-balance">
                    Choose a product and quantity on the left to generate a comprehensive environmental impact report.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
