import { Save, Tag, RefreshCw, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BatchOperationsToolbarProps {
  selectedCount: number;
  onSaveTemplate?: () => void;
  onAddTag?: () => void;
  onReplaceTag?: () => void;
  onRetryAll?: () => void;
  onDeleteAll?: () => void;
  onClearSelection?: () => void;
  className?: string;
}

const BatchOperationsToolbar = ({
  selectedCount,
  onSaveTemplate,
  onAddTag,
  onReplaceTag,
  onRetryAll,
  onDeleteAll,
  onClearSelection,
  className
}: BatchOperationsToolbarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className={cn(
      "fixed top-20 left-1/2 -translate-x-1/2 bg-card/90 backdrop-blur-sm border border-border/50 rounded-lg shadow-lg z-50 p-4",
      "animate-fade-in",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            {selectedCount} frame{selectedCount !== 1 ? 's' : ''} selected
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearSelection}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        <div className="h-4 w-px bg-border/50" />

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onSaveTemplate}
            className="h-8 px-3 text-xs border-border/50 hover:border-primary/50"
          >
            <Save className="h-3 w-3 mr-1" />
            Save Template
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onAddTag}
            className="h-8 px-3 text-xs border-border/50 hover:border-primary/50"
          >
            <Tag className="h-3 w-3 mr-1" />
            Add Tag
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onReplaceTag}
            className="h-8 px-3 text-xs border-border/50 hover:border-primary/50"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Replace Tag
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onRetryAll}
            className="h-8 px-3 text-xs border-border/50 hover:border-primary/50"
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Retry All
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onDeleteAll}
            className="h-8 px-3 text-xs border-destructive/50 hover:border-destructive text-destructive hover:text-destructive"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchOperationsToolbar;