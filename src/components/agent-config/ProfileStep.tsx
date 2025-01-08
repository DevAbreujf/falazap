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
import { VoiceSelector } from "./VoiceSelector";
import { LanguageSelector } from "./LanguageSelector";
import { MainObjectiveButtons } from "./MainObjectiveButtons";
import { CommunicationStyleButtons } from "./CommunicationStyleButtons";

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
      language: "pt-br",
      voice: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form className="max-w-4xl mx-auto p-8 bg-gray-50/50 rounded-xl space-y-6">
        {/* Avatar Section */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center">
              <div className="w-10 h-10 bg-white rounded-full" />
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Camera className="w-3 h-3 text-gray-600" />
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
                    <button className="w-5 h-5 bg-white rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <Wand2 className="w-3 h-3 text-gray-600" />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nome do agente *</FormLabel>
                <FormControl>
                  <Input placeholder="Máximo 30 caracteres" className="h-8" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex items-center gap-3 pt-6">
            <Switch id="sign" className="scale-75" />
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
                  className="flex gap-3"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <div className={`flex-1 p-2 border rounded-lg cursor-pointer transition-colors ${field.value === 'standard' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
                    <RadioGroupItem value="standard" id="standard" className="hidden" />
                    <label htmlFor="standard" className="block text-center text-sm cursor-pointer">
                      Standard
                    </label>
                  </div>
                  <div className={`flex-1 p-2 border rounded-lg cursor-pointer transition-colors ${field.value === 'expert' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}>
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
            <MainObjectiveButtons value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Communication Style */}
        <FormField
          control={form.control}
          name="communicationStyle"
          render={({ field }) => (
            <CommunicationStyleButtons value={field.value} onChange={field.onChange} />
          )}
        />

        {/* Company and Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">Nome da empresa *</FormLabel>
                <FormControl>
                  <Input className="h-8" {...field} />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <LanguageSelector value={field.value} onChange={field.onChange} />
            )}
          />
          <FormField
            control={form.control}
            name="voice"
            render={({ field }) => (
              <VoiceSelector value={field.value} onChange={field.onChange} />
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