import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MainObjectiveButtonsProps {
  value: string;
  onChange: (value: string) => void;
}

export const MainObjectiveButtons = ({ value, onChange }: MainObjectiveButtonsProps) => {
  const handleClick = (newValue: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onChange(newValue);
  };

  return (
    <FormItem>
      <FormLabel className="text-sm font-medium text-gray-700">Objetivo principal do agente</FormLabel>
      <FormControl>
        <RadioGroup
          className="flex gap-3"
          value={value}
          onValueChange={onChange}
        >
          <Button
            type="button"
            variant={value === 'vendas' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'vendas' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('vendas')}
          >
            <RadioGroupItem value="vendas" id="vendas" className="hidden" />
            🛍️ Vendas
          </Button>
          <Button
            type="button"
            variant={value === 'suporte' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'suporte' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('suporte')}
          >
            <RadioGroupItem value="suporte" id="suporte" className="hidden" />
            📞 Suporte
          </Button>
          <Button
            type="button"
            variant={value === 'qualificacao' ? 'default' : 'outline'}
            className={`flex-1 ${value === 'qualificacao' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
            onClick={handleClick('qualificacao')}
          >
            <RadioGroupItem value="qualificacao" id="qualificacao" className="hidden" />
            ✨ Qualificação (em breve)
          </Button>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};