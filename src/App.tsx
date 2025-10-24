import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import DynamicPage from "./pages/DynamicPage";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const ToasterWrapper = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  if (isAdminRoute) return null;
  
  return (
    <>
      <Toaster />
      <Sonner />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <ToasterWrapper />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Sanity Studio routes - catch-all for /admin and all sub-routes */}
          <Route path="/admin/*" element={<Admin />} />
          {/* Dynamic Sanity page routes */}
          <Route path="/:slug" element={<DynamicPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
