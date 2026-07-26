import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { StoreProvider } from "@/lib/StoreProvider";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { WhatsAppModal } from "@/components/WhatsAppModal";
import { Lightbox } from "@/components/Lightbox";
import { QuickViewModal } from "@/components/QuickViewModal";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <StoreProvider>
          <Navbar />
          <Router />
          <CartDrawer />
          <WhatsAppModal />
          <Lightbox />
          <QuickViewModal />
          <Toaster />
        </StoreProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
