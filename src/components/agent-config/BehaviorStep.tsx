import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

export const BehaviorStep = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-8 space-y-6">
      <div className="space-y-4">
        <div>
          <Label className="text-base font-semibold">Instruções obrigatórias</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Defina qual é o objetivo que o IA deve executar, detalhe de uma situação específica
          </p>
          <Textarea 
            placeholder="Exemplo: Seu papel é atender um cliente que está interessado em comprar um carro. Você deve entender as necessidades do cliente e recomendar o melhor veículo."
            className="h-32"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Interação com clientes</Label>
          <RadioGroup defaultValue="formal">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal" id="formal" />
              <Label htmlFor="formal">Formal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="informal" id="informal" />
              <Label htmlFor="informal">Falar com humanos</Label>
            </div>
          </RadioGroup>
          <Button variant="outline" className="w-full justify-start">
            Responder após executar
          </Button>
        </div>

        <div>
          <Label className="text-base font-semibold">Instruções obrigatórias</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Defina qual é o objetivo que o IA deve executar, detalhe de uma situação específica
          </p>
          <Textarea 
            placeholder="Exemplo: Seu papel é atender um cliente que está interessado em comprar um carro. Você deve entender as necessidades do cliente e recomendar o melhor veículo."
            className="h-32"
          />
        </div>

        <div className="space-y-2">
          <Label className="text-base font-semibold">Interação com clientes</Label>
          <RadioGroup defaultValue="formal">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="formal" id="formal-2" />
              <Label htmlFor="formal-2">Formal</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="informal" id="informal-2" />
              <Label htmlFor="informal-2">Falar com humanos</Label>
            </div>
          </RadioGroup>
          <Button variant="outline" className="w-full justify-start">
            Responder após executar
          </Button>
        </div>

        <div>
          <Label className="text-base font-semibold">Estratégias obrigatórias de conversa</Label>
          <p className="text-sm text-muted-foreground mb-2">
            Você pode definir estratégias obrigatórias que o IA deve passar durante o conversa. A IA será treinada e obedecerá rigorosamente o caminho definido.
          </p>
          <div className="space-y-4">
            <div>
              <Label>Nome da estratégia</Label>
              <Textarea 
                placeholder="Exemplo: Qualificação"
                className="h-20"
              />
            </div>
            <div>
              <Label>Objetivo dessa estratégia</Label>
              <Textarea 
                placeholder="Exemplo: Faça perguntas para entender o perfil do cliente, suas necessidades e seu orçamento. Isso ajudará você a recomendar o produto adequado."
                className="h-32"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Voltar
        </Button>
        <Button variant="default" className="bg-primary text-white">
          Avançar
        </Button>
      </div>
    </div>
  );
};
