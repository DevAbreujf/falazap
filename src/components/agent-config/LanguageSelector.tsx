import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const LanguageSelector = ({ value, onChange }: LanguageSelectorProps) => {
  const languages = [
    { id: "pt-br", label: "Português Brasil" },
    { id: "fr", label: "Francês" },
    { id: "en", label: "Inglês" },
    { id: "es", label: "Espanhol" }
  ];

  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">Idioma</FormLabel>
      <FormControl>
        <RadioGroup
          className="grid grid-cols-2 gap-2"
          value={value}
          onValueChange={onChange}
        >
          {languages.map(({ id, label }) => (
            <div
              key={id}
              className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors hover:bg-primary/5 ${
                value === id ? "border-primary bg-primary/5" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={id} id={id} className="hidden" />
              <label htmlFor={id} className="flex items-center gap-2 text-sm cursor-pointer w-full">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                {label}
              </label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};