import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PhoneNumberInput } from "./PhoneNumberInput";
import type { Country } from 'react-phone-number-input';

interface ContactFormProps {
  contactType: "existing" | "manual";
  onContactTypeChange: (value: "existing" | "manual") => void;
  selectedContact: string;
  onContactChange: (value: string) => void;
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  manualPhone: string;
  onPhoneChange: (value: string) => void;
}

export function ContactForm({
  contactType,
  onContactTypeChange,
  selectedContact,
  onContactChange,
  selectedCountry,
  onCountryChange,
  manualPhone,
  onPhoneChange,
}: ContactFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm font-medium text-foreground">
          Tipo de contato
        </Label>
        <Select
          value={contactType}
          onValueChange={(value: "existing" | "manual") => {
            onContactTypeChange(value);
            onContactChange("");
            onPhoneChange("");
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o tipo de contato" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="existing">Contato existente</SelectItem>
            <SelectItem value="manual">Digitar número manualmente</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {contactType === "existing" ? (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Selecione o contato
          </Label>
          <Select value={selectedContact} onValueChange={onContactChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um contato" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">João da Silva - (11) 99999-9999</SelectItem>
              <SelectItem value="2">Maria Santos - (11) 98888-8888</SelectItem>
              <SelectItem value="3">Pedro Oliveira - (11) 97777-7777</SelectItem>
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Digite o número
          </Label>
          <PhoneNumberInput
            selectedCountry={selectedCountry}
            onCountryChange={onCountryChange}
            manualPhone={manualPhone}
            onPhoneChange={onPhoneChange}
          />
        </div>
      )}
    </div>
  );
}