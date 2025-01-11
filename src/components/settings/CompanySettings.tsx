import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/types/settings";
import { useToast } from "@/hooks/use-toast";

interface CompanySettingsProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => Promise<void>;
}

interface CNPJResponse {
  razao_social: string;
  nome_fantasia: string;
  cnpj: string;
}

export function CompanySettings({ form, onSubmit }: CompanySettingsProps) {
  const { toast } = useToast();
  const [companyData, setCompanyData] = useState<CNPJResponse | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const formatCNPJ = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };

  const validateCNPJ = async (cnpj: string) => {
    try {
      const cleanCNPJ = cnpj.replace(/\D/g, '');
      const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
      if (!response.ok) {
        throw new Error('CNPJ inválido');
      }
      const data = await response.json();
      setCompanyData(data);
      setIsEditing(false);
      return true;
    } catch (error) {
      toast({
        title: "CNPJ Inválido",
        description: "Por favor, verifique o CNPJ informado.",
        variant: "destructive",
      });
      return false;
    }
  };

  const handleSubmit = async (data: SettingsFormValues) => {
    if (!termsAccepted) {
      toast({
        title: "Termos não aceitos",
        description: "Por favor, aceite os termos antes de salvar.",
        variant: "destructive",
      });
      return;
    }
    
    if (isEditing) {
      const isValid = await validateCNPJ(data.cnpj);
      if (!isValid) return;
    }
    
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>CNPJ</CardTitle>
        <CardDescription>
          Configure suas informações empresariais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="00.000.000/0000-00"
                      {...field}
                      disabled={!isEditing}
                      maxLength={18}
                      onChange={(e) => {
                        const formattedValue = formatCNPJ(e.target.value);
                        e.target.value = formattedValue;
                        field.onChange(e);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {companyData && !isEditing && (
              <>
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <Input value={companyData.razao_social} disabled />
                </FormItem>
                <FormItem>
                  <FormLabel>Nome Fantasia</FormLabel>
                  <Input value={companyData.nome_fantasia || "Não informado"} disabled />
                </FormItem>
                <Button
                  type="button"
                  variant="link"
                  onClick={() => {
                    setIsEditing(true);
                    setCompanyData(null);
                    form.setValue('cnpj', '');
                  }}
                >
                  Alterar CNPJ
                </Button>
              </>
            )}

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-muted-foreground"
              >
                Eu concordo com os termos desse site por isso não utilizarei nenhum outro dado que não esteja sob minha responsabilidade.
              </label>
            </div>

            <Button type="submit">Salvar Informações</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}