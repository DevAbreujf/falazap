import { Label } from "@/components/ui/label";
import { PhoneNumberInput } from "./PhoneNumberInput";
import type { Country } from 'react-phone-number-input';

interface ManualPhoneSectionProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  manualPhone: string;
  onPhoneChange: (value: string) => void;
}

export function ManualPhoneSection({
  selectedCountry,
  onCountryChange,
  manualPhone,
  onPhoneChange,
}: ManualPhoneSectionProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Digite o número
      </Label>
      <div className="glass-effect rounded-lg p-4 border border-white/10 hover:border-primary/20 transition-all duration-300">
        <PhoneNumberInput
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
          manualPhone={manualPhone}
          onPhoneChange={onPhoneChange}
        />
      </div>
    </div>
  );
}