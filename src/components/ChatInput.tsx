import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Image, Wand2, Edit3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import SettingsPanel from "./SettingsPanel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

type ChatMode = "variation" | "remix";

interface ChatInputProps {
  onSendMessage: (message: string, mode: ChatMode) => void;
  onImageUpload?: (file: File) => void;
  disabled?: boolean;
  selectedImage?: string;
  onClearImage?: () => void;
}

const ChatInput = ({
  onSendMessage,
  onImageUpload,
  disabled = false,
  selectedImage,
  onClearImage
}: ChatInputProps) => {
  const [mode, setMode] = useState<ChatMode>("variation");
  const [message, setMessage] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  const modes = {
    variation: {
      label: "Variation",
      icon: Wand2,
      placeholder: "e.g. change to school uniform, smiling face",
      description: "Keep the same character, change outfits and expressions"
    },
    remix: {
      label: "Remix", 
      icon: Edit3,
      placeholder: "e.g. add a sword, waving hand, change background to classroom",
      description: "Freely modify the image with text instructions"
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, mode);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageUpload) {
      onImageUpload(file);
    }
  };

  return (
    <div className="border-t border-border/50 bg-card/20 backdrop-blur-sm p-4">
      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="mb-4 p-3 bg-muted/30 rounded-xl border border-border/50">
          <div className="flex items-center gap-3">
            <img 
              src={selectedImage} 
              alt="Selected" 
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div className="flex-1">
              <p className="text-sm text-foreground">Selected image for editing</p>
              <p className="text-xs text-muted-foreground">This image will be used as the base for generation</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearImage}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {/* Mode Selection */}
      <div className="flex gap-2 mb-3">
        {Object.entries(modes).map(([key, modeConfig]) => {
          const Icon = modeConfig.icon;
          const isActive = mode === key;
          
          return (
            <Button
              key={key}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setMode(key as ChatMode)}
              className={cn(
                "flex items-center gap-2 transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-card/50 hover:bg-card/70 border-border/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {modeConfig.label}
            </Button>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="relative">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={modes[mode].placeholder}
          disabled={disabled}
          className="min-h-[60px] max-h-32 resize-none pr-20 bg-background/50 border-border/50 focus:border-primary/50"
        />
        
        {/* Action Buttons */}
        <div className="absolute right-2 bottom-2 flex gap-1">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
              asChild
            >
              <span>
                <Image className="h-4 w-4" />
              </span>
            </Button>
          </label>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-primary"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            size="sm"
            className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mode Description */}
      <p className="text-xs text-muted-foreground mt-2 text-center">
        {modes[mode].description}
      </p>

      {/* Settings Panel */}
      {showSettings && (
        <div className="mt-4">
          <SettingsPanel />
        </div>
      )}
    </div>
  );
};

export default ChatInput;