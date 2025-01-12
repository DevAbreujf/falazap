import { ChatContact, ChatMessage, Department } from "@/types/chat";

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Vendas",
  },
  {
    id: "2",
    name: "Suporte",
  },
  {
    id: "3",
    name: "Financeiro",
  },
];

export const mockContactsByDepartment: Record<string, ChatContact[]> = {
  "1": [
    {
      id: "1",
      name: "João Silva",
      lastMessage: "Olá, gostaria de mais informações",
      lastMessageTime: "10:30",
      unreadCount: 2,
    },
    {
      id: "2",
      name: "Maria Oliveira",
      lastMessage: "Estou com um problema no pedido",
      lastMessageTime: "09:15",
      unreadCount: 1,
    },
    {
      id: "3",
      name: "Carlos Pereira",
      lastMessage: "Qual é o status da minha solicitação?",
      lastMessageTime: "08:45",
      unreadCount: 0,
    },
  ],
  "2": [
    {
      id: "4",
      name: "Ana Costa",
      lastMessage: "Preciso de ajuda com o sistema",
      lastMessageTime: "11:00",
      unreadCount: 3,
    },
    {
      id: "5",
      name: "Ricardo Almeida",
      lastMessage: "Aguardo retorno sobre meu chamado",
      lastMessageTime: "10:50",
      unreadCount: 0,
    },
  ],
  "3": [
    {
      id: "6",
      name: "Fernanda Lima",
      lastMessage: "Qual é a previsão de pagamento?",
      lastMessageTime: "12:30",
      unreadCount: 1,
    },
    {
      id: "7",
      name: "Bruno Santos",
      lastMessage: "Gostaria de discutir o relatório financeiro",
      lastMessageTime: "11:20",
      unreadCount: 0,
    },
  ],
};

export const initialMessagesByDepartment: Record<string, Record<string, ChatMessage[]>> = {
  "1": {
    "1": [
      {
        id: "1",
        content: "Olá, gostaria de mais informações",
        sender: "contact",
        timestamp: "2024-02-20T10:30:00",
        type: "text",
      },
      {
        id: "2",
        content: "Claro! Sobre o que você gostaria de saber?",
        sender: "user",
        timestamp: "2024-02-20T10:31:00",
        type: "text",
      },
    ],
    "2": [
      {
        id: "3",
        content: "Estou com um problema no pedido",
        sender: "contact",
        timestamp: "2024-02-20T09:15:00",
        type: "text",
      },
      {
        id: "4",
        content: "Pode me dar mais detalhes sobre o problema?",
        sender: "user",
        timestamp: "2024-02-20T09:16:00",
        type: "text",
      },
    ],
  },
  "2": {
    "4": [
      {
        id: "5",
        content: "Preciso de ajuda com o sistema",
        sender: "contact",
        timestamp: "2024-02-20T11:00:00",
        type: "text",
      },
      {
        id: "6",
        content: "Claro! O que está acontecendo?",
        sender: "user",
        timestamp: "2024-02-20T11:01:00",
        type: "text",
      },
    ],
  },
  "3": {
    "6": [
      {
        id: "7",
        content: "Qual é a previsão de pagamento?",
        sender: "contact",
        timestamp: "2024-02-20T12:30:00",
        type: "text",
      },
      {
        id: "8",
        content: "A previsão é para o final da semana.",
        sender: "user",
        timestamp: "2024-02-20T12:31:00",
        type: "text",
      },
    ],
  },
};
