import { ConversationHeader } from "@/components/app/conversations/ConversationHeader";
import { ConversationSidebar } from "@/components/app/conversations/ConversationSidebar";
import { ConversationWindow } from "@/components/app/conversations/ConversationWindow";

export default function Conversas() {
  return (
    <div className="flex h-screen bg-slate-50">
      <ConversationSidebar />
      <div className="flex-1 flex flex-col">
        <ConversationHeader />
        <ConversationWindow />
      </div>
    </div>
  );
}