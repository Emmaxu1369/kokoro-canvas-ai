import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, GripVertical, Trash2, Edit3, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import EnhancedFrameCard from "./EnhancedFrameCard";

interface Frame {
  id: string;
  title: string;
  tags: string[];
  isGenerated: boolean;
  imageUrl?: string;
}

interface EnhancedCutCardProps {
  id: string;
  title: string;
  description: string;
  frames: Frame[];
  selectedFrames: string[];
  onTitleChange: (id: string, title: string) => void;
  onDescriptionChange: (id: string, description: string) => void;
  onFrameSelect: (frameId: string, selected: boolean) => void;
  onFrameTagsChange: (frameId: string, tags: string[]) => void;
  onFrameGenerate: (frameId: string) => void;
  onFrameEdit: (frameId: string) => void;
  onFrameRetry: (frameId: string) => void;
  onFrameDownload: (frameId: string) => void;
  onFramePreview: (frameId: string) => void;
  onAddFrame: (cutId: string) => void;
  onDelete: (id: string) => void;
  className?: string;
}

const EnhancedCutCard = ({
  id,
  title,
  description,
  frames,
  selectedFrames,
  onTitleChange,
  onDescriptionChange,
  onFrameSelect,
  onFrameTagsChange,
  onFrameGenerate,
  onFrameEdit,
  onFrameRetry,
  onFrameDownload,
  onFramePreview,
  onAddFrame,
  onDelete,
  className
}: EnhancedCutCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);

  const handleTitleSave = () => {
    onTitleChange(id, tempTitle);
    setIsEditingTitle(false);
  };

  const handleTitleCancel = () => {
    setTempTitle(title);
    setIsEditingTitle(false);
  };

  const handleDescriptionSave = () => {
    onDescriptionChange(id, tempDescription);
    setIsEditingDescription(false);
  };

  const handleDescriptionCancel = () => {
    setTempDescription(description);
    setIsEditingDescription(false);
  };

  const handleDescriptionKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleDescriptionSave();
    } else if (e.key === "Escape") {
      handleDescriptionCancel();
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <GripVertical className="h-5 w-5 text-muted-foreground cursor-move" />
            
            {isEditingTitle ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={tempTitle}
                  onChange={(e) => setTempTitle(e.target.value)}
                  onBlur={handleTitleSave}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleTitleSave();
                    if (e.key === "Escape") handleTitleCancel();
                  }}
                  className="flex-1"
                  autoFocus
                />
                <Button size="sm" variant="ghost" onClick={handleTitleSave}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={handleTitleCancel}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 flex-1">
                <h3 className="text-lg font-semibold text-foreground">{title}</h3>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditingTitle(true)}
                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Edit3 className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(id)}
            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Description */}
        {isEditingDescription ? (
          <div className="space-y-2">
            <Textarea
              value={tempDescription}
              onChange={(e) => setTempDescription(e.target.value)}
              onKeyDown={handleDescriptionKeyPress}
              placeholder="Describe this cut/scene..."
              className="min-h-[60px] resize-none"
              autoFocus
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleDescriptionSave}>
                Save
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDescriptionCancel}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={() => setIsEditingDescription(true)}
          >
            {description || "Click to add scene description..."}
          </div>
        )}
      </CardHeader>

      <CardContent>
        {/* Frames Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {frames.map((frame) => (
            <EnhancedFrameCard
              key={frame.id}
              id={frame.id}
              title={frame.title}
              tags={frame.tags}
              isGenerated={frame.isGenerated}
              imageUrl={frame.imageUrl}
              isSelected={selectedFrames.includes(frame.id)}
              onSelect={onFrameSelect}
              onTagsChange={onFrameTagsChange}
              onGenerate={onFrameGenerate}
              onEdit={onFrameEdit}
              onRetry={onFrameRetry}
              onDownload={onFrameDownload}
              onPreview={onFramePreview}
            />
          ))}

          {/* Add Frame Button */}
          <Card className="aspect-square border-2 border-dashed border-border/50 hover:border-primary/50 transition-colors cursor-pointer group">
            <CardContent 
              className="h-full flex items-center justify-center p-4"
              onClick={() => onAddFrame(id)}
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-2" />
                <p className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
                  Add Frame
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedCutCard;