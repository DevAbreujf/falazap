import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter } from "lucide-react";
import { ConversationList } from "./ConversationList";

export function ConversationSidebar() {
  return (
    <aside className="w-80 border-r bg-white flex flex-col">
      <div className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              className="pl-9" 
              placeholder="Buscar por nome ou telefone"
            />
          </div>
          <button className="p-2 hover:bg-slate-100 rounded-lg">
            <Filter className="h-4 w-4 text-slate-600" />
          </button>
        </div>
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
      <ConversationList />
    </aside>
  );
}