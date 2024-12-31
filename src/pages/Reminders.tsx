import { useState } from "react";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { CountrySelector } from "@/components/app/reminders/CountrySelector";
import { PhoneInput } from "@/components/app/reminders/PhoneInput";

export default function Reminders() {
  const [selectedContact, setSelectedContact] = useState("");
  const [messageType, setMessageType] = useState<"whatsapp" | "sms">("whatsapp");
  const [message, setMessage] = useState("");
  const [contactType, setContactType] = useState<"existing" | "manual">("existing");
  const [manualPhone, setManualPhone] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("BR");
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
                  Tipo de contato
                </Label>
                <Select
                  value={contactType}
                  onValueChange={(value: "existing" | "manual") => {
                    setContactType(value);
                    setSelectedContact("");
                    setManualPhone("");
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
              ) : (
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Digite o número
                  </Label>
                  <div className="space-y-2">
                    <CountrySelector 
                      selectedCountry={selectedCountry}
                      onCountryChange={setSelectedCountry}
                    />
                    <div className="relative">
                      <PhoneInput
                        value={manualPhone}
                        onChange={setManualPhone}
                      />
                    </div>
                  </div>
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