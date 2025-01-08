import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";

interface CreateAgentWizardProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateAgentWizard({ open, onOpenChange }: CreateAgentWizardProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    tone: "formal",
    welcomeMessage: "",
    whatsappNumber: "",
  });

  const totalSteps = 5;

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name.length > 0 && formData.description.length > 0;
      default:
        return true;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label>Nome do Agente</Label>
              <Input
                placeholder="Ex.: Suporte Virtual"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea
                placeholder="Breve descrição do objetivo deste agente"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <Label>Tom de Voz</Label>
            <RadioGroup
              value={formData.tone}
              onValueChange={(value) => updateFormData("tone", value)}
              className="grid grid-cols-1 gap-4"
            >
              {[
                { value: "formal", label: "Formal", example: "Como posso auxiliá-lo hoje?" },
                { value: "casual", label: "Casual", example: "Oi! Como posso te ajudar?" },
                { value: "friendly", label: "Amigável", example: "Olá! Que bom ter você por aqui! 😊" },
              ].map((tone) => (
                <div key={tone.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={tone.value} id={tone.value} />
                  <Label htmlFor={tone.value} className="flex flex-col">
                    <span className="font-medium">{tone.label}</span>
                    <span className="text-sm text-muted-foreground">{tone.example}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <Label>Número do WhatsApp</Label>
            <Input
              placeholder="+55 (00) 00000-0000"
              value={formData.whatsappNumber}
              onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
            />
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <Label>Mensagem de Boas-Vindas</Label>
            <Textarea
              placeholder="Olá, como posso ajudar hoje?"
              value={formData.welcomeMessage}
              onChange={(e) => updateFormData("welcomeMessage", e.target.value)}
            />
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h3 className="font-medium">Resumo das Configurações</h3>
            <div className="space-y-2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Nome:</span>
                <span className="font-medium">{formData.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Tom de Voz:</span>
                <span className="font-medium capitalize">{formData.tone}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">WhatsApp:</span>
                <span className="font-medium">{formData.whatsappNumber}</span>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Configuração de Novo Agente</DialogTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
            <span>
              Etapa {step} de {totalSteps}
            </span>
          </div>
        </DialogHeader>

        <div className="py-6">{renderStep()}</div>

        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={prevStep}>
                Anterior
              </Button>
            )}
            {step < totalSteps ? (
              <Button onClick={nextStep} disabled={!isStepValid()}>
                Próximo
              </Button>
            ) : (
              <Button className="bg-primary">
                <Check className="mr-2 h-4 w-4" />
                Publicar Agente
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}