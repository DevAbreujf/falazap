import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Menu } from "lucide-react";

export default function Broadcasts() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar />
        <div className="flex-1 overflow-auto">
          <div className="flex items-center justify-end p-4 lg:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              asChild 
              className="hover:bg-primary/20 bg-black/50"
            >
              <SidebarTrigger>
                <Menu className="h-6 w-6 text-primary" />
              </SidebarTrigger>
            </Button>
          </div>
          <main className="container mx-auto px-8 py-10">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Disparos
                </h1>
                <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2" />
              </div>
              <p className="text-muted-foreground text-lg">
                Envie mensagens em massa para seus contatos de forma automatizada.
              </p>
            </div>

            <Card className="mt-8 p-6">
              <div className="text-center">
                <p className="text-lg font-medium">Em desenvolvimento</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Esta funcionalidade estará disponível em breve.
                </p>
              </div>
            </Card>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}