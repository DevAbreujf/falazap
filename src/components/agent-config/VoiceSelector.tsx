import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface VoiceSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const VoiceSelector = ({ value, onChange }: VoiceSelectorProps) => {
  const voices = [
    "Arla", "Roger", "Sarah", "Laura", "Charlie",
    "George", "Callum", "River", "Liam", "Charlotte", "Alice"
  ];

  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">Voz</FormLabel>
      <FormControl>
        <RadioGroup
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          value={value}
          onValueChange={onChange}
        >
          {voices.map((voice) => (
            <div
              key={voice}
              className={`flex items-center gap-2 p-2 border rounded-lg cursor-pointer transition-colors hover:bg-primary/5 ${
                value === voice ? "border-primary bg-primary/5" : "border-gray-200"
              }`}
            >
              <RadioGroupItem value={voice} id={voice} className="hidden" />
              <label htmlFor={voice} className="flex items-center gap-2 text-sm cursor-pointer w-full">
                <span className="w-2 h-2 rounded-full bg-primary/60" />
                {voice}
              </label>
            </div>
          ))}
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};