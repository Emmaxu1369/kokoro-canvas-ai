import { Badge } from "@/components/ui/badge";

interface DraggableTagProps {
  tag: string;
  onDragStart?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  selected?: boolean;
  onClick?: (tag: string) => void;
  className?: string;
}

const DraggableTag = ({
  tag,
  onDragStart,
  onRemove,
  selected = false,
  onClick,
  className
}: DraggableTagProps) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', tag);
    onDragStart?.(tag);
  };

  const handleClick = () => {
    onClick?.(tag);
  };

  return (
    <Badge
      variant={selected ? "default" : "secondary"}
      draggable
      onDragStart={handleDragStart}
      onClick={handleClick}
      className={`cursor-move hover:scale-105 transition-transform select-none ${
        selected ? 'bg-primary text-primary-foreground' : ''
      } ${className}`}
    >
      {tag}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(tag);
          }}
          className="ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full w-4 h-4 flex items-center justify-center text-xs"
        >
          ×
        </button>
      )}
    </Badge>
  );
};

export default DraggableTag;