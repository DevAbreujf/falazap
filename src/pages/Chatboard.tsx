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

const falaZAPContact: ChatContact = {
  id: "falazap",
  name: "FalaZAP",
  status: "new" as const,  // Explicitly set as "new" status
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

const mockContactsByDepartment: Record<string, ChatContact[]> = {
  "1": [falaZAPContact],
  "2": [falaZAPContact],
  "3": [falaZAPContact],
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
  const [hideFalaZAP, setHideFalaZAP] = useState(false);

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

    // Update contact status to 'waiting' when agent responds to a new chat
    const selectedContact = mockContactsByDepartment[currentDepartment.id].find(
      contact => contact.id === selectedContactId
    );

    if (selectedContact && selectedContact.status === 'new') {
      const updatedContacts = mockContactsByDepartment[currentDepartment.id].map(contact =>
        contact.id === selectedContactId
          ? { ...contact, status: 'waiting' as const }
          : contact
      );
      mockContactsByDepartment[currentDepartment.id] = updatedContacts;
    }

    if (selectedContactId === "falazap") {
      if (!hasUserReplied) {
        setHasUserReplied(true);
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
          }, (index + 1) * 5000);
        });
      } else {
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
        }, 5000);
      }
    }
  };

  const handleUpdateContactStatus = (contactId: string, isSupport: boolean) => {
    if (contactId === "falazap") {
      setHideFalaZAP(true);
      return;
    }

    const updatedContacts = mockContactsByDepartment[currentDepartment.id].map(contact =>
      contact.id === contactId
        ? { ...contact, status: isSupport ? "finished" as const : "new" as const }
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

  const currentContacts = mockContactsByDepartment[currentDepartment.id]
    .filter(contact => !hideFalaZAP || contact.id !== "falazap");
    
  const currentMessages = selectedContactId 
    ? (messagesByDepartment[currentDepartment.id]?.[selectedContactId] || [])
    : [];

  const mockCurrentUser = {
    id: "1",
    name: "John Doe",
    avatar: undefined
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
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
            currentDepartment={currentDepartment}
            currentUser={mockCurrentUser}
          />
        )}
      </div>
    </div>
  );
}
