import { Input } from "@/components/ui/input";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({ value, onChange }: PhoneInputProps) {
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
    <Input
      type="tel"
      placeholder="(00) 00000-0000"
      value={value}
      onChange={handlePhoneChange}
      className="w-full"
      inputMode="numeric"
      pattern="[0-9]*"
    />
  );
}