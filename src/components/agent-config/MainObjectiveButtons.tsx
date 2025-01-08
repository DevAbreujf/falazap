import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MainObjectiveButtonsProps {
  value: string;
  onChange: (value: string) => void;
}

export const MainObjectiveButtons = ({ value, onChange }: MainObjectiveButtonsProps) => {
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
            variant={value === 'vendas' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('vendas')}
          >
            <RadioGroupItem value="vendas" id="vendas" className="hidden" />
            🛍️ Vendas
          </Button>
          <Button
            variant={value === 'suporte' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('suporte')}
          >
            <RadioGroupItem value="suporte" id="suporte" className="hidden" />
            📞 Suporte
          </Button>
          <Button
            variant={value === 'qualificacao' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => onChange('qualificacao')}
          >
            <RadioGroupItem value="qualificacao" id="qualificacao" className="hidden" />
            ✨ Qualificação (em breve)
          </Button>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};