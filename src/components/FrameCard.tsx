import { useState } from "react";
import { Edit, RotateCcw, Download, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Frame {
  id: string;
  tags: string[];
  imageUrl?: string;
  isGenerated: boolean;
  isSelected?: boolean;
}

interface FrameCardProps {
  frame: Frame;
  onSelect?: (frameId: string, selected: boolean) => void;
  onEdit?: (frameId: string) => void;
  onRetry?: (frameId: string) => void;
  onDownload?: (frameId: string) => void;
  onGenerate?: (frameId: string) => void;
  className?: string;
}

const FrameCard = ({
  frame,
  onSelect,
  onEdit,
  onRetry,
  onDownload,
  onGenerate,
  className
}: FrameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onSelect?.(frame.id, e.target.checked);
  };

  return (
    <div
      className={cn(
        "relative group aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200",
        "hover:scale-105 hover:shadow-lg",
        frame.isSelected
          ? "border-primary shadow-lg shadow-primary/20"
          : "border-border/50 hover:border-primary/50",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Selection checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <input
          type="checkbox"
          checked={frame.isSelected || false}
          onChange={handleSelect}
          className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary focus:ring-2"
        />
      </div>

      {/* Frame content */}
      {frame.isGenerated && frame.imageUrl ? (
        <>
          {/* Generated image */}
          <img
            src={frame.imageUrl}
            alt="Generated frame"
            className="w-full h-full object-cover"
          />
          
          {/* Hover overlay with actions */}
          <div className={cn(
            "absolute inset-0 bg-black/60 flex items-center justify-center gap-2 transition-opacity duration-200",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onEdit?.(frame.id)}
              className="bg-background/90 hover:bg-background"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onRetry?.(frame.id)}
              className="bg-background/90 hover:bg-background"
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onDownload?.(frame.id)}
              className="bg-background/90 hover:bg-background"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Not generated - blurred placeholder with tags */}
          <div className="w-full h-full bg-muted/30 backdrop-blur-sm flex flex-col items-center justify-center p-4">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center mx-auto">
                <svg
                  className="w-6 h-6 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              
              {/* Tags overlay */}
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1 justify-center">
                  {frame.tags.slice(0, 3).map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs bg-background/80 text-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {frame.tags.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-background/80 text-muted-foreground"
                    >
                      +{frame.tags.length - 3}
                    </Badge>
                  )}
                </div>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onGenerate?.(frame.id)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* More options menu */}
      <div className="absolute top-2 right-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-6 w-6 p-0 bg-background/80 hover:bg-background transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}
            >
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem onClick={() => onEdit?.(frame.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRetry?.(frame.id)}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Retry
            </DropdownMenuItem>
            {frame.isGenerated && (
              <DropdownMenuItem onClick={() => onDownload?.(frame.id)}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FrameCard;