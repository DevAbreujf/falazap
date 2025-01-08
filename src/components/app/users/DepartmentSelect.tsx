import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const departments = [
  { id: 1, name: "Suporte" },
  { id: 2, name: "Vendas" },
  { id: 3, name: "Financeiro" },
  { id: 4, name: "Administrativo" },
]

interface DepartmentSelectProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function DepartmentSelect({ value, onValueChange }: DepartmentSelectProps) {
  console.log("Current department value:", value); // Debug log

  return (
    <Select 
      defaultValue={value} 
      onValueChange={(newValue) => {
        console.log("Selected new department:", newValue); // Debug log
        onValueChange(newValue);
      }}
    >
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