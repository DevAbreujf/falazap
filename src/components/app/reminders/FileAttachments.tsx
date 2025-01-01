import { FileAudio, FilePdf, Image, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface FileAttachmentsProps {
  onFileSelect: (file: File) => void;
}

export function FileAttachments({ onFileSelect }: FileAttachmentsProps) {
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Anexar arquivo
      </Label>
      <div className="glass-card p-4">
        <div className="flex flex-wrap gap-2">
          <label className="cursor-pointer">
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.mp3,.wav"
              className="hidden"
              onChange={handleFileChange}
            />
            <Button
              type="button"
              variant="outline"
              className="bg-background/50 border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Paperclip className="w-4 h-4" />
              Escolher arquivo
            </Button>
          </label>

          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-muted-foreground">
              <FilePdf className="w-4 h-4" />
              PDF
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Image className="w-4 h-4" />
              Imagem
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <FileAudio className="w-4 h-4" />
              Áudio
            </div>
          </div>
        </div>
        {selectedFileName && (
          <p className="mt-2 text-sm text-muted-foreground">
            Arquivo selecionado: {selectedFileName}
          </p>
        )}
      </div>
    </div>
  );
}