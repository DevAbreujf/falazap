import { useState, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji: string;
}

export function EmojiPicker({ onEmojiSelect, selectedEmoji }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = useCallback((emoji: any) => {
    if (emoji?.native) {
      onEmojiSelect(emoji.native);
      setIsOpen(false);
    }
  }, [onEmojiSelect]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-10 p-0 hover:bg-muted/50 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <span className="text-lg">{selectedEmoji}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[352px] p-0" 
        align="start"
        sideOffset={5}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="emoji-picker-container">
          <Picker 
            data={data} 
            onEmojiSelect={handleEmojiSelect}
            theme="light"
            skinTonePosition="none"
            previewPosition="none"
            searchPosition="top"
            navPosition="top"
            perLine={8}
            emojiButtonColors={["#000000"]}
            emojiSize={28}
            maxFrequentRows={4}
            icons="auto"
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
      </PopoverContent>
    </Popover>
  );
}