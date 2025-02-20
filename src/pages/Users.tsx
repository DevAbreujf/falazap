import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { UsersTable } from "@/components/app/users/UsersTable";
import { UsersHeader } from "@/components/app/users/UsersHeader";
import { useState } from "react";
import { User } from "@/types/users";

export default function Users() {
  const { setOpenMobile } = useSidebar();
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "João Silva",
      email: "joao@example.com",
      role: "admin",
      department: "Vendas",
      status: "active",
      lastAccess: "2024-03-20T10:00:00"
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria@example.com",
      role: "user",
      department: "Marketing",
      status: "active",
      lastAccess: "2024-03-19T15:30:00"
    }
  ]);

  return (
    <SidebarProvider>
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
            <div className="space-y-6">
              <UsersHeader />
              <UsersTable users={users} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
