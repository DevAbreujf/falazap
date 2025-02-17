import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { SettingsFormValues } from "@/types/settings";
interface AuthenticationSettingsProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => Promise<void>;
}
export function AuthenticationSettings({
  form,
  onSubmit
}: AuthenticationSettingsProps) {
  return <Card>
      <CardHeader>
        <CardTitle>Autenticação de Dois Fatores</CardTitle>
        <CardDescription>
          Configure a autenticação de dois fatores para maior segurança.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex items-center justify-between space-x-2">
              <Label htmlFor="autenticacao" className="flex flex-col space-y-1">
                <span>Autenticação de Dois Fatores</span>
                <span className="text-sm text-muted-foreground">
                  Adicione uma camada extra de segurança à sua conta.
                </span>
              </Label>
              <FormField control={form.control} name="autenticadorDoisFatores" render={({
              field
            }) => <Switch checked={field.value} onCheckedChange={field.onChange} id="autenticacao" />} />
            </div>
            
            <FormField control={form.control} name="telefone" render={({
            field
          }) => <FormItem>
                  <FormLabel>Número de Telefone para Autenticação</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} onChange={e => {
                const value = e.target.value.replace(/\D/g, '');
                const phoneFormatted = value.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').substring(0, 15);
                field.onChange(phoneFormatted);
              }} />
                  </FormControl>
                  <FormMessage />
                </FormItem>} />
            <Button type="submit" className="bg-slate-950 hover:bg-slate-800">Salvar Configurações</Button>
          </form>
        </Form>
      </CardContent>
    </Card>;
}