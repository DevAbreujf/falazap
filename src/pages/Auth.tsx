import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

export default function Auth() {
  const navigate = useNavigate();
  const [isFlipped, setIsFlipped] = useState(false);

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const registerForm = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onLoginSubmit(values: z.infer<typeof loginSchema>) {
    console.log(values);
    toast.success("Login realizado com sucesso!");
    navigate("/dashboard");
  }

  function onRegisterSubmit(values: z.infer<typeof registerSchema>) {
    console.log(values);
    toast.success("Conta criada com sucesso!");
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-8">
        <div className={`glass-card p-8 space-y-8 transition-transform duration-1000 ${isFlipped ? "rotate-y-180" : ""}`}>
          <div className={`transition-all duration-1000 ${isFlipped ? "hidden" : "block"}`}>
            {/* Login Form */}
            <div className="text-center space-y-2 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-primary">Fala</span>
                <span className="text-2xl font-bold">ZAP</span>
              </div>
              <p className="text-muted-foreground">Faça login para acessar sua conta</p>
            </div>

            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Entrar
                </Button>
              </form>
            </Form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Ainda não tem uma conta?
                </p>
                <Button
                  variant="outline"
                  className="w-full hover-glow"
                  onClick={() => setIsFlipped(true)}
                >
                  Criar Conta
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/#pricing")}
                >
                  Ver Planos Disponíveis
                </Button>
              </div>
            </div>
          </div>

          <div className={`transition-all duration-1000 ${isFlipped ? "block -scale-x-100" : "hidden"}`}>
            {/* Register Form */}
            <div className="text-center space-y-2 mb-8">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-2xl font-bold text-primary">Fala</span>
                <span className="text-2xl font-bold">ZAP</span>
              </div>
              <p className="text-muted-foreground">Crie sua conta para começar</p>
            </div>

            <Form {...registerForm}>
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <FormField
                  control={registerForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar Senha</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full gradient-primary hover:opacity-90">
                  Criar Conta
                </Button>
              </form>
            </Form>

            <div className="mt-6 space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <div className="space-y-2 text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?
                </p>
                <Button
                  variant="outline"
                  className="w-full hover-glow"
                  onClick={() => setIsFlipped(false)}
                >
                  Fazer Login
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => navigate("/#pricing")}
                >
                  Ver Planos Disponíveis
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}