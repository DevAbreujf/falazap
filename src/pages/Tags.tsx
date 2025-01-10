import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";

const EMOJI_CATEGORIES = [
  { id: 'nature', label: '🌿', title: 'Natureza' },
  { id: 'food', label: '🍔', title: 'Comida e Bebida' },
  { id: 'people', label: '😊', title: 'Pessoas' },
  { id: 'sports', label: '⚽', title: 'Esporte' },
  { id: 'objects', label: '💡', title: 'Objetos' },
  { id: 'travel', label: '✈️', title: 'Viagem' },
  { id: 'symbols', label: '💕', title: 'Símbolos' },
  { id: 'flags', label: '🏁', title: 'Bandeiras' },
];

const BACKGROUND_COLORS = [
  '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E1F5FE', 
  '#E0F2F1', '#FBE9E7', '#F1F8E9', '#FFEBEE', '#EDE7F6',
  '#E0F7FA', '#FFF8E1', '#F9FBE7', '#E8EAF6', '#EFEBE9',
  '#FAFAFA', '#ECEFF1', '#F3E5F5', '#E8F5E9', '#FFF3E0'
];

export default function Tags() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🐻");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [emojiSearch, setEmojiSearch] = useState("");
  const [selectedColor, setSelectedColor] = useState(BACKGROUND_COLORS[0]);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50">
        <DashboardSidebar />
        
        <div className="flex-1 overflow-auto">
          <div className="container py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Etiquetas</h1>
                <p className="text-slate-600 mt-1">
                  Aqui você consegue criar ou gerenciar as configurações das etiquetas da sua organização.
                </p>
              </div>
              <Button 
                onClick={() => setIsDialogOpen(true)}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Nova etiqueta
              </Button>
            </div>

            <div className="flex items-center justify-center h-[400px] bg-white rounded-lg border border-slate-200">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <img 
                    src="/lovable-uploads/a9b06149-fad2-47aa-96ad-d7c74578a28e.png" 
                    alt="Create tag" 
                    className="w-32 h-32 opacity-50"
                  />
                </div>
                <p className="text-slate-600">Crie sua primeira etiqueta!</p>
              </div>
            </div>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle>Criar etiqueta</DialogTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Nome (Máximo 30 caracteres)
                  </label>
                  <div className="flex gap-2">
                    <Popover open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-12 h-10 p-0"
                        >
                          {selectedEmoji}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80 p-0" align="start">
                        <div className="p-4 border-b">
                          <Input
                            placeholder="Nome do emoji"
                            value={emojiSearch}
                            onChange={(e) => setEmojiSearch(e.target.value)}
                            className="w-full"
                          />
                        </div>
                        <div className="grid grid-cols-8 gap-1 p-4">
                          {EMOJI_CATEGORIES.map((category) => (
                            <button
                              key={category.id}
                              className={cn(
                                "p-2 rounded hover:bg-slate-100 transition-colors",
                                category.id === 'people' && "bg-blue-50"
                              )}
                              title={category.title}
                            >
                              {category.label}
                            </button>
                          ))}
                        </div>
                        <div className="grid grid-cols-8 gap-1 p-4 max-h-[300px] overflow-y-auto">
                          {/* Here you would map through the actual emojis based on the selected category */}
                        </div>
                      </PopoverContent>
                    </Popover>
                    <Input placeholder="Nome da etiqueta" className="flex-1" maxLength={30} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição (opcional)
                  </label>
                  <Textarea placeholder="Descreva a finalidade desta etiqueta" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cor de fundo
                  </label>
                  <div className="grid grid-cols-10 gap-2">
                    {BACKGROUND_COLORS.map((color) => (
                      <button
                        key={color}
                        className={cn(
                          "w-6 h-6 rounded-md border",
                          selectedColor === color && "ring-2 ring-blue-500"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button className="bg-blue-500 hover:bg-blue-600">
                  Criar
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </SidebarProvider>
  );
}