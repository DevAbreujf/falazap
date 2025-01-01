import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardSidebar } from "@/components/app/DashboardSidebar";
import { SettingsHeader } from "@/components/settings/SettingsHeader";
import { ProfileSettings } from "@/components/settings/ProfileSettings";
import { SecuritySettings } from "@/components/settings/SecuritySettings";
import { CompanySettings } from "@/components/settings/CompanySettings";
import { AuthenticationSettings } from "@/components/settings/AuthenticationSettings";
import { settingsFormSchema, type SettingsFormValues } from "@/types/settings";

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
              <TabsTrigger value="perfil" className="data-[state=active]:bg-primary/20">
                Perfil
              </TabsTrigger>
              <TabsTrigger value="seguranca" className="data-[state=active]:bg-primary/20">
                Segurança
              </TabsTrigger>
              <TabsTrigger value="empresa" className="data-[state=active]:bg-primary/20">
                Empresa
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

              <TabsContent value="empresa">
                <CompanySettings form={form} onSubmit={onSubmit} />
              </TabsContent>

              <TabsContent value="autenticacao">
                <AuthenticationSettings form={form} onSubmit={onSubmit} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}