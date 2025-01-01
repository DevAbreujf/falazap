import { FileAudio, Image, Paperclip } from "lucide-react";
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
      <div className="glass-card p-4 hover:border-primary/20 transition-all duration-300">
        <div className="flex flex-wrap gap-4">
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
              className="bg-background/50 border-white/10 hover:bg-white/5 hover:border-primary/50 transition-all duration-300 flex items-center gap-2"
            >
              <Paperclip className="w-4 h-4" />
              Escolher arquivo
            </Button>
          </label>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300">
              <Paperclip className="w-4 h-4" />
              PDF
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300">
              <Image className="w-4 h-4" />
              Imagem
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/20 transition-all duration-300">
              <FileAudio className="w-4 h-4" />
              Áudio
            </div>
          </div>
        </div>
        {selectedFileName && (
          <div className="mt-3 p-2 rounded-lg bg-white/5 border border-white/10">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Paperclip className="w-4 h-4" />
              {selectedFileName}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}