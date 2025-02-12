
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center justify-between p-4 border-t border-slate-200/50 dark:border-slate-700/50 bg-gradient-to-r from-transparent to-slate-50/50 dark:from-transparent dark:to-slate-800/5 transition-colors duration-300">
      <div className="flex items-center gap-3 relative">
        <div className="relative w-4 h-4">
          <Sun className="absolute h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-amber-500 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 text-slate-100 dark:rotate-0 dark:scale-100" />
        </div>
        <span className="text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors duration-300">
          Tema escuro
        </span>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="data-[state=checked]:bg-primary/20 dark:data-[state=checked]:bg-primary/40"
      />
    </div>
  );
}
