import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DemoTreeSidebar from "@/components/DemoTreeSidebar";
import DemoShowcase from "@/components/DemoShowcase";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState("variation");
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "jp">("en");

  const text = {
    en: {
      badge: "Next-Gen AI Creative Tool",
      title: "All-in-One Anime AI Creation Tool",
      subtitle: "Just one simple sentence or tag. Supports image variation, smart editing, and full set generation — create faster than ever."
    },
    jp: {
      badge: "次世代AI創作ツール",
      title: "オールインワン二次元AI創作ツール", 
      subtitle: "たった一言、またはタグを入力するだけで、差分生成・編集・セット生成が可能。あなたの創作をもっとスピーディーに。"
    }
  };

  const currentText = text[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/30 overflow-hidden">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      {/* Soft ambient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-primary/8 to-accent/5 rounded-full filter blur-3xl opacity-40 animate-float"></div>
        <div className="absolute bottom-1/4 -right-32 w-[32rem] h-[32rem] bg-gradient-to-l from-accent/6 to-branch-lavender/4 rounded-full filter blur-3xl opacity-40 animate-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-br from-branch-mint/4 to-branch-peach/4 rounded-full filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '6s' }}></div>
      </div>

      <main className="relative">
        {/* Clean Hero Section */}
        <section className="pt-20 lg:pt-32 pb-16 lg:pb-24 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/20 text-primary text-sm font-semibold mb-10 animate-fade-in-up">
              <span className="animate-pulse mr-2 text-lg">✨</span>
              {currentText.badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight animate-fade-in-up tracking-tight" style={{ animationDelay: '0.2s' }}>
              {currentText.title}
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-5xl mx-auto leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.4s' }}>
              {currentText.subtitle}
            </p>
          </div>
        </section>

        {/* Clean Demo Section */}
        <section className="pb-20 lg:pb-32 px-6">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-col xl:flex-row gap-8 lg:gap-16 items-start">
              <DemoTreeSidebar 
                activeDemo={activeDemo}
                onDemoChange={setActiveDemo}
                language={currentLanguage}
              />
              <DemoShowcase 
                activeDemo={activeDemo}
                language={currentLanguage}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
