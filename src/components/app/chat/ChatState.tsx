import { ChatContact, ChatMessage, Department } from "@/types/chat";

export const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Vendas",
    description: "Departamento responsável por vendas e negociações"
  },
  {
    id: "2",
    name: "Suporte",
    description: "Suporte técnico e atendimento ao cliente"
  },
  {
    id: "3",
    name: "Financeiro",
    description: "Departamento financeiro e cobranças"
  },
];

export const mockContactsByDepartment: Record<string, ChatContact[]> = {
  "1": [
    {
      id: "1",
      name: "João Silva",
      status: "online",
      unreadCount: 2,
      lastMessage: {
        id: "1",
        content: "Olá, gostaria de mais informações",
        senderId: "contact-1",
        timestamp: "2024-02-20T10:30:00",
        status: "delivered",
        type: "text"
      },
    },
    {
      id: "2",
      name: "Maria Oliveira",
      status: "offline",
      unreadCount: 1,
      lastMessage: {
        id: "2",
        content: "Estou com um problema no pedido",
        senderId: "contact-2",
        timestamp: "2024-02-20T09:15:00",
        status: "delivered",
        type: "text"
      },
    },
    {
      id: "3",
      name: "Carlos Pereira",
      status: "online",
      unreadCount: 0,
      lastMessage: {
        id: "3",
        content: "Qual é o status da minha solicitação?",
        senderId: "contact-3",
        timestamp: "2024-02-20T08:45:00",
        status: "delivered",
        type: "text"
      },
    },
  ],
  "2": [
    {
      id: "4",
      name: "Ana Costa",
      status: "online",
      unreadCount: 3,
      lastMessage: {
        id: "5",
        content: "Preciso de ajuda com o sistema",
        senderId: "contact-4",
        timestamp: "2024-02-20T11:00:00",
        status: "delivered",
        type: "text"
      },
    },
    {
      id: "5",
      name: "Ricardo Almeida",
      status: "offline",
      unreadCount: 0,
      lastMessage: {
        id: "6",
        content: "Aguardo retorno sobre meu chamado",
        senderId: "contact-5",
        timestamp: "2024-02-20T10:50:00",
        status: "delivered",
        type: "text"
      },
    },
  ],
  "3": [
    {
      id: "6",
      name: "Fernanda Lima",
      status: "online",
      unreadCount: 1,
      lastMessage: {
        id: "7",
        content: "Qual é a previsão de pagamento?",
        senderId: "contact-6",
        timestamp: "2024-02-20T12:30:00",
        status: "delivered",
        type: "text"
      },
    },
    {
      id: "7",
      name: "Bruno Santos",
      status: "offline",
      unreadCount: 0,
      lastMessage: {
        id: "8",
        content: "Gostaria de discutir o relatório financeiro",
        senderId: "contact-7",
        timestamp: "2024-02-20T11:20:00",
        status: "delivered",
        type: "text"
      },
    },
  ],
};

export const initialMessagesByDepartment: Record<string, Record<string, ChatMessage[]>> = {
  "1": {
    "1": [
      {
        id: "1",
        content: "Olá, gostaria de mais informações",
        senderId: "contact-1",
        timestamp: "2024-02-20T10:30:00",
        status: "delivered",
        type: "text"
      },
      {
        id: "2",
        content: "Claro! Sobre o que você gostaria de saber?",
        senderId: "user-1",
        timestamp: "2024-02-20T10:31:00",
        status: "delivered",
        type: "text"
      },
    ],
    "2": [
      {
        id: "3",
        content: "Estou com um problema no pedido",
        senderId: "contact-2",
        timestamp: "2024-02-20T09:15:00",
        status: "delivered",
        type: "text"
      },
      {
        id: "4",
        content: "Pode me dar mais detalhes sobre o problema?",
        senderId: "user-1",
        timestamp: "2024-02-20T09:16:00",
        status: "delivered",
        type: "text"
      },
    ],
  },
  "2": {
    "4": [
      {
        id: "5",
        content: "Preciso de ajuda com o sistema",
        senderId: "contact-4",
        timestamp: "2024-02-20T11:00:00",
        status: "delivered",
        type: "text"
      },
      {
        id: "6",
        content: "Claro! O que está acontecendo?",
        senderId: "user-1",
        timestamp: "2024-02-20T11:01:00",
        status: "delivered",
        type: "text"
      },
    ],
  },
  "3": {
    "6": [
      {
        id: "7",
        content: "Qual é a previsão de pagamento?",
        senderId: "contact-6",
        timestamp: "2024-02-20T12:30:00",
        status: "delivered",
        type: "text"
      },
      {
        id: "8",
        content: "A previsão é para o final da semana.",
        senderId: "user-1",
        timestamp: "2024-02-20T12:31:00",
        status: "delivered",
        type: "text"
      },
    ],
  },
};
