import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Tag {
  id: string;
  emoji: string;
  name: string;
  description: string;
  backgroundColor: string;
  createdAt?: Date;
}

interface TagListProps {
  tags: Tag[];
  onDeleteTag: (id: string) => void;
  onEditTag: (tag: Tag) => void;
}

export function TagList({ tags, onDeleteTag, onEditTag }: TagListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagToDelete, setTagToDelete] = useState<string | null>(null);

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Buscar etiquetas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 bg-slate-50 border-b border-slate-200">
          <div className="font-medium text-slate-700">Etiqueta</div>
          <div className="font-medium text-slate-700">Criada</div>
          <div className="font-medium text-slate-700 text-right">Ações</div>
        </div>

        {/* Tags */}
        <div className="divide-y divide-slate-200">
          {filteredTags.map((tag) => (
            <div
              key={tag.id}
              className="grid grid-cols-[auto_1fr_auto] gap-4 p-4 items-center hover:bg-slate-50"
            >
              <div className="flex items-center gap-2">
                <div
                  className="px-3 py-1.5 rounded-md flex items-center gap-2"
                  style={{ backgroundColor: tag.backgroundColor }}
                >
                  <span>{tag.emoji}</span>
                  <span className="font-medium">{tag.name}</span>
                </div>
              </div>
              <div className="text-sm text-slate-600">
                {formatDistanceToNow(tag.createdAt || new Date(), {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </div>
              <div className="flex items-center gap-2 justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEditTag(tag)}
                  className="h-8 w-8 hover:bg-slate-200/50"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTagToDelete(tag.id)}
                  className="h-8 w-8 hover:bg-slate-200/50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AlertDialog open={!!tagToDelete} onOpenChange={() => setTagToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir etiqueta</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta etiqueta? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (tagToDelete) {
                  onDeleteTag(tagToDelete);
                  setTagToDelete(null);
                }
              }}
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}