import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Globe, User, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import LoginModal from "./LoginModal";

const Header = () => {
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "jp">("en");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [userId] = useState("user_12345"); // Mock user ID

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "jp" : "en");
    // Simulate page refresh
    window.location.reload();
  };

  const text = {
    en: {
      pricing: "Pricing",
      tutorials: "Tutorials", 
      community: "Community",
      login: "Login",
      settings: "Settings",
      logout: "Logout"
    },
    jp: {
      pricing: "料金",
      tutorials: "チュートリアル",
      community: "コミュニティ", 
      login: "ログイン",
      settings: "設定",
      logout: "ログアウト"
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
            {isLoggedIn ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 p-2 rounded-full hover:bg-primary/10">
                    <span className="text-sm font-medium text-foreground">{userId}</span>
                    <Avatar className="h-6 w-6">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary/20 text-primary text-xs">
                        {userId.slice(-2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 p-0" align="end">
                  <div className="p-4 border-b">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-primary/20 text-primary">
                          {userId.slice(-2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-foreground">{userId}</p>
                        <p className="text-sm text-muted-foreground">KokoroLab User</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Button variant="ghost" className="w-full justify-start" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      {currentText.settings}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-destructive hover:text-destructive" 
                      size="sm"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      {currentText.logout}
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full border-primary/50 text-primary hover:bg-primary/10"
                onClick={() => setIsLoginModalOpen(true)}
              >
                {currentText.login}
              </Button>
            )}
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