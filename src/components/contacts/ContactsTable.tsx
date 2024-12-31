import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Contact } from "@/types/contacts";

interface ContactsTableProps {
  contacts: Contact[];
  categories: string[];
  selectedContacts: number[];
  onContactSelect: (contactId: number) => void;
  onContactCategoryChange: (contactId: number, category: string) => void;
}

export function ContactsTable({
  contacts,
  categories,
  selectedContacts,
  onContactSelect,
  onContactCategoryChange,
}: ContactsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">Selecionar</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Data de Entrada</TableHead>
            <TableHead>Categoria</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell>
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => onContactSelect(contact.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{new Date(contact.date).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>
                <Select 
                  defaultValue={contact.category}
                  onValueChange={(value) => onContactCategoryChange(contact.id, value)}
                >
                  <SelectTrigger className="w-32 md:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}