import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, MessageSquare, Users } from "lucide-react";
import { ConversationList } from "./ConversationList";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ConversationSidebar() {
  const [chatType, setChatType] = useState<'clients' | 'team'>('clients');

  return (
    <aside className="w-80 border-r bg-white flex flex-col">
      <div className="p-4 border-b">
        <TooltipProvider>
          <div className="flex items-center gap-4 mb-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setChatType('clients')}
                  className={`p-2 rounded-lg hover:bg-slate-100 ${chatType === 'clients' ? 'text-primary' : 'text-slate-600'}`}
                >
                  <MessageSquare className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Conversas com os clientes</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={() => setChatType('team')}
                  className={`p-2 rounded-lg hover:bg-slate-100 ${chatType === 'team' ? 'text-primary' : 'text-slate-600'}`}
                >
                  <Users className="h-5 w-5" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Conversas com a equipe</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              className="pl-9" 
              placeholder={chatType === 'clients' ? "Buscar por nome ou telefone" : "Buscar atendente"}
            />
          </div>
          {chatType === 'clients' && (
            <button className="p-2 hover:bg-slate-100 rounded-lg">
              <Filter className="h-4 w-4 text-slate-600" />
            </button>
          )}
        </div>
      </div>

      {chatType === 'clients' ? (
        <div className="p-4">
          <Tabs defaultValue="entrada" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="entrada" className="flex-1">
                Entrada <span className="ml-1 text-xs">1</span>
              </TabsTrigger>
              <TabsTrigger value="esperando" className="flex-1">
                Esperando
              </TabsTrigger>
              <TabsTrigger value="finalizados" className="flex-1">
                Finalizados
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      ) : null}

      <ConversationList type={chatType} />
    </aside>
  );
}