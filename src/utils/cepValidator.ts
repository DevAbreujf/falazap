export const validateCEP = (cep: string) => {
  const cleanCEP = cep.replace(/\D/g, '');
  return /^[0-9]{8}$/.test(cleanCEP);
};

export const formatCEP = (cep: string) => {
  const cleanCEP = cep.replace(/\D/g, '');
  return cleanCEP.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

export const fetchAddressFromCEP = async (cep: string) => {
  const cleanCEP = cep.replace(/\D/g, '');
  const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
  const data = await response.json();
  
  if (data.erro) {
    throw new Error('CEP não encontrado');
  }
  
  return {
    street: data.logradouro,
    neighborhood: data.bairro,
    city: data.localidade,
    state: data.uf,
  };
};