import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Department } from "@/types/chat";

interface ChatHeaderProps {
  userName: string;
  currentDepartment?: Department;
  departments: Department[];
  onDepartmentChange: (departmentId: string) => void;
  onShowIntro: () => void;
}

export function ChatHeader({
  userName,
  currentDepartment,
  departments,
  onDepartmentChange,
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
        <span className="text-sm font-medium">
          {userName}
          {currentDepartment && (
            <span className="text-muted-foreground ml-2">
              | {currentDepartment.name}
            </span>
          )}
        </span>

        <Select
          value={currentDepartment?.id}
          onValueChange={onDepartmentChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecionar setor" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept.id} value={dept.id}>
                {dept.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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