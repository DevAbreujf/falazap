import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatContact, ChatMessage } from "@/types/chat";
import { useState } from "react";

// Mock data - Em produção, isso viria de uma API
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
  const [selectedContactId, setSelectedContactId] = useState<string | undefined>(contacts[0]?.id);
  const [messages] = useState<Record<string, ChatMessage[]>>(mockMessages);

  const handleSendMessage = (content: string) => {
    console.log("Mensagem enviada:", content);
    // Aqui você implementaria a lógica para enviar a mensagem
  };

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        contacts={contacts}
        selectedContactId={selectedContactId}
        onSelectContact={(contact) => setSelectedContactId(contact.id)}
      />
      {selectedContactId && (
        <ChatWindow
          contact={contacts.find(c => c.id === selectedContactId)!}
          messages={messages[selectedContactId]}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
}