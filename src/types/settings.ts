import { z } from "zod";
import { validateCEP } from "@/utils/cepValidator";

export const settingsFormSchema = z.object({
  nome: z.string().optional(),
  email: z.string().email("Email inválido").optional(),
  whatsapp: z.string().optional(),
  telefone: z.string().optional(),
  cep: z.string().optional(),
  street: z.string().optional(),
  number: z.string().optional(),
  complement: z.string().optional(),
  neighborhood: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  senhaAtual: z.string().optional(),
  novaSenha: z.string().optional(),
  cnpj: z.string().optional(),
  razaoSocial: z.string().optional(),
  autenticadorDoisFatores: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;