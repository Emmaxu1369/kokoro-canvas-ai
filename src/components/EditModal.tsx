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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Image</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col gap-6 h-[70vh]">
          {/* Center - Current/Edited image with side buttons */}
          <div className="flex gap-4">
            <div className="flex-1 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {currentImage ? (
                <img 
                  src={currentImage} 
                  alt="Current" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-muted-foreground">No current image</div>
              )}
            </div>
            
            {/* Side buttons */}
            <div className="flex flex-col gap-2 justify-center">
              <Button onClick={() => onRetry?.()}>
                Retry
              </Button>
              <Button onClick={() => console.log("Download")}>
                Download
              </Button>
              <Button variant="outline" onClick={() => console.log("Share")}>
                Share
              </Button>
              <Button onClick={() => console.log("Confirm")}>
                Confirm
              </Button>
            </div>
          </div>
          
          {/* Bottom - Tags and Inputs */}
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <div className="flex flex-wrap gap-2 mb-2">
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
            
            <div>
              <label className="text-sm font-medium mb-2 block">Prompt</label>
              <textarea 
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="Describe how you'd like to modify the image..."
                rows={3}
                className="w-full px-3 py-2 bg-input border border-border rounded-md resize-none"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;