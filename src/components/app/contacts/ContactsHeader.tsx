import { Input } from "@/components/ui/input";
import { Search, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ContactsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedFunnel: string;
  onFunnelChange: (value: string) => void;
  onExportCSV: () => void;
  uniqueFunnels: string[];
  hasSelectedContacts: boolean;
}

export function ContactsHeader({
  searchTerm,
  onSearchChange,
  selectedFunnel,
  onFunnelChange,
  onExportCSV,
  uniqueFunnels,
  hasSelectedContacts
}: ContactsHeaderProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
          Contatos
        </h1>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
      </div>
      <p className="text-muted-foreground text-lg">
        Gerencie e exporte sua lista de contatos
      </p>
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-x-4 md:space-y-0">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar contatos..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Select
          value={selectedFunnel}
          onValueChange={onFunnelChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o funil" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Funis</SelectItem>
            {uniqueFunnels.map((funnel) => (
              <SelectItem key={funnel} value={funnel}>
                {funnel}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={onExportCSV}
          disabled={!hasSelectedContacts}
          className="flex items-center gap-2 hover-glow"
        >
          <FileSpreadsheet className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>
    </div>
  );
}