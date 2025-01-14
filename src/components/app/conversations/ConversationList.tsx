import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ConversationListProps {
  type: 'clients' | 'team';
}

export function ConversationList({ type }: ConversationListProps) {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-2">
        {type === 'clients' ? (
          <button className="w-full p-3 flex items-start gap-3 hover:bg-slate-50 rounded-lg transition-colors">
            <Avatar className="mt-1">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>UC</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="text-sm font-medium">Umbler Chatbot</h3>
                  <p className="text-sm text-slate-600">oi</p>
                  <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700">
                    <Tag className="h-3 w-3" />
                    Adicionar tag
                  </button>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-slate-500">12:32</span>
                  <Badge variant="secondary" className="text-xs">
                    Geral
                  </Badge>
                </div>
              </div>
            </div>
          </button>
        ) : (
          <button className="w-full p-2 flex items-center gap-3 hover:bg-slate-50 rounded-lg transition-colors">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>AT</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Atendente 1</span>
                <span className="text-xs text-slate-500">Online</span>
              </div>
              <p className="text-sm text-slate-500 truncate">
                Departamento: Suporte
              </p>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}