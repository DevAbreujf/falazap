
import { useState } from "react";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { WizardSteps } from "@/components/agent-config/WizardSteps";
import { ProfileStep } from "@/components/agent-config/ProfileStep";
import { BehaviorStep } from "@/components/agent-config/BehaviorStep";
import { KnowledgeBaseStep } from "@/components/agent-config/KnowledgeBaseStep";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function ConfigurarAgente() {
  const [currentStep, setCurrentStep] = useState(1);
  const { setOpenMobile } = useSidebar();

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfileStep />;
      case 2:
        return <BehaviorStep />;
      case 3:
        return <KnowledgeBaseStep />;
      default:
        return <ProfileStep />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          {/* Header Mobile Fixo */}
          <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b md:hidden">
            <div className="flex items-center justify-between px-4 h-14">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setOpenMobile(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10 space-y-8 pt-16 md:pt-6">
            <WizardSteps currentStep={currentStep} onStepClick={handleStepClick} />
            <div className="bg-white rounded-lg shadow-sm">
              {renderStep()}
            </div>
            <div className="flex justify-between pt-4">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handleBack}>
                  Voltar
                </Button>
              )}
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="ml-auto bg-emerald-400 hover:bg-emerald-300">
                  Próximo
                </Button>
              ) : (
                <Button className="ml-auto">Treinar e publicar</Button>
              )}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
