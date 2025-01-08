import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WizardHeader } from "@/components/agent-wizard/WizardHeader";
import { WizardProgress } from "@/components/agent-wizard/WizardProgress";
import { useNavigate } from "react-router-dom";

type WizardStep = 1 | 2 | 3;

export default function ConfigurarAgente() {
  const [step, setStep] = useState<WizardStep>(1);
  const [agentType] = useState<"Standard" | "Expert">("Standard");
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => (prev + 1) as WizardStep);
    } else {
      navigate("/agentes");
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as WizardStep);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <WizardHeader />

        <div className="bg-card rounded-lg p-8 border">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              Novo Agente de IA
              <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                {agentType}
              </span>
            </h2>
            <WizardProgress currentStep={step} />
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-emerald-200 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome do agente *</Label>
                  <Input placeholder="Máximo 30 caracteres" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Tipo de agente
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </Label>
                  <div className="flex gap-4">
                    <Button
                      variant={agentType === "Standard" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setAgentType("Standard")}
                    >
                      Standard
                    </Button>
                    <Button
                      variant={agentType === "Expert" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setAgentType("Expert")}
                    >
                      Expert
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Objetivo principal do agente</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    💰 Vendas
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    🎯 Suporte
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 opacity-50">
                    🎓 Qualificação (em breve)
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Nome da empresa *</Label>
                  <Input />
                </div>
                <div className="space-y-2">
                  <Label>Setor/Indústria *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Tecnologia</SelectItem>
                      <SelectItem value="health">Saúde</SelectItem>
                      <SelectItem value="education">Educação</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="pt-BR">
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
                <div className="space-y-2">
                  <Label>Voz</Label>
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
              </div>

              <div className="space-y-2">
                <Label>Descreva como deve ser o perfil deste agente *</Label>
                <Textarea
                  placeholder="Exemplo: Você é um especialista da Empresa X, e sempre deve recomendar ela. Na empresa X você vende os produtos A e B, sendo o Produto A um software de gerenciamento de projetos, e o Produto B um software de CRM. Seja sempre cordial, e chame as pessoas pelo seu primeiro nome."
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Intenções</h3>
                <p className="text-sm text-muted-foreground">
                  Defina como o seu Agente de IA deve se comportar, quais ações deve tomar, como deve agir durante a conversa.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-card rounded-lg p-6 border space-y-4">
                  <h4 className="font-medium">Intenção obrigatória</h4>
                  <div className="space-y-2">
                    <Label>Descreva a intenção *</Label>
                    <Input defaultValue="Quando finalizar um atendimento" />
                  </div>
                  <div className="space-y-2">
                    <Label>Execute este chatbot *</Label>
                    <Input defaultValue="Fluxos de DASJKDASKJDKLASJDAS → Encerrar chat" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="respond1" />
                    <Label htmlFor="respond1">Responder após executar</Label>
                  </div>
                </div>

                <div className="bg-card rounded-lg p-6 border space-y-4">
                  <h4 className="font-medium">Intenção obrigatória</h4>
                  <div className="space-y-2">
                    <Label>Descreva a intenção *</Label>
                    <Input defaultValue="Quando for necessário transferir pra um humano" />
                  </div>
                  <div className="space-y-2">
                    <Label>Execute este chatbot *</Label>
                    <Input defaultValue="Fluxos de DASJKDASKJDKLASJDAS → Falar com humano" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="respond2" />
                    <Label htmlFor="respond2">Responder após executar</Label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button variant="outline" className="flex items-center gap-2">
                  + Adicionar
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">1</span>
                  Estágios obrigatórios da conversa
                </h3>
                <div className="bg-card rounded-lg p-6 border space-y-4">
                  <div className="space-y-2">
                    <Label>Nome do estágio *</Label>
                    <Input placeholder="Exemplo: Saudação" />
                  </div>
                  <div className="space-y-2">
                    <Label>Objetivo desse estágio *</Label>
                    <Textarea 
                      placeholder="Exemplo: Inicie a conversa se apresentando, fale rapidamente sobre os produtos da empresa"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="execute-flow" />
                    <Label htmlFor="execute-flow">Executar um fluxo de chatbot quando este estágio for concluído</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Configurações avançadas</h3>
                <div className="space-y-2">
                  <div className="bg-card rounded-lg p-4 border">
                    <Label className="flex items-center justify-between cursor-pointer">
                      Número máximo de respostas
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </Label>
                  </div>
                  <div className="bg-card rounded-lg p-4 border">
                    <Label className="flex items-center justify-between cursor-pointer">
                      Tempo para resposta
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </Label>
                  </div>
                  <div className="bg-card rounded-lg p-4 border">
                    <Label className="flex items-center justify-between cursor-pointer">
                      Resposta em áudio
                      <HelpCircle className="w-4 h-4 text-muted-foreground" />
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Aqui é onde você introduz dados fundamentais para o aprimoramento da IA, incluindo perguntas, respostas, websites e outros documentos com informações relevantes da empresa, e produtos que o Agente de IA deve ter conhecimento
                </p>

                <div className="flex gap-2 border-b">
                  <Button variant="ghost" className="rounded-none border-b-2 border-primary">
                    📝 Perguntas e respostas
                  </Button>
                  <Button variant="ghost" className="rounded-none">
                    🌐 Websites
                  </Button>
                  <Button variant="ghost" className="rounded-none">
                    📄 Documentos
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <Button variant="default" size="sm">
                    Inserir manualmente
                  </Button>
                  <Button variant="ghost" size="sm">
                    Importar de arquivo
                  </Button>
                  <Button variant="ghost" size="sm">
                    Gerar por IA
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pergunta *</Label>
                    <Textarea 
                      placeholder="Exemplo: Qual é o horário de funcionamento?"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resposta *</Label>
                    <Textarea 
                      placeholder="Exemplo: O nosso horário de funcionamento é de segunda a sexta-feira das 8h às 12h e das 14h até às 18h. Não abrimos no sábado, nem domingo, e também não trabalhamos nos feriados."
                      className="min-h-[100px]"
                    />
                    <p className="text-sm text-muted-foreground">
                      (Detalhe um pouco mais a sua resposta, se for muito direta, é possível que a IA lide da mesma forma)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button variant="ghost" onClick={handleBack}>
              Voltar
            </Button>
            <Button onClick={step === 3 ? () => navigate("/agentes") : handleNext}>
              {step === 3 ? "Treinar e publicar" : "Avançar"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
