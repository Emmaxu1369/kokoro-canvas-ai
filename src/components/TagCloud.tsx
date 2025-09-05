import { useState } from "react";
import { cn } from "@/lib/utils";
import { X, Plus } from "lucide-react";

interface TagCloudProps {
  onTagClick?: (tag: string) => void;
  className?: string;
}

const defaultTags = [
  "cat ears", "school uniform", "glasses", "long hair", "short hair",
  "smiling", "serious", "angry", "surprised", "shy",
  "kimono", "casual clothes", "formal wear", "hoodie", "dress",
  "red eyes", "blue eyes", "green eyes", "purple eyes",
  "blonde hair", "black hair", "brown hair", "silver hair", "pink hair",
  "outdoor", "classroom", "bedroom", "cafe", "library",
  "sitting", "standing", "running", "waving", "pointing"
];

const TagCloud = ({ onTagClick, className }: TagCloudProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    onTagClick?.(tag);
  };

  const handleAddCustomTag = () => {
    if (customTag.trim() && !selectedTags.includes(customTag.trim())) {
      const newTag = customTag.trim();
      setSelectedTags(prev => [...prev, newTag]);
      onTagClick?.(newTag);
      setCustomTag("");
      setShowCustomInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomTag();
    } else if (e.key === 'Escape') {
      setShowCustomInput(false);
      setCustomTag("");
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">Quick Tags</h3>
        <button
          onClick={() => setShowCustomInput(!showCustomInput)}
          className="inline-flex items-center gap-1 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <Plus className="h-3 w-3" />
          Add Custom
        </button>
      </div>

      {/* Custom tag input */}
      {showCustomInput && (
        <div className="flex gap-2">
          <input
            type="text"
            value={customTag}
            onChange={(e) => setCustomTag(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Enter custom tag..."
            className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-lg focus:border-primary/50 focus:outline-none transition-colors"
            autoFocus
          />
          <button
            onClick={handleAddCustomTag}
            className="px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
          >
            Add
          </button>
        </div>
      )}

      {/* Selected tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground">Selected tags:</div>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-primary-foreground text-xs rounded-full"
              >
                {tag}
                <button
                  onClick={() => handleTagClick(tag)}
                  className="hover:bg-primary-foreground/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tag cloud */}
      <div className="flex flex-wrap gap-2">
        {defaultTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagClick(tag)}
            className={cn(
              "px-3 py-1.5 text-xs rounded-full border transition-all duration-200",
              "hover:scale-105 hover:shadow-md",
              selectedTags.includes(tag)
                ? "bg-primary text-primary-foreground border-primary shadow-lg"
                : "bg-card/50 text-foreground border-border/50 hover:border-primary/50 hover:bg-card/70"
            )}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagCloud;