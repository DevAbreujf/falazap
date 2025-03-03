import { useState } from "react";
import { Search, Plus, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ForwardDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onForward: (contactId: string) => void;
}

export function ForwardDialog({ isOpen, onOpenChange, onForward }: ForwardDialogProps) {
  const [isAddContactMode, setIsAddContactMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [newContact, setNewContact] = useState({ name: "", phone: "", avatar: null as File | null });
  const { toast } = useToast();

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      toast({
        title: "Contato salvo",
        description: "O contato foi salvo com sucesso.",
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setIsAddContactMode(false);
    setSearchTerm("");
    setNewContact({ name: "", phone: "", avatar: null });
  };

  const handleClose = () => {
    resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isAddContactMode ? "Novo Contato" : "Lista de Contatos"}
          </DialogTitle>
        </DialogHeader>
        
        {isAddContactMode ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={newContact.avatar ? URL.createObjectURL(newContact.avatar) : undefined} />
                  <AvatarFallback>
                    <Upload className="h-8 w-8" />
                  </AvatarFallback>
                </Avatar>
                <Input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setNewContact(prev => ({ ...prev, avatar: file }));
                    }
                  }}
                  accept="image/*"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Celular</label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddContactMode(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddContact}>
                Salvar
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou número"
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button size="icon" onClick={() => setIsAddContactMode(true)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-[300px] overflow-y-auto">
              <div className="text-center text-sm text-muted-foreground pt-8">
                Nenhum contato encontrado
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}