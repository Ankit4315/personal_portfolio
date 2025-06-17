import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import { LayoutDashboard, Home } from "lucide-react";
import Footer from "../pages/portfolio/Footer";

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboard = location.pathname.startsWith("/dashboard");
  
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Navigation header - fixed at top when scrolling */}
      <header className="fixed top-0 left-0 right-0 w-full border-b border-border p-4 z-50 bg-background/95 backdrop-blur-sm shadow-md dark:shadow-black/30 transition-colors duration-300">
        <div className="max-w-[1050px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="text-xl font-bold tracking-wider text-foreground hover:text-primary transition-colors">Portfolio</Link>
          </div>
          
          <div className="flex items-center gap-4">
            <nav>
              <ul className="flex gap-6 items-center">
                <li>
                  <Link to="/" className={`${!isDashboard ? "text-primary font-medium" : "text-muted-foreground"} hover:text-primary/80 flex items-center gap-2 transition-colors`}>
                    <Home size={18} />
                    <span className="hidden md:inline">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="text-muted-foreground hover:text-primary/80 flex items-center gap-2 transition-colors"
                  >
                    <LayoutDashboard size={18} />
                    <span className="hidden md:inline">Dashboard</span>
                  </Link>
                </li>
              </ul>
            </nav>
            <ModeToggle />
          </div>
        </div>
      </header>
      
      {/* Main content - add padding top to accommodate fixed header */}
      <main className="px-5 py-8 sm:mx-auto w-full max-w-[1050px] mt-20">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};

export default Layout; 