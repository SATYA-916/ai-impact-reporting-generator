import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@shared/routes";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/use-eco";
import { Loader2, Sparkles, Package, Hash } from "lucide-react";
import { motion } from "framer-motion";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";






export function ReportForm({ onSubmit, isGenerating }) {
  const { data: products, isLoading: isLoadingProducts } = useProducts();

  const form = useForm({
    resolver: zodResolver(api.impactReport.generate.input),
    defaultValues: {
      quantity: 1
    }
  });

  return (/*#__PURE__*/
    _jsxs(motion.div, {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.5, ease: "easeOut" },
      className: "bg-white dark:bg-card rounded-[2rem] p-8 md:p-10 shadow-xl shadow-primary/5 border border-border/50 relative overflow-hidden", children: [/*#__PURE__*/

      _jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary to-accent" }), /*#__PURE__*/

      _jsxs("div", { className: "mb-8", children: [/*#__PURE__*/
        _jsx("h2", { className: "font-display text-3xl font-bold text-foreground mb-2", children: "Measure Impact" }), /*#__PURE__*/
        _jsx("p", { className: "text-muted-foreground text-balance", children: "Select a product and quantity to instantly calculate the environmental benefits of your sustainable choice." }

        )] }
      ), /*#__PURE__*/

      _jsx(Form, { ...form, children: /*#__PURE__*/
        _jsxs("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6", children: [/*#__PURE__*/
          _jsx(FormField, {
            control: form.control,
            name: "productId",
            render: ({ field }) => /*#__PURE__*/
            _jsxs(FormItem, { className: "space-y-3", children: [/*#__PURE__*/
              _jsxs(FormLabel, { className: "text-sm font-semibold flex items-center gap-2 text-foreground/80", children: [/*#__PURE__*/
                _jsx(Package, { className: "w-4 h-4 text-primary" }), "Eco Product"] }

              ), /*#__PURE__*/
              _jsxs(Select, {
                disabled: isLoadingProducts || isGenerating,
                onValueChange: field.onChange,
                value: field.value || "", children: [/*#__PURE__*/

                _jsx(FormControl, { children: /*#__PURE__*/
                  _jsx(SelectTrigger, { className: "h-14 rounded-2xl bg-secondary/30 border-border/50 focus:ring-primary/20 focus:border-primary transition-all", children: /*#__PURE__*/
                    _jsx(SelectValue, { placeholder: isLoadingProducts ? "Loading products..." : "Select a product" }) }
                  ) }
                ), /*#__PURE__*/
                _jsx(SelectContent, { className: "rounded-xl border-border/50 shadow-lg shadow-black/5", children:
                  products?.map((product) => /*#__PURE__*/
                  _jsx(SelectItem, {

                    value: product.id.toString(),
                    className: "rounded-lg cursor-pointer focus:bg-primary/5 focus:text-primary transition-colors py-3", children: /*#__PURE__*/

                    _jsxs("div", { className: "flex flex-col", children: [/*#__PURE__*/
                      _jsx("span", { className: "font-medium", children: product.name }), /*#__PURE__*/
                      _jsxs("span", { className: "text-xs text-muted-foreground", children: ["Source: ", product.source] })] }
                    ) }, product.id
                  )
                  ) }
                )] }
              ), /*#__PURE__*/
              _jsx(FormMessage, {})] }
            ) }

          ), /*#__PURE__*/

          _jsx(FormField, {
            control: form.control,
            name: "quantity",
            render: ({ field }) => /*#__PURE__*/
            _jsxs(FormItem, { className: "space-y-3", children: [/*#__PURE__*/
              _jsxs(FormLabel, { className: "text-sm font-semibold flex items-center gap-2 text-foreground/80", children: [/*#__PURE__*/
                _jsx(Hash, { className: "w-4 h-4 text-primary" }), "Quantity (Units)"] }

              ), /*#__PURE__*/
              _jsx(FormControl, { children: /*#__PURE__*/
                _jsx(Input, {
                  type: "number",
                  min: 1,
                  className: "h-14 rounded-2xl bg-secondary/30 border-border/50 focus:ring-primary/20 focus:border-primary transition-all text-lg",
                  placeholder: "Enter quantity",
                  disabled: isGenerating,
                  value: field.value || "",
                  onChange: (e) => field.onChange(e.target.value === "" ? undefined : parseInt(e.target.value, 10)) }
                ) }
              ), /*#__PURE__*/
              _jsx(FormMessage, {})] }
            ) }

          ), /*#__PURE__*/

          _jsx(Button, {
            type: "submit",
            disabled: isGenerating || isLoadingProducts,
            className: "w-full h-14 rounded-2xl font-display font-semibold text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group", children:

            isGenerating ? /*#__PURE__*/
            _jsxs("span", { className: "flex items-center gap-2", children: [/*#__PURE__*/
              _jsx(Loader2, { className: "w-5 h-5 animate-spin" }), "Analyzing Impact..."] }

            ) : /*#__PURE__*/

            _jsxs("span", { className: "flex items-center gap-2", children: ["Generate Report", /*#__PURE__*/

              _jsx(Sparkles, { className: "w-5 h-5 group-hover:scale-110 transition-transform text-accent" })] }
            ) }

          )] }
        ) }
      )] }
    ));

}