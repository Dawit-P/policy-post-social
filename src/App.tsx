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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTrending from "./pages/admin/AdminTrending";
import AdminPosts from "./pages/admin/AdminPosts";
import AdminUsers from "./pages/admin/AdminUsers";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute";

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
                  <Navigate to="/home" replace />
                )
              } 
            />
            <Route 
              path="/register" 
              element={
                !isAuthenticated ? (
                  <Register onRegister={handleLogin} />
                ) : (
                  <Navigate to="/home" replace />
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
                isAuthenticated ? (
                  <ProtectedAdminRoute>
                    <AdminDashboard onLogout={handleLogout} />
                  </ProtectedAdminRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/trending" 
              element={
                isAuthenticated ? (
                  <ProtectedAdminRoute>
                    <AdminTrending onLogout={handleLogout} />
                  </ProtectedAdminRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/posts" 
              element={
                isAuthenticated ? (
                  <ProtectedAdminRoute>
                    <AdminPosts onLogout={handleLogout} />
                  </ProtectedAdminRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            <Route 
              path="/admin/users" 
              element={
                isAuthenticated ? (
                  <ProtectedAdminRoute>
                    <AdminUsers onLogout={handleLogout} />
                  </ProtectedAdminRoute>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            <Route 
              path="/" 
              element={
                <Navigate to={isAuthenticated ? "/home" : "/login"} replace />
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
