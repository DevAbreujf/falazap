import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Country } from 'react-phone-number-input';
import { CountrySelector } from "./CountrySelector";

interface PhoneNumberInputProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  manualPhone: string;
  onPhoneChange: (value: string) => void;
}

export function PhoneNumberInput({
  selectedCountry,
  onCountryChange,
  manualPhone,
  onPhoneChange,
}: PhoneNumberInputProps) {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length <= 2) {
      return `(${numbers}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
    onPhoneChange(formattedValue);
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium text-foreground/90">
        Número
      </Label>
      <div className="space-y-4">
        <CountrySelector
          selectedCountry={selectedCountry}
          onCountryChange={onCountryChange}
        />
        <Input
          type="tel"
          placeholder="(00) 00000-0000"
          value={manualPhone}
          onChange={handlePhoneChange}
          className="bg-white/50 backdrop-blur-sm border-white/20 focus:border-primary/20 transition-all duration-300"
          maxLength={15}
        />
      </div>
    </div>
  );
}