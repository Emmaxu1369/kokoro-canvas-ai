import { cn } from "@/lib/utils";
import { FileImage, Edit3, Layers, Zap, Clock } from "lucide-react";

interface DemoTreeSidebarProps {
  activeDemo: string;
  onDemoChange: (demo: string) => void;
  language: "en" | "jp";
}

const DemoTreeSidebar = ({ activeDemo, onDemoChange, language }: DemoTreeSidebarProps) => {
  const features = [
    {
      id: "variation",
      icon: FileImage,
      name: { en: "Sprite Variations", jp: "スプライト差分" },
      status: "available"
    },
    {
      id: "smart-edit", 
      icon: Edit3,
      name: { en: "Smart Edit", jp: "スマート編集" },
      status: "available"
    },
    {
      id: "story-flow",
      icon: Layers,
      name: { en: "Story Flow", jp: "ストーリーフロー" },
      status: "available"
    },
    {
      id: "fast-start",
      icon: Zap,
      name: { en: "Fast Start", jp: "ファストスタート" },
      status: "coming-soon"
    }
  ];

  return (
    <div className="w-80 bg-card/20 backdrop-blur-xl rounded-3xl border border-border/30 p-8">
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {language === "en" ? "AI Creation Pipeline" : "AI創作パイプライン"}
          </h3>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
        </div>

        {/* Tree Structure */}
        <div className="space-y-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isActive = activeDemo === feature.id;
            const isComingSoon = feature.status === "coming-soon";
            
            return (
              <div key={feature.id} className="relative">
                {/* Connection Line */}
                {index < features.length - 1 && (
                  <div className="absolute left-6 top-12 w-px h-8 bg-border/50"></div>
                )}
                
                <div
                  className={cn(
                    "relative flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-300",
                    isActive 
                      ? "bg-primary/10 border border-primary/30 shadow-lg scale-105" 
                      : "hover:bg-muted/30 border border-transparent",
                    isComingSoon && "opacity-60 cursor-not-allowed"
                  )}
                  onMouseEnter={() => !isComingSoon && onDemoChange(feature.id)}
                >
                  {/* Node Circle */}
                  <div className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "bg-muted text-muted-foreground",
                    isComingSoon && "bg-muted/50"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Feature Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={cn(
                        "font-medium transition-colors duration-300",
                        isActive ? "text-primary" : "text-foreground"
                      )}>
                        {feature.name[language]}
                      </h4>
                      {isComingSoon && (
                        <div className="flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded-full">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {language === "en" ? "Soon" : "準備中"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                      <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                      <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-75"></div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DemoTreeSidebar;