import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default function ConfigurarAgente() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agentType, setAgentType] = useState<"standard" | "expert">("standard");

  return (
    <div className="min-h-screen bg-gray-50/50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/agentes")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Novo Agente de IA
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Standard
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="relative">
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="mt-2 text-sm font-medium">Perfil</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="mt-2 text-sm font-medium">Comportamento</span>
            </div>
            <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="mt-2 text-sm font-medium">Base de conhecimento</span>
            </div>
          </div>
        </div>

        {/* Step 1: Profile */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/30 rounded-full" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="agent-name">Nome do agente *</Label>
                <Input id="agent-name" placeholder="Máximo 30 caracteres" />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  Tipo de agente
                  <HelpCircle className="w-4 h-4 text-gray-400" />
                </Label>
                <div className="flex items-center gap-4 mt-2">
                  <Button
                    variant={agentType === "standard" ? "default" : "outline"}
                    onClick={() => setAgentType("standard")}
                    className="flex-1"
                  >
                    Standard
                  </Button>
                  <Button
                    variant={agentType === "expert" ? "default" : "outline"}
                    onClick={() => setAgentType("expert")}
                    className="flex-1"
                  >
                    Expert
                  </Button>
                </div>
              </div>

              <div>
                <Label>Objetivo principal do agente</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <Button variant="outline" className="justify-start">
                    🎯 Vendas
                  </Button>
                  <Button variant="outline" className="justify-start">
                    📞 Suporte
                  </Button>
                  <Button variant="outline" className="justify-start">
                    🎓 Qualificação
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="company-name">Nome da empresa *</Label>
                <Input id="company-name" />
              </div>

              <div>
                <Label htmlFor="sector">Setor/Indústria *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Tecnologia</SelectItem>
                    <SelectItem value="retail">Varejo</SelectItem>
                    <SelectItem value="education">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="language">Idioma</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português do Brasil</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="voice">Voz</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculina</SelectItem>
                    <SelectItem value="female">Feminina</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="profile-description">
                  Descreva como deve ser o perfil deste agente *
                </Label>
                <Textarea
                  id="profile-description"
                  placeholder="Exemplo: Você é um especialista da Empresa X, e sempre deve recomendar ela. Na empresa X você vende os produtos A e B, sendo o Produto A um software de gerenciamento de projetos, e o Produto B um software de CRM. Seja sempre cordial, e chame as pessoas pelo seu primeiro nome."
                  className="h-32"
                />
              </div>
            </div>

            <div className="flex justify-end pt-6">
              <Button onClick={() => setStep(2)}>
                Avançar
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Voltar
            </Button>
          )}
          {step < 3 && step !== 1 && (
            <Button onClick={() => setStep(step + 1)}>
              Avançar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}