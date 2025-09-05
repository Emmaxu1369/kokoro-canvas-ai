import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Play, Edit, RotateCcw, Download, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import TagInput from "./TagInput";

interface EnhancedFrameCardProps {
  id: string;
  title: string;
  tags: string[];
  isGenerated: boolean;
  imageUrl?: string;
  isSelected: boolean;
  onSelect: (id: string, selected: boolean) => void;
  onTagsChange: (id: string, tags: string[]) => void;
  onGenerate: (id: string) => void;
  onEdit: (id: string) => void;
  onRetry: (id: string) => void;
  onDownload: (id: string) => void;
  onPreview: (id: string) => void;
  className?: string;
}

const EnhancedFrameCard = ({
  id,
  title,
  tags,
  isGenerated,
  imageUrl,
  isSelected,
  onSelect,
  onTagsChange,
  onGenerate,
  onEdit,
  onRetry,
  onDownload,
  onPreview,
  className
}: EnhancedFrameCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className={cn(
        "relative transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Checkbox
              checked={isSelected}
              onCheckedChange={(checked) => onSelect(id, !!checked)}
              className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
            />
            <h4 className="text-sm font-medium text-foreground">{title}</h4>
          </div>
        </div>

        {/* Image/Preview Area */}
        <div className="aspect-square rounded-lg overflow-hidden bg-muted/30 mb-3 relative group">
          {isGenerated && imageUrl ? (
            <img 
              src={imageUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Blurred placeholder with tags overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted/80 backdrop-blur-sm"></div>
              
              {/* Tags overlay for non-generated frames */}
              {tags.length > 0 && (
                <div className="relative z-10 text-center p-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {tags.length > 4 && (
                      <span className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                        +{tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Hover Actions */}
          <div className={cn(
            "absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            {!isGenerated ? (
              <Button
                size="sm"
                onClick={() => onGenerate(id)}
                className="bg-primary hover:bg-primary/90"
              >
                <Play className="h-4 w-4 mr-1" />
                Generate
              </Button>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onPreview(id)}
                  className="bg-card/80 hover:bg-card"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onEdit(id)}
                  className="bg-card/80 hover:bg-card"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onRetry(id)}
                  className="bg-card/80 hover:bg-card"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => onDownload(id)}
                  className="bg-card/80 hover:bg-card"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Tags Input - Only show for non-generated frames or always editable */}
        <TagInput
          tags={tags}
          onTagsChange={(newTags) => onTagsChange(id, newTags)}
          placeholder="Add frame tags..."
          disabled={false} // Always allow editing
          className="text-xs"
        />
      </CardContent>
    </Card>
  );
};

export default EnhancedFrameCard;