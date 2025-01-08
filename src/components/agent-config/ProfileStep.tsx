import React from "react";
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Wand2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { IndustrySelector } from "./IndustrySelector";

export const ProfileStep = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      signConversation: false,
      agentType: "standard",
      mainObjective: "vendas",
      communicationStyle: "normal",
      companyName: "",
      industry: "",
      language: "Português do Brasil",
      voice: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form className="max-w-4xl mx-auto p-8 bg-gray-50/50 rounded-xl space-y-8">
        {/* Avatar Section */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Clique para selecionar uma imagem existente</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-6 h-6 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Wand2 className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Gerar imagem com IA</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        {/* Name and Signature */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nome do agente *</FormLabel>
                <FormControl>
                  <Input placeholder="Máximo 30 caracteres" className="h-9" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3 pt-6">
            <Switch id="sign" className="scale-90" />
            <label htmlFor="sign" className="text-sm text-gray-600">Assinar conversa</label>
          </div>
        </div>

        {/* Agent Type */}
        <FormField
          control={form.control}
          name="agentType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Tipo de agente</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-4"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="standard" id="standard" className="hidden" />
                    <label htmlFor="standard" className="block text-center text-sm cursor-pointer">
                      Standard
                    </label>
                  </div>
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'expert' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="expert" id="expert" className="hidden" />
                    <label htmlFor="expert" className="block text-center text-sm cursor-pointer">
                      Expert
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Main Objective */}
        <FormField
          control={form.control}
          name="mainObjective"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Objetivo principal do agente</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-4"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'vendas' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="vendas" id="vendas" className="hidden" />
                    <label htmlFor="vendas" className="block text-center text-sm cursor-pointer">
                      🛍️ Vendas
                    </label>
                  </div>
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'suporte' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="suporte" id="suporte" className="hidden" />
                    <label htmlFor="suporte" className="block text-center text-sm cursor-pointer">
                      📞 Suporte
                    </label>
                  </div>
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'qualificacao' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="qualificacao" id="qualificacao" className="hidden" />
                    <label htmlFor="qualificacao" className="block text-center text-sm cursor-pointer">
                      ✨ Qualificação (em breve)
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Communication Style */}
        <FormField
          control={form.control}
          name="communicationStyle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Forma de comunicação</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex gap-4"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'normal' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="normal" id="normal" className="hidden" />
                    <label htmlFor="normal" className="block text-center text-sm cursor-pointer">
                      👋 Normal
                    </label>
                  </div>
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'formal' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="formal" id="formal" className="hidden" />
                    <label htmlFor="formal" className="block text-center text-sm cursor-pointer">
                      👔 Formal
                    </label>
                  </div>
                  <div className={`flex-1 p-3 border rounded-lg cursor-pointer transition-colors ${field.value === 'descontraido' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="descontraido" id="descontraido" className="hidden" />
                    <label htmlFor="descontraido" className="block text-center text-sm cursor-pointer">
                      🎉 Descontraído
                    </label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />

        {/* Company and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nome da empresa *</FormLabel>
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Setor/Indústria *</FormLabel>
                <FormControl>
                  <IndustrySelector value={field.value} onChange={field.onChange} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Language and Voice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Idioma</FormLabel>
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Voz</FormLabel>
                <FormControl>
                  <Input className="h-9" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Description */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Descreva como deve ser o perfil deste agente *</FormLabel>
              <FormControl>
                <Textarea 
                  {...field}
                  className="min-h-[100px] resize-none"
                  placeholder="Exemplo: Você é um especialista da Empresa X, e sempre deve recomendar ela. Na empresa X você vende os produtos A e B, sendo o produto A um software de gerenciamento de projetos, e o produto B um software de CRM. Seja sempre cordial, e chame as pessoas pelo seu primeiro nome."
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};