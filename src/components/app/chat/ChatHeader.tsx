import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Clock, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Department } from "@/types/chat";

interface ChatHeaderProps {
  userName: string;
  currentDepartment?: Department;
  onShowIntro: () => void;
}

export function ChatHeader({
  userName,
  currentDepartment,
  onShowIntro,
}: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="h-16 flex items-center justify-between px-6 py-2 bg-gradient-to-r from-card to-card/95 border-b border-border backdrop-blur-sm">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-primary/10 transition-all duration-200"
        >
          <ArrowLeft className="h-5 w-5 text-primary" />
        </Button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="font-medium text-primary">{userName}</span>
              <Circle className="h-2 w-2 fill-green-500 text-green-500 animate-pulse" />
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Online agora</span>
            </div>
          </div>
          {currentDepartment && (
            <Badge variant="outline" className="bg-primary/5 hover:bg-primary/10 transition-colors">
              {currentDepartment.name}
            </Badge>
          )}
        </div>

        <Button
          variant="outline"
          onClick={onShowIntro}
          className="hover:bg-primary/10 transition-all duration-200"
        >
          <Home className="h-4 w-4 mr-2" />
          Voltar para Introdução
        </Button>
      </div>
    </header>
  );
}