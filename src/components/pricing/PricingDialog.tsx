import { Check, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Plan } from "@/types/pricing";

interface PricingDialogProps {
  plans: Plan[];
}

export function PricingDialog({ plans }: PricingDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
          Comparar Planos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-6">
            Comparação de Planos
          </DialogTitle>
        </DialogHeader>
        <div className="overflow-x-auto overflow-y-auto max-h-[calc(85vh-120px)] scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-background z-10">
              <tr>
                <th className="p-4 text-left border-b border-border"></th>
                {plans.map((plan) => (
                  <th key={plan.name} className="p-4 text-left border-b border-border min-w-[200px]">
                    <div className="font-bold text-lg">{plan.name}</div>
                    <div className="text-primary text-2xl font-bold mt-2">
                      R${plan.price}
                      <span className="text-sm text-muted-foreground">/mês</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.keys(plans[0].features).map((feature) => (
                <tr key={feature} className="border-b border-border hover:bg-muted/5 transition-colors">
                  <td className="p-4 text-muted-foreground font-medium">
                    {feature}
                  </td>
                  {plans.map((plan) => (
                    <td key={`${plan.name}-${feature}`} className="p-4">
                      <div className="flex items-center gap-2">
                        {typeof plan.features[feature] === 'boolean' ? (
                          plan.features[feature] ? (
                            <div className="rounded-full p-1.5 bg-primary/10">
                              <Check className="text-primary w-4 h-4" />
                            </div>
                          ) : (
                            <div className="rounded-full p-1.5 bg-destructive/10">
                              <X className="text-destructive w-4 h-4" />
                            </div>
                          )
                        ) : (
                          <>
                            <div className="rounded-full p-1.5 bg-primary/10">
                              <Check className="text-primary w-4 h-4" />
                            </div>
                            <span className="text-sm">{plan.features[feature]}</span>
                          </>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DialogContent>
    </Dialog>
  );
}