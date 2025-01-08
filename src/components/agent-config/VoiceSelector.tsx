import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="h-8">
            <SelectValue placeholder="Selecione a voz" />
          </SelectTrigger>
          <SelectContent>
            {voices.map((voice) => (
              <SelectItem key={voice} value={voice}>
                {voice}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </FormItem>
  );
};