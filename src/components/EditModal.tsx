import { useState } from "react";
import { Check, Download, Share2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TagArea from "./TagArea";
import PromptCopilot from "./PromptCopilot";
import HistoryRecords from "./HistoryRecords";

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
  const [editTags, setEditTags] = useState(tags);
  const [copilotTags, setCopilotTags] = useState<string[]>([]);

  const handleCopilotImageUpload = (file: File) => {
    // Generate mock tags from copilot image
    const mockTags = ["character", "pose", "lighting", "background"];
    setCopilotTags(mockTags);
  };

  const handlePromptToTags = (prompt: string) => {
    // Generate mock tags from prompt
    const mockTags = prompt.split(' ').slice(0, 4).map(word => word.toLowerCase());
    setCopilotTags(mockTags);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] w-[95vw] h-[95vh] max-h-[95vh] bg-gradient-to-br from-background via-background to-muted/20 p-0">
        <DialogHeader className="p-6 pb-0 flex-shrink-0">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Edit Image
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 flex gap-6 px-6 pb-6 min-h-0">
          {/* Left - History Sidebar */}
          <div className="w-80 flex-shrink-0">
            <HistoryRecords />
          </div>

          {/* Center - Image and Controls */}
          <div className="flex-1 flex flex-col">
            {/* Image with Action Buttons */}
            <div className="flex-1 bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-4">
              <div className="flex gap-6 h-full">
                {/* Image */}
                <div className="flex-1 bg-muted/30 rounded-xl flex items-center justify-center overflow-hidden">
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
                
                {/* Action buttons - Icons only */}
                <div className="flex flex-col gap-3 justify-center">
                  <Button 
                    onClick={() => console.log("Confirm")}
                    className="h-12 w-12 p-0 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                    title="Confirm"
                  >
                    <Check className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={() => onDownload?.()}
                    variant="outline"
                    className="h-12 w-12 p-0 border-primary/30 hover:bg-primary/10"
                    title="Download"
                  >
                    <Download className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={() => console.log("Share")}
                    variant="outline"
                    className="h-12 w-12 p-0"
                    title="Share"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                  <Button 
                    onClick={() => onRetry?.()}
                    variant="outline"
                    className="h-12 w-12 p-0"
                    title="Retry"
                  >
                    <RotateCcw className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Prompt Copilot */}
            <PromptCopilot
              onImageUpload={handleCopilotImageUpload}
              onPromptToTags={handlePromptToTags}
              generatedTags={copilotTags}
            />
          </div>

          {/* Right - Tags Area */}
          <div className="w-80 flex-shrink-0">
            <TagArea 
              tags={editTags}
              onTagsChange={setEditTags}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;