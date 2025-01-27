import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Country } from 'react-phone-number-input';

interface PhoneNumberInputProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  manualPhone: string;
  onPhoneChange: (value: string) => void;
}

export function PhoneNumberInput({
  selectedCountry,
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
        Número do WhatsApp
      </Label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          <img
            src={`https://flagcdn.com/${selectedCountry.toLowerCase()}.svg`}
            alt="BR"
            className="w-4 h-3"
          />
          <span className="text-sm text-muted-foreground">+55</span>
        </div>
        <Input
          type="tel"
          placeholder="(00) 00000-0000"
          value={manualPhone}
          onChange={handlePhoneChange}
          className="pl-20"
          maxLength={15}
        />
      </div>
    </div>
  );
}