import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, Paperclip, Image, Undo2, StickyNote, Edit2, MessageSquare, Mic } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function ConversationWindow() {
  const [signatureEnabled, setSignatureEnabled] = useState(false);
  const [signature, setSignature] = useState("João");
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const [tempSignature, setTempSignature] = useState(signature);
  const [activeTab, setActiveTab] = useState<'message' | 'notes'>('message');
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

  const handleSaveSignature = () => {
    setSignature(tempSignature);
    setIsEditingSignature(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would implement the logic to send the message
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        // Here you would handle the audio blob, e.g., send it to your server
        console.log("Recording finished:", blob);
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop();
      setIsRecording(false);
      setMediaRecorder(null);
    }
  };

  // ... keep existing code (conversation display section)

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-4 space-y-4 overflow-auto">
        <div className="text-center">
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-full">
            Hoje
          </span>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>UC</AvatarFallback>
            </Avatar>
            <div className="space-y-1 max-w-[80%]">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p>Olá, eu sou o Umblerrito!</p>
              </div>
              <span className="text-xs text-slate-500">11:57</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-white border-t">
        <div className={`rounded-lg p-4 ${activeTab === 'notes' ? 'bg-yellow-50/50' : 'bg-slate-50'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Switch 
                id="sign" 
                checked={signatureEnabled}
                onCheckedChange={setSignatureEnabled}
              />
              <label htmlFor="sign" className="text-sm">Assinar</label>
              {signatureEnabled && (
                <div className="flex items-center gap-2 ml-2">
                  <span className="text-sm text-slate-600">{signature}</span>
                  <button 
                    onClick={() => setIsEditingSignature(true)}
                    className="p-1 hover:bg-slate-200 rounded-full"
                  >
                    <Edit2 className="h-3 w-3 text-slate-600" />
                  </button>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeTab === 'message' ? 'default' : 'outline'}
                onClick={() => setActiveTab('message')}
                className="flex items-center gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Mensagem
              </Button>
              <Button
                variant={activeTab === 'notes' ? 'default' : 'outline'}
                onClick={() => setActiveTab('notes')}
                className="flex items-center gap-2"
              >
                <StickyNote className="h-4 w-4" />
                Notas
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="relative">
              <Textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={
                  activeTab === 'message' 
                    ? "Digite sua mensagem ou arraste um arquivo..." 
                    : "Digite uma nota que só os atendentes do Umbler Talk podem ver..."
                }
                className="min-h-[100px] bg-white pr-16 resize-none"
              />
              <Button
                onClick={isRecording ? stopRecording : startRecording}
                className="absolute right-2 bottom-2"
                size="icon"
                variant={isRecording ? "destructive" : "default"}
              >
                <Mic className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex gap-2 justify-start">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Undo2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isEditingSignature} onOpenChange={setIsEditingSignature}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edição de assinatura</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <Input
              value={tempSignature}
              onChange={(e) => setTempSignature(e.target.value)}
              placeholder="Digite sua assinatura"
            />
            <p className="text-sm text-slate-500">
              Mantenha vazio se quiser utilizar o nome salvo no seu perfil como assinatura.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditingSignature(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveSignature}>
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}