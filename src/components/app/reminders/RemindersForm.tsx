import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Country } from 'react-phone-number-input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useSchedules } from "@/hooks/use-schedules";
import { ManualPhoneSection } from "./ManualPhoneSection";
import { MessageTypeSelector } from "./MessageTypeSelector";
import { FileAttachments } from "./FileAttachments";
import { MessageInput } from "./MessageInput";

export function RemindersForm() {
  const [message, setMessage] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>("BR");
  const [reminderName, setReminderName] = useState("");
  const [clientName, setClientName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { addSchedule } = useSchedules();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!reminderName) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome do lembrete",
        variant: "destructive",
      });
      return;
    }

    if (!clientName) {
      toast({
        title: "Erro",
        description: "Por favor, digite o nome do cliente",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione a data e hora de envio",
        variant: "destructive",
      });
      return;
    }

    if (!manualPhone) {
      toast({
        title: "Erro",
        description: "Por favor, digite um número de telefone",
        variant: "destructive",
      });
      return;
    }

    if (!message) {
      toast({
        title: "Erro",
        description: "Por favor, digite uma mensagem",
        variant: "destructive",
      });
      return;
    }

    const newSchedule = {
      id: crypto.randomUUID(),
      reminderName,
      clientName,
      date: selectedDate,
      time: selectedTime,
      phone: manualPhone,
      attachment: selectedFile,
    };

    addSchedule(newSchedule);

    toast({
      title: "Lembrete agendado",
      description: "Seu lembrete foi agendado com sucesso!",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-background/5 rounded-lg border border-border/5">
        <div className="p-6 space-y-4">
          <div>
            <Label htmlFor="reminderName">Nome do lembrete</Label>
            <Input
              id="reminderName"
              value={reminderName}
              onChange={(e) => setReminderName(e.target.value)}
              placeholder="Digite o nome do lembrete..."
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="clientName">Nome do cliente</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Digite o nome do cliente..."
              className="mt-1.5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Data de envio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left mt-1.5 ${
                      !selectedDate && "text-muted-foreground"
                    }`}
                  >
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label htmlFor="time">Horário de envio</Label>
              <Input
                id="time"
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="mt-1.5"
              />
            </div>
          </div>

          <ManualPhoneSection
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
            manualPhone={manualPhone}
            onPhoneChange={setManualPhone}
          />

          <MessageTypeSelector />

          <FileAttachments onFileSelect={(file) => setSelectedFile(file)} />

          <MessageInput value={message} onChange={setMessage} />

          <Button type="submit" className="w-full">
            Agendar lembrete
          </Button>
        </div>
      </div>
    </form>
  );
}