import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { useChatState } from "@/components/app/chat/useChatState";
import { mockContactsByDepartment } from "@/components/app/chat/ChatState";

export default function Chatboard() {
  const {
    selectedContactId,
    showIntro,
    currentDepartment,
    messagesByDepartment,
    handleSendMessage,
    handleContactSelect,
    handleDepartmentChange,
  } = useChatState();

  const currentContacts = mockContactsByDepartment[currentDepartment.id] || [];
  const currentMessages = selectedContactId 
    ? (messagesByDepartment[currentDepartment.id]?.[selectedContactId] || [])
    : [];

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />
        
        <div className="flex-1 flex">
          <ChatSidebar
            contacts={currentContacts}
            selectedContactId={selectedContactId}
            onContactSelect={handleContactSelect}
            currentDepartment={currentDepartment}
            onDepartmentChange={handleDepartmentChange}
          />

          <div className="flex-1 flex flex-col">
            {showIntro ? (
              <ChatIntro />
            ) : (
              <ChatWindow
                messages={currentMessages}
                onSendMessage={handleSendMessage}
                selectedContact={currentContacts.find(c => c.id === selectedContactId)}
                currentDepartment={currentDepartment}
              />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}