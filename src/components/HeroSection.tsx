import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Image as ImageIcon } from "lucide-react";
import heroImage from "@/assets/hero-anime.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-hero flex items-center pt-20">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-primary animate-float opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 rounded-full bg-accent animate-float opacity-80" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 rounded-full bg-primary-glow animate-float opacity-40" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="space-y-8 animate-fade-in-up">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                All-in-One
              </span>
              <br />
              <span className="text-foreground">Anime AI</span>
              <br />
              <span className="text-foreground">Creation Tool</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl">
              From Inspiration to Final Artwork, Generate Your Anime World in Seconds
            </p>
            
            <p className="text-lg text-muted-foreground/80 max-w-xl">
              Just one simple sentence or tag. Supports image variation, smart editing, 
              and full set generation — create faster than ever.
            </p>
          </div>

          {/* Demo Tag Input */}
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center space-x-2 bg-input rounded-2xl px-6 py-4 border border-border/50">
                <Sparkles className="w-5 h-5 text-primary animate-glow" />
                <span className="text-muted-foreground">Try: "school uniform, smiling"</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Hero Image */}
        <div className="relative">
          <div className="relative rounded-3xl overflow-hidden glow-primary">
            <img 
              src={heroImage} 
              alt="Anime AI Generated Character" 
              className="w-full h-auto object-cover animate-float"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
          </div>
        </div>
      </div>

      {/* Floating CTA Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex space-x-4 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <Button className="btn-hero-outline" onClick={() => window.location.href = '/variation'}>
            <ImageIcon className="w-5 h-5 mr-2" />
            Modify Image
          </Button>
          <Button className="btn-hero-primary" onClick={() => window.location.href = '/image-set'}>
            <Sparkles className="w-5 h-5 mr-2" />
            Generate Full Set
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;