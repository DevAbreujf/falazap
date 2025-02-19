import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres")
});
export function LoginForm({
  onFlip
}: {
  onFlip: () => void;
}) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  }
  const onError = (errors: any) => {
    const firstError = Object.values(errors)[0] as {
      message: string;
    };
    if (firstError) {
      toast.error(firstError.message);
    }
  };
  return <div className="space-y-6 pt-2 px-6 pb-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">Fala</span>
          <span className="text-3xl font-bold">ZAP</span>
        </div>
        <p className="text-muted-foreground text-white">Faça login para acessar sua conta</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onError)} className="space-y-4">
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Email</FormLabel>
                <FormControl>
                  <Input placeholder="seu@email.com" {...field} className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary" />
                </FormControl>
              </FormItem>} />

          <FormField control={form.control} name="password" render={({
          field
        }) => <FormItem>
                <FormLabel className="text-white">Senha</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} className="bg-background/50 backdrop-blur-sm border-white/10 focus:border-primary" />
                </FormControl>
              </FormItem>} />

          <Button type="submit" className="w-full gradient-primary hover:opacity- hover:shadow-lg hover:shadow-primary/20 bg-white text-zinc-950">
            Entrar
          </Button>
        </form>
      </Form>

      <Button variant="link" onClick={() => navigate("/recuperar-senha")} className="w-full text-sm text-muted-foreground text-white">
        Esqueceu sua senha?
      </Button>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 text-muted-foreground bg-background/80 backdrop-blur-sm">Ou</span>
          </div>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground text-white">
            Ainda não tem uma conta?
          </p>
          <Button variant="outline" onClick={onFlip} className="w-full hover-glow border-white/10 bg-background/50 backdrop-blur-sm bg-white">
            Criar Conta
          </Button>
        </div>
      </div>
    </div>;
}