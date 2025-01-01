import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { settingsFormSchema, type SettingsFormValues } from "@/types/settings";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function Settings() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      autenticadorDoisFatores: false,
      tipoConta: "PF",
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      console.log(data);
      toast({
        title: "Configurações atualizadas",
        description: "Suas configurações foram atualizadas com sucesso!",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar as configurações.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-background to-background/80">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <SettingsHeader />
          
          <Tabs defaultValue="perfil" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-4">
              <TabsTrigger value="perfil" className="data-[state=active]:bg-primary/20">Perfil</TabsTrigger>
              <TabsTrigger value="seguranca" className="data-[state=active]:bg-primary/20">Segurança</TabsTrigger>
              <TabsTrigger value="empresa" className="data-[state=active]:bg-primary/20">Empresa</TabsTrigger>
              <TabsTrigger value="autenticacao" className="data-[state=active]:bg-primary/20">Autenticação</TabsTrigger>
            </TabsList>

            <div className="mt-4 space-y-6">
              <TabsContent value="perfil" className="space-y-6">
                <ProfileSettings form={form} onSubmit={onSubmit} />
              </TabsContent>

              <TabsContent value="seguranca">
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança</CardTitle>
                    <CardDescription>
                      Altere sua senha e configure opções de segurança.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="senhaAtual"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Senha Atual</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="novaSenha"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nova Senha</FormLabel>
                              <FormControl>
                                <Input type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Atualizar Senha</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="empresa">
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
                          name="tipoConta"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Tipo de Conta</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Selecione o tipo de conta" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="PF">Pessoa Física</SelectItem>
                                  <SelectItem value="PJ">Pessoa Jurídica</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    const cnpjFormatted = value
                                      .replace(/^(\d{2})(\d)/, '$1.$2')
                                      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
                                      .replace(/\.(\d{3})(\d)/, '.$1/$2')
                                      .replace(/(\d{4})(\d)/, '$1-$2')
                                      .substring(0, 18);
                                    e.target.value = cnpjFormatted;
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Salvar Informações</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="autenticacao">
                <Card>
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
                          <FormField
                            control={form.control}
                            name="autenticadorDoisFatores"
                            render={({ field }) => (
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                id="autenticacao"
                              />
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={form.control}
                          name="telefone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Número de Telefone para Autenticação</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="(00) 00000-0000"
                                  {...field}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    const phoneFormatted = value
                                      .replace(/^(\d{2})(\d)/, '($1) $2')
                                      .replace(/(\d{5})(\d)/, '$1-$2')
                                      .substring(0, 15);
                                    e.target.value = phoneFormatted;
                                    field.onChange(e);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Salvar Configurações</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
