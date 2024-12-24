import { Button } from "./ui/button";

export function HighScale() {
  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold">Altíssima escala</h2>
            <p className="text-lg text-muted-foreground">
              O FalaZAP atende uma quantia ilimitada de clientes simultâneos,
              multiplicando a produtividade e os seus resultados de vendas,
              fechando diversos negócios ao mesmo tempo.
            </p>
            <Button size="lg" className="rounded-full">
              QUERO VENDER MAIS
            </Button>
          </div>
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <img
                src="/lovable-uploads/70cbc251-19a9-42a6-bc5c-68bf2da9312f.png"
                alt="Dashboard do FalaZAP"
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}