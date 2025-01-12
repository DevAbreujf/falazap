import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { AuthenticationSettings } from "@/components/settings/AuthenticationSettings";
import { settingsFormSchema, type SettingsFormValues } from "@/types/settings";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Settings() {
  const { toast } = useToast();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues: {
      autenticadorDoisFatores: false,
    },
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      if (data.cnpj && data.razaoSocial) {
        localStorage.setItem('razaoSocial', data.razaoSocial);
      }
      
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
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-b from-background to-background/80">
        <DashboardSidebar />
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-xl" />
                <h1 className="relative text-4xl font-bold mb-8 text-gradient-primary py-2">
                  Configurações da Conta
                </h1>
                <p className="text-muted-foreground mb-6">
                  Gerencie suas preferências e configurações de conta
                </p>
              </div>
              <div className="lg:hidden">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  asChild 
                  className="hover:bg-primary/20 bg-black/50"
                >
                  <SidebarTrigger>
                    <Menu className="h-6 w-6 text-primary" />
                  </SidebarTrigger>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="perfil" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-3 gap-4">
                <TabsTrigger value="perfil" className="data-[state=active]:bg-primary/20">
                  Perfil
                </TabsTrigger>
                <TabsTrigger value="seguranca" className="data-[state=active]:bg-primary/20">
                  Segurança
                </TabsTrigger>
                <TabsTrigger value="autenticacao" className="data-[state=active]:bg-primary/20">
                  Autenticação
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 space-y-6">
                <TabsContent value="perfil" className="space-y-6">
                  <ProfileSettings form={form} onSubmit={onSubmit} />
                </TabsContent>

                <TabsContent value="seguranca">
                  <SecuritySettings form={form} onSubmit={onSubmit} />
                </TabsContent>

                <TabsContent value="autenticacao">
                  <AuthenticationSettings form={form} onSubmit={onSubmit} />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
