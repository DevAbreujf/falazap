import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const industries = [
  // Group 1
  "Academia & Esporte",
  "Advocacia",
  "Agência de marketing",
  "Agência de modelos",
  "Agência de turismo",
  "Agência de viagens",
  "Alimentação",
  "Arquitetura",
  "Associação",
  "Autoescola",
  // Group 2
  "Cobrança",
  "Combustível",
  "Comércio de automóveis",
  "Construtora & incorporadora",
  "Consultoria",
  "Contabilidade",
  "Corretora de investimento",
  "Cosméticos",
  "Coworking",
  "Crédito & financiamento",
  // Group 3
  "Educação",
  "Eletrônicos",
  "Energia solar",
  "Entretenimento",
  "Equipamentos & Suprimentos",
  "Estética",
  "Eventos",
  "Farmácia",
  "Fertilizantes",
  "Floricultura",
  // Group 4
  "Gestão de condomínios",
  "Gestão de resíduos",
  "Gráfica",
  "Igreja & Paróquia",
  "Imobiliária",
  "Importação e exportação",
  "Infoproduto",
  "Manufatura de plásticos",
  "Materiais de construção",
  "Móveis & Decor",
  // Group 5
  "Órgão público",
  "Ótica",
  "Painéis publicitários",
  "Peças automotivas",
  "Pousada & Hotel",
  "Recursos humanos",
  "Reparo & Conserto",
  "Restaurante",
  "Roupa & Calçado",
  "Secretária virtual",
  // Group 6
  "Seguro",
  "Selfstorage",
  "Software",
  "Supermercado",
  "Suplementação",
  "Tabacaria",
  "Telecom",
  "Têxtil",
  "Transporte",
  "Veterinária",
];

interface IndustrySelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const IndustrySelector = ({ value, onChange }: IndustrySelectorProps) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full bg-white">
        <SelectValue placeholder="Selecione o setor/indústria" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {industries.map((industry) => (
          <SelectItem key={industry} value={industry}>
            {industry}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};