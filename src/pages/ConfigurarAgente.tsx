import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { WizardSteps } from "@/components/agent-config/WizardSteps";
import { ProfileStep } from "@/components/agent-config/ProfileStep";
import { BehaviorStep } from "@/components/agent-config/BehaviorStep";
import { KnowledgeBaseStep } from "@/components/agent-config/KnowledgeBaseStep";

export default function ConfigurarAgente() {
  const [currentStep, setCurrentStep] = useState(1);

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
          <main className="container mx-auto p-4 md:p-8 lg:px-8 xl:px-10 space-y-8">
            <WizardSteps currentStep={currentStep} onStepClick={handleStepClick} />
            <div className="bg-white rounded-lg shadow-sm">
              {renderStep()}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}