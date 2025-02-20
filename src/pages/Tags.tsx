import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Menu } from "lucide-react";
import { TagsHeader } from "@/components/app/tags/TagsHeader";
import { TagsTable } from "@/components/app/tags/TagsTable";
import { useState } from "react";
import { Tag } from "@/types/tags";

export default function Tags() {
  const { setOpenMobile } = useSidebar();
  const [tags] = useState<Tag[]>([
    {
      id: "1",
      name: "Cliente VIP",
      color: "#FF0000",
      totalContacts: 150
    },
    {
      id: "2",
      name: "Lead Quente",
      color: "#00FF00",
      totalContacts: 75
    },
    {
      id: "3",
      name: "Prospect",
      color: "#0000FF",
      totalContacts: 300
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
              <TagsHeader />
              <TagsTable tags={tags} />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
