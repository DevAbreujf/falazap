import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { RemindersHeader } from "@/components/app/reminders/RemindersHeader";
import { RemindersForm } from "@/components/app/reminders/RemindersForm";

export default function Reminders() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <RemindersHeader />
          <RemindersForm />
        </div>
      </main>
    </div>
  );
}