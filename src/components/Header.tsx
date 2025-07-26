import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light', !isDark);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold neon-text bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Khrafet
        </h1>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="transition-glow hover:glow-primary"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
    </header>
  );
};

export default Header;