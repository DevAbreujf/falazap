import { useState } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, CalendarCheck, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/app/reminders/PhoneInput";
import { Input } from "@/components/ui/input";
import type { Country } from 'react-phone-number-input';
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Reminders() {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState("");
  const [messageType, setMessageType] = useState<"whatsapp" | "sms">("whatsapp");
  const [message, setMessage] = useState("");
  const [contactType, setContactType] = useState<"existing" | "manual">("existing");
  const [manualPhone, setManualPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>("BR");
  const [clientName, setClientName] = useState("");
  const [reminderName, setReminderName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    if (!selectedDate || !selectedTime) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma data e horário",
        variant: "destructive",
      });
      return;
    }

    if (!reminderName) {
      toast({
        title: "Erro",
        description: "Por favor, dê um nome ao lembrete",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the reminder data
    toast({
      title: "Lembrete agendado",
      description: "Seu lembrete foi agendado com sucesso!",
    });

    // Navigate to schedules page after successful creation
    navigate("/schedules");
  };

  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gradient-primary">
              Lembretes
            </h1>
            <Button
              onClick={() => navigate("/schedules")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4" />
              Agendamentos
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="glass-card p-6 space-y-6">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Nome do Lembrete
                </Label>
                <Input
                  placeholder="Digite um nome para identificar este lembrete"
                  value={reminderName}
                  onChange={(e) => setReminderName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Data de Envio
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarCheck className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Horário de Envio
                </Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Tipo de contato
                </Label>
                <Select
                  value={contactType}
                  onValueChange={(value: "existing" | "manual") => {
                    setContactType(value);
                    setSelectedContact("");
                    setManualPhone("");
                    setClientName("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de contato" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="existing">Contato existente</SelectItem>
                    <SelectItem value="manual">Digitar número manualmente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {contactType === "existing" ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Nome do cliente
                    </Label>
                    <Input
                      placeholder="Digite o nome do cliente"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Selecione o contato
                    </Label>
                    <Select value={selectedContact} onValueChange={setSelectedContact}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um contato" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">João da Silva - (11) 99999-9999</SelectItem>
                        <SelectItem value="2">Maria Santos - (11) 98888-8888</SelectItem>
                        <SelectItem value="3">Pedro Oliveira - (11) 97777-7777</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Digite o número
                  </Label>
                  <PhoneInput
                    value={manualPhone}
                    onChange={setManualPhone}
                    selectedCountry={selectedCountry}
                    onCountryChange={setSelectedCountry}
                  />
                </div>
              )}

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
