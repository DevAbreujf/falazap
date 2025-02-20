
import { Tag } from "@/types/tags";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

interface TagsTableProps {
  tags: Tag[];
}

export function TagsTable({ tags }: TagsTableProps) {
  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-4 px-6 font-medium">Nome</th>
              <th className="text-left py-4 px-6 font-medium">Cor</th>
              <th className="text-left py-4 px-6 font-medium">Total de Contatos</th>
              <th className="text-right py-4 px-6 font-medium">Ações</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag) => (
              <tr key={tag.id} className="border-b last:border-none hover:bg-slate-50">
                <td className="py-4 px-6">{tag.name}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: tag.color }}
                    />
                    {tag.color}
                  </div>
                </td>
                <td className="py-4 px-6">{tag.totalContacts}</td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
