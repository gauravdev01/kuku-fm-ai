
import React from 'react';
import { Button } from "@/components/ui/button";
import { Headphones } from "lucide-react";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-kuku-purple to-kuku-blue py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Headphones className="h-8 w-8 text-white" />
          <h1 className="text-2xl font-bold text-white">Kuku FM AI Audio Boost</h1>
        </div>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link to="/" className="text-white hover:text-kuku-purple-light">Home</Link>
            </li>
            <li>
              <Link to="/voice-clone" className="text-white hover:text-kuku-purple-light">Voice Clone</Link>
            </li>
            <li>
              <Link to="/stories" className="text-white hover:text-kuku-purple-light">Stories</Link>
            </li>
            <li>
              <Button variant="secondary" className="bg-white text-kuku-purple hover:bg-kuku-purple-light hover:text-white">
                Sign In
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
