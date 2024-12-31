import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { KeyRound, Mail, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const settingsFormSchema = z.object({
  email: z.string().email("Email inválido"),
  currentPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  newPassword: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  phone: z.string().min(11, "Número de telefone inválido"),
});

export default function Settings() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof settingsFormSchema>>({
    resolver: zodResolver(settingsFormSchema),
  });

  function onSubmit(data: z.infer<typeof settingsFormSchema>) {
    console.log(data);
    toast({
      title: "Configurações atualizadas",
      description: "Suas configurações foram atualizadas com sucesso!",
    });
  }

  return (
    <>
      <DashboardSidebar />
      <main className="flex-1 p-6">
        <div className="container max-w-2xl">
          <h1 className="mb-4 text-2xl font-bold tracking-tight text-gradient-primary">
            Configurações
          </h1>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <Card className="glass-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Alterar Email</h2>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Novo Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Card className="glass-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Alterar Senha</h2>
                </div>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
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
                    name="newPassword"
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
                </div>
              </Card>

              <Card className="glass-card p-4">
                <div className="mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <h2 className="font-semibold">Autenticação por SMS</h2>
                </div>
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="+55 (11) 99999-9999" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              <Button type="submit" className="w-full">
                Salvar Alterações
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}