
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-kuku-purple-light to-kuku-blue text-white p-6">
      <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
      <p className="text-xl md:text-2xl mb-8 text-center">Oops! We couldn't find the page you're looking for</p>
      
      <div className="w-full max-w-md h-24 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-lg mb-8">
        <p className="text-white/80 font-mono text-sm truncate px-4">
          {location.pathname}
        </p>
      </div>
      
      <Button 
        onClick={() => navigate('/')} 
        size="lg"
        className="bg-white text-kuku-purple hover:bg-kuku-purple-light hover:text-white"
      >
        <Home className="mr-2 h-5 w-5" />
        Return to Home
      </Button>
    </div>
  );
};

export default NotFound;
