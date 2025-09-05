import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Sparkles, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Index = () => {
  const [activeDemo, setActiveDemo] = useState<"variation" | "storyflow" | "fast">("variation");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Center Area */}
      <section className="flex-1 flex items-center justify-center min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-6 text-center">
          {/* Slogan */}
          <div className="space-y-6 mb-16">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                All-in-One
              </span>
              <br />
              <span className="text-foreground">Anime AI Creation Tool</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto">
              Just one simple sentence or tag. Supports image variation, smart editing, 
              and full set generation — create faster than ever.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-2xl mx-auto">
            <Link to="/variation" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                className="w-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => setActiveDemo("variation")}
              >
                <ImageIcon className="w-6 h-6 mr-3" />
                Variation
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Link to="/image-set" className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline"
                className="w-full px-8 py-6 text-lg border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => setActiveDemo("storyflow")}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Storyflow
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
            
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-lg border-accent/50 text-accent hover:bg-accent/10"
              onClick={() => setActiveDemo("fast")}
            >
              <Zap className="w-6 h-6 mr-3 animate-pulse" />
              Fast
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
