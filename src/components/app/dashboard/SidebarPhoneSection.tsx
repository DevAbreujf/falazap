import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface PhoneNumber {
  number: string;
  isConnected: boolean;
}

interface SidebarPhoneSectionProps {
  connectedPhones: PhoneNumber[];
}

export function SidebarPhoneSection({ connectedPhones }: SidebarPhoneSectionProps) {
  const navigate = useNavigate();
  const hasConnectedPhones = connectedPhones.length > 0;

  if (!hasConnectedPhones) {
    return (
      <div className="mt-2 p-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-300">
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-slate-50 p-1.5 h-auto"
          onClick={() => navigate('/connection')}
        >
          <Phone className="h-4 w-4 text-slate-600 mr-2" />
          <span className="text-sm">Conectar</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-2 p-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-lg transition-all duration-300">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="w-full justify-between hover:bg-slate-50 p-1.5 h-auto"
          >
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-slate-600" />
              <span className="text-sm">{connectedPhones[0].number}</span>
              <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-xs">
                conectado
              </Badge>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          {connectedPhones.slice(1).map((phone) => (
            <DropdownMenuItem key={phone.number} className="hover:bg-slate-50">
              {phone.number}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}