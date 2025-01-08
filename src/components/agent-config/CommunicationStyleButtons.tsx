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
          <div>
            <Button
              type="button"
              variant={value === 'normal' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'normal' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('normal')}
            >
              👋 Normal
            </Button>
            <RadioGroupItem value="normal" id="normal" className="hidden" />
          </div>

          <div>
            <Button
              type="button"
              variant={value === 'formal' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'formal' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('formal')}
            >
              👔 Formal
            </Button>
            <RadioGroupItem value="formal" id="formal" className="hidden" />
          </div>

          <div>
            <Button
              type="button"
              variant={value === 'descontraido' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'descontraido' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('descontraido')}
            >
              🎉 Descontraído
            </Button>
            <RadioGroupItem value="descontraido" id="descontraido" className="hidden" />
          </div>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};