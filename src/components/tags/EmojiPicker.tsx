import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onEmojiSelect: (emoji: any) => void;
}

export function EmojiPicker({ isOpen, onClose, onEmojiSelect }: EmojiPickerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-0 shadow-xl w-[370px] overflow-hidden">
        <DialogHeader className="px-4 py-2 border-b flex flex-row items-center justify-between">
          <DialogTitle className="text-lg">Escolha um emoji</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 p-0 hover:bg-slate-100 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-2 overflow-auto">
          <Picker
            data={data}
            onEmojiSelect={onEmojiSelect}
            locale="pt"
            theme="light"
            previewPosition="none"
            skinTonePosition="none"
            className="!border-0"
            style={{
              '--em-rgb-background': '255, 255, 255',
              '--em-rgb-input': '241, 245, 249',
              '--em-rgb-color': '15, 23, 42',
            } as React.CSSProperties}
            i18n={{
              search: 'Pesquisar',
              categories: {
                recent: 'Recentes',
                smileys: 'Sorrisos e Emoções',
                people: 'Pessoas',
                nature: 'Natureza',
                foods: 'Comidas',
                activity: 'Atividades',
                places: 'Viagens',
                objects: 'Objetos',
                symbols: 'Símbolos',
                flags: 'Bandeiras'
              }
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}