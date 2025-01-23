import { ChatActions } from "./ChatActions";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatContact, ChatMessage as ChatMessageType } from "@/types/chat";

interface ChatWindowProps {
  contact: ChatContact;
  messages: ChatMessageType[];
  onSendMessage: (content: string) => void;
  onUpdateContactStatus: (contactId: string, isSupport: boolean) => void;
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  currentDepartment: {
    id: string;
    name: string;
  };
  currentUser: {
    id: string;
    name: string;
    avatar?: string;
  };
  onMessageAction: (action: 'reply' | 'copy' | 'forward' | 'delete', message: ChatMessageType) => void;
  departments: Array<{ id: string; name: string }>;
}

export function ChatWindow({
  contact,
  messages,
  onSendMessage,
  onUpdateContactStatus,
  onEndSupport,
  onTransferChat,
  onChangeDepartment,
  currentDepartment,
  currentUser,
  onMessageAction,
  departments
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader contact={contact} />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isOwn={message.senderId === "me"}
              onAction={onMessageAction}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatActions
          onEndSupport={onEndSupport}
          onTransferChat={onTransferChat}
          onChangeDepartment={onChangeDepartment}
          attendants={[
            { id: "1", name: "John Doe", departmentId: "1", isOnline: true },
            { id: "2", name: "Jane Smith", departmentId: "2", isOnline: false },
          ]}
          departments={departments}
          onSendMessage={onSendMessage}
        />
        <ChatInput onSendMessage={onSendMessage} />
      </div>
    </div>
  );
}