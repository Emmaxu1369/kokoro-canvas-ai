import { Button } from "@/components/ui/button";
import { Menu, Globe } from "lucide-react";
import LoginModal from "./LoginModal";
import { useState } from "react";

interface HeaderProps {
  currentLanguage: "en" | "jp";
  onLanguageChange: (language: "en" | "jp") => void;
}

const Header = ({ currentLanguage, onLanguageChange }: HeaderProps) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === "en" ? "jp" : "en";
    onLanguageChange(newLanguage);
    // Simulate page refresh
    window.location.reload();
  };

  const text = {
    en: {
      pricing: "Pricing",
      tutorials: "Tutorials", 
      community: "Community",
      login: "Login"
    },
    jp: {
      pricing: "料金",
      tutorials: "チュートリアル",
      community: "コミュニティ", 
      login: "ログイン"
    }
  };

  const currentText = text[currentLanguage];

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              KokoroLab
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <div 
              className="flex items-center space-x-2 text-sm hover:text-foreground transition-colors cursor-pointer"
              onClick={toggleLanguage}
            >
              <Globe className="w-4 h-4" />
              <span className="flex items-center space-x-1">
                <span className={currentLanguage === "en" ? "font-bold text-foreground" : "text-muted-foreground"}>
                  EN
                </span>
                <span className="text-muted-foreground">/</span>
                <span className={currentLanguage === "jp" ? "font-bold text-foreground" : "text-muted-foreground"}>
                  JP
                </span>
              </span>
            </div>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {currentText.pricing}
            </a>
            <a href="#tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {currentText.tutorials}
            </a>
            <a href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {currentText.community}
            </a>
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
              onClick={() => setIsLoginModalOpen(true)}
            >
              {currentText.login}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        language={currentLanguage}
      />
    </>
  );
};

export default Header;