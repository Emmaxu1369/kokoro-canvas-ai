import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

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
      image: "/placeholder.svg?height=600&width=800",
      route: "/variation",
      buttonText: { en: "Try it!", jp: "試してみる！" }
    },
    "smart-edit": {
      title: { en: "Smart Edit", jp: "スマート編集" },
      description: { 
        en: "Smart Edit allows creators to modify images with natural language. From poses to backgrounds, every change stays true to the original style.",
        jp: "スマート編集は自然言語でイラストを修正可能。表情や背景変更も簡単に行え、画風は一貫して維持されます。"
      },
      image: "/placeholder.svg?height=600&width=800",
      route: "/variation", 
      buttonText: { en: "Try it!", jp: "試してみる！" }
    },
    "story-flow": {
      title: { en: "Story Flow", jp: "ストーリーフロー" },
      description: { 
        en: "Story Flow expands your creation into 50–100 connected illustrations, keeping characters and style consistent throughout the narrative.",
        jp: "ストーリーフロー機能で創作を連続展開。キャラクターや画風を維持しながら、50〜100枚の一貫したストーリーイラストに拡張できます。"
      },
      image: "/placeholder.svg?height=600&width=800",
      route: "/image-set",
      buttonText: { en: "Try it!", jp: "試してみる！" }
    },
    "fast-start": {
      title: { en: "Fast Start", jp: "ファストスタート" },
      description: { 
        en: "Fast Start generates results instantly with optimized presets. Perfect for quick ideas and rapid prototyping.",
        jp: "ファストスタートは最適化プリセットで即時生成。アイデアスケッチや高速プロトタイピングに最適です。"
      },
      image: "/placeholder.svg?height=600&width=800", 
      route: "/fast",
      buttonText: { en: "Coming Soon", jp: "準備中" }
    }
  };

  const currentDemo = demoContent[activeDemo as keyof typeof demoContent];
  const isComingSoon = activeDemo === "fast-start";

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

            {/* CTA Button */}
            <div className="flex justify-center">
              {isComingSoon ? (
                <Button 
                  disabled
                  size="lg"
                  className="px-8 py-6 text-lg rounded-2xl bg-muted text-muted-foreground cursor-not-allowed"
                >
                  {currentDemo.buttonText[language]}
                </Button>
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