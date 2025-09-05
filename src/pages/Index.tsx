import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState("variation");

  const demoContent = {
    variation: {
      title: "Image Variation",
      description: "Transform your images with AI-powered variations",
      image: "/placeholder.svg?height=400&width=400",
    },
    storyflow: {
      title: "Storyflow Creation", 
      description: "Create complete image sets and stories",
      image: "/placeholder.svg?height=400&width=400",
    },
    fast: {
      title: "Fast Generation",
      description: "Lightning-fast AI image creation",
      image: "/placeholder.svg?height=400&width=400",
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/5">
      <Header />
      
      {/* Ambient background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>
      
      <main className="relative container mx-auto px-4 py-12 pb-32">
        <div className="text-center max-w-5xl mx-auto mb-20">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
              ✨ AI-Powered Creative Studio
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent mb-6 leading-tight">
            All-in-One Anime AI
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Creation Tool
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Just one simple sentence or tag. Supports image variation, smart editing, and full set generation — 
            <span className="text-primary font-semibold">create faster than ever.</span>
          </p>
        </div>

        {/* Enhanced Demo Content */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-card/80 via-card/60 to-card/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-border/20 transition-all duration-700 animate-breathe">
            {/* Decorative elements */}
            <div className="absolute -top-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            <div className="absolute -bottom-px left-20 right-20 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            
            <div className="relative">
              <img 
                src={demoContent[activeDemo as keyof typeof demoContent].image} 
                alt={demoContent[activeDemo as keyof typeof demoContent].title}
                className="w-full h-80 object-cover rounded-xl mb-6 transition-all duration-700 shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent rounded-xl pointer-events-none"></div>
            </div>
            
            <div className="text-center">
              <h3 className="text-3xl font-bold text-foreground mb-3 transition-all duration-500">
                {demoContent[activeDemo as keyof typeof demoContent].title}
              </h3>
              <p className="text-lg text-muted-foreground transition-all duration-500 leading-relaxed">
                {demoContent[activeDemo as keyof typeof demoContent].description}
              </p>
            </div>
          </div>
        </div>
      </main>
      
      {/* Enhanced Floating CTA Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex gap-3 bg-card/90 backdrop-blur-xl rounded-2xl p-3 border border-border/30 shadow-2xl">
          <Button 
            size="lg" 
            variant={activeDemo === "variation" ? "default" : "ghost"}
            className={cn(
              "px-8 py-6 text-lg font-semibold transition-all duration-500 rounded-xl",
              activeDemo === "variation" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105" 
                : "hover:bg-muted/50 hover:scale-105"
            )}
            onMouseEnter={() => setActiveDemo("variation")}
            onClick={() => setActiveDemo("variation")}
            asChild
          >
            <Link to="/variation">
              <span className="relative">
                Variation
                {activeDemo === "variation" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-foreground/50 rounded-full"></div>
                )}
              </span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant={activeDemo === "storyflow" ? "default" : "ghost"}
            className={cn(
              "px-8 py-6 text-lg font-semibold transition-all duration-500 rounded-xl",
              activeDemo === "storyflow" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105" 
                : "hover:bg-muted/50 hover:scale-105"
            )}
            onMouseEnter={() => setActiveDemo("storyflow")}
            onClick={() => setActiveDemo("storyflow")}
            asChild
          >
            <Link to="/image-set">
              <span className="relative">
                Storyflow
                {activeDemo === "storyflow" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-foreground/50 rounded-full"></div>
                )}
              </span>
            </Link>
          </Button>
          <Button 
            size="lg" 
            variant={activeDemo === "fast" ? "default" : "ghost"}
            className={cn(
              "px-8 py-6 text-lg font-semibold transition-all duration-500 rounded-xl",
              activeDemo === "fast" 
                ? "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg scale-105" 
                : "hover:bg-muted/50 hover:scale-105"
            )}
            onMouseEnter={() => setActiveDemo("fast")}
            onClick={() => setActiveDemo("fast")}
            asChild
          >
            <Link to="/fast">
              <span className="relative">
                Fast
                {activeDemo === "fast" && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-foreground/50 rounded-full"></div>
                )}
              </span>
            </Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
