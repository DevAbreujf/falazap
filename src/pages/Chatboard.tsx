import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { ChatContact, ChatMessage, Department } from "@/types/chat";
import { useState, useEffect } from "react";

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

// Add FalaZAP as the default contact
const falaZAPContact: ChatContact = {
  id: "falazap",
  name: "FalaZAP",
  status: "online",
  unreadCount: 1,
  isSupport: false,
  funnelName: "Onboarding",
  lastMessage: {
    id: "initial",
    content: "Olá, eu sou a inteligencia do FalaZAP",
    senderId: "falazap",
    timestamp: new Date().toISOString(),
    status: "delivered",
    type: "text"
  }
};

// First, declare mockContactsByDepartment
const mockContactsByDepartment: Record<string, ChatContact[]> = {
  "1": [falaZAPContact],
  "2": [],
  "3": [],
};

const initialFalaZAPMessages: ChatMessage[] = [
  {
    id: "msg1",
    content: "Olá, eu sou a inteligencia do FalaZAP",
    senderId: "falazap",
    timestamp: new Date().toISOString(),
    status: "delivered",
    type: "text"
  },
  {
    id: "msg2",
    content: "Vamos fingir que eu sou uma pessoa com interesse nos produtos ou serviços da sua organização, ok?",
    senderId: "falazap",
    timestamp: new Date().toISOString(),
    status: "delivered",
    type: "text"
  },
  {
    id: "msg3",
    content: "Você e quem você quiser cadastrar da sua organização pode me responder por esse chat maravilhoso que eu (uma pessoa interessada) recebo tudo no celular, direto no WhatsApp!",
    senderId: "falazap",
    timestamp: new Date().toISOString(),
    status: "delivered",
    type: "text"
  },
  {
    id: "msg4",
    content: "Me responde aqui se achou legal...\n\nSério, responde aí alguma coisa para continuarmos...",
    senderId: "falazap",
    timestamp: new Date().toISOString(),
    status: "delivered",
    type: "text"
  }
];

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
    falazap: initialFalaZAPMessages
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
  const [selectedContactId, setSelectedContactId] = useState<string>("falazap");
  const [showIntro, setShowIntro] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState<Department>(mockDepartments[0]);
  const [messagesByDepartment, setMessagesByDepartment] = useState({
    ...initialMessagesByDepartment,
    "1": {
      ...initialMessagesByDepartment["1"],
      falazap: initialFalaZAPMessages
    }
  });
  const [hasUserReplied, setHasUserReplied] = useState(false);
  const [falaZAPStep, setFalaZAPStep] = useState(0);

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

    // Handle FalaZAP automated responses
    if (selectedContactId === "falazap") {
      if (!hasUserReplied) {
        setHasUserReplied(true);
        setTimeout(() => {
          const autoResponses = [
            "Perfeito, é isso aí mesmo!",
            "Tá, mas agora precisamos configurar algumas coisas para você usar com seus clientes e contatos de verdade",
            "Para isso, eu preciso que você crie um canal de atendimento e sincronize um aparelho celular seguindo as instruções desse link aqui:",
            "Maaasss, como você precisa ler um QRCode, você precisa estar num computador, notebook etc...\nSe você não estiver, consegue um para continuarmos?",
            "Cadastra lá um canal pelo link:\nEu não sei responder mais nada 😅"
          ];

          autoResponses.forEach((response, index) => {
            setTimeout(() => {
              const autoMessage: ChatMessage = {
                id: `auto_${Date.now()}_${index}`,
                content: response,
                senderId: "falazap",
                timestamp: new Date().toISOString(),
                status: "delivered",
                type: "text"
              };

              setMessagesByDepartment(prev => ({
                ...prev,
                [currentDepartment.id]: {
                  ...prev[currentDepartment.id],
                  falazap: [...prev[currentDepartment.id].falazap, autoMessage]
                }
              }));
            }, index * 1000);
          });
        }, 1000);
      } else {
        // If user has already replied, only send the final message
        setTimeout(() => {
          const finalMessage: ChatMessage = {
            id: `auto_${Date.now()}_final`,
            content: "Cadastra lá um canal pelo link:\nEu não sei responder mais nada 😅",
            senderId: "falazap",
            timestamp: new Date().toISOString(),
            status: "delivered",
            type: "text"
          };

          setMessagesByDepartment(prev => ({
            ...prev,
            [currentDepartment.id]: {
              ...prev[currentDepartment.id],
              falazap: [...prev[currentDepartment.id].falazap, finalMessage]
            }
          }));
        }, 1000);
      }
    }

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
