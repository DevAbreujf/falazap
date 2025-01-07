import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatContact } from "@/types/chat";

export default function Dashboard() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-[#1F1F2A]">
        <ChatSidebar onSelectContact={setSelectedContact} />
        <main className="flex-1 flex flex-col">
          {selectedContact ? (
            <ChatWindow contact={selectedContact} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecione uma conversa para começar
            </div>
          )}
        </main>
      </div>
    </SidebarProvider>
  );
}