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

      <div className="space-y-3">
        {filteredTags.map((tag) => (
          <div
            key={tag.id}
            className="flex items-center justify-between p-4 rounded-lg border border-slate-200"
            style={{ backgroundColor: tag.backgroundColor }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span>{tag.emoji}</span>
                <span className="font-medium">{tag.name}</span>
              </div>
              <span className="text-sm text-slate-600">
                Criada {formatDistanceToNow(tag.createdAt || new Date(), { locale: ptBR, addSuffix: true })}
              </span>
            </div>
            <div className="flex items-center gap-2">
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