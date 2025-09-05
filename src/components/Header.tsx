import { Button } from "@/components/ui/button";
import { Menu, Globe } from "lucide-react";

const Header = () => {
  return (
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
          <div className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            <Globe className="w-4 h-4" />
            <span>EN/JP</span>
          </div>
          <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#tutorials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Tutorials
          </a>
          <a href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Community
          </a>
          <Button variant="outline" size="sm" className="rounded-full border-primary/50 text-primary hover:bg-primary/10">
            Login
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;