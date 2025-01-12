import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export function SidebarUserProfile() {
  const userName = "John Doe"; // In a real app, this would come from context/state
  const companyName = localStorage.getItem('razaoSocial'); // Get saved company name

  return (
    <>
      {companyName && (
        <div className="text-xs text-slate-500 px-3 mb-1">
          {companyName}
        </div>
      )}
      <div className="p-3 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-slate-300 transition-all duration-300">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium leading-none truncate">
              {userName}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              admin@example.com
            </p>
          </div>
          <Button variant="ghost" size="icon">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
}