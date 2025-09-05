import { useState } from "react";
import { Plus, Trash2, Edit3, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import FrameCard from "./FrameCard";

interface Frame {
  id: string;
  tags: string[];
  imageUrl?: string;
  isGenerated: boolean;
  isSelected?: boolean;
}

interface Cut {
  id: string;
  title: string;
  prompt: string;
  frames: Frame[];
}

interface CutCardProps {
  cut: Cut;
  onCutEdit?: (cutId: string, field: 'title' | 'prompt', value: string) => void;
  onCutDelete?: (cutId: string) => void;
  onFrameSelect?: (cutId: string, frameId: string, selected: boolean) => void;
  onFrameEdit?: (cutId: string, frameId: string) => void;
  onFrameRetry?: (cutId: string, frameId: string) => void;
  onFrameDownload?: (cutId: string, frameId: string) => void;
  onFrameGenerate?: (cutId: string, frameId: string) => void;
  onFrameAdd?: (cutId: string) => void;
  className?: string;
}

const CutCard = ({
  cut,
  onCutEdit,
  onCutDelete,
  onFrameSelect,
  onFrameEdit,
  onFrameRetry,
  onFrameDownload,
  onFrameGenerate,
  onFrameAdd,
  className
}: CutCardProps) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingPrompt, setIsEditingPrompt] = useState(false);
  const [editTitle, setEditTitle] = useState(cut.title);
  const [editPrompt, setEditPrompt] = useState(cut.prompt);

  const handleTitleSave = () => {
    onCutEdit?.(cut.id, 'title', editTitle);
    setIsEditingTitle(false);
  };

  const handlePromptSave = () => {
    onCutEdit?.(cut.id, 'prompt', editPrompt);
    setIsEditingPrompt(false);
  };

  const handleTitleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSave();
    } else if (e.key === 'Escape') {
      setEditTitle(cut.title);
      setIsEditingTitle(false);
    }
  };

  const handlePromptKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePromptSave();
    } else if (e.key === 'Escape') {
      setEditPrompt(cut.prompt);
      setIsEditingPrompt(false);
    }
  };

  const selectedFramesCount = cut.frames.filter(frame => frame.isSelected).length;

  return (
    <Card className={cn("bg-card/50 border-border/50", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          {/* Drag handle */}
          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
          
          {/* Cut title */}
          <div className="flex-1">
            {isEditingTitle ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={handleTitleSave}
                onKeyDown={handleTitleKeyPress}
                className="h-8 text-lg font-semibold bg-background"
                autoFocus
              />
            ) : (
              <h3
                className="text-lg font-semibold text-foreground cursor-text hover:text-primary transition-colors"
                onClick={() => setIsEditingTitle(true)}
              >
                {cut.title}
              </h3>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-1">
            {selectedFramesCount > 0 && (
              <span className="text-xs text-primary bg-primary/20 px-2 py-1 rounded-full">
                {selectedFramesCount} selected
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingPrompt(true)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCutDelete?.(cut.id)}
              className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Cut prompt */}
        <div className="space-y-2">
          {isEditingPrompt ? (
            <Input
              value={editPrompt}
              onChange={(e) => setEditPrompt(e.target.value)}
              onBlur={handlePromptSave}
              onKeyDown={handlePromptKeyPress}
              placeholder="Scene description..."
              className="bg-background"
              autoFocus
            />
          ) : (
            <p
              className="text-sm text-muted-foreground cursor-text hover:text-foreground transition-colors"
              onClick={() => setIsEditingPrompt(true)}
            >
              {cut.prompt || "Click to add scene description..."}
            </p>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Frames grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {cut.frames.map((frame) => (
            <FrameCard
              key={frame.id}
              frame={frame}
              onSelect={(frameId, selected) => onFrameSelect?.(cut.id, frameId, selected)}
              onEdit={(frameId) => onFrameEdit?.(cut.id, frameId)}
              onRetry={(frameId) => onFrameRetry?.(cut.id, frameId)}
              onDownload={(frameId) => onFrameDownload?.(cut.id, frameId)}
              onGenerate={(frameId) => onFrameGenerate?.(cut.id, frameId)}
            />
          ))}
          
          {/* Add frame button */}
          <div
            className="aspect-square rounded-lg border-2 border-dashed border-border/50 hover:border-primary/50 flex items-center justify-center cursor-pointer transition-colors group"
            onClick={() => onFrameAdd?.(cut.id)}
          >
            <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CutCard;