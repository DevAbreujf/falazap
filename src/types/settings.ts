import { z } from "zod";

export const settingsFormSchema = z.object({
  nome: z.string().min(3, "O nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  senhaAtual: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  novaSenha: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  tipoConta: z.enum(["PF", "PJ"]),
  cnpj: z.string().refine((val) => !val || validarCNPJ(val), {
    message: "CNPJ inválido",
  }),
  autenticadorDoisFatores: z.boolean(),
  telefone: z.string().min(11, "Número de telefone inválido"),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// Função para validar CNPJ
function validarCNPJ(cnpj: string) {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cnpj)) return false;

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += Number(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === Number(digitos.charAt(1));
}