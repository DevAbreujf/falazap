import { useLocation } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
const routeMap: Record<string, string> = {
  "": "Início",
  "auth": "Autenticação",
  "dashboard": "Dashboard",
  "settings": "Configurações",
  "contacts": "Contatos",
  "users": "Usuários",
  "departments": "Departamentos",
  "schedules": "Agendamentos",
  "broadcasts": "Disparos",
  "reminders": "Lembretes",
  "etiquetas": "Etiquetas",
  "terms": "Termos de Uso",
  "privacy": "Privacidade",
  "funnel-editor": "Editor de Funil",
  "funnels": "Funis",
  "connection": "Conexão",
  "novo-agente": "Novo Agente",
  "configurar-agente": "Configurar Agente",
  "agentes": "Agentes",
  "chatboard": "Chat"
};
export function PageBreadcrumb() {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Se estiver na página inicial, não mostra o breadcrumb
  if (pathSegments.length === 0) return null;
  return <Breadcrumb className="mb-6">
      
    </Breadcrumb>;
}