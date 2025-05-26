
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Voting from "./pages/Voting";
import NotFound from "./pages/NotFound";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import TrendingManagement from "./pages/admin/TrendingManagement";
import PostModeration from "./pages/admin/PostModeration";
import UserManagement from "./pages/admin/UserManagement";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleLogin = (token: string, user: any) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const getDefaultRoute = () => {
    if (!isAuthenticated) return "/login";
    
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const isAdmin = user.role === 'admin' || user.email === 'admin@example.com';
    
    return isAdmin ? "/admin" : "/home";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/login" 
              element={
                !isAuthenticated ? (
                  <Login onLogin={handleLogin} />
                ) : (
                  <Navigate to={getDefaultRoute()} replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? (
                  <Register onRegister={handleLogin} />
                ) : (
                  <Navigate to={getDefaultRoute()} replace />
                )
              } 
            />
            <Route 
              path="/home" 
              element={
                isAuthenticated ? (
                  <Home onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/voting" 
              element={
                isAuthenticated ? (
                  <Voting onLogout={handleLogout} />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin" 
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard onLogout={handleLogout} />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/trending" 
              element={
                <ProtectedAdminRoute>
                  <TrendingManagement onLogout={handleLogout} />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/posts" 
              element={
                <ProtectedAdminRoute>
                  <PostModeration onLogout={handleLogout} />
                </ProtectedAdminRoute>
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                <ProtectedAdminRoute>
                  <UserManagement onLogout={handleLogout} />
                </ProtectedAdminRoute>
              } 
            />
            
            <Route 
              path="/" 
              element={<Navigate to={getDefaultRoute()} replace />} 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
