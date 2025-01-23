import { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { ChatContact, ChatMessage, Department } from "@/types/chat";

export default function Chatboard() {
  const [selectedContact, setSelectedContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentDepartment] = useState<Department>({
    id: "1",
    name: "Suporte",
    description: "Departamento de Suporte"
  });
  const [currentUser] = useState({
    id: "1",
    name: "João Silva",
    avatar: "https://github.com/shadcn.png"
  });
  const [departments] = useState([
    { id: "1", name: "Suporte" },
    { id: "2", name: "Vendas" },
    { id: "3", name: "Financeiro" }
  ]);

  const handleSendMessage = (content: string) => {
    const newMessage: ChatMessage = {
      id: String(messages.length + 1),
      content,
      senderId: currentUser.id,
      timestamp: new Date(),
      status: "sent"
    };
    setMessages([...messages, newMessage]);
  };

  const handleMessageAction = (
    action: "reply" | "copy" | "forward" | "delete",
    messageId: string,
    deleteType?: "all" | "me"
  ) => {
    switch (action) {
      case "reply":
        console.log("Reply to message:", messageId);
        break;
      case "copy":
        console.log("Copy message:", messageId);
        break;
      case "forward":
        console.log("Forward message:", messageId);
        break;
      case "delete":
        console.log("Delete message:", messageId, deleteType);
        break;
    }
  };

  const handleEndSupport = () => {
    console.log("Ending support");
  };

  const handleTransferChat = (attendantId: string) => {
    console.log("Transferring chat to:", attendantId);
  };

  const handleChangeDepartment = (departmentId: string) => {
    console.log("Changing department to:", departmentId);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1">
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          <div className="h-[calc(100vh-65px)]">
            {selectedContact ? (
              <ChatWindow
                contact={selectedContact}
                messages={messages}
                onSendMessage={handleSendMessage}
                onEndSupport={handleEndSupport}
                onTransferChat={handleTransferChat}
                onChangeDepartment={handleChangeDepartment}
                currentDepartment={currentDepartment}
                currentUser={currentUser}
                onMessageAction={handleMessageAction}
                departments={departments}
              />
            ) : (
              <ChatIntro />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}