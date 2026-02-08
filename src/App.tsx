import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TransitionShell } from "@/components/TransitionShell";
import Index from "./pages/Index";
import Estudio from "./pages/Estudio";
import Contacto from "./pages/Contacto";
import Momentos from "./pages/Momentos";
import Proyecto from "./pages/Proyecto";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <TransitionShell>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/estudio" element={<Estudio />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/momentos" element={<Momentos />} />
            {/* Nota: /proyectos NO es una página, solo /proyectos/:id */}
            <Route path="/proyectos/:id" element={<Proyecto />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TransitionShell>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
