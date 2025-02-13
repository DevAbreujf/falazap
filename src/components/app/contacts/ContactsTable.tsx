
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Contact } from "@/types/contacts";
import { SelectAllCheckbox } from "@/components/app/SelectAllCheckbox";

interface ContactsTableProps {
  contacts: Contact[];
  selectedContacts: string[];
  onToggleContact: (contactId: string) => void;
  onToggleAll: () => void;
  filteredContacts: Contact[];
}

export function ContactsTable({
  contacts,
  selectedContacts,
  onToggleContact,
  onToggleAll,
  filteredContacts
}: ContactsTableProps) {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-primary/20">
            <TableHead className="w-12">
              <SelectAllCheckbox
                isChecked={selectedContacts.length === filteredContacts.length && filteredContacts.length > 0}
                onToggle={onToggleAll}
                totalItems={filteredContacts.length}
              />
            </TableHead>
            <TableHead className="text-primary">Nome</TableHead>
            <TableHead className="text-primary">Telefone</TableHead>
            <TableHead className="text-primary">Data de Entrada</TableHead>
            <TableHead className="text-primary">Funil</TableHead>
            <TableHead className="text-primary">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id} className="hover:bg-primary/5 transition-colors">
              <TableCell>
                <Checkbox
                  checked={selectedContacts.includes(contact.id)}
                  onCheckedChange={() => onToggleContact(contact.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell>{contact.phone}</TableCell>
              <TableCell>{new Date(contact.createdAt).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell>{contact.funnelName}</TableCell>
              <TableCell>
                <Badge 
                  variant={contact.funnelStatus === 'completed' ? 'default' : 'secondary'}
                  className={`${
                    contact.funnelStatus === 'completed' 
                      ? 'bg-primary/10 text-primary border border-primary/20' 
                      : 'bg-yellow-100/10 text-yellow-500 border border-yellow-500/20'
                  }`}
                >
                  {contact.funnelStatus === 'completed' ? 'Finalizado' : 'Em andamento'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
