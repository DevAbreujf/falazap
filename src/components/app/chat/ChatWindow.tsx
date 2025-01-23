import { ChatActions } from "./ChatActions";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { ChatContact, ChatMessage as ChatMessageType, Department } from "@/types/chat";
import { useState } from "react";

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
  const [isSignatureEnabled, setIsSignatureEnabled] = useState(true);
  const [editedName, setEditedName] = useState(currentUser.name);
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const [chatMode, setChatMode] = useState<"message" | "notes">("message");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<ChatMessageType | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File upload:', event.target.files);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        userName={currentUser.name}
        currentDepartment={currentDepartment}
        onShowIntro={() => {}}
      />
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isCurrentUser={message.senderId === currentUser.id}
              currentUser={currentUser}
              onMessageAction={onMessageAction}
            />
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <ChatActions
          onEndSupport={onEndSupport}
          onTransferChat={onTransferChat}
          onChangeDepartment={onChangeDepartment}
          departments={departments}
          onSendMessage={onSendMessage}
        />
        <ChatInput
          onSendMessage={onSendMessage}
          isSignatureEnabled={isSignatureEnabled}
          setIsSignatureEnabled={setIsSignatureEnabled}
          editedName={editedName}
          setIsEditingSignature={setIsEditingSignature}
          chatMode={chatMode}
          setChatMode={setChatMode}
          setIsEmojiPickerOpen={setIsEmojiPickerOpen}
          handleFileUpload={handleFileUpload}
          replyingTo={replyingTo}
          onCancelReply={() => setReplyingTo(null)}
        />
      </div>
    </div>
  );
}