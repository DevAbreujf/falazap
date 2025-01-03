import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { MessageInput } from "./MessageInput";
import { FileAttachments } from "./FileAttachments";
import { PhoneNumberInput } from "./PhoneNumberInput";
import { MessageTypeSelector } from "./MessageTypeSelector";
import { CountrySelector } from "./CountrySelector";
import { ManualPhoneSection } from "./ManualPhoneSection";

export function RemindersForm() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isManualPhone, setIsManualPhone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      message,
      selectedFile,
      isManualPhone,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Criar Lembrete</h1>
        <Button type="submit" size="lg" className="w-full md:w-auto">
          Agendar Lembrete
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <MessageTypeSelector />
          <MessageInput value={message} onChange={setMessage} />
          <FileAttachments onFileSelect={(file) => setSelectedFile(file)} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Telefone Manual</span>
            <Switch checked={isManualPhone} onCheckedChange={setIsManualPhone} />
          </div>

          {isManualPhone ? (
            <ManualPhoneSection />
          ) : (
            <>
              <CountrySelector />
              <PhoneNumberInput />
            </>
          )}
        </div>
      </div>
    </form>
  );
}