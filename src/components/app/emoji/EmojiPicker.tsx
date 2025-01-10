import { useState } from "react";
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

  const handleEmojiSelect = (emoji: any) => {
    if (emoji && emoji.native) {
      onEmojiSelect(emoji.native);
      setIsOpen(false);
    }
  };

  const handleTriggerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild onClick={handleTriggerClick}>
        <Button
          variant="outline"
          className="w-12 h-10 p-0 hover:bg-muted/50"
        >
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[352px] p-0" 
        align="start"
        onClick={(e) => e.stopPropagation()}
      >
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
          emojiSize={24}
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
      </PopoverContent>
    </Popover>
  );
}