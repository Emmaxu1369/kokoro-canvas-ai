import { useState } from "react";
import { X, Download, RotateCcw, Save, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface EditHistory {
  id: string;
  timestamp: Date;
  imageUrl: string;
  prompt: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  originalImage?: string;
  currentImage?: string;
  tags?: string[];
  prompt?: string;
  editHistory?: EditHistory[];
  onEdit?: (prompt: string, tags: string[]) => void;
  onRetry?: () => void;
  onDownload?: () => void;
  onSave?: () => void;
}

const EditModal = ({
  isOpen,
  onClose,
  originalImage = "/placeholder.svg",
  currentImage = "/placeholder.svg",
  tags = ["school uniform", "smiling", "long hair", "cat ears"],
  prompt = "Change expression to happy",
  editHistory = [],
  onEdit,
  onRetry,
  onDownload,
  onSave
}: EditModalProps) => {
  const [editPrompt, setEditPrompt] = useState(prompt);
  const [editTags, setEditTags] = useState(tags);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim() && !editTags.includes(newTag.trim())) {
      setEditTags(prev => [...prev, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setEditTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };

  const handleApplyEdit = () => {
    onEdit?.(editPrompt, editTags);
  };

  const mockHistory: EditHistory[] = [
    {
      id: "1",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      imageUrl: "/placeholder.svg",
      prompt: "Original image"
    },
    {
      id: "2",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      imageUrl: "/placeholder.svg",
      prompt: "Change to smiling"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-xl font-semibold">Edit Frame</DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 h-[500px]">
          {/* Left Sidebar - History */}
          <div className="w-60 space-y-4">
            <Label className="text-sm font-medium">Edit History</Label>
            <ScrollArea className="h-[450px]">
              <div className="space-y-2 pr-4">
                {editHistory.map((edit) => (
                  <div key={edit.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="aspect-square rounded overflow-hidden bg-muted mb-2">
                      <img 
                        src={edit.imageUrl} 
                        alt="Edit history" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {edit.timestamp.toLocaleTimeString()}
                    </p>
                    <p className="text-xs line-clamp-2">
                      {edit.prompt}
                    </p>
                  </div>
                ))}
                
                {editHistory.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No edit history yet
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Side - Current Image & Controls */}
          <div className="flex-1 p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-6">
                  {currentImage ? (
                    <img src={currentImage} alt="Current image" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground">No image</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 justify-center">
                <Button onClick={() => onRetry?.()}>
                  Retry
                </Button>
                <Button onClick={() => onSave?.()}>
                  Save
                </Button>
                <Button variant="outline" onClick={() => console.log("Share")}>
                  Share
                </Button>
                <Button variant="outline" onClick={() => console.log("Confirm")}>
                  Confirm
                </Button>
              </div>
            </div>

            {/* Current Image Tags */}
            <div className="space-y-2 max-w-md mx-auto">
              <Label className="text-sm font-medium">Current Tags</Label>
              <div className="flex flex-wrap gap-1 p-2 border border-border rounded-lg min-h-[40px]">
                {editTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveTag(tag)}
                    className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full hover:bg-primary/30 transition-colors flex items-center gap-1"
                  >
                    {tag}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            </div>

            {/* Tag Input Field */}
            <div className="space-y-2 max-w-md mx-auto">
              <Label className="text-sm font-medium">Add Tags</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-sm"
                />
                <Button size="sm" onClick={handleAddTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-2 max-w-md mx-auto">
              <Label className="text-sm font-medium">Prompt</Label>
              <textarea
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                className="w-full h-20 p-2 border border-border rounded-lg bg-background text-sm resize-none"
                placeholder="Describe the changes you want to make..."
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 max-w-md mx-auto">
              <Button variant="outline" size="sm" className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" />
                Retry
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button 
                onClick={handleApplyEdit}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-0 border-t border-border/50">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave} className="bg-gradient-primary hover:opacity-90">
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;