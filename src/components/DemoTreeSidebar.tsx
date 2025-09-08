import { cn } from "@/lib/utils";
import { FileImage, Edit3, Layers, Clock, Sparkles } from "lucide-react";

interface DemoTreeSidebarProps {
  activeDemo: string;
  onDemoChange: (demo: string) => void;
  language: "en" | "jp";
  onHover?: (demo: string | null) => void;
}

const DemoTreeSidebar = ({ activeDemo, onDemoChange, language, onHover }: DemoTreeSidebarProps) => {
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
    <div className="w-80 bg-card/20 backdrop-blur-xl rounded-3xl border border-border/30 p-8">
      <div className="space-y-6">
        {/* Root Base */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse blur-sm"></div>
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            KokoroLab Feature
          </h3>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto"></div>
        </div>

        {/* Tree Structure */}
        <div className="relative pl-6">
          {/* Main trunk growing from root */}
          <div className="absolute left-6 -top-8 bottom-8 w-1 bg-gradient-to-b from-primary via-primary/60 to-border/30 rounded-full"></div>
          
          <div className="space-y-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeDemo === feature.id;
              const isComingSoon = feature.status === "coming-soon";
              const isLit = getIsLit(index);
              const level = feature.level;
              
              return (
                <div key={feature.id} className="relative">
                  {/* Branch line */}
                  <div 
                    className={cn(
                      "absolute left-0 top-6 w-6 h-0.5 transition-all duration-500",
                      isLit ? "bg-primary/80" : "bg-border/30"
                    )}
                  />
                  
                  {/* Sub-branches for hierarchical levels */}
                  {level > 0 && (
                    <>
                      <div 
                        className={cn(
                          "absolute -left-3 top-6 w-3 h-0.5 transition-all duration-500",
                          isLit ? "bg-primary/60" : "bg-border/20"
                        )}
                      />
                      {level > 1 && (
                        <div 
                          className={cn(
                            "absolute -left-6 top-6 w-3 h-0.5 transition-all duration-500",
                            isLit ? "bg-primary/40" : "bg-border/20"
                          )}
                        />
                      )}
                    </>
                  )}
                  
                  <div
                    className={cn(
                      "relative flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all duration-500 ml-8",
                      isActive 
                        ? "bg-primary/15 border border-primary/40 shadow-2xl scale-105 translate-x-2" 
                        : isLit 
                          ? "bg-primary/5 border border-primary/20 hover:bg-primary/10 hover:scale-102"
                          : "bg-muted/10 border border-transparent hover:bg-muted/20",
                      isComingSoon && "opacity-60 cursor-not-allowed"
                    )}
                    onMouseEnter={() => {
                      if (!isComingSoon) {
                        onDemoChange(feature.id);
                        onHover?.(feature.id);
                      }
                    }}
                    onMouseLeave={() => onHover?.(null)}
                  >
                    {/* Node Circle with breathing effect */}
                    <div className={cn(
                      "relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-500",
                      isActive 
                        ? "bg-primary text-primary-foreground shadow-lg animate-pulse" 
                        : isLit
                          ? "bg-primary/20 text-primary border-2 border-primary/30"
                          : "bg-muted/50 text-muted-foreground",
                      isComingSoon && "bg-muted/30"
                    )}>
                      <Icon className={cn(
                        "w-5 h-5 transition-transform duration-500",
                        isActive && "animate-pulse"
                      )} />
                      
                      {/* Breathing glow effect for active/lit nodes */}
                      {(isActive || isLit) && !isComingSoon && (
                        <>
                          <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse blur-sm -z-10"></div>
                          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping -z-20"></div>
                        </>
                      )}
                    </div>

                    {/* Feature Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h4 className={cn(
                          "font-medium transition-colors duration-500",
                          isActive 
                            ? "text-primary font-semibold" 
                            : isLit 
                              ? "text-foreground"
                              : "text-muted-foreground"
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
                    
                    {/* Electricity effect for lit nodes */}
                    {isLit && !isComingSoon && (
                      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full animate-pulse"></div>
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