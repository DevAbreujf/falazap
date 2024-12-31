import { Input } from "@/components/ui/input";
import { CountrySelector } from "./CountrySelector";
import type { Country } from 'react-phone-number-input';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

export function PhoneInput({ value, onChange, selectedCountry, onCountryChange }: PhoneInputProps) {
  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');
    const formattedValue = formatPhoneNumber(numericValue);
    onChange(formattedValue);
  };

  return (
    <div className="flex gap-2">
      <CountrySelector 
        selectedCountry={selectedCountry}
        onCountryChange={onCountryChange}
      />
      <Input
        type="tel"
        placeholder="(00) 00000-0000"
        value={value}
        onChange={handlePhoneChange}
        className="flex-1"
        inputMode="numeric"
        pattern="[0-9]*"
      />
    </div>
  );
}