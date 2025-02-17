export function SidebarLogo() {
  return <div className="flex flex-col items-center justify-center w-full space-y-2">
      <div className="flex items-center justify-center space-x-2">
        <span className="text-3xl font-bold text-gradient-primary">Fala</span>
        <span className="text-3xl font-bold text-emerald-800">ZAP</span>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </div>;
}