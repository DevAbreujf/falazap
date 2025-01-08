import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WizardSteps } from "@/components/agent-config/WizardSteps";
import { ProfileStep } from "@/components/agent-config/ProfileStep";
import { BehaviorStep } from "@/components/agent-config/BehaviorStep";
import { KnowledgeBaseStep } from "@/components/agent-config/KnowledgeBaseStep";

export default function ConfigurarAgente() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [agentType] = useState<"standard" | "expert">("standard");

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
                  {agentType === "standard" ? "Standard" : "Expert"}
                </span>
              </h1>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <WizardSteps currentStep={step} />

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {step === 1 && <ProfileStep />}
          {step === 2 && <BehaviorStep />}
          {step === 3 && <KnowledgeBaseStep />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => step > 1 && setStep(step - 1)}
            disabled={step === 1}
          >
            Voltar
          </Button>
          <Button onClick={() => step < 3 && setStep(step + 1)}>
            Avançar
          </Button>
        </div>
      </div>
    </div>
  );
}