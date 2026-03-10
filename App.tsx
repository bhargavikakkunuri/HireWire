import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ResumePage from "./pages/ResumePage";
import CareerPage from "./pages/CareerPage";
import QuizPage from "./pages/QuizPage";
import JobsPage from "./pages/JobsPage";
import CoursesPage from "./pages/CoursesPage";
import ChatPage from "./pages/ChatPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
