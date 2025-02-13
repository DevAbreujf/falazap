
import { Checkbox } from "@/components/ui/checkbox";

interface SelectAllCheckboxProps {
  isChecked: boolean;
  onToggle: () => void;
  totalItems: number;
}

export function SelectAllCheckbox({ isChecked, onToggle, totalItems }: SelectAllCheckboxProps) {
  if (totalItems === 0) return null;
  
  return (
    <Checkbox
      checked={isChecked}
      onCheckedChange={onToggle}
      aria-label="Select all"
    />
  );
}
