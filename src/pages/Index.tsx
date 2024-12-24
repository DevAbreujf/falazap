import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Steps } from "@/components/Steps";
import { HighScale } from "@/components/HighScale";
import { Functionalities } from "@/components/Functionalities";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Steps />
        <HighScale />
        <Functionalities />
      </main>
    </div>
  );
};

export default Index;