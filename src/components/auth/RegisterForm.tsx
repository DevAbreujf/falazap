import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export function RegisterForm({ onFlip }: { onFlip: () => void }) {
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    toast.success("Conta criada com sucesso!");
    navigate("/dashboard");
  }

  const onError = (errors: any) => {
    // Show first error message in a toast
    const firstError = Object.values(errors)[0] as { message: string };
    if (firstError) {
      toast.error(firstError.message);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-6 p-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-3xl font-bold text-gradient-primary">Fala</span>
            <span className="text-3xl font-bold">ZAP</span>
          </div>
          <p className="text-muted-foreground">Crie sua conta para começar</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Seu nome" 
                      {...field}
                      className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="seu@email.com" 
                      {...field}
                      className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field}
                      className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar Senha</FormLabel>
                  <FormControl>
                    <Input 
                      type="password" 
                      placeholder="••••••••" 
                      {...field}
                      className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full gradient-primary hover:opacity-90 hover:shadow-lg hover:shadow-primary/20">
              Criar Conta
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-auto p-6 border-t border-white/10">
        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Já tem uma conta?
          </p>
          <Button
            variant="outline"
            className="w-full hover-glow border-white/10 bg-secondary"
            onClick={onFlip}
          >
            Fazer Login
          </Button>
        </div>
      </div>
    </div>
  );
}