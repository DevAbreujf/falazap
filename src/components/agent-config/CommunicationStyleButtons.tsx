import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CommunicationStyleButtonsProps {
  value: string;
  onChange: (value: string) => void;
}

export const CommunicationStyleButtons = ({ value, onChange }: CommunicationStyleButtonsProps) => {
  const handleClick = (newValue: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(newValue);
  };

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
            type="button"
            variant={value === 'normal' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'normal' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('normal')}
          >
            <RadioGroupItem value="normal" id="normal" className="hidden" />
            👋 Normal
          </Button>
          <Button
            type="button"
            variant={value === 'formal' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'formal' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('formal')}
          >
            <RadioGroupItem value="formal" id="formal" className="hidden" />
            👔 Formal
          </Button>
          <Button
            type="button"
            variant={value === 'descontraido' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'descontraido' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('descontraido')}
          >
            <RadioGroupItem value="descontraido" id="descontraido" className="hidden" />
            🎉 Descontraído
          </Button>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};