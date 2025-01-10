import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji: string;
}

export function EmojiPicker({ onEmojiSelect, selectedEmoji }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji.native);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-12 h-10 p-0 hover:bg-muted/50"
        >
          {selectedEmoji}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[352px] p-0" align="start">
        <Picker 
          data={data} 
          onEmojiSelect={handleEmojiSelect}
          theme="light"
          skinTonePosition="none"
          previewPosition="none"
          searchPosition="top"
          navPosition="top"
          perLine={8}
        />
      </PopoverContent>
    </Popover>
  );
}