import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MoreVertical, User, Calendar, Archive, Forward, Check, X } from "lucide-react";

export function ConversationHeader() {
  return (
    <header className="h-16 border-b bg-white px-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button className="lg:hidden">
          <ArrowLeft className="h-5 w-5 text-slate-600" />
        </button>
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback>UC</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-sm font-medium">Umbler Chatbot</h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="h-5 px-2">Geral</Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <User className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Calendar className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Archive className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Forward className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <Check className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <X className="h-5 w-5 text-slate-600" />
        </button>
        <button className="p-2 hover:bg-slate-100 rounded-lg">
          <MoreVertical className="h-5 w-5 text-slate-600" />
        </button>
      </div>
    </header>
  );
}