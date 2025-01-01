import { useRouteError } from "react-router-dom";

export default function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-primary">Oops!</h1>
        <p className="text-muted-foreground">Desculpe, ocorreu um erro inesperado.</p>
        <p className="text-sm text-muted-foreground">
          <i>{(error as Error)?.message || "Unknown error"}</i>
        </p>
        <button
          onClick={() => window.location.href = '/'}
          className="text-primary hover:underline"
        >
          Voltar para página inicial
        </button>
      </div>
    </div>
  );
}