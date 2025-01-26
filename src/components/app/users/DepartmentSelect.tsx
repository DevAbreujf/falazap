import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDepartmentStore } from "@/stores/departmentStore"
import { useEffect, useState } from "react"

interface DepartmentSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DepartmentSelect({ value, onValueChange }: DepartmentSelectProps) {
  const { departments } = useDepartmentStore();
  const [selectedDepartment, setSelectedDepartment] = useState<string | undefined>(value);
  
  useEffect(() => {
    setSelectedDepartment(value);
  }, [value]);

  const handleValueChange = (newValue: string) => {
    setSelectedDepartment(newValue);
    onValueChange(newValue);
  };

  const currentDepartment = departments.find(dept => dept.id.toString() === selectedDepartment);
  
  return (
    <Select 
      value={selectedDepartment} 
      onValueChange={handleValueChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Selecione um setor">
          {currentDepartment ? currentDepartment.name : "Selecione um setor"}
        </SelectValue>
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
  )
}