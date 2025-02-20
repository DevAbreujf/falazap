
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Signal, SignalHigh, SignalLow } from "lucide-react";

export function ConnectionStatus() {
  const status = "offline"; // This would come from your state management

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Signal className="h-4 w-4" />
          Status da Conexão
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {status === "online" ? (
              <>
                <SignalHigh className="h-4 w-4 text-emerald-500" />
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700">
                  Conectado
                </Badge>
              </>
            ) : (
              <>
                <SignalLow className="h-4 w-4 text-red-500" />
                <Badge variant="secondary" className="bg-red-50 text-red-700">
                  Desconectado
                </Badge>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
