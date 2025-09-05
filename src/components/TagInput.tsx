import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  suggestions?: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const defaultSuggestions = [
  "school uniform", "cat ears", "smiling", "waving", "classroom", "outdoor", 
  "sunset", "glasses", "long hair", "short hair", "blue eyes", "green eyes",
  "magical", "fantasy", "modern", "traditional", "sitting", "standing"
];

const TagInput = ({
  tags,
  onTagsChange,
  suggestions = defaultSuggestions,
  placeholder = "Add tags...",
  disabled = false,
  className
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(suggestion)
  );

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      onTagsChange([...tags, trimmedTag]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="min-h-[40px] p-2 border border-border/50 rounded-lg bg-background/50 focus-within:border-primary/50 transition-colors">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Existing Tags */}
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-primary/20 text-primary hover:bg-primary/30 transition-colors"
            >
              {tag}
              {!disabled && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-4 w-4 p-0 ml-1 hover:bg-destructive/20 hover:text-destructive"
                  onClick={() => removeTag(tag)}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </Badge>
          ))}

          {/* Input */}
          {!disabled && (
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
              onFocus={() => setShowSuggestions(inputValue.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={tags.length === 0 ? placeholder : ""}
              className="flex-1 min-w-[100px] border-0 bg-transparent p-0 focus-visible:ring-0"
            />
          )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border/50 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
          {filteredSuggestions.slice(0, 8).map((suggestion) => (
            <button
              key={suggestion}
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              onClick={() => addTag(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TagInput;
