import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Mode = "variation" | "remix";

interface ModeToggleProps {
  onModeChange?: (mode: Mode) => void;
  onPromptChange?: (prompt: string) => void;
}

const ModeToggle = ({ onModeChange, onPromptChange }: ModeToggleProps) => {
  const [activeMode, setActiveMode] = useState<Mode>("variation");
  const [prompt, setPrompt] = useState("");

  const modes = [
    {
      id: "variation" as Mode,
      label: "Variation / 差分",
      subtext: "Keep the same character, change outfits and expressions.",
      placeholder: "e.g. change to school uniform, smiling face",
      buttonText: "Generate Variation"
    },
    {
      id: "remix" as Mode,
      label: "Remix / 编辑",
      subtext: "Freely modify the image with text instructions.",
      placeholder: "e.g. add a sword, waving hand, change background to classroom",
      buttonText: "Apply Edit"
    }
  ];

  const handleModeChange = (mode: Mode) => {
    setActiveMode(mode);
    setPrompt("");
    onModeChange?.(mode);
  };

  const handlePromptChange = (value: string) => {
    setPrompt(value);
    onPromptChange?.(value);
  };

  const activeConfig = modes.find(mode => mode.id === activeMode)!;

  return (
    <div className="space-y-6">
      {/* Mode Toggle Buttons */}
      <div className="grid grid-cols-2 gap-3 p-1 bg-muted/30 rounded-xl">
        {modes.map((mode) => (
          <button
            key={mode.id}
            onClick={() => handleModeChange(mode.id)}
            className={cn(
              "relative group p-4 rounded-lg transition-all duration-200",
              "text-left space-y-1",
              activeMode === mode.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                : "hover:bg-muted/50"
            )}
          >
            <div className="font-semibold text-sm">
              {mode.label}
            </div>
            
            {/* Hover tooltip */}
            <div className={cn(
              "absolute top-full left-0 right-0 mt-2 p-3 bg-popover text-popover-foreground",
              "text-xs rounded-lg border shadow-lg z-10 opacity-0 invisible",
              "group-hover:opacity-100 group-hover:visible transition-all duration-200",
              "transform translate-y-2 group-hover:translate-y-0"
            )}>
              {mode.subtext}
            </div>
          </button>
        ))}
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground">
          {activeConfig.label}
        </label>
        <Textarea
          value={prompt}
          onChange={(e) => handlePromptChange(e.target.value)}
          placeholder={activeConfig.placeholder}
          className="min-h-[100px] resize-none bg-card/50 border-border/50 focus:border-primary/50 transition-colors"
        />
        <Button 
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
          size="lg"
        >
          {activeConfig.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ModeToggle;