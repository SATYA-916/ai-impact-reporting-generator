import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";

function Router() {
  return (/*#__PURE__*/
    _jsxs(Switch, { children: [/*#__PURE__*/
      _jsx(Route, { path: "/", component: Home }), /*#__PURE__*/
      _jsx(Route, { component: NotFound })] }
    ));

}

function App() {
  return (/*#__PURE__*/
    _jsx(QueryClientProvider, { client: queryClient, children: /*#__PURE__*/
      _jsxs(TooltipProvider, { children: [/*#__PURE__*/
        _jsx(Router, {}), /*#__PURE__*/
        _jsx(Toaster, {})] }
      ) }
    ));

}

export default App;