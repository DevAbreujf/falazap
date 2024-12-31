import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SelectAllCheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  totalItems: number;
}

export function SelectAllCheckbox({ isChecked, onToggle, totalItems }: SelectAllCheckboxProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="relative flex items-center gap-3">
            <Checkbox
              checked={isChecked && totalItems > 0}
              onCheckedChange={onToggle}
              id="select-all"
              className="relative data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent 
          side="top" 
          align="start"
          className="fixed bg-background border border-border"
          style={{ zIndex: 99999 }}
          sideOffset={5}
        >
          <p className="text-sm">
            {isChecked ? "Desmarcar todos" : "Selecionar todos"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}