import { Heart, BookOpen, MessageSquare } from "lucide-react";

const WhySection = () => {
  const features = [
    {
      icon: Heart,
      title: "Anime-focused style",
      description: "Tailored for ACG creators, KokoroLab understands anime aesthetics better than general AI tools."
    },
    {
      icon: BookOpen,
      title: "Long-term memory & story consistency",
      description: "Maintain character settings and art style across your series — seamless storytelling."
    },
    {
      icon: MessageSquare,
      title: "Natural language / Tag editing",
      description: "One sentence or one tag is enough to precisely edit your image."
    }
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KokoroLab?
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-anime text-center group hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary to-accent p-4 group-hover:animate-glow">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySection;