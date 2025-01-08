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
          <div>
            <Button
              type="button"
              variant={value === 'vendas' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'vendas' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('vendas')}
            >
              🛍️ Vendas
            </Button>
            <RadioGroupItem value="vendas" id="vendas" className="hidden" />
          </div>

          <div>
            <Button
              type="button"
              variant={value === 'suporte' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'suporte' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('suporte')}
            >
              📞 Suporte
            </Button>
            <RadioGroupItem value="suporte" id="suporte" className="hidden" />
          </div>

          <div>
            <Button
              type="button"
              variant={value === 'qualificacao' ? 'default' : 'outline'}
              className={`flex-1 ${value === 'qualificacao' ? 'bg-primary text-white shadow-lg shadow-primary/30' : ''}`}
              onClick={() => onChange('qualificacao')}
            >
              ✨ Qualificação
            </Button>
            <RadioGroupItem value="qualificacao" id="qualificacao" className="hidden" />
          </div>
        </RadioGroup>
      </FormControl>
    </FormItem>
  );
};