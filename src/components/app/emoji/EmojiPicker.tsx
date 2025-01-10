import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji: string;
}

// Simple emoji dataset organized by categories
const emojiData = {
  pessoas: ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳"],
  natureza: ["🌱", "🌲", "🌳", "🌴", "🌵", "🌿", "☘️", "🍀", "🌺", "🌻", "🌼", "🌷", "🌹", "🌸", "💐", "🍄", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"],
  comidas: ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦"],
  objetos: ["📱", "💻", "⌚️", "📷", "🎥", "🔋", "💡", "🔍", "✂️", "📏", "📐", "📌", "📍", "📎", "🔒", "🔑", "🔨", "🛠", "⚙️", "🔧"],
};

export function EmojiPicker({ onEmojiSelect, selectedEmoji }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const filteredEmojis = searchTerm
    ? Object.values(emojiData)
        .flat()
        .filter(emoji => emoji.includes(searchTerm))
    : null;

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
      <PopoverContent className="w-80 p-0" align="start">
        <div className="p-2 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Nome do emoji"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="h-[300px]">
          {filteredEmojis ? (
            <div className="grid grid-cols-8 gap-1 p-2">
              {filteredEmojis.map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="p-2 hover:bg-muted rounded-md text-lg"
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            Object.entries(emojiData).map(([category, emojis]) => (
              <div key={category} className="mb-4">
                <h3 className="px-2 text-sm font-medium text-muted-foreground capitalize mb-2">
                  {category}
                </h3>
                <div className="grid grid-cols-8 gap-1 px-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="p-2 hover:bg-muted rounded-md text-lg"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}