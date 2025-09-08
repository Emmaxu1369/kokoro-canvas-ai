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
        {/* Organic Tree Structure */}
        <div className="relative pl-16">
          {/* Main trunk - vertical */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/60 via-branch-lavender/50 to-branch-mint/40 rounded-full"></div>
          
          <div className="space-y-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const isActive = activeDemo === feature.id;
              const isComingSoon = feature.status === "coming-soon";
              const isLit = getIsLit(index);
              const level = feature.level;
              
              // Different branch colors for each level
              const branchColors = [
                'hsl(var(--primary))',
                'hsl(var(--branch-lavender))', 
                'hsl(var(--branch-mint))',
                'hsl(var(--branch-peach))'
              ];
              const branchColor = branchColors[level] || branchColors[0];
              
              return (
                <div key={feature.id} className="relative">
                  {/* Organic curved branches */}
                  <div className="absolute left-0 top-1/2">
                    {/* Main branch - horizontal with curve */}
                    <svg width="60" height="40" viewBox="0 0 60 40" className="absolute -top-5">
                      <path
                        d={`M8 20 Q ${20 + level * 8} ${20 - level * 6} ${40 + level * 4} 20`}
                        stroke={isLit ? branchColor : 'hsl(var(--border))'}
                        strokeWidth="2"
                        fill="none"
                        className="transition-all duration-700"
                        opacity={isLit ? 0.8 : 0.3}
                      />
                      {/* Branch nodes along the path */}
                      <circle
                        cx={24 + level * 4}
                        cy={20 - level * 3}
                        r="2"
                        fill={isLit ? branchColor : 'hsl(var(--border))'}
                        className="transition-all duration-700"
                        opacity={isLit ? 0.6 : 0.2}
                      />
                    </svg>
                    
                    {/* Secondary branches for organic feel */}
                    {level > 0 && (
                      <>
                        <svg width="30" height="20" viewBox="0 0 30 20" className="absolute -top-2 left-8">
                          <path
                            d="M0 10 Q8 5 15 10"
                            stroke={isLit ? branchColor : 'hsl(var(--border))'}
                            strokeWidth="1"
                            fill="none"
                            className="transition-all duration-700"
                            opacity={isLit ? 0.5 : 0.2}
                          />
                        </svg>
                        <svg width="25" height="20" viewBox="0 0 25 20" className="absolute -bottom-2 left-12">
                          <path
                            d="M0 10 Q6 15 12 10"
                            stroke={isLit ? branchColor : 'hsl(var(--border))'}
                            strokeWidth="1"
                            fill="none"
                            className="transition-all duration-700"
                            opacity={isLit ? 0.4 : 0.2}
                          />
                        </svg>
                      </>
                    )}
                  </div>
                  
                  <div
                    className={cn(
                      "relative flex items-center space-x-6 p-6 rounded-3xl cursor-pointer transition-all duration-700 ml-20",
                      "border-2",
                      isActive 
                        ? "bg-gradient-to-r from-primary/15 to-accent/15 border-primary/40 shadow-[var(--shadow-primary)] scale-105 translate-x-4" 
                        : isLit 
                          ? "bg-card border-primary/20 hover:bg-primary/5 hover:scale-102 hover:shadow-[var(--shadow-soft)]"
                          : "bg-card/50 border-border/30 hover:bg-card",
                      isComingSoon && "opacity-60 cursor-not-allowed"
                    )}
                    onMouseEnter={() => !isComingSoon && onDemoChange(feature.id)}
                  >
                    {/* Macaron node design */}
                    <div className={cn(
                      "relative flex items-center justify-center w-16 h-16 rounded-2xl transition-all duration-700",
                      isActive 
                        ? "shadow-lg rotate-3" 
                        : isLit
                          ? "border-2"
                          : "",
                      isComingSoon && "opacity-50"
                    )}
                    style={{
                      background: isActive 
                        ? `linear-gradient(135deg, ${branchColor}, hsl(var(--accent)))` 
                        : isLit
                          ? `${branchColor}20`
                          : 'hsl(var(--muted))',
                      borderColor: isLit ? branchColor : 'transparent',
                      color: isActive ? 'white' : isLit ? branchColor : 'hsl(var(--muted-foreground))'
                    }}>
                      <Icon className="w-7 h-7" />
                      
                      {/* Soft glow effect */}
                      {(isActive || isLit) && !isComingSoon && (
                        <div 
                          className="absolute inset-0 rounded-2xl animate-pulse blur-lg -z-10"
                          style={{ background: `${branchColor}30` }}
                        ></div>
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
                          <div className="flex items-center space-x-2 px-3 py-1 bg-muted rounded-full">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground font-medium">
                              {language === "en" ? "Soon" : "準備中"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Clean active indicator */}
                    {isActive && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <div 
                          className="w-6 h-6 rounded-full animate-pulse shadow-lg"
                          style={{ background: `linear-gradient(135deg, ${branchColor}, hsl(var(--accent)))` }}
                        ></div>
                        <div 
                          className="absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-60"
                          style={{ background: `linear-gradient(135deg, ${branchColor}, hsl(var(--accent)))` }}
                        ></div>
                      </div>
                    )}
                    
                    {/* Gentle flowing effect */}
                    {isLit && !isComingSoon && (
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div 
                          className="absolute inset-0 animate-pulse"
                          style={{ background: `linear-gradient(90deg, transparent, ${branchColor}10, transparent)` }}
                        ></div>
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