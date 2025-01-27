import { FileAudio, Image, FileText } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FileAttachmentsProps {
  onFileSelect: (file: File) => void;
}

export function FileAttachments({ onFileSelect }: FileAttachmentsProps) {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileSelect = (acceptTypes: string) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = acceptTypes;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setSelectedFileName(file.name);
        onFileSelect(file);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Anexar arquivo
      </Label>
      <div className="glass-card p-4 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => handleFileSelect('.pdf')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={() => handleFileSelect('.jpg,.jpeg,.png')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            <Image className="w-4 h-4" />
            Imagem
          </button>
          <button
            onClick={() => handleFileSelect('.mp3,.wav')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
          >
            <FileAudio className="w-4 h-4" />
            Áudio
          </button>
        </div>
        {selectedFileName && (
          <div className="mt-3 p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm text-muted-foreground">{selectedFileName}</p>
          </div>
        )}
      </div>
    </div>
  );
}