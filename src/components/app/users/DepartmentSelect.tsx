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
    <div className="space-y-2">
      <Select 
        value={value} 
        onValueChange={onValueChange}
      >
        <SelectTrigger className="w-full bg-white">
          {departments.length === 0 ? (
            <SelectValue>Nenhum setor existente</SelectValue>
          ) : (
            <SelectValue>{currentDepartment?.name || "Selecione um setor"}</SelectValue>
          )}
        </SelectTrigger>
        <SelectContent>
          {departments.length === 0 ? (
            <SelectItem value="no-departments" disabled>
              Nenhum setor existente
            </SelectItem>
          ) : (
            departments.map((department) => (
              <SelectItem 
                key={department.id} 
                value={department.id.toString()}
                className="cursor-pointer hover:bg-gray-100"
              >
                {department.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}