import { useState } from "react";
import { X, Download, RotateCcw, Save, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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

        <div className="flex-1 grid grid-cols-3 gap-6 p-6 pt-0 overflow-hidden">
          {/* Left Column - Original & Controls */}
          <div className="space-y-4 overflow-y-auto">
            {/* Original Image */}
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-foreground">Original</h3>
              <div className="aspect-square rounded-lg overflow-hidden bg-muted/30">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Tags & Prompt */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {editTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pr-1 bg-card hover:bg-card/80"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                      >
                        <X className="h-2 w-2" />
                      </button>
                    </Badge>
                  ))}
                </div>
                
                {/* Add new tag */}
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Add tag..."
                    className="flex-1 h-8 text-sm"
                  />
                  <Button
                    size="sm"
                    onClick={handleAddTag}
                    className="h-8 px-2"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-foreground">Prompt</h3>
                <Textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  placeholder="Describe your edit..."
                  className="min-h-[80px] text-sm"
                />
              </div>

              <Button
                onClick={handleApplyEdit}
                className="w-full bg-gradient-primary hover:opacity-90"
              >
                Apply Edit
              </Button>
            </div>
          </div>

          {/* Center Column - Current Result */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground">Current Result</h3>
            <div className="aspect-square rounded-lg overflow-hidden bg-muted/30">
              <img
                src={currentImage}
                alt="Current result"
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={onRetry}
                className="flex-1"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
              <Button
                variant="outline"
                onClick={onDownload}
                className="flex-1"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          {/* Right Column - Edit History */}
          <div className="space-y-4 overflow-y-auto">
            <h3 className="text-sm font-medium text-foreground">Edit History</h3>
            <div className="space-y-3">
              {mockHistory.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-card/30 rounded-lg hover:bg-card/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-md overflow-hidden bg-muted/30 flex-shrink-0">
                      <img
                        src={item.imageUrl}
                        alt="History"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground mb-1">
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                      <p className="text-sm text-foreground line-clamp-2">
                        {item.prompt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {mockHistory.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-8">
                  No edit history yet
                </p>
              )}
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