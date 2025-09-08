import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import variationDemo from "@/assets/demo-variation.jpg";
import smartEditDemo from "@/assets/demo-smart-edit.jpg";
import storyFlowDemo from "@/assets/demo-story-flow.jpg";

interface DemoShowcaseProps {
  activeDemo: string;
  language: "en" | "jp";
}

const DemoShowcase = ({ activeDemo, language }: DemoShowcaseProps) => {
  const demoContent = {
    variation: {
      title: { en: "Sprite Variations", jp: "スプライト差分" },
      description: { 
        en: "Sprite Variations let you generate multiple outfits, expressions, and fine details from a single illustration while preserving consistency.",
        jp: "スプライト差分機能により、一枚のイラストから服装や表情などを変えた複数のバリエーションを生成し、一貫した画風を保ちます。"
      },
      image: variationDemo,
      route: "/variation",
      buttonText: { en: "Try it!", jp: "試してみる！" },
      hasMultipleButtons: false
    },
    "smart-edit": {
      title: { en: "Smart Edit", jp: "スマート編集" },
      description: { 
        en: "Smart Edit allows creators to modify images with natural language. From poses to backgrounds, every change stays true to the original style.",
        jp: "スマート編集は自然言語でイラストを修正可能。表情や背景変更も簡単に行え、画風は一貫して維持されます。"
      },
      image: smartEditDemo,
      route: "/variation", 
      buttonText: { en: "Try it!", jp: "試してみる！" },
      hasMultipleButtons: false
    },
    "story-flow": {
      title: { en: "Story Flow", jp: "ストーリーフロー" },
      description: { 
        en: "Story Flow expands your creation into 50–100 connected illustrations, keeping characters and style consistent throughout the narrative.",
        jp: "ストーリーフロー機能で創作を連続展開。キャラクターや画風を維持しながら、50〜100枚の一貫したストーリーイラストに拡張できます。"
      },
      image: storyFlowDemo,
      route: "/image-set",
      buttonText: { en: "Try it!", jp: "試してみる！" },
      hasMultipleButtons: true
    },
    "coming-soon": {
      title: { en: "Advanced Features", jp: "高度な機能" },
      description: { 
        en: "More powerful AI features are coming soon. Stay tuned for advanced editing capabilities and enhanced creative workflows.",
        jp: "より強力なAI機能が近日公開予定。高度な編集機能と強化されたクリエイティブワークフローをお楽しみに。"
      },
      image: "/placeholder.svg?height=600&width=800", 
      route: "#",
      buttonText: { en: "Coming Soon", jp: "準備中" },
      hasMultipleButtons: false
    }
  };

  const currentDemo = demoContent[activeDemo as keyof typeof demoContent];
  const isComingSoon = activeDemo === "coming-soon";

  if (!currentDemo) return null;

  return (
    <div className="flex-1 max-w-3xl">
      <div className={cn(
        "relative bg-card/80 backdrop-blur-sm rounded-[2rem] p-10 border-2 border-border/30 transition-all duration-700 animate-breathe",
        "hover:shadow-[var(--shadow-card)] hover:border-primary/20"
      )}>
        {/* Clean gradient border */}
        <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-[2rem] opacity-30"></div>
        
        <div className="relative">
          {/* Demo Image */}
          <div className="relative mb-10 group">
            <div className="relative overflow-hidden rounded-3xl border border-border/20">
              <img 
                src={currentDemo.image}
                alt={currentDemo.title[language]}
                className="w-full h-96 object-cover transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Clean floating badge */}
            <div className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-md text-primary rounded-full text-sm font-semibold shadow-lg border border-primary/20">
              AI Generated
            </div>
          </div>

          {/* Demo Content */}
          <div className="space-y-8">
            <div className="text-center space-y-6">
              <h3 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent leading-tight">
                {currentDemo.title[language]}
              </h3>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
                {currentDemo.description[language]}
              </p>
            </div>

            {/* Clean CTA Buttons */}
            <div className="flex justify-center gap-6">
              {isComingSoon ? (
                <Button 
                  disabled
                  size="lg"
                  className="px-10 py-6 text-lg rounded-full bg-muted/50 text-muted-foreground cursor-not-allowed border-2 border-muted/30"
                >
                  {currentDemo.buttonText[language]}
                </Button>
              ) : currentDemo.hasMultipleButtons ? (
                // Story Flow with dual buttons
                <>
                  <Button 
                    asChild
                    size="lg"
                    variant="outline"
                    className={cn(
                      "px-10 py-6 text-lg rounded-full transition-all duration-500 font-semibold",
                      "border-2 border-primary/50 text-primary hover:bg-primary/10 hover:scale-105 hover:shadow-[var(--shadow-primary)]"
                    )}
                  >
                    <Link to={currentDemo.route}>
                      {currentDemo.buttonText[language]}
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg"
                    className={cn(
                      "px-10 py-6 text-lg rounded-full transition-all duration-500 font-semibold",
                      "bg-gradient-to-r from-accent to-primary text-white",
                      "hover:from-accent-glow hover:to-primary-glow hover:scale-105 hover:shadow-[var(--shadow-primary)]",
                      "active:scale-95"
                    )}
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    {language === "en" ? "Fast Start" : "ファストスタート"}
                  </Button>
                </>
              ) : (
                <Button 
                  asChild
                  size="lg"
                  className={cn(
                    "px-12 py-6 text-xl rounded-full transition-all duration-500 font-semibold",
                    "bg-gradient-to-r from-primary to-accent text-white",
                    "hover:from-primary-glow hover:to-accent-glow hover:scale-110 hover:shadow-[var(--shadow-primary)]",
                    "active:scale-95"
                  )}
                >
                  <Link to={currentDemo.route}>
                    {currentDemo.buttonText[language]}
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoShowcase;