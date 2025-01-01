import { Search, Calendar as CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SchedulesFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export function SchedulesFilters({
  search,
  setSearch,
  selectedDate,
  setSelectedDate,
}: SchedulesFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar por nome, cliente ou telefone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full md:w-auto">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? (
              format(selectedDate, "PPP", { locale: ptBR })
            ) : (
              "Filtrar por data"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
      {selectedDate && (
        <Button 
          variant="outline" 
          onClick={() => setSelectedDate(undefined)}
          className="w-full md:w-auto"
        >
          Limpar filtro
        </Button>
      )}
    </div>
  );
}