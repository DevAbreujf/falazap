
import { FileAudio, Image, FileText, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface FileAttachmentsProps {
  onFileSelect: (file: File) => void;
}

interface FileSection {
  type: 'pdf' | 'image' | 'audio';
  icon: typeof FileText | typeof Image | typeof FileAudio;
  label: string;
  accept: string;
  maxSize: number;
}

const fileSections: FileSection[] = [
  {
    type: 'pdf',
    icon: FileText,
    label: 'PDF',
    accept: '.pdf',
    maxSize: 10 * 1024 * 1024, // 10MB
  },
  {
    type: 'image',
    icon: Image,
    label: 'Imagem',
    accept: '.jpg,.jpeg,.png',
    maxSize: 5 * 1024 * 1024, // 5MB
  },
  {
    type: 'audio',
    icon: FileAudio,
    label: 'Áudio',
    accept: '.mp3,.wav,.ogg',
    maxSize: 20 * 1024 * 1024, // 20MB
  },
];

export function FileAttachments({ onFileSelect }: FileAttachmentsProps) {
  const [selectedFile, setSelectedFile] = useState<{name: string; type: string} | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, section: FileSection) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > section.maxSize) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: `O arquivo deve ter menos de ${section.maxSize / (1024 * 1024)}MB`
      });
      return;
    }

    // Validate file type
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const acceptedTypes = section.accept.split(',').map(type => type.replace('.', ''));
    
    if (!acceptedTypes.includes(fileExtension || '')) {
      toast({
        variant: "destructive",
        title: "Tipo de arquivo inválido",
        description: `Apenas arquivos ${section.accept} são permitidos nesta seção`
      });
      return;
    }

    setSelectedFile({ name: file.name, type: section.type });
    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent, section: FileSection) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = section.accept;
    
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    input.files = dataTransfer.files;
    
    handleFileChange({ target: input } as any, section);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Anexar arquivo
      </Label>
      <div className={cn(
        "glass-card p-4 hover:border-primary/20 transition-all duration-300",
        isDragging && "border-primary border-2"
      )}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fileSections.map((section) => (
            <div
              key={section.type}
              className={cn(
                "relative group cursor-pointer",
                "rounded-xl border border-dashed border-gray-200 p-4",
                "hover:border-primary/50 hover:bg-primary/5 transition-all duration-300",
                selectedFile?.type === section.type && "border-primary/50 bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, section)}
            >
              <input
                type="file"
                accept={section.accept}
                onChange={(e) => handleFileChange(e, section)}
                className="hidden"
                id={`file-${section.type}`}
              />
              <label
                htmlFor={`file-${section.type}`}
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-all duration-300">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-700">{section.label}</span>
                <span className="text-xs text-gray-500">
                  {section.accept.split(',').join(', ')}
                </span>
                <span className="text-xs text-gray-500">
                  Max: {section.maxSize / (1024 * 1024)}MB
                </span>
              </label>
            </div>
          ))}
        </div>

        {selectedFile && (
          <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {fileSections.find(s => s.type === selectedFile.type)?.icon({
                className: "w-4 h-4 text-primary"
              })}
              <span className="text-sm text-gray-700">{selectedFile.name}</span>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
