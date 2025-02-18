
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "@/types/contacts";
import { SelectAllCheckbox } from "@/components/app/SelectAllCheckbox";

interface ContactsTableProps {
  contacts: Contact[];
  selectedContacts: number[];
  onToggleContact: (contactId: number) => void;
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
                isChecked={selectedContacts.length === filteredContacts.length}
                onToggle={onToggleAll}
                totalItems={filteredContacts.length}
              />
            </TableHead>
            <TableHead className="text-primary">Nome</TableHead>
            <TableHead className="text-primary">Telefone</TableHead>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
