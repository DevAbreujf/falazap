import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CircleDot, FileText, Globe } from "lucide-react";

export function KnowledgeBaseStep() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Aqui é onde você introduz dados fundamentais para o aprimoramento da IA, incluindo perguntas, respostas, websites e outros documentos com informações relevantes da empresa, e produtos que o Agente de IA deve ter conhecimento
        </p>

        <Tabs defaultValue="qa" className="w-full">
          <TabsList className="grid w-full grid-cols-3 gap-4">
            <TabsTrigger value="qa" className="flex items-center gap-2">
              <CircleDot className="h-4 w-4" />
              Perguntas e respostas
            </TabsTrigger>
            <TabsTrigger value="websites" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Websites
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Documentos
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
            size="sm"
          >
            <CircleDot className="h-4 w-4" />
            Inserir manualmente
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
            size="sm"
          >
            <FileText className="h-4 w-4" />
            Importar de arquivo
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-white"
            size="sm"
          >
            <Globe className="h-4 w-4" />
            Gerar por IA
          </Button>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Pergunta
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Exemplo: Qual é o horário de funcionamento?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-1">
              Resposta
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              placeholder="Exemplo: O nosso horário de funcionamento é de segunda a sexta-feira das 9h às 12h e das 14h até às 19h. Não abrimos no sábado, nem domingo, e também não trabalhamos nos feriados."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground italic">
              (Detalhe um pouco mais a sua resposta, se for muito direta, é possível que a IA faça da mesma forma)
            </p>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" className="text-primary">
              + Adicionar
            </Button>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline">
          Voltar
        </Button>
        <Button variant="primary" className="bg-primary text-white">
          Treinar e publicar
        </Button>
      </div>
    </div>
  );
}