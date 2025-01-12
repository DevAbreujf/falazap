import React, { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from 'react-hook-form';
import { SettingsFormValues } from '@/types/settings';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Check, X } from "lucide-react";
import { validateCEP, formatCEP, fetchAddressFromCEP } from '@/utils/cepValidator';
import { validateCNPJ, formatCNPJ } from '@/utils/cnpjValidator';
import { toast } from 'sonner';

interface ProfileSettingsProps {
  form: UseFormReturn<SettingsFormValues>;
  onSubmit: (data: SettingsFormValues) => Promise<void>;
}

export function ProfileSettings({ form, onSubmit }: ProfileSettingsProps) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isValidatingCNPJ, setIsValidatingCNPJ] = useState(false);
  const [cnpjIsValid, setCnpjIsValid] = useState<boolean | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCNPJChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const cnpj = event.target.value.replace(/\D/g, '');
    if (cnpj.length === 14) {
      setIsValidatingCNPJ(true);
      const { isValid, razaoSocial } = await validateCNPJ(cnpj);
      setCnpjIsValid(isValid);
      if (isValid && razaoSocial) {
        form.setValue('razaoSocial', razaoSocial);
      }
      setIsValidatingCNPJ(false);
    } else {
      setCnpjIsValid(null);
      form.setValue('razaoSocial', '');
    }
  };

  const handleCEPBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value;
    if (validateCEP(cep)) {
      try {
        const address = await fetchAddressFromCEP(cep);
        form.setValue('street', address.street);
        form.setValue('neighborhood', address.neighborhood);
        form.setValue('city', address.city);
        form.setValue('state', address.state);
      } catch (error) {
        toast.error('Erro ao buscar endereço. Verifique o CEP informado.');
      }
    }
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Informações Pessoais</CardTitle>
        <CardDescription>
          Atualize suas informações pessoais aqui.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage src={avatarUrl || ''} />
              <AvatarFallback>
                {form.getValues('nome')?.charAt(0)?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>
            <label
              htmlFor="avatar-upload"
              className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
            >
              <Camera className="h-4 w-4 text-white" />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome Completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} className="glass-card" />
                    </FormControl>
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
                    <div className="relative">
                      <FormControl>
                        <Input
                          placeholder="00.000.000/0000-00"
                          {...field}
                          maxLength={18}
                          className="glass-card pr-10"
                          onChange={(e) => {
                            const formatted = formatCNPJ(e.target.value);
                            field.onChange(formatted);
                            handleCNPJChange(e);
                          }}
                        />
                      </FormControl>
                      {cnpjIsValid !== null && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          {cnpjIsValid ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="razaoSocial"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Razão Social</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="glass-card bg-gray-100"
                      readOnly
                      placeholder="Será preenchido automaticamente ao validar o CNPJ"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full"
              disabled={!cnpjIsValid}
            >
              Salvar Empresa
            </Button>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" {...field} className="glass-card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input 
                      type="tel"
                      placeholder="(00) 00000-0000"
                      {...field}
                      className="glass-card"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cep"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CEP</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="00000-000"
                      {...field}
                      className="glass-card"
                      onBlur={(e) => {
                        handleCEPBlur(e);
                        field.onBlur();
                      }}
                      onChange={(e) => {
                        const formatted = formatCEP(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rua</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da rua" {...field} className="glass-card" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input placeholder="Número" {...field} className="glass-card" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="complement"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complemento</FormLabel>
                  <FormControl>
                    <Input placeholder="Apartamento, sala, etc." {...field} className="glass-card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="neighborhood"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bairro</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu bairro" {...field} className="glass-card" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input placeholder="Sua cidade" {...field} className="glass-card" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estado</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu estado" {...field} className="glass-card" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">Salvar Alterações</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}