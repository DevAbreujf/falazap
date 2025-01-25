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
  const currentDepartment = departments.find(dept => dept.id.toString() === value);
  
  return (
    <Select 
      value={value} 
      onValueChange={onValueChange}
    >
      <SelectTrigger className="w-full text-foreground">
        <SelectValue placeholder={departments.length === 0 ? "Nenhum setor existente" : "Selecione um setor"}>
          {currentDepartment?.name}
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