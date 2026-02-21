import { Toaster } from "@/Frontend/components/ui/toaster";
import { Toaster as Sonner } from "@/Frontend/components/ui/sonner";
import { TooltipProvider } from "@/Frontend/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/Client/contexts/AuthContext";
import ProtectedRoute from "@/Frontend/components/ProtectedRoute";
import Home from "./Frontend/pages/Home";
import Login from "./Frontend/pages/Login";
import Register from "./Frontend/pages/Register";
import Dashboard from "./Frontend/pages/Dashboard";
import Leads from "./Frontend/pages/Leads";
import Pipeline from "./Frontend/pages/Pipeline";
import FollowUps from "./Frontend/pages/FollowUps";
import NotFound from "./Frontend/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/leads" element={<ProtectedRoute><Leads /></ProtectedRoute>} />
            <Route path="/pipeline" element={<ProtectedRoute><Pipeline /></ProtectedRoute>} />
            <Route path="/follow-ups" element={<ProtectedRoute><FollowUps /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
