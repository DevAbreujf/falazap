import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pricing } from "@/components/Pricing";

export function PricingDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" className="hover-glow bg-primary/90 hover:bg-primary transition-all duration-300">
          Upgrade de Plano
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl w-[95vw] p-6 bg-[#1A1F2C]/95 backdrop-blur-sm border border-primary/10">
        <div className="space-y-6">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gradient-primary">
              Escolha seu plano
            </DialogTitle>
            <DialogDescription className="text-lg text-muted-foreground">
              Selecione o plano ideal para o seu negócio
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[80vh]">
            <Pricing />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}