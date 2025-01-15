import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, Bot, SmilePlus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (content: string) => void;
  isSignatureEnabled: boolean;
  setIsSignatureEnabled: (enabled: boolean) => void;
  editedName: string;
  setIsEditingSignature: (editing: boolean) => void;
  chatMode: "message" | "notes";
  setChatMode: (mode: "message" | "notes") => void;
  setIsEmojiPickerOpen: (open: boolean) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ChatInput({
  onSendMessage,
  isSignatureEnabled,
  setIsSignatureEnabled,
  editedName,
  setIsEditingSignature,
  chatMode,
  setChatMode,
  setIsEmojiPickerOpen,
  handleFileUpload,
}: ChatInputProps) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageContent = chatMode === "notes" 
        ? `**Nota**\n${newMessage}`
        : isSignatureEnabled 
          ? `${editedName}:\n${newMessage}`
          : newMessage;
          
      onSendMessage(messageContent);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-primary/10 bg-card space-y-4">
      <div className="flex items-center justify-between border-b border-primary/10 pb-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={isSignatureEnabled}
            onCheckedChange={setIsSignatureEnabled}
          />
          <span className="text-sm">
            {isSignatureEnabled ? (
              <button 
                onClick={() => setIsEditingSignature(true)}
                className="flex items-center gap-1 hover:text-primary"
              >
                {editedName}
                <Edit className="h-4 w-4" />
              </button>
            ) : (
              "Assinar"
            )}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={chatMode === "notes" ? "Digite uma nota..." : "Digite uma mensagem..."}
          className={`flex-1 bg-muted/50 rounded-md p-2 min-h-[100px] max-h-[200px] resize-y focus:outline-none focus:ring-1 focus:ring-primary text-sm ${
            chatMode === "notes" ? "border-[#fae389]" : ""
          }`}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      accept="*/*"
                    />
                    <Paperclip className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Anexar arquivo</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setIsEmojiPickerOpen(true)}
                  >
                    <SmilePlus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inserir emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Bot className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem onClick={() => console.log("Selected Funnel 1")}>
                  Funil de Vendas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Selected Funnel 2")}>
                  Funil de Suporte
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button onClick={handleSend} size="icon" disabled={!newMessage.trim()}>
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}