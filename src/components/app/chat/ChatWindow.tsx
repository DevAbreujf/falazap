import { ChatActions } from "./ChatActions";
import { ChatHeader } from "./ChatHeader";
import { ChatHeaderInfo } from "./ChatHeaderInfo";
import { ChatInput } from "./ChatInput";
import { ChatMessage as MessageComponent } from "./ChatMessage";
import { ChatContact, Department, ChatMessage } from "@/types/chat";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatWindowProps {
  messages: ChatMessage[];
  contact: ChatContact;
  currentDepartment?: Department;
  userName: string;
  onSendMessage: (content: string) => void;
  onShowIntro: () => void;
  onUpdateContactStatus: (contactId: string, isSupport: boolean) => void;
  onEndSupport: () => void;
  onTransferChat: (attendantId: string) => void;
  onChangeDepartment: (departmentId: string) => void;
  currentUser: { id: string; name: string; avatar?: string };
  onMessageAction: (action: 'reply' | 'copy' | 'forward' | 'delete', message: ChatMessage) => void;
}

export function ChatWindow({
  messages,
  contact,
  userName,
  currentDepartment,
  onSendMessage,
  onShowIntro,
  onUpdateContactStatus,
  onEndSupport,
  onTransferChat,
  onChangeDepartment,
  currentUser,
  onMessageAction,
}: ChatWindowProps) {
  return (
    <div className="flex flex-col h-full">
      <ChatHeader
        userName={userName}
        currentDepartment={currentDepartment}
        onShowIntro={onShowIntro}
      >
        {contact && <ChatHeaderInfo contact={contact} />}
      </ChatHeader>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <MessageComponent
              key={index}
              message={message}
              isCurrentUser={message.senderId === currentUser.id}
              currentUser={currentUser}
              onMessageAction={(action, messageId, deleteType) => 
                onMessageAction(action, message)
              }
            />
          ))}
        </div>
      </ScrollArea>

      <ChatActions
        onEndSupport={onEndSupport}
        onTransferChat={onTransferChat}
        onChangeDepartment={onChangeDepartment}
        attendants={[]}
        departments={[]}
        onSendMessage={onSendMessage}
      />
      
      <ChatInput 
        onSendMessage={onSendMessage}
        isSignatureEnabled={false}
        setIsSignatureEnabled={() => {}}
        editedName=""
        setIsEditingSignature={() => {}}
        chatMode="message"
        setChatMode={() => {}}
        setIsEmojiPickerOpen={() => {}}
        handleFileUpload={() => {}}
        replyingTo={null}
        onCancelReply={() => {}}
      />
    </div>
  );
}