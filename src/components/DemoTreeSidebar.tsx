import { cn } from "@/lib/utils";
import { FileImage, Edit3, Layers, Clock, Sparkles } from "lucide-react";

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
      status: "available",
      level: 0
    },
    {
      id: "smart-edit", 
      icon: Edit3,
      name: { en: "Smart Edit", jp: "スマート編集" },
      status: "available",
      level: 1
    },
    {
      id: "story-flow",
      icon: Layers,
      name: { en: "Story Flow", jp: "ストーリーフロー" },
      status: "available",
      level: 2
    },
    {
      id: "coming-soon",
      icon: Sparkles,
      name: { en: "Advanced Features", jp: "高度な機能" },
      status: "coming-soon",
      level: 3
    }
  ];

  const getIsLit = (index: number) => {
    const activeIndex = features.findIndex(f => f.id === activeDemo);
    return activeIndex >= index;
  };

  return (
    <div className="w-80 lg:w-96">
      <div className="space-y-8">
        {/* Tree Structure with organic branches */}
        <div className="relative pl-8">
          {/* Main organic trunk */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/70 via-primary/50 to-muted/30 rounded-full"></div>
          
          <div className="space-y-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeDemo === feature.id;
              const isComingSoon = feature.status === "coming-soon";
              const isLit = getIsLit(index);
              const level = feature.level;
              
              return (
                <div key={feature.id} className="relative">
                  {/* Organic branch lines */}
                  <div className="absolute left-0 top-1/2 flex items-center">
                    {/* Main branch */}
                    <div 
                      className={cn(
                        "h-0.5 rounded-full transition-all duration-700",
                        isLit ? "bg-gradient-to-r from-primary to-accent w-12" : "bg-border/40 w-8"
                      )}
                    />
                    
                    {/* Branch curves for organic feel */}
                    {level > 0 && (
                      <div 
                        className={cn(
                          "absolute -left-4 w-4 h-4 border-l-2 border-b-2 rounded-bl-full transition-all duration-700",
                          isLit ? "border-primary/60" : "border-border/20"
                        )}
                        style={{ 
                          transform: `rotate(${level * 15}deg)`,
                          top: `-${level * 4}px`
                        }}
                      />
                    )}
                  </div>
                  
                  <div
                    className={cn(
                      "relative flex items-center space-x-6 p-6 rounded-3xl cursor-pointer transition-all duration-700 ml-16",
                      "backdrop-blur-md border border-border/20",
                      isActive 
                        ? "bg-gradient-to-r from-primary/20 to-accent/20 border-primary/50 shadow-[var(--shadow-primary)] scale-105 translate-x-4" 
                        : isLit 
                          ? "bg-card/60 border-primary/30 hover:bg-primary/10 hover:scale-102 hover:shadow-[var(--shadow-soft)]"
                          : "bg-card/30 hover:bg-card/50",
                      isComingSoon && "opacity-60 cursor-not-allowed"
                    )}
                    onMouseEnter={() => !isComingSoon && onDemoChange(feature.id)}
                  >
                    {/* Modern node with organic glow */}
                    <div className={cn(
                      "relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-700",
                      isActive 
                        ? "bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg rotate-3" 
                        : isLit
                          ? "bg-gradient-to-br from-primary/30 to-accent/30 text-primary border-2 border-primary/40"
                          : "bg-muted/50 text-muted-foreground",
                      isComingSoon && "bg-muted/30"
                    )}>
                      <Icon className="w-7 h-7" />
                      
                      {/* Organic glow effect */}
                      {(isActive || isLit) && !isComingSoon && (
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 animate-pulse blur-lg -z-10"></div>
                      )}
                    </div>

                    {/* Feature Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className={cn(
                          "text-lg font-semibold transition-colors duration-700",
                          isActive 
                            ? "text-primary" 
                            : isLit 
                              ? "text-foreground"
                              : "text-muted-foreground"
                        )}>
                          {feature.name[language]}
                        </h4>
                        {isComingSoon && (
                          <div className="flex items-center space-x-2 px-3 py-1 bg-muted/60 rounded-full">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-medium">
                              {language === "en" ? "Soon" : "準備中"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Active organic indicator */}
                    {isActive && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <div className="w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full animate-pulse shadow-lg"></div>
                        <div className="absolute inset-0 w-6 h-6 bg-gradient-to-r from-primary to-accent rounded-full animate-ping opacity-60"></div>
                      </div>
                    )}
                    
                    {/* Flowing energy for lit nodes */}
                    {isLit && !isComingSoon && (
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTreeSidebar;