
export function SidebarLogo() {
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-2">
      <div className="flex items-center justify-center space-x-1">
        <span className="text-2xl font-bold text-primary transition-all duration-200 group-data-[collapsible=icon]:text-lg">
          Fala
        </span>
        <span className="text-2xl font-bold text-primary/80 transition-all duration-200 group-data-[collapsible=icon]:hidden">
          ZAP
        </span>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
