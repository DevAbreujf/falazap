import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const BACKGROUND_COLORS = [
  '#E3F2FD', '#E8F5E9', '#FFF3E0', '#F3E5F5', '#E1F5FE', 
  '#E0F2F1', '#FBE9E7', '#F1F8E9', '#FFEBEE', '#EDE7F6',
  '#E0F7FA', '#FFF8E1', '#F9FBE7', '#E8EAF6', '#EFEBE9',
  '#FAFAFA', '#ECEFF1', '#F3E5F5', '#E8F5E9', '#FFF3E0'
];

interface Tag {
  id: string;
  emoji: string;
  name: string;
  description: string;
  backgroundColor: string;
}

export default function Tags() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🏷️");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(BACKGROUND_COLORS[0]);
  const [tagName, setTagName] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
    setIsEmojiPickerOpen(false);
  };

  const handleCreateTag = () => {
    if (tagName.trim()) {
      const newTag: Tag = {
        id: crypto.randomUUID(),
        emoji: selectedEmoji,
        name: tagName,
        description: tagDescription,
        backgroundColor: selectedColor,
      };

      setTags((prevTags) => [...prevTags, newTag]);
      
      // Reset form
      setTagName("");
      setTagDescription("");
      setSelectedEmoji("🏷️");
      setSelectedColor(BACKGROUND_COLORS[0]);
      setIsDialogOpen(false);
    }
  };

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

            {tags.length === 0 ? (
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tags.map((tag) => (
                  <div 
                    key={tag.id}
                    className="p-4 rounded-lg border border-slate-200 bg-white"
                    style={{ backgroundColor: tag.backgroundColor }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span>{tag.emoji}</span>
                      <h3 className="font-medium">{tag.name}</h3>
                    </div>
                    {tag.description && (
                      <p className="text-sm text-slate-600">{tag.description}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
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
                    <Button
                      variant="outline"
                      className="w-12 h-10 p-0"
                      style={{ backgroundColor: selectedColor }}
                      onClick={() => setIsEmojiPickerOpen(true)}
                    >
                      {selectedEmoji}
                    </Button>
                    <Input 
                      placeholder="Nome da etiqueta" 
                      className="flex-1" 
                      maxLength={30}
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Descrição (opcional)
                  </label>
                  <Textarea 
                    placeholder="Descreva a finalidade desta etiqueta"
                    value={tagDescription}
                    onChange={(e) => setTagDescription(e.target.value)}
                  />
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
                          "w-6 h-6 rounded-md border transition-all",
                          selectedColor === color && "ring-2 ring-blue-500 scale-110"
                        )}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex justify-between gap-3 pt-4">
                  <div className="flex items-center gap-2">
                    <div 
                      className="px-3 py-1.5 rounded-md flex items-center gap-2"
                      style={{ backgroundColor: selectedColor }}
                    >
                      <span>{selectedEmoji}</span>
                      <span className="font-medium">{tagName || "Nome da etiqueta"}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancelar
                    </Button>
                    <Button 
                      className="bg-blue-500 hover:bg-blue-600"
                      onClick={handleCreateTag}
                    >
                      Criar
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isEmojiPickerOpen} onOpenChange={setIsEmojiPickerOpen}>
            <DialogContent className="p-0 border-0 shadow-xl">
              <DialogHeader className="px-4 py-2 border-b">
                <DialogTitle className="text-lg">Escolha um emoji</DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEmojiPickerOpen(false)}
                  className="absolute right-2 top-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </DialogHeader>
              <div className="p-2">
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
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
        </div>
      </div>
    </SidebarProvider>
  );
}