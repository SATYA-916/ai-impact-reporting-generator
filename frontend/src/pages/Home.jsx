import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { ReportForm } from "@/components/ReportForm";
import { ReportCard } from "@/components/ReportCard";
import { useGenerateReport } from "@/hooks/use-eco";


import { Leaf, TreePine } from "lucide-react";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";



export default function Home() {
  const [report, setReport] = useState(null);
  const { mutate: generateReport, isPending } = useGenerateReport();
  const resultsRef = useRef(null);

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

  const handleSubmit = (data) => {
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

  return (/*#__PURE__*/
    _jsxs("div", { className: "min-h-screen bg-grid-pattern relative pb-20", children: [/*#__PURE__*/

      _jsxs("div", { className: "absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10", children: [/*#__PURE__*/
        _jsx("div", { className: "absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px]" }), /*#__PURE__*/
        _jsx("div", { className: "absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px]" })] }
      ), /*#__PURE__*/

      _jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24", children: [/*#__PURE__*/


        _jsxs(motion.div, {
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          className: "text-center max-w-3xl mx-auto mb-16 md:mb-24", children: [/*#__PURE__*/

          _jsx("div", { className: "inline-flex items-center justify-center p-3 mb-6 rounded-full bg-primary/10 text-primary", children: /*#__PURE__*/
            _jsx(TreePine, { className: "w-8 h-8 animate-float" }) }
          ), /*#__PURE__*/
          _jsxs("h1", { className: "font-display text-4xl md:text-6xl font-bold text-foreground tracking-tight mb-6", children: ["AI-Powered ", /*#__PURE__*/
            _jsx("span", { className: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent", children: "Impact Reports" })] }
          ), /*#__PURE__*/
          _jsx("p", { className: "text-lg md:text-xl text-muted-foreground text-balance", children: "Instantly translate your eco-friendly product choices into tangible environmental metrics. See the real difference you're making." }

          )] }
        ), /*#__PURE__*/


        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start relative z-10", children: [/*#__PURE__*/


          _jsx("div", { className: "lg:col-span-5 lg:sticky lg:top-24", children: /*#__PURE__*/
            _jsx(ReportForm, { onSubmit: handleSubmit, isGenerating: isPending }) }
          ), /*#__PURE__*/


          _jsx("div", { className: "lg:col-span-7", ref: resultsRef, children: /*#__PURE__*/
            _jsx(AnimatePresence, { mode: "wait", children:
              isPending ? /*#__PURE__*/
              _jsxs(motion.div, {

                initial: { opacity: 0, scale: 0.95 },
                animate: { opacity: 1, scale: 1 },
                exit: { opacity: 0, scale: 0.95 },
                className: "glass-card rounded-[2rem] p-12 flex flex-col items-center justify-center min-h-[400px] text-center border-dashed", children: [/*#__PURE__*/

                _jsxs("div", { className: "relative mb-6", children: [/*#__PURE__*/
                  _jsx("div", { className: "absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" }), /*#__PURE__*/
                  _jsx(Leaf, { className: "w-12 h-12 text-primary animate-bounce relative z-10" })] }
                ), /*#__PURE__*/
                _jsx("h3", { className: "font-display text-xl font-semibold text-foreground mb-2", children: "Analyzing Lifecycle Data" }), /*#__PURE__*/
                _jsx("p", { className: "text-muted-foreground max-w-sm", children: "Our AI is calculating the plastic reduction and carbon offsets for your selection..." }

                )] }, "loading"
              ) :
              report ? /*#__PURE__*/
              _jsx(motion.div, { children: /*#__PURE__*/
                _jsx(ReportCard, { report: report, onReset: () => setReport(null) }) }, "result"
              ) : /*#__PURE__*/

              _jsxs(motion.div, {

                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "hidden lg:flex flex-col items-center justify-center min-h-[500px] rounded-[2rem] border-2 border-dashed border-border/60 bg-white/40 dark:bg-black/20 p-12 text-center", children: [/*#__PURE__*/

                _jsx("div", { className: "w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-6 text-muted-foreground", children: /*#__PURE__*/
                  _jsx(Leaf, { className: "w-8 h-8 opacity-50" }) }
                ), /*#__PURE__*/
                _jsx("h3", { className: "font-display text-xl font-medium text-foreground mb-2", children: "Awaiting Selection" }), /*#__PURE__*/
                _jsx("p", { className: "text-muted-foreground max-w-sm text-balance", children: "Choose a product and quantity on the left to generate a comprehensive environmental impact report." }

                )] }, "empty"
              ) }

            ) }
          )] }

        )] }
      )] }
    ));

}