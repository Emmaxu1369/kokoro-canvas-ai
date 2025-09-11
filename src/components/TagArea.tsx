import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DraggableTag from "./DraggableTag";

interface TagAreaProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

const TagArea = ({ tags, onTagsChange, className }: TagAreaProps) => {
  const [newTag, setNewTag] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onTagsChange(tags.filter(tag => tag !== tagToRemove));
    setSelectedTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDeleteSelected = () => {
    onTagsChange(tags.filter(tag => !selectedTags.includes(tag)));
    setSelectedTags([]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedTag = e.dataTransfer.getData('text/plain');
    if (droppedTag && !tags.includes(droppedTag)) {
      onTagsChange([...tags, droppedTag]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <Card className={`bg-card/30 backdrop-blur-sm border-border/50 ${className}`}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center justify-between">
          Tags
          {selectedTags.length > 0 && (
            <Button
              size="sm"
              variant="destructive"
              onClick={handleDeleteSelected}
              className="h-6 px-2"
            >
              <X className="w-3 h-3" />
              Delete ({selectedTags.length})
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent 
        className="space-y-4"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {/* Existing Tags */}
        <div className="flex flex-wrap gap-2 min-h-[60px] border-2 border-dashed border-muted-foreground/20 rounded-lg p-3">
          {tags.length === 0 ? (
            <div className="text-xs text-muted-foreground">Drop tags here or add manually</div>
          ) : (
            tags.map((tag, index) => (
              <DraggableTag
                key={index}
                tag={tag}
                selected={selectedTags.includes(tag)}
                onClick={handleTagClick}
                onRemove={handleRemoveTag}
              />
            ))
          )}
        </div>

        {/* Add New Tag */}
        <div className="flex gap-2">
          <Input
            placeholder="Add tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1"
          />
          <Button size="sm" onClick={handleAddTag}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TagArea;
