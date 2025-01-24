import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDepartmentStore } from "@/stores/departmentStore"

interface DepartmentSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DepartmentSelect({ value, onValueChange }: DepartmentSelectProps) {
  const { departments } = useDepartmentStore();

  console.log("Departments in DepartmentSelect:", departments); // Debug log

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um setor" />
      </SelectTrigger>
      <SelectContent>
        {departments.map((department) => (
          <SelectItem key={department.id} value={department.name}>
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}