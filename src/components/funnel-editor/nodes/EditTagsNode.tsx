import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import { EditTagsNodeData } from '@/types/flow';
import { Tag, Plus, Minus, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface EditTagsNodeProps {
  data: EditTagsNodeData;
}

export const EditTagsNode = memo(({ data }: EditTagsNodeProps) => {
  const [action, setAction] = useState<'add' | 'remove'>('add');
  const [isTagSelectorOpen, setIsTagSelectorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tags] = useState<Array<{ id: string; name: string; color: string }>>([]);

  const handleTagSelect = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags(prev => prev.filter(id => id !== tagId));
  };

  return (
    <div className="flow-node">
      <div className="flow-node-header">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4" />
          <h3>Editar Etiquetas</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsTagSelectorOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flow-node-content">
        <ToggleGroup type="single" value={action} onValueChange={(value) => value && setAction(value as 'add' | 'remove')}>
          <ToggleGroupItem value="add" className="flex-1">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </ToggleGroupItem>
          <ToggleGroupItem value="remove" className="flex-1">
            <Minus className="h-4 w-4 mr-2" />
            Remover
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="mt-4">
          <Button
            variant="outline"
            className="w-full justify-between"
            onClick={() => setIsTagSelectorOpen(!isTagSelectorOpen)}
          >
            Selecionar etiquetas
            {selectedTags.length > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                {selectedTags.length}
              </span>
            )}
          </Button>

          {selectedTags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedTags.map(tagId => {
                const tag = tags.find(t => t.id === tagId);
                if (!tag) return null;
                
                return (
                  <div
                    key={tag.id}
                    className="group relative flex items-center gap-1 px-2 py-1 rounded-md text-sm"
                    style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                  >
                    <span>{tag.name}</span>
                    <button
                      onClick={() => handleRemoveTag(tag.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {isTagSelectorOpen && (
            <div className="flow-node mt-4 border rounded-lg overflow-hidden">
              <div className="flow-node-header">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  <h3>Etiquetas</h3>
                </div>
              </div>

              <div className="flow-node-content">
                {tags.length === 0 ? (
                  <div className="text-center py-8 space-y-4">
                    <p className="text-gray-500">Nenhum item encontrado</p>
                    <Tag className="h-12 w-12 mx-auto text-gray-400" />
                    <p className="text-sm text-gray-600">
                      Você pode criar etiquetas para utilizar
                    </p>
                    <Button>Criar Etiquetas</Button>
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>

                    <div className="space-y-2 mt-4">
                      {tags.map(tag => (
                        <div
                          key={tag.id}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50"
                        >
                          <div
                            className="px-2 py-1 rounded-md text-sm"
                            style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                          >
                            {tag.name}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleTagSelect(tag.id)}
                            className={cn(
                              "h-6 w-6",
                              selectedTags.includes(tag.id) && "text-primary"
                            )}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2"
      />
    </div>
  );
});

EditTagsNode.displayName = 'EditTagsNode';
