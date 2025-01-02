import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

const Privacy = () => {
  return (
    <div className="min-h-screen w-full">
      <Header />
      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold text-gradient-primary">Política de Privacidade</h1>
          
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">1. Introdução</h2>
            <p className="text-muted-foreground">
              A FalaZAP está comprometida em proteger a privacidade dos usuários de nossos serviços. Esta Política de Privacidade explica como coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">2. Coleta de Informações</h2>
            <p className="text-muted-foreground">
              Coletamos informações quando você:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Cria uma conta em nossa plataforma</li>
              <li>Utiliza nossos serviços de automação</li>
              <li>Interage com nossas ferramentas de marketing</li>
              <li>Acessa nosso website</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">3. Uso de Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência em nosso site. Os cookies nos ajudam a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Lembrar suas preferências e configurações</li>
              <li>Entender como você usa nosso site</li>
              <li>Melhorar nossos serviços</li>
              <li>Fornecer conteúdo personalizado</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">4. Proteção de Dados</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">5. Seus Direitos</h2>
            <p className="text-muted-foreground">
              Você tem direito a:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados imprecisos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold">6. Contato</h2>
            <p className="text-muted-foreground">
              Para questões relacionadas à privacidade, entre em contato conosco através do email: privacy@falazap.com
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;