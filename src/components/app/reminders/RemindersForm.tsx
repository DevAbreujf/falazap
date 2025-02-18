
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageInput } from "./MessageInput";
import { FileAttachments } from "./FileAttachments";
import { PhoneNumberInput } from "./PhoneNumberInput";
import type { Country } from 'react-phone-number-input';
import { Separator } from "@/components/ui/separator";

export function RemindersForm() {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCountry] = useState<Country>("BR");
  const [manualPhone, setManualPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      message,
      selectedFile,
      selectedCountry,
      manualPhone,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <div className="space-y-8 max-w-5xl mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Criar Lembrete
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-transparent rounded-full" />
          <p className="text-muted-foreground">
            Configure seu lembrete para envio automático
          </p>
        </div>

        <div className="flex gap-8 relative">
          <div className="flex-1 space-y-6">
            <div className="glass-card p-6 rounded-xl border border-white/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
              <PhoneNumberInput
                selectedCountry={selectedCountry}
                onCountryChange={() => {}} // Fixado como Brasil
                manualPhone={manualPhone}
                onPhoneChange={setManualPhone}
              />
            </div>
            
            <div className="glass-card p-6 rounded-xl border border-white/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
              <MessageInput value={message} onChange={setMessage} />
            </div>
          </div>

          <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2">
            <div className="h-full w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />
          </div>

          <div className="flex-1 space-y-6">
            <div className="glass-card p-6 rounded-xl border border-white/20 backdrop-blur-sm shadow-md hover:shadow-lg transition-shadow duration-300">
              <FileAttachments onFileSelect={(file) => setSelectedFile(file)} />
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full bg-primary hover:opacity-90 transition-all duration-300 py-6 text-lg font-medium rounded-xl shadow-md hover:shadow-lg"
            >
              Agendar Lembrete
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
