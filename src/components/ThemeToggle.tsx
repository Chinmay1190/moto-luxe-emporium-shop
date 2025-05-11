
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";
import { useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [isRotating, setIsRotating] = useState(false);
  
  const toggleTheme = () => {
    setIsRotating(true);
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light");
      setTimeout(() => setIsRotating(false), 300);
    }, 150);
  };

  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-full"
    >
      <div className={`transition-transform duration-300 ${isRotating ? 'rotate-180' : ''}`}>
        {theme === "light" ? (
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        ) : (
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
