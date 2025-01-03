import { Button } from "@/components/ui/button";
import { ChevronDown, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SidebarHeader() {
  return (
    <div className="p-3">
      <div className="mb-3 p-3 glass-card hover:bg-white/5 transition-all duration-300">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between hover:bg-primary/20">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+55 11 99999-9999</span>
                <span className="text-xs text-primary/80">(conectado)</span>
              </div>
              <ChevronDown className="h-4 w-4 text-primary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              +55 11 88888-8888
            </DropdownMenuItem>
            <DropdownMenuItem>
              +55 11 77777-7777
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}