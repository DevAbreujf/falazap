import { z } from "zod";
import { validateCEP } from "@/utils/cepValidator";

export const settingsFormSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  whatsapp: z.string().min(11, "Número de WhatsApp inválido"),
  cep: z.string().refine((val) => validateCEP(val.replace(/\D/g, '')), {
    message: "CEP inválido",
  }),
  street: z.string().min(3, "Rua inválida"),
  number: z.string().min(1, "Número inválido"),
  complement: z.string().optional(),
  neighborhood: z.string().min(3, "Bairro inválido"),
  city: z.string().min(3, "Cidade inválida"),
  state: z.string().min(2, "Estado inválido"),
  senhaAtual: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  novaSenha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  razaoSocial: z.string(),
  autenticadorDoisFatores: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;