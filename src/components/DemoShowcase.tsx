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
    <div className="flex-1 max-w-2xl">
      <div className={cn(
        "relative bg-gradient-to-br from-card/60 via-card/40 to-card/20 backdrop-blur-xl rounded-3xl p-8 border border-border/30 transition-all duration-700 animate-breathe shadow-2xl",
        "hover:shadow-[var(--shadow-primary)]"
      )}>
        {/* Decorative gradient border */}
        <div className="absolute -inset-px bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-3xl blur-sm"></div>
        
        <div className="relative">
          {/* Demo Image */}
          <div className="relative mb-8 group">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={currentDemo.image}
                alt={currentDemo.title[language]}
                className="w-full h-80 object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute top-4 right-4 px-3 py-1 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full text-sm font-medium">
              AI Generated
            </div>
          </div>

          {/* Demo Content */}
          <div className="space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                {currentDemo.title[language]}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto">
                {currentDemo.description[language]}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center gap-4">
              {isComingSoon ? (
                <Button 
                  disabled
                  size="lg"
                  className="px-8 py-6 text-lg rounded-2xl bg-muted text-muted-foreground cursor-not-allowed"
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
                      "px-8 py-6 text-lg rounded-2xl transition-all duration-300",
                      "border-primary/50 text-primary hover:bg-primary/10 hover:scale-105"
                    )}
                  >
                    <Link to={currentDemo.route}>
                      {currentDemo.buttonText[language]}
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                  </Button>
                  <Button 
                    size="lg"
                    className={cn(
                      "px-8 py-6 text-lg rounded-2xl transition-all duration-300",
                      "bg-gradient-to-r from-accent to-primary text-primary-foreground",
                      "hover:from-accent-glow hover:to-primary-glow hover:scale-105 hover:shadow-lg",
                      "active:scale-95"
                    )}
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {language === "en" ? "Fast Start" : "ファストスタート"}
                  </Button>
                </>
              ) : (
                <Button 
                  asChild
                  size="lg"
                  className={cn(
                    "px-8 py-6 text-lg rounded-2xl transition-all duration-300",
                    "bg-gradient-to-r from-primary to-accent text-primary-foreground",
                    "hover:from-primary-glow hover:to-accent-glow hover:scale-105 hover:shadow-lg",
                    "active:scale-95"
                  )}
                >
                  <Link to={currentDemo.route}>
                    {currentDemo.buttonText[language]}
                    <ArrowRight className="w-5 h-5 ml-2" />
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