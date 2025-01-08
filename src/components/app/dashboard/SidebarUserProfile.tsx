import { Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

export function SidebarUserProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-white shadow-sm">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-slate-900 truncate">
            João Silva
          </h3>
          <p className="text-xs text-slate-500">
            Administrador
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100">
              <Settings className="h-4 w-4 text-slate-600" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Logout clicked")} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}