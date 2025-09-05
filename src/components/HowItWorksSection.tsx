import { ArrowRight, RefreshCw, Edit3, Layers } from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: RefreshCw,
      title: "Variation demo",
      subtitle: "Original → Modified with tag",
      description: "Enter a tag or sentence to quickly generate variations."
    },
    {
      icon: Edit3,
      title: "Edit demo",
      subtitle: "Local modification (expression, outfit)",
      description: "Refine with natural language for freeform edits."
    },
    {
      icon: Layers,
      title: "Set demo",
      subtitle: "One image → multiple consistent frames",
      description: "Expand into a complete set while keeping character consistency."
    }
  ];

  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Start Creating in{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              3 Simple Steps
            </span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col lg:flex-row items-center space-y-8 lg:space-y-0 lg:space-x-8">
              {/* Step Card */}
              <div 
                className="card-anime text-center group hover:scale-105 transition-all duration-300 w-full max-w-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-primary to-accent p-5 group-hover:animate-glow">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-primary bg-primary/10 rounded-full px-3 py-1 inline-block">
                    Step {index + 1}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm font-medium text-accent">
                    {step.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Arrow (except for last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block">
                  <ArrowRight className="w-8 h-8 text-primary animate-float" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;