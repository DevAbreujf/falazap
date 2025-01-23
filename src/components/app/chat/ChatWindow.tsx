import { ChatActions } from "./ChatActions";
import { ChatHeader } from "./ChatHeader";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ChatContact, Department, Message } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  messages: Message[];
  selectedContact?: ChatContact;
  userName: string;
  currentDepartment?: Department;
  onSendMessage: (content: string) => void;
  onShowIntro: () => void;
  onSelectMessage: (message: Message) => void;
}

export function ChatWindow({
  messages,
  selectedContact,
  userName,
  currentDepartment,
  onSendMessage,
  onShowIntro,
  onSelectMessage,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        userName={userName}
        currentDepartment={currentDepartment}
        onShowIntro={onShowIntro}
      >
        {selectedContact && <ChatHeaderInfo contact={selectedContact} />}
      </ChatHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              onSelect={() => onSelectMessage(message)}
            />
          ))}
        </div>
      </ScrollArea>

      <ChatActions />
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
}