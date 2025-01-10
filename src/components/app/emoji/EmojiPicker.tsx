import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  selectedEmoji: string;
}

// WhatsApp-style emoji dataset organized by categories
const emojiData = {
  recentes: ["😀", "❤️", "😊", "🎉", "👍", "🙏", "💕", "😍"],
  pessoas: [
    "😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", 
    "😘", "😗", "😙", "😚", "😋", "😛", "😝", "😜", "🤪", "🤨", "🧐", "🤓", "😎", "🤩", "🥳",
    "😏", "😒", "😞", "😔", "😟", "😕", "🙁", "☹️", "😣", "😖", "😫", "😩", "🥺", "😢", "😭",
    "😤", "😠", "😡", "🤬", "🤯", "😳", "🥵", "🥶", "😱", "😨", "😰", "😥", "😓", "🤗", "🤔"
  ],
  natureza: [
    "🌱", "🌲", "🌳", "🌴", "🌵", "🌿", "☘️", "🍀", "🌺", "🌻", "🌼", "🌷", "🌹", "🌸", "💐",
    "🍄", "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"
  ],
  comidas: [
    "🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥",
    "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶", "🌽", "🥕", "🥔", "🍠", "🥐", "🥯", "🍞"
  ],
  atividades: [
    "⚽️", "🏀", "🏈", "⚾️", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑",
    "🥍", "🏏", "⛳️", "🪁", "🎣", "🤿", "🎽", "🛹", "🛼", "🛷", "⛸", "🥌", "🎿", "⛷", "🏂"
  ],
  viagem: [
    "✈️", "🚗", "🚕", "🚙", "🚌", "🚎", "🏎", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜",
    "🛵", "🏍", "🛺", "🚲", "🛴", "🚨", "🚔", "🚍", "🚘", "🚖", "🛩", "🚀", "🛸", "🚁", "🛶"
  ],
  objetos: [
    "📱", "💻", "⌚️", "📷", "🎥", "🔋", "💡", "🔍", "✂️", "📏", "📐", "📌", "📍", "📎", "🔒",
    "🔑", "🔨", "🛠", "⚙️", "🔧", "🪛", "🔩", "⚡️", "📡", "🔋", "🔌", "💡", "🔦", "🕯", "🪔"
  ],
  simbolos: [
    "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗",
    "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛕"
  ]
};

type EmojiCategory = keyof typeof emojiData;

export function EmojiPicker({ onEmojiSelect, selectedEmoji }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>("recentes");

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setIsOpen(false);
  };

  const filteredEmojis = searchTerm
    ? Object.values(emojiData)
        .flat()
        .filter(emoji => emoji.includes(searchTerm))
    : null;

  const categories: { key: EmojiCategory; icon: string }[] = [
    { key: "recentes", icon: "🕒" },
    { key: "pessoas", icon: "😀" },
    { key: "natureza", icon: "🌲" },
    { key: "comidas", icon: "🍔" },
    { key: "atividades", icon: "⚽️" },
    { key: "viagem", icon: "✈️" },
    { key: "objetos", icon: "💡" },
    { key: "simbolos", icon: "❤️" },
  ];

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

        {/* Category tabs */}
        <div className="border-b">
          <div className="flex p-2 gap-1">
            {categories.map(({ key, icon }) => (
              <Button
                key={key}
                variant="ghost"
                size="icon"
                className={cn(
                  "w-8 h-8 p-0",
                  activeCategory === key && "bg-blue-100 text-blue-600"
                )}
                onClick={() => setActiveCategory(key)}
              >
                {icon}
              </Button>
            ))}
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
            <div className="p-2">
              <h3 className="text-sm font-medium text-muted-foreground capitalize mb-2">
                {activeCategory}
              </h3>
              <div className="grid grid-cols-8 gap-1">
                {emojiData[activeCategory].map((emoji, index) => (
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
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}