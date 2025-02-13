
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
  theme: z.enum(['light', 'dark']).optional(),
  language: z.string().optional(),
  timezone: z.string().optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    sms: z.boolean(),
  }).optional(),
  securityPreferences: z.object({
    twoFactorEnabled: z.boolean(),
    loginNotifications: z.boolean(),
    passwordExpiryDays: z.number(),
  }).optional(),
  companySettings: z.object({
    logo: z.string().optional(),
    primaryColor: z.string().optional(),
    secondaryColor: z.string().optional(),
    workingHours: z.array(z.object({
      day: z.number(),
      start: z.string(),
      end: z.string(),
      isActive: z.boolean(),
    })).optional(),
  }).optional(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

export interface SettingsMetadata {
  lastUpdated: string;
  updatedBy: string;
  version: number;
}
