
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from "lucide-react";

export function ConnectionQRCode() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <QrCode className="h-4 w-4" />
          QR Code
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full max-w-[280px] mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-sm text-muted-foreground">QR Code será exibido aqui</span>
        </div>
      </CardContent>
    </Card>
  );
}
