import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Smile, Paperclip, Image, Undo2, StickyNote, Edit2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ConversationWindow() {
  const [signatureEnabled, setSignatureEnabled] = useState(false);
  const [signature, setSignature] = useState("João");
  const [isEditingSignature, setIsEditingSignature] = useState(false);
  const [tempSignature, setTempSignature] = useState(signature);

  const handleSaveSignature = () => {
    setSignature(tempSignature);
    setIsEditingSignature(false);
  };

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
        <div className="bg-slate-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-4">
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
          
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <Input 
                placeholder="Digite sua mensagem ou arraste um arquivo..." 
                className="bg-white"
              />
            </div>
            <div className="flex gap-1">
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
            <div className="flex gap-1">
              <Button>
                Mensagem
              </Button>
              <Button variant="outline">
                <StickyNote className="h-5 w-5" />
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