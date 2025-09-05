import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import HowItWorksSection from "@/components/HowItWorksSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <WhySection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
};

export default Index;
