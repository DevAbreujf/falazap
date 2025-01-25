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

  // Find the current department name for display
  const currentDepartment = departments.find(dept => dept.id.toString() === value);

  return (
    <Select 
      value={value} 
      onValueChange={onValueChange}
    >
      <SelectTrigger>
        <SelectValue>
          {currentDepartment ? currentDepartment.name : "Selecione um setor"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {departments.map((department) => (
          <SelectItem 
            key={department.id} 
            value={department.id.toString()}
          >
            {department.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}