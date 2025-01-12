export const validateCNPJ = async (cnpj: string): Promise<{ isValid: boolean; razaoSocial?: string }> => {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`);
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
  return numbers.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
};