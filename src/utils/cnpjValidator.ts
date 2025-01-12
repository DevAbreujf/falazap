export const validateCNPJ = async (cnpj: string): Promise<{ isValid: boolean; razaoSocial?: string }> => {
  try {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    if (cleanCNPJ.length !== 14) {
      return { isValid: false };
    }

    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cleanCNPJ}`);
    if (!response.ok) {
      return { isValid: false };
    }
    const data = await response.json();
    return { 
      isValid: true, 
      razaoSocial: data.razao_social 
    };
  } catch (error) {
    console.error('Erro ao validar CNPJ:', error);
    return { isValid: false };
  }
};

export const formatCNPJ = (value: string): string => {
  const numbers = value.replace(/\D/g, '');
  return numbers
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .substring(0, 18);
};