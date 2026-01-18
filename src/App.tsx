import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NoticeAnalysis from "./pages/NoticeAnalysis";
import ReplyGenerator from "./pages/ReplyGenerator";
import Templates from "./pages/Templates";
import KnowledgeBase from "./pages/KnowledgeBase";
import Calculators from "./pages/Calculators";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<NoticeAnalysis />} />
          <Route path="/reply" element={<ReplyGenerator />} />
          <Route path="/reply/:noticeId" element={<ReplyGenerator />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/knowledge" element={<KnowledgeBase />} />
          <Route path="/calculators" element={<Calculators />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
