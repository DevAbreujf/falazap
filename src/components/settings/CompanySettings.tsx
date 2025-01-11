import { useState } from "react";
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/types/settings";
import { useToast } from "@/components/ui/use-toast";
import { X, Check } from "lucide-react";

interface CompanySettingsProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => Promise<void>;
}

export function CompanySettings({ form, onSubmit }: CompanySettingsProps) {
  const { toast } = useToast();
  const [isValidatingCNPJ, setIsValidatingCNPJ] = useState(false);
  const [cnpjError, setCnpjError] = useState("");
  const [cnpjValid, setCnpjValid] = useState(false);

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
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) {
      setCnpjError("CNPJ deve conter 14 dígitos");
      setCnpjValid(false);
      form.setValue('razaoSocial', '');
      return;
    }

    setIsValidatingCNPJ(true);
    try {
      const response = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
      if (response.data) {
        setCnpjError("");
        setCnpjValid(true);
        form.setValue('razaoSocial', response.data.razao_social);
      }
    } catch (error) {
      setCnpjError("Parece que você digitou um CNPJ incorreto, reveja por favor");
      setCnpjValid(false);
      form.setValue('razaoSocial', '');
    } finally {
      setIsValidatingCNPJ(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações da Empresa</CardTitle>
        <CardDescription>
          Configure suas informações empresariais.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cadastrar CNPJ</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="00.000.000/0000-00"
                        onChange={(e) => {
                          const formattedValue = formatCNPJ(e.target.value);
                          e.target.value = formattedValue;
                          field.onChange(e);
                          if (formattedValue.length === 18) {
                            validateCNPJ(formattedValue);
                          }
                        }}
                      />
                    </FormControl>
                    {field.value && (
                      <div className="absolute right-2 top-2.5">
                        {cnpjValid ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    )}
                  </div>
                  {cnpjError && (
                    <p className="text-sm text-red-500 mt-1">{cnpjError}</p>
                  )}
                </FormItem>
              )}
            />

            {cnpjValid && (
              <>
                <FormField
                  control={form.control}
                  name="razaoSocial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Razão Social</FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="aceitouTermos"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Concordo que as informações digitadas são verídicas e que está sob minha posse ou acesso
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button 
              type="submit" 
              disabled={!cnpjValid || !form.watch('aceitouTermos')}
            >
              Salvar Informações
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}