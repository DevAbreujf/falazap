import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8">Termos de Uso</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Aceitação dos Termos</h2>
            <p className="mb-4">
              Ao acessar e usar o FalaZAP, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.
              Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Uso do Serviço</h2>
            <p className="mb-4">
              O FalaZAP fornece uma plataforma de comunicação e automação para WhatsApp. 
              Você concorda em usar este serviço apenas para propósitos legais e de acordo com estes termos.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Privacidade</h2>
            <p className="mb-4">
              Sua privacidade é importante para nós. Nossa Política de Privacidade explica como coletamos, 
              usamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Responsabilidades</h2>
            <p className="mb-4">
              Você é responsável por manter a confidencialidade de sua conta e senha.
              Você concorda em notificar imediatamente o FalaZAP sobre qualquer uso não autorizado de sua conta.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Limitações</h2>
            <p className="mb-4">
              O FalaZAP se reserva o direito de modificar, suspender ou descontinuar qualquer aspecto do serviço a qualquer momento.
              Não nos responsabilizamos por interrupções ou erros que possam ocorrer no serviço.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Alterações nos Termos</h2>
            <p className="mb-4">
              Reservamos o direito de modificar estes termos a qualquer momento.
              Alterações entrarão em vigor imediatamente após sua publicação no site.
              O uso continuado do serviço após tais alterações constitui sua aceitação dos novos termos.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}