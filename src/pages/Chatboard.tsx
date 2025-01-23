import { ChatSidebar } from "@/components/app/chat/ChatSidebar";
import { ChatWindow } from "@/components/app/chat/ChatWindow";
import { ChatIntro } from "@/components/app/chat/ChatIntro";
import { ChatDialogs } from "@/components/app/chat/dialogs/ChatDialogs";
import { ChatContact, ChatMessage, Department } from "@/types/chat";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useDepartmentStore } from "@/stores/departmentStore";

const mockAttendants = [
  { id: "1", name: "John Doe", departmentId: "1" },
  { id: "2", name: "Jane Smith", departmentId: "2" },
];

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
  status: "new" as const,
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
  const { departments } = useDepartmentStore();
  const [currentDepartment, setCurrentDepartment] = useState(departments[0] || { id: "1", name: "Sem setor" });
  const [messagesByDepartment, setMessagesByDepartment] = useState({
    ...initialMessagesByDepartment,
    "1": {
      ...initialMessagesByDepartment["1"],
      falazap: initialFalaZAPMessages
    }
  });
  const [hasUserReplied, setHasUserReplied] = useState(false);
  const [hideFalaZAP, setHideFalaZAP] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (departments.length > 0 && (!currentDepartment || !departments.find(d => d.id === currentDepartment.id))) {
      setCurrentDepartment(departments[0]);
    }
  }, [departments]);

  const handleSendMessage = (content: string) => {
    if (!selectedContactId) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      content: content,
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
    const department = departments.find(d => String(d.id) === departmentId);
    if (department) {
      setCurrentDepartment(department);
      setSelectedContactId(undefined);
      setShowIntro(true);
      console.log("Department changed to:", department);
    }
  };

  const handleEndSupport = (contactId: string) => {
    const updatedContacts = mockContactsByDepartment[currentDepartment.id].map(contact =>
      contact.id === contactId
        ? { ...contact, status: 'finished' as const }
        : contact
    );
    mockContactsByDepartment[currentDepartment.id] = updatedContacts;
    setSelectedContactId(undefined);
  };

  const handleTransferChat = (contactId: string, attendantId: string) => {
    const attendant = mockAttendants.find(a => a.id === attendantId);
    if (attendant) {
      const contact = mockContactsByDepartment[currentDepartment.id].find(c => c.id === contactId);
      if (contact) {
        mockContactsByDepartment[currentDepartment.id] = mockContactsByDepartment[currentDepartment.id]
          .filter(c => c.id !== contactId);
        const updatedContact = { ...contact, status: 'new' as const };
        if (!mockContactsByDepartment[attendant.departmentId]) {
          mockContactsByDepartment[attendant.departmentId] = [];
        }
        mockContactsByDepartment[attendant.departmentId].push(updatedContact);
        setSelectedContactId(undefined);
        toast({
          title: "Conversa transferida",
          description: `Conversa transferida para ${attendant.name}`,
        });
      }
    }
  };

  const handleChangeDepartment = (contactId: string, departmentId: string) => {
    const contact = mockContactsByDepartment[currentDepartment.id].find(c => c.id === contactId);
    if (contact) {
      mockContactsByDepartment[currentDepartment.id] = mockContactsByDepartment[currentDepartment.id]
        .filter(c => c.id !== contactId);
      const updatedContact = { ...contact, status: 'new' as const };
      if (!mockContactsByDepartment[departmentId]) {
        mockContactsByDepartment[departmentId] = [];
      }
      mockContactsByDepartment[departmentId].push(updatedContact);
      setSelectedContactId(undefined);
      const department = departments.find(d => d.id === departmentId);
      if (department) {
        toast({
          title: "Setor alterado",
          description: `Conversa movida para ${department.name}`,
        });
      }
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

  const handleMessageAction = (action: 'reply' | 'copy' | 'forward' | 'delete', message: ChatMessage) => {
    setSelectedMessage(message);
    
    switch (action) {
      case 'forward':
        setIsForwardDialogOpen(true);
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        break;
    }
  };

  const handleDelete = (type: 'all' | 'me') => {
    if (selectedMessage) {
      // Logic to delete the message
      toast({
        title: "Mensagem apagada",
        description: `Mensagem apagada ${type === 'all' ? 'para todos' : 'para você'}`,
      });
    }
    setIsDeleteDialogOpen(false);
    setSelectedMessage(null);
  };

  const handleForward = (contactId: string) => {
    if (selectedMessage) {
      // Logic to forward the message
      toast({
        title: "Mensagem encaminhada",
        description: "Mensagem encaminhada com sucesso",
      });
    }
    setIsForwardDialogOpen(false);
    setSelectedMessage(null);
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
        currentDepartment={{
          id: String(currentDepartment.id),
          name: currentDepartment.name
        }}
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
            onEndSupport={() => handleEndSupport(selectedContactId)}
            onTransferChat={(attendantId) => handleTransferChat(selectedContactId, attendantId)}
            onChangeDepartment={(departmentId) => handleChangeDepartment(selectedContactId, departmentId)}
            currentDepartment={currentDepartment}
            currentUser={mockCurrentUser}
            onMessageAction={handleMessageAction}
          />
        )}
      </div>

      <ChatDialogs
        isDeleteDialogOpen={isDeleteDialogOpen}
        isForwardDialogOpen={isForwardDialogOpen}
        selectedMessage={selectedMessage}
        onCloseDeleteDialog={() => {
          setIsDeleteDialogOpen(false);
          setSelectedMessage(null);
        }}
        onCloseForwardDialog={() => {
          setIsForwardDialogOpen(false);
          setSelectedMessage(null);
        }}
        onDelete={handleDelete}
        onForward={handleForward}
      />
    </div>
  );
}
