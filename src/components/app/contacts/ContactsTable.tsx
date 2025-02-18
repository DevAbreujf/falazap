
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Contact } from "@/types/contacts";
import { SelectAllCheckbox } from "@/components/app/SelectAllCheckbox";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ContactsPagination } from "./ContactsPagination";
import { useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;

  const filteredBySearch = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredBySearch.length / contactsPerPage);
  const startIndex = (currentPage - 1) * contactsPerPage;
  const paginatedContacts = filteredBySearch.slice(startIndex, startIndex + contactsPerPage);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou telefone..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          className="pl-9"
        />
      </div>

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
            {paginatedContacts.map((contact) => (
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

      <ContactsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
