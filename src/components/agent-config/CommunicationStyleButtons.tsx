import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CommunicationStyleButtonsProps {
  value: string;
  onChange: (value: string) => void;
}

export const CommunicationStyleButtons = ({ value, onChange }: CommunicationStyleButtonsProps) => {
  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">Forma de comunicação</FormLabel>
      <FormControl>
        <RadioGroup
          className="flex gap-3"
          value={value}
          onValueChange={onChange}
        >
          <Button
            variant={value === 'normal' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('normal')}
          >
            <RadioGroupItem value="normal" id="normal" className="hidden" />
            👋 Normal
          </Button>
          <Button
            variant={value === 'formal' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('formal')}
          >
            <RadioGroupItem value="formal" id="formal" className="hidden" />
            👔 Formal
          </Button>
          <Button
            variant={value === 'descontraido' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('descontraido')}
          >
            <RadioGroupItem value="descontraido" id="descontraido" className="hidden" />
            🎉 Descontraído
          </Button>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};