import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, Bot, SmilePlus, X, Mic, MessageSquare, StickyNote } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatMessage } from "@/types/chat";
import { ChatbotsDialog } from "./dialogs/ChatbotsDialog";
import { AudioMeter } from "./AudioMeter";
import { useToast } from "@/components/ui/use-toast";

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
  replyingTo: ChatMessage | null;
  onCancelReply: () => void;
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
  replyingTo,
  onCancelReply,
}: ChatInputProps) {
  const [newMessage, setNewMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isChatbotsOpen, setIsChatbotsOpen] = useState(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const { toast } = useToast();

  const handleSend = () => {
    if (newMessage.trim()) {
      const messageContent = chatMode === "notes" 
        ? `**Nota**\n${newMessage}`
        : isSignatureEnabled 
          ? `**${editedName}:**\n${newMessage}`
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];
      
      mediaRecorder.current.ondataavailable = (e) => {
        audioChunks.current.push(e.data);
      };

      mediaRecorder.current.start(1000);
      setIsRecording(true);
      setIsPaused(false);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Erro",
        description: "Não foi possível acessar o microfone",
        variant: "destructive",
      });
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
      mediaRecorder.current.pause();
      setIsPaused(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
      mediaRecorder.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
  };

  const stopAndSendRecording = async () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      
      console.log('Audio recorded and sent:', audioUrl);
      
      onSendMessage(`[Audio Message - ${formatTime(recordingTime)}]`);
      
      resetRecording();
    }
  };

  const cancelRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
      resetRecording();
    }
  };

  const resetRecording = () => {
    setIsRecording(false);
    setIsPaused(false);
    setRecordingTime(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    audioChunks.current = [];
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 border-t border-primary/10 bg-gradient-to-b from-card/95 to-card backdrop-blur-sm space-y-4">
      <div className="flex items-center justify-between border-b border-primary/10 pb-2">
        <div className="flex items-center gap-2">
          <Switch
            checked={isSignatureEnabled}
            onCheckedChange={setIsSignatureEnabled}
            className="data-[state=checked]:bg-primary"
          />
          <span className="text-sm">
            {isSignatureEnabled ? (
              <button 
                onClick={() => setIsEditingSignature(true)}
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                {editedName}
                <Edit className="h-4 w-4" />
              </button>
            ) : (
              "Assinar"
            )}
          </span>
        </div>

        <div className="flex gap-1">
          <Button
            variant={chatMode === "message" ? "default" : "ghost"}
            size="sm"
            onClick={() => setChatMode("message")}
            className="gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Mensagem
          </Button>
          <Button
            variant={chatMode === "notes" ? "default" : "ghost"}
            size="sm"
            onClick={() => setChatMode("notes")}
            className="gap-2 data-[state=active]:bg-[#fae389]/20 hover:bg-[#fae389]/10"
          >
            <StickyNote className="h-4 w-4" />
            Notas
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {replyingTo && (
          <div className="flex items-center justify-between bg-muted/50 p-2 rounded-md animate-fade-up">
            <div className="flex-1 text-sm text-muted-foreground border-l-2 border-primary pl-2">
              {replyingTo.content}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onCancelReply}
              className="h-5 w-5 hover:bg-primary/10 transition-colors"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              if (newMessage.trim()) {
                const messageContent = chatMode === "notes" 
                  ? `**Nota**\n${newMessage}`
                  : isSignatureEnabled 
                    ? `**${editedName}:**\n${newMessage}`
                    : newMessage;
                    
                onSendMessage(messageContent);
                setNewMessage("");
              }
            }
          }}
          placeholder={chatMode === "notes" ? "Digite uma nota..." : "Digite uma mensagem..."}
          className={`flex-1 bg-muted/50 rounded-lg p-3 min-h-[100px] max-h-[200px] resize-y focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all duration-200 ${
            chatMode === "notes" ? "border-[#fae389]/20" : ""
          } placeholder:text-muted-foreground`}
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary/10 transition-colors">
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
                    className="hover:bg-primary/10 transition-colors"
                  >
                    <SmilePlus className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Inserir emoji</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            {chatMode === "message" && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsChatbotsOpen(true)}
                className="hover:bg-primary/10 transition-colors"
              >
                <Bot className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isRecording && chatMode === "message" && (
              <div className="flex items-center gap-2 bg-muted/10 rounded-lg px-3 py-1.5 animate-fade-up">
                <AudioMeter mediaRecorder={mediaRecorder.current} isRecording={isRecording && !isPaused} />
                <span className="text-xs font-medium text-primary min-w-[40px]">
                  {formatTime(recordingTime)}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={cancelRecording}
                    className="h-6 w-6 hover:bg-destructive/10 transition-colors"
                  >
                    <X className="h-4 w-4 text-destructive" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={isPaused ? resumeRecording : pauseRecording}
                    className="h-6 w-6 hover:bg-primary/10 transition-colors"
                  >
                    {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={stopAndSendRecording}
                    className="h-6 w-6 text-primary hover:bg-primary/10 transition-colors"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {newMessage.trim() ? (
              <Button 
                onClick={() => {
                  if (newMessage.trim()) {
                    const messageContent = chatMode === "notes" 
                      ? `**Nota**\n${newMessage}`
                      : isSignatureEnabled 
                        ? `**${editedName}:**\n${newMessage}`
                        : newMessage;
                        
                    onSendMessage(messageContent);
                    setNewMessage("");
                  }
                }}
                size="icon" 
                variant="ghost"
                className="hover:bg-primary/10 transition-colors"
              >
                <Send className="h-5 w-5" />
              </Button>
            ) : chatMode === "message" ? (
              <Button 
                onClick={startRecording} 
                size="icon"
                variant="ghost"
                className="text-primary hover:text-primary/90 hover:bg-primary/10 transition-colors"
                disabled={isRecording}
              >
                <Mic className="h-5 w-5" />
              </Button>
            ) : null}
          </div>
        </div>
      </div>

      <ChatbotsDialog
        isOpen={isChatbotsOpen}
        onClose={() => setIsChatbotsOpen(false)}
        chatbots={[
          {
            id: "1",
            name: "Assistente de Vendas",
            description: "Auxilia em questões relacionadas a vendas e produtos"
          },
          {
            id: "2",
            name: "Suporte Técnico",
            description: "Ajuda com problemas técnicos e dúvidas sobre o sistema"
          }
        ]}
        onSelectChatbot={(chatbotId) => {
          console.log('Selected chatbot:', chatbotId);
          setIsChatbotsOpen(false);
        }}
      />
    </div>
  );
}