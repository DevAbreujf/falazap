import { useState } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Country } from 'react-phone-number-input';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ContactForm } from "@/components/app/reminders/ContactForm";

export default function Reminders() {
  const [selectedContact, setSelectedContact] = useState("");
  const [messageType, setMessageType] = useState<"whatsapp" | "sms">("whatsapp");
  const [message, setMessage] = useState("");
  const [contactType, setContactType] = useState<"existing" | "manual">("existing");
  const [manualPhone, setManualPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>("BR");
  const [reminderName, setReminderName] = useState("");
  const [clientName, setClientName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
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

    const phoneNumber = contactType === "existing" ? selectedContact : manualPhone;
    
    if (!phoneNumber) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um contato ou digite um número",
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

    toast({
      title: "Lembrete agendado",
      description: "Seu lembrete foi agendado com sucesso!",
    });
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gradient-primary mb-8">
            Lembretes
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Nome do lembrete
                </Label>
                <Input
                  value={reminderName}
                  onChange={(e) => setReminderName(e.target.value)}
                  placeholder="Digite o nome do lembrete..."
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Nome do cliente
                </Label>
                <Input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Digite o nome do cliente..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Data de envio
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
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

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Horário de envio
                  </Label>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <ContactForm
                contactType={contactType}
                onContactTypeChange={setContactType}
                selectedContact={selectedContact}
                onContactChange={setSelectedContact}
                selectedCountry={selectedCountry}
                onCountryChange={setSelectedCountry}
                manualPhone={manualPhone}
                onPhoneChange={setManualPhone}
              />

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Tipo de mensagem
                </Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={messageType === "whatsapp" ? "default" : "outline"}
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => setMessageType("whatsapp")}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button
                    type="button"
                    variant={messageType === "sms" ? "default" : "outline"}
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={() => setMessageType("sms")}
                  >
                    <MessageSquare className="w-4 h-4" />
                    SMS
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Mensagem do lembrete
                </Label>
                <Textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Digite a mensagem do lembrete..."
                  className="h-32"
                />
              </div>

              <Button type="submit" className="w-full">
                Agendar lembrete
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}