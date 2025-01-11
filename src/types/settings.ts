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
  tipoConta: z.enum(["PF", "PJ"]),
  cnpj: z.string().refine((val) => {
    if (!val) return true;
    const cleanVal = val.replace(/\D/g, '');
    if (cleanVal.length === 11) {
      return validarCPF(cleanVal);
    } else if (cleanVal.length === 14) {
      return validarCNPJ(cleanVal);
    }
    return false;
  }, {
    message: "Documento inválido",
  }),
  autenticadorDoisFatores: z.boolean(),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// Função para validar CPF
function validarCPF(cpf: string) {
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digito1 = 11 - (soma % 11);
  if (digito1 > 9) digito1 = 0;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  let digito2 = 11 - (soma % 11);
  if (digito2 > 9) digito2 = 0;

  return (
    parseInt(cpf.charAt(9)) === digito1 &&
    parseInt(cpf.charAt(10)) === digito2
  );
}

// Função para validar CNPJ
function validarCNPJ(cnpj: string) {
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