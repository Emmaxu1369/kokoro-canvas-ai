import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Download, Save, MoreHorizontal, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  type: "user" | "system";
  content: string;
  image?: string;
  timestamp?: Date;
  onRetry?: () => void;
  onDownload?: (imageUrl: string) => void;
  onSave?: (imageUrl: string) => void;
  onSelectImage?: (imageUrl: string) => void;
}

const ChatMessage = ({ 
  type, 
  content, 
  image, 
  timestamp,
  onRetry,
  onDownload,
  onSave,
  onSelectImage
}: ChatMessageProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex gap-3 mb-6",
      type === "user" ? "justify-end" : "justify-start"
    )}>
      {type === "system" && (
        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-4 h-4 rounded-full bg-primary"></div>
        </div>
      )}
      
      <div className={cn(
        "max-w-2xl",
        type === "user" ? "flex-col items-end" : "flex-col items-start"
      )}>
        <div className={cn(
          "rounded-2xl px-4 py-3 break-words",
          type === "user" 
            ? "bg-primary text-primary-foreground" 
            : "bg-card border border-border/50"
        )}>
          {content && (
            <p className="text-sm leading-relaxed">{content}</p>
          )}
          
          {image && (
            <div 
              className="mt-3 relative group cursor-pointer"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => onSelectImage?.(image)}
            >
              <img 
                src={image} 
                alt="Generated image" 
                className="rounded-lg max-w-full h-auto shadow-md hover:shadow-lg transition-shadow"
              />
              
              {/* Hover overlay with actions */}
              <div className={cn(
                "absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center gap-2 transition-opacity",
                isHovered ? "opacity-100" : "opacity-0"
              )}>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRetry?.();
                  }}
                  className="h-8 w-8 p-0 bg-card/80 hover:bg-card"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDownload?.(image);
                  }}
                  className="h-8 w-8 p-0 bg-card/80 hover:bg-card"
                >
                  <Download className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSave?.(image);
                  }}
                  className="h-8 w-8 p-0 bg-card/80 hover:bg-card"
                >
                  <Save className="h-4 w-4" />
                </Button>
                
                <Button
                  size="sm"
                  variant="secondary"
                  className="h-8 w-8 p-0 bg-card/80 hover:bg-card"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground mt-1">
            {formatTime(timestamp)}
          </span>
        )}
      </div>
      
      {type === "user" && (
        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
          <div className="w-5 h-5 rounded-full bg-foreground/20"></div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;