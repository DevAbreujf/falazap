import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { ChatContact, ChatMessage, Department } from "@/types/chat";
import { useState } from "react";

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

const mockContactsByDepartment: Record<string, ChatContact[]> = {
  "1": [
    {
      id: "1",
      name: "João Silva",
      status: "online",
      unreadCount: 3,
      isSupport: true,
      funnelName: "Suporte",
      lastMessage: {
        id: "msg1",
        content: "Preciso de ajuda técnica",
        senderId: "1",
        timestamp: new Date().toISOString(),
        status: "delivered",
        type: "text"
      }
    },
  ],
  "2": [
    {
      id: "2",
      name: "Maria Oliveira",
      status: "offline",
      unreadCount: 0,
      isSupport: false,
      funnelName: "Vendas",
      lastMessage: {
        id: "msg2",
        content: "Gostaria de fazer um orçamento",
        senderId: "2",
        timestamp: new Date().toISOString(),
        status: "read",
        type: "text"
      }
    },
  ],
  "3": [
    {
      id: "3",
      name: "Pedro Santos",
      status: "online",
      unreadCount: 1,
      isSupport: false,
      funnelName: "Financeiro",
      lastMessage: {
        id: "msg3",
        content: "Dúvida sobre fatura",
        senderId: "3",
        timestamp: new Date().toISOString(),
        status: "delivered",
        type: "text"
      }
    },
  ],
};

// Create a state to store messages
const initialMessagesByDepartment: Record<string, Record<string, ChatMessage[]>> = {
  "1": {
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
        content: "Estou com problemas técnicos",
        senderId: "1",
        timestamp: new Date().toISOString(),
        status: "delivered",
        type: "text"
      }
    ],
  },
  "2": {
    "2": [
      {
        id: "3",
        content: "Boa tarde! Como posso ajudar?",
        senderId: "me",
        timestamp: new Date().toISOString(),
        status: "read",
        type: "text"
      },
    ],
  },
  "3": {
    "3": [
      {
        id: "4",
        content: "Em que posso ajudar com sua fatura?",
        senderId: "me",
        timestamp: new Date().toISOString(),
        status: "read",
        type: "text"
      },
    ],
  },
};

export default function Chatboard() {
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>();
  const [showIntro, setShowIntro] = useState(true);
  const [currentDepartment, setCurrentDepartment] = useState<Department>(mockDepartments[0]);
  const [messagesByDepartment, setMessagesByDepartment] = useState(initialMessagesByDepartment);

  const handleSendMessage = (content: string) => {
    if (!selectedContactId) return;

    const formattedContent = `**[${currentDepartment?.name || 'Geral'}] John Doe:**\n${content}`;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: formattedContent,
      senderId: "me",
      timestamp: new Date().toISOString(),
      status: "sent",
      type: "text"
    };

    setMessagesByDepartment(prevMessages => {
      const departmentMessages = prevMessages[currentDepartment.id] || {};
      const contactMessages = departmentMessages[selectedContactId] || [];
      
      return {
        ...prevMessages,
        [currentDepartment.id]: {
          ...departmentMessages,
          [selectedContactId]: [...contactMessages, newMessage]
        }
      };
    });

    console.log("Mensagem enviada:", formattedContent);
  };

  const handleUpdateContactStatus = (contactId: string, isSupport: boolean) => {
    const departmentContacts = mockContactsByDepartment[currentDepartment.id] || [];
    const updatedContacts = departmentContacts.map(contact =>
      contact.id === contactId
        ? { ...contact, isSupport }
        : contact
    );
    mockContactsByDepartment[currentDepartment.id] = updatedContacts;
  };

  const handleDepartmentChange = (departmentId: string) => {
    const department = mockDepartments.find(d => d.id === departmentId);
    if (department) {
      setCurrentDepartment(department);
      setSelectedContactId(undefined);
      setShowIntro(true);
    }
  };

  // Get contacts for current department
  const currentContacts = mockContactsByDepartment[currentDepartment.id] || [];
  const currentMessages = selectedContactId 
    ? (messagesByDepartment[currentDepartment.id]?.[selectedContactId] || [])
    : [];

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        contacts={currentContacts}
        selectedContactId={selectedContactId}
        onSelectContact={(contact) => {
          setSelectedContactId(contact.id);
          setShowIntro(false);
        }}
        onDepartmentChange={handleDepartmentChange}
        currentDepartment={currentDepartment}
      />
      
      <div className="flex-1">
        {showIntro ? (
          <ChatIntro />
        ) : selectedContactId && (
          <ChatWindow
            contact={currentContacts.find(c => c.id === selectedContactId)!}
            messages={currentMessages}
            onSendMessage={handleSendMessage}
            onUpdateContactStatus={handleUpdateContactStatus}
          />
        )}
      </div>
    </div>
  );
}
