import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="h-9 w-9 flex items-center justify-center rounded-full border border-border bg-surface"
    >
      {darkMode ? (
        <Sun size={18} className="text-warning" />
      ) : (
        <Moon size={18} className="text-text" />
      )}
    </button>
  );
};

export default ThemeToggle;