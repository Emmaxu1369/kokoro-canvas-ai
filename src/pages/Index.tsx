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
      badge: "AI-Powered Creative Studio",
      title: "All-in-One Anime AI",
      titleHighlight: "Creation Tool", 
      subtitle: "Just one simple sentence or tag. Supports image variation, smart editing, and full set generation — create faster than ever."
    },
    jp: {
      badge: "AI創作スタジオ",
      title: "オールインワン二次元AI",
      titleHighlight: "創作ツール",
      subtitle: "たった一言、またはタグを入力するだけで、差分生成・編集・セット生成が可能。あなたの創作をもっとスピーディーに。"
    }
  };

  const currentText = text[currentLanguage];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      <Header />
      
      {/* Modern ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/3 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-primary/2 to-accent/2 rounded-full blur-3xl"></div>
      </div>
      
      <main className="relative pt-32 pb-20">
        {/* Hero Section */}
        <div className="container mx-auto px-6 mb-24">
          <div className="text-center max-w-5xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/5 border border-primary/20 text-primary rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
                ✨ {currentText.badge}
              </div>
            </div>
            
            {/* Modern typography */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight tracking-tight">
              <span className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                {currentText.title}
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {currentText.titleHighlight}
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground/80 mb-16 max-w-4xl mx-auto leading-relaxed font-light">
              {currentText.subtitle}
            </p>
          </div>
        </div>

        {/* Main Demo Section */}
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-start justify-center max-w-7xl mx-auto">
            {/* Left - Tree Sidebar */}
            <DemoTreeSidebar 
              activeDemo={activeDemo}
              onDemoChange={setActiveDemo}
              language={currentLanguage}
            />
            
            {/* Right - Demo Showcase */}
            <DemoShowcase 
              activeDemo={activeDemo}
              language={currentLanguage}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
