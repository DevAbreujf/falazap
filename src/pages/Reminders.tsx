import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { ReminderHeader } from "@/components/app/reminders/ReminderHeader";
import { ReminderForm } from "@/components/app/reminders/ReminderForm";

export default function Reminders() {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar />
      <main className="flex-1 p-8">
        <div className="max-w-2xl mx-auto">
          <ReminderHeader />
          <ReminderForm />
        </div>
      </main>
    </div>
  );
}