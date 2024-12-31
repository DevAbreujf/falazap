import { CountrySelector } from "./CountrySelector";
import { PhoneInput } from "./PhoneInput";
import type { Country } from 'react-phone-number-input';

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
  return (
    <div className="grid grid-cols-[120px_1fr] gap-2">
      <CountrySelector
        selectedCountry={selectedCountry}
        onCountryChange={onCountryChange}
      />
      <PhoneInput
        value={manualPhone}
        onChange={onPhoneChange}
      />
    </div>
  );
}