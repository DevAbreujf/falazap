import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
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
    <header className="h-16 flex items-center justify-between px-4 py-2 bg-card border-b border-border">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm">
          <span className="font-medium">Meu nome: </span>
          <span className="text-primary">{userName}</span>
          {currentDepartment && (
            <>
              <span className="mx-2">|</span>
              <span className="font-medium">Meu setor: </span>
              <span className="text-primary">{currentDepartment.name}</span>
            </>
          )}
        </div>

        <Button
          variant="outline"
          onClick={onShowIntro}
          className="hover:bg-primary/10"
        >
          <Home className="h-4 w-4 mr-2" />
          Voltar para Introdução
        </Button>
      </div>
    </header>
  );
}