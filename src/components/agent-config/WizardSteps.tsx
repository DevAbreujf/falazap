import React from "react";

interface WizardStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export const WizardSteps = ({ currentStep, onStepClick }: WizardStepsProps) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center">
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onStepClick(1)}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 1 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            1
          </div>
          <span className="mt-2 text-sm font-medium">Perfil</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onStepClick(2)}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 2 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            2
          </div>
          <span className="mt-2 text-sm font-medium">Comportamento</span>
        </div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-4" />
        <div 
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onStepClick(3)}
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 3 ? 'bg-primary text-white' : 'bg-gray-200'}`}>
            3
          </div>
          <span className="mt-2 text-sm font-medium">Base de conhecimento</span>
        </div>
      </div>
    </div>
  );
};