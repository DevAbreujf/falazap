import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatHeader } from "@/components/app/chat/ChatHeader";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { ChatContact, ChatMessage, Department } from "@/types/chat";
import { useState } from "react";

// Mock data - Em produção, isso viria de uma API
const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Suporte Técnico",
    description: "Atendimento para problemas técnicos",
  },
  {
    id: "2",
    name: "Vendas",
    description: "Atendimento comercial",
  },
  {
    id: "3",
    name: "Financeiro",
    description: "Atendimento financeiro",
  },
];

const mockContacts: ChatContact[] = [
  {
    id: "1",
    name: "João Silva",
    status: "online",
    unreadCount: 3,
    isSupport: true,
    lastMessage: {
      id: "msg1",
      content: "Preciso de ajuda com o pagamento",
      senderId: "1",
      timestamp: new Date().toISOString(),
      status: "delivered",
      type: "text"
    }
  },
  {
    id: "2",
    name: "Maria Oliveira",
    status: "offline",
    unreadCount: 0,
    isSupport: false,
    lastMessage: {
      id: "msg2",
      content: "Obrigado pelo atendimento!",
      senderId: "2",
      timestamp: new Date().toISOString(),
      status: "read",
      type: "text"
    }
  }
];

const mockMessages: Record<string, ChatMessage[]> = {
  "1": [
    {
      id: "1",
      content: "Olá, como posso ajudar?",
      senderId: "me",
      timestamp: new Date().toISOString(),
      status: "read",
      type: "text"
    },
    {
      id: "2",
      content: "Estou com problemas no pagamento",
      senderId: "1",
      timestamp: new Date().toISOString(),
      status: "delivered",
      type: "text"
    }
  ],
  "2": [
    {
      id: "3",
      content: "Boa tarde! Tudo bem?",
      senderId: "me",
      timestamp: new Date().toISOString(),
      status: "read",
      type: "text"
    },
    {
      id: "4",
      content: "Olá! Tudo ótimo, obrigada!",
      senderId: "2",
      timestamp: new Date().toISOString(),
      status: "read",
      type: "text"
    }
  ]
};

export default function Chatboard() {
  const [contacts] = useState<ChatContact[]>(mockContacts);
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>();
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(mockMessages);
  const [showIntro, setShowIntro] = useState(true);
  const [currentDepartment, setCurrentDepartment] = useState<Department | undefined>();

  const handleSendMessage = (content: string) => {
    if (!selectedContactId) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content,
      senderId: "me",
      timestamp: new Date().toISOString(),
      status: "sent",
      type: "text"
    };

    setMessages(prevMessages => ({
      ...prevMessages,
      [selectedContactId]: [...(prevMessages[selectedContactId] || []), newMessage]
    }));

    console.log("Mensagem enviada:", content);
  };

  const handleDepartmentChange = (departmentId: string) => {
    const department = mockDepartments.find(d => d.id === departmentId);
    setCurrentDepartment(department);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        userName="John Doe"
        currentDepartment={currentDepartment}
        departments={mockDepartments}
        onDepartmentChange={handleDepartmentChange}
        onShowIntro={() => setShowIntro(true)}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          contacts={contacts}
          selectedContactId={selectedContactId}
          onSelectContact={(contact) => {
            setSelectedContactId(contact.id);
            setShowIntro(false);
          }}
        />
        
        <div className="flex-1">
          {showIntro ? (
            <ChatIntro />
          ) : selectedContactId && (
            <ChatWindow
              contact={contacts.find(c => c.id === selectedContactId)!}
              messages={messages[selectedContactId]}
              onSendMessage={handleSendMessage}
            />
          )}
        </div>
      </div>
    </div>
  );
}