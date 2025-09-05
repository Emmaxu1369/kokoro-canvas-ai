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
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Edit Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex gap-6 h-[75vh]">
          {/* Left - History */}
          <div className="w-64 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 p-4">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">History</h3>
            <ScrollArea className="h-full">
              <div className="space-y-3">
                {mockHistory.map((item) => (
                  <div 
                    key={item.id} 
                    className="group cursor-pointer bg-muted/30 hover:bg-muted/60 rounded-lg p-3 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <div className="aspect-square bg-muted rounded-md mb-2 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt="History" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{item.prompt}</p>
                    <p className="text-xs text-muted-foreground/60">
                      {item.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Right - Main editing area */}
          <div className="flex-1 space-y-6">
            {/* Image display with action buttons */}
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <div className="flex gap-6">
                {/* Image */}
                <div className="flex-1 bg-muted/30 rounded-xl flex items-center justify-center overflow-hidden aspect-square max-w-md">
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
                
                {/* Action buttons */}
                <div className="flex flex-col gap-3 justify-center">
                  <Button 
                    onClick={() => console.log("Confirm")}
                    className="px-6 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground"
                  >
                    确认
                  </Button>
                  <Button 
                    onClick={() => onDownload?.()}
                    variant="outline"
                    className="px-6 py-3 border-primary/30 hover:bg-primary/10"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    下载
                  </Button>
                  <Button 
                    onClick={() => console.log("Share")}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    分享
                  </Button>
                  <Button 
                    onClick={() => onRetry?.()}
                    variant="outline"
                    className="px-6 py-3"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重试
                  </Button>
                </div>
              </div>
            </div>

            {/* Tags section */}
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <Label className="text-sm font-semibold text-foreground mb-3 block uppercase tracking-wide">Tags</Label>
              <div className="flex flex-wrap gap-2 mb-4">
                {editTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleRemoveTag(tag)}
                    className="px-3 py-1.5 bg-primary/20 hover:bg-primary/30 text-primary text-sm rounded-full transition-all duration-200 flex items-center gap-2 hover:scale-105"
                  >
                    {tag}
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Input
                  placeholder="Add tag..."
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
                <Button size="sm" onClick={handleAddTag} className="px-4">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Prompt section */}
            <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-6">
              <Label className="text-sm font-semibold text-foreground mb-3 block uppercase tracking-wide">Prompt</Label>
              <Textarea 
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="Describe how you'd like to modify the image..."
                rows={4}
                className="bg-background/50 border-border/50 focus:border-primary/50 resize-none"
              />
              <Button 
                onClick={handleApplyEdit}
                className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold"
              >
                Apply Edit
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;