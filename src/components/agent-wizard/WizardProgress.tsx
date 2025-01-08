interface WizardProgressProps {
  currentStep: number;
}

export function WizardProgress({ currentStep }: WizardProgressProps) {
  const steps = [
    { number: 1, label: "Perfil" },
    { number: 2, label: "Comportamento" },
    { number: 3, label: "Base de conhecimento" },
  ];

  return (
    <div className="flex gap-8">
      {steps.map((step) => (
        <div
          key={step.number}
          className={`flex items-center gap-2 ${
            currentStep >= step.number ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              currentStep >= step.number
                ? "bg-primary text-white"
                : "bg-muted"
            }`}
          >
            {step.number}
          </div>
          {step.label}
        </div>
      ))}
    </div>
  );
}