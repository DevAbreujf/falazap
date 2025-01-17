import { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

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

  const handleClose = () => {
    setIsAddContactMode(false);
    setSearchTerm("");
    setNewContact({ name: "", phone: "", avatar: null });
    onOpenChange(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewContact(prev => ({ ...prev, avatar: file }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} modal>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={handleClose}>
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
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="name">Nome</label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="phone">Celular</label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact(prev => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddContactMode(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                setIsAddContactMode(false);
                toast({
                  title: "Contato salvo",
                  description: "O contato foi salvo com sucesso.",
                });
              }}>
                Salvar
              </Button>
            </DialogFooter>
          </div>
        ) : (
          <>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}