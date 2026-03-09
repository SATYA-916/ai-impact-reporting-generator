import { motion } from "framer-motion";
import { Leaf, Wind, Recycle, Droplets, Share2, Download } from "lucide-react";


import { Button } from "@/components/ui/button";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";








export function ReportCard({ report, onReset }) {
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

  return (/*#__PURE__*/
    _jsxs(motion.div, {
      variants: containerVars,
      initial: "hidden",
      animate: "show",
      className: "glass-card rounded-[2rem] p-8 md:p-10 relative overflow-hidden", children: [/*#__PURE__*/


      _jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" }), /*#__PURE__*/
      _jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" }), /*#__PURE__*/

      _jsxs("div", { className: "relative z-10 flex flex-col h-full", children: [/*#__PURE__*/
        _jsxs(motion.div, { variants: itemVars, className: "flex items-center justify-between mb-8", children: [/*#__PURE__*/
          _jsxs("div", { className: "flex items-center gap-3", children: [/*#__PURE__*/
            _jsx("div", { className: "h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary", children: /*#__PURE__*/
              _jsx(Leaf, { className: "w-6 h-6" }) }
            ), /*#__PURE__*/
            _jsxs("div", { children: [/*#__PURE__*/
              _jsx("h3", { className: "font-display text-sm font-semibold text-primary uppercase tracking-wider", children: "Impact Analysis" }), /*#__PURE__*/
              _jsxs("p", { className: "text-muted-foreground text-sm", children: ["Generated for ", report.product_name] })] }
            )] }
          ), /*#__PURE__*/
          _jsxs("div", { className: "flex gap-2", children: [/*#__PURE__*/
            _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full hover:bg-primary/5 hover:text-primary", children: /*#__PURE__*/
              _jsx(Share2, { className: "w-4 h-4" }) }
            ), /*#__PURE__*/
            _jsx(Button, { variant: "ghost", size: "icon", className: "rounded-full hover:bg-primary/5 hover:text-primary", children: /*#__PURE__*/
              _jsx(Download, { className: "w-4 h-4" }) }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-8", children: [/*#__PURE__*/
          _jsxs(motion.div, { variants: itemVars, className: "bg-white dark:bg-white/5 border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground mb-4", children: [/*#__PURE__*/
              _jsx(Recycle, { className: "w-4 h-4" }), /*#__PURE__*/
              _jsx("span", { className: "text-sm font-medium", children: "Plastic Saved" })] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "flex items-baseline gap-2", children: [/*#__PURE__*/
              _jsx("span", { className: "font-display text-4xl md:text-5xl font-bold text-foreground", children:
                report.plastic_saved_kg.toFixed(1) }
              ), /*#__PURE__*/
              _jsx("span", { className: "text-muted-foreground font-medium", children: "kg" })] }
            )] }
          ), /*#__PURE__*/

          _jsxs(motion.div, { variants: itemVars, className: "bg-white dark:bg-white/5 border border-border/50 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300", children: [/*#__PURE__*/
            _jsxs("div", { className: "flex items-center gap-2 text-muted-foreground mb-4", children: [/*#__PURE__*/
              _jsx(Wind, { className: "w-4 h-4" }), /*#__PURE__*/
              _jsx("span", { className: "text-sm font-medium", children: "Carbon Avoided" })] }
            ), /*#__PURE__*/
            _jsxs("div", { className: "flex items-baseline gap-2", children: [/*#__PURE__*/
              _jsx("span", { className: "font-display text-4xl md:text-5xl font-bold text-foreground", children:
                report.carbon_avoided_kg.toFixed(1) }
              ), /*#__PURE__*/
              _jsx("span", { className: "text-muted-foreground font-medium", children: "kg CO\u2082e" })] }
            )] }
          )] }
        ), /*#__PURE__*/

        _jsx(motion.div, { variants: itemVars, className: "mb-10", children: /*#__PURE__*/
          _jsxs("div", { className: "relative", children: [/*#__PURE__*/
            _jsx("div", { className: "absolute -top-4 -left-4 text-primary/10", children: /*#__PURE__*/
              _jsx("svg", { width: "48", height: "48", viewBox: "0 0 24 24", fill: "currentColor", xmlns: "http://www.w3.org/2000/svg", children: /*#__PURE__*/
                _jsx("path", { d: "M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" }) }
              ) }
            ), /*#__PURE__*/
            _jsx("p", { className: "font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 pl-6 text-balance relative z-10 italic", children:
              report.impact_statement }
            )] }
          ) }
        ), /*#__PURE__*/

        _jsxs(motion.div, { variants: itemVars, className: "mt-auto pt-6 border-t border-border/50 flex items-center justify-between", children: [/*#__PURE__*/
          _jsxs("div", { className: "text-xs text-muted-foreground flex items-center gap-1", children: [/*#__PURE__*/
            _jsx(Droplets, { className: "w-3 h-3" }), "Based on lifecycle analysis data"] }

          ), /*#__PURE__*/
          _jsx(Button, {
            onClick: onReset,
            variant: "outline",
            className: "rounded-xl border-primary/20 text-primary hover:bg-primary/5 font-medium", children:
            "Calculate Another" }

          )] }
        )] }
      )] }
    ));

}