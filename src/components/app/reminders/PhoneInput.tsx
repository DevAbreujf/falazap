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
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara conforme a quantidade de números
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 3) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3)}`;
    } else if (numbers.length <= 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7)}`;
    } else {
      // Limita a 11 dígitos (2 DDD + 9 + 8 números)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 3)} ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatPhoneNumber(e.target.value);
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
        placeholder="(00) 9 0000-0000"
        value={value}
        onChange={handlePhoneChange}
        className="flex-1"
        inputMode="numeric"
        // Removendo o pattern para não conflitar com a máscara
      />
    </div>
  );
}