import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12 pb-32">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            All-in-One Anime AI Creation Tool
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Just one simple sentence or tag. Supports image variation, smart editing, and full set generation — create faster than ever.
          </p>
        </div>

        {/* Demo Content */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-lg p-8 shadow-lg transition-all duration-500 animate-breathe">
            <img 
              src={demoContent[activeDemo as keyof typeof demoContent].image} 
              alt={demoContent[activeDemo as keyof typeof demoContent].title}
              className="w-full h-64 object-cover rounded-lg mb-4 transition-all duration-500"
            />
            <h3 className="text-2xl font-semibold text-foreground mb-2 transition-all duration-300">
              {demoContent[activeDemo as keyof typeof demoContent].title}
            </h3>
            <p className="text-muted-foreground transition-all duration-300">
              {demoContent[activeDemo as keyof typeof demoContent].description}
            </p>
          </div>
        </div>
      </main>
      
      {/* Floating CTA Buttons */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="flex gap-4 bg-background/80 backdrop-blur-md rounded-full p-4 border shadow-lg">
          <Button 
            size="lg" 
            variant={activeDemo === "variation" ? "default" : "outline"}
            className="px-8 py-6 text-lg transition-all duration-300"
            onMouseEnter={() => setActiveDemo("variation")}
            onClick={() => setActiveDemo("variation")}
            asChild
          >
            <Link to="/variation">Variation</Link>
          </Button>
          <Button 
            size="lg" 
            variant={activeDemo === "storyflow" ? "default" : "outline"}
            className="px-8 py-6 text-lg transition-all duration-300"
            onMouseEnter={() => setActiveDemo("storyflow")}
            onClick={() => setActiveDemo("storyflow")}
            asChild
          >
            <Link to="/image-set">Storyflow</Link>
          </Button>
          <Button 
            size="lg" 
            variant={activeDemo === "fast" ? "default" : "outline"}
            className="px-8 py-6 text-lg transition-all duration-300"
            onMouseEnter={() => setActiveDemo("fast")}
            onClick={() => setActiveDemo("fast")}
            asChild
          >
            <Link to="/fast">Fast</Link>
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
