import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-primary">Oops!</h1>
            <p className="text-muted-foreground">Desculpe, ocorreu um erro inesperado.</p>
            <p className="text-sm text-muted-foreground">
              <i>{this.state.error?.message || "Unknown error"}</i>
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

    return this.props.children;
  }
}