
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { ConnectionStatus } from "@/components/app/connection/ConnectionStatus";
import { ConnectionQRCode } from "@/components/app/connection/ConnectionQRCode";
import { ConnectionInstructions } from "@/components/app/connection/ConnectionInstructions";

// Separate component to use the sidebar hook
function ConexaoContent() {
  const { setOpenMobile } = useSidebar();

  return (
    <div className="min-h-screen flex w-full">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        {/* Header Mobile Fixo */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b md:hidden">
          <div className="flex items-center justify-between px-4 h-14">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpenMobile(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <main className="container mx-auto p-4 md:p-6 lg:px-8 xl:px-10 flex-1 overflow-auto pt-16 md:pt-6">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-gradient-primary">
                Conectar WhatsApp
              </h1>
              <p className="text-muted-foreground mt-2">
                Siga as instruções abaixo para conectar sua conta do WhatsApp
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-8">
                <ConnectionStatus />
                <ConnectionQRCode />
              </div>
              <ConnectionInstructions />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Main component that provides the sidebar context
export default function Conexao() {
  return (
    <SidebarProvider>
      <ConexaoContent />
    </SidebarProvider>
  );
}
