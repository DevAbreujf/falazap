
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";

export function ConnectionInstructions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Info className="h-4 w-4" />
          Como conectar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">1. Abra o WhatsApp no seu celular</h3>
          <p className="text-sm text-muted-foreground">
            Acesse o aplicativo WhatsApp no seu dispositivo móvel
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">2. Acesse as configurações</h3>
          <p className="text-sm text-muted-foreground">
            Toque nos três pontos no canto superior direito e selecione "Aparelhos Conectados"
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="font-medium">3. Escaneie o QR Code</h3>
          <p className="text-sm text-muted-foreground">
            Aponte a câmera do seu celular para o QR Code exibido nesta tela
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
