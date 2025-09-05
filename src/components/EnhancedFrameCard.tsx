import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Play, Edit, RotateCcw, Download, Eye, Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import TagInput from "./TagInput";

interface EnhancedFrameCardProps {
  id: string;
  title: string;
  tags: string[];
  isGenerated: boolean;
  imageUrl?: string;
  isSelected: boolean;
  globalGenerated?: boolean;
  previewMode?: boolean;
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
  globalGenerated = false,
  previewMode = false,
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
  const [showTagInput, setShowTagInput] = useState(false);
  const [tagSuggestions] = useState([
    "school uniform", "smiling", "long hair", "cat ears", "glasses", "classroom", 
    "wide shot", "close-up", "portrait", "full body", "outdoor", "indoor"
  ]);

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
            /* Generated Image */
            <div className="w-full h-full relative">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
              
              {/* Preview Mode Overlays */}
              {previewMode && (
                <>
                  {/* Bottom right menu */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-black/50 hover:bg-black/70 text-white"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {/* Top right edit icon */}
                  <div className="absolute top-2 right-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onEdit(id)}
                      className="bg-black/50 hover:bg-black/70 text-white"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              )}
              
              {/* Non-preview mode hover overlay */}
              {!previewMode && (
                <div className={cn(
                  "absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity",
                  isHovered ? "opacity-100" : "opacity-0"
                )}>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onEdit(id)}
                    className="bg-card/80 hover:bg-card"
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              )}
            </div>
          ) : (
            /* Preview Phase - Show tags overlay and blurred background */
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Blurred placeholder background */}
              <div className="absolute inset-0 bg-gradient-to-br from-muted/40 to-muted/70 backdrop-blur-sm"></div>
              
              {/* Tags overlay for non-generated frames */}
              {tags.length > 0 && (
                <div className="relative z-10 text-center p-4">
                  <div className="flex flex-wrap gap-1 justify-center mb-3">
                    {tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setShowTagInput(true)}
                        className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full hover:bg-primary/30 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                    {tags.length > 3 && (
                      <button
                        onClick={() => setShowTagInput(true)}
                        className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full hover:bg-muted/70 transition-colors"
                      >
                        +{tags.length - 3} more
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">Click tags to edit</p>
                </div>
              )}

              {/* Empty state - show add tags button */}
              {tags.length === 0 && (
                <div className="relative z-10 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowTagInput(true)}
                    className="bg-card/50 hover:bg-card/70"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Tags
                  </Button>
                </div>
              )}

              {/* Generate button for non-generated frames - removed on hover */}
              {!isGenerated && !previewMode && showTagInput && (
                <div className="mt-2">
                  <Button 
                    size="sm" 
                    onClick={(e) => {
                      e.stopPropagation();
                      onGenerate(id);
                    }}
                    className="w-full"
                  >
                    Generate
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tag Input Field - Hidden in preview mode, shown when tag is clicked and not globally generated */}
        {showTagInput && !isGenerated && !globalGenerated && !previewMode && (
          <div className="mb-3 p-3 bg-card/30 rounded-lg border border-border/50">
            <TagInput
              tags={tags}
              onTagsChange={(newTags) => onTagsChange(id, newTags)}
              placeholder="Add frame tags..."
              suggestions={tagSuggestions}
              className="mb-3"
            />
            <div className="mt-2">
              <Button 
                size="sm" 
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate(id);
                }}
                className="w-full"
              >
                Generate
              </Button>
            </div>
          </div>
        )}

        {/* Tags Input - Show for generated frames only in non-preview mode */}
        {isGenerated && !previewMode && (
          <TagInput
            tags={tags}
            onTagsChange={(newTags) => onTagsChange(id, newTags)}
            placeholder="Add frame tags..."
            disabled={false}
            className="text-xs"
          />
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedFrameCard;