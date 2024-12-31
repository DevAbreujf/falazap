import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryManagementProps {
  categories: string[];
  selectedContacts: number[];
  newCategory: string;
  selectedCategory: string;
  onAddCategory: (category: string) => void;
  onNewCategoryChange: (value: string) => void;
  onBulkCategoryUpdate: (category: string) => void;
  onCategoryFilterChange: (category: string) => void;
}

export function CategoryManagement({
  categories,
  selectedContacts,
  newCategory,
  selectedCategory,
  onAddCategory,
  onNewCategoryChange,
  onBulkCategoryUpdate,
  onCategoryFilterChange,
}: CategoryManagementProps) {
  return (
    <div className="mb-6 flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
      <div className="flex items-center gap-2">
        <Input
          placeholder="Nova categoria..."
          value={newCategory}
          onChange={(e) => onNewCategoryChange(e.target.value)}
          className="w-full md:w-48"
        />
        <Button onClick={() => onAddCategory(newCategory)}>Adicionar</Button>
      </div>
      {selectedContacts.length > 0 && (
        <div className="flex items-center gap-2">
          <Select onValueChange={onBulkCategoryUpdate}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Mover para categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Select 
          value={selectedCategory} 
          onValueChange={onCategoryFilterChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}