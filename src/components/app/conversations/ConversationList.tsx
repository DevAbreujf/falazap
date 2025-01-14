import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ConversationList() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-2">
        <button className="w-full p-2 flex items-center gap-3 hover:bg-slate-50 rounded-lg transition-colors">
          <Avatar>
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>UC</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-left">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Umbler Chatbot</span>
              <span className="text-xs text-slate-500">11:57</span>
            </div>
            <p className="text-sm text-slate-500 truncate">
              Sério, responde aí alguma coisa para continuarmos...
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}