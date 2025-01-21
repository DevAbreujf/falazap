import { useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            Início
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;
          
          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbSeparator />
              {isLast ? (
                <BreadcrumbPage>{routeMap[segment] || segment}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={path}>
                  {routeMap[segment] || segment}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}