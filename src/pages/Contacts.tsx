import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Search, Download, FileSpreadsheet, FileText } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

export default function Contacts() {
  // Temporary mock data - replace with actual data when backend is integrated
  const contacts = [
    { id: 1, phone: "+55 11 99999-9999", name: "João Silva", date: "2024-03-20", funnel: "Funil Principal" },
    { id: 2, phone: "+55 11 98888-8888", name: "Maria Santos", date: "2024-03-19", funnel: "Funil Secundário" },
    // Add more mock data as needed
  ];

  const handleExportCSV = () => {
    // Implementação futura da exportação CSV
    console.log("Exportando CSV...");
  };

  const handleExportPDF = () => {
    // Implementação futura da exportação PDF
    console.log("Exportando PDF...");
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto py-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                <div className="space-y-2">
                  <CardTitle className="text-2xl font-bold">Contatos</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Gerencie e exporte sua lista de contatos
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar contatos..." className="pl-8" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={handleExportCSV}
                      className="flex items-center gap-2"
                    >
                      <FileSpreadsheet className="h-4 w-4" />
                      Exportar CSV
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleExportPDF}
                      className="flex items-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      Exportar PDF
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Data de Entrada</TableHead>
                      <TableHead>Funil</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{new Date(contact.date).toLocaleDateString('pt-BR')}</TableCell>
                        <TableCell>{contact.funnel}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}