export function Footer() {
  return (
    <footer className="py-8 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
            FalaZAP
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FalaZAP. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}