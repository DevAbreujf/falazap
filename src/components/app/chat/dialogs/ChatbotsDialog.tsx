import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";

interface Chatbot {
  id: string;
  name: string;
  description: string;
}

interface ChatbotsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  chatbots: Chatbot[];
  onSelectChatbot: (chatbotId: string) => void;
}

export function ChatbotsDialog({
  isOpen,
  onClose,
  chatbots,
  onSelectChatbot,
}: ChatbotsDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            Chatbots Disponíveis
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {chatbots.map((chatbot) => (
            <button
              key={chatbot.id}
              onClick={() => onSelectChatbot(chatbot.id)}
              className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors bg-card hover:bg-accent/50"
            >
              <Bot className="h-6 w-6 text-primary mt-1" />
              <div className="text-left">
                <h3 className="font-medium">{chatbot.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {chatbot.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}