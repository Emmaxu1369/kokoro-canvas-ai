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
      <DialogContent className="max-w-[98vw] w-[98vw] h-[90vh] bg-gradient-to-br from-background via-background to-muted/20 p-0 overflow-hidden">
        <DialogHeader className="p-4 pb-0 flex-shrink-0">
          <DialogTitle className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Edit Image
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="flex-1 px-4 pb-4">
          <div className="flex gap-4 min-h-[calc(90vh-80px)]">
            {/* Left - History Sidebar */}
            <div className="w-64 flex-shrink-0">
              <HistoryRecords />
            </div>

            {/* Center - Image and Controls */}
            <div className="flex-1 flex flex-col min-w-0">
              {/* Image with Action Buttons */}
              <div className="bg-card/30 backdrop-blur-sm rounded-xl border border-border/50 p-4 mb-4">
                <div className="flex gap-4">
                  {/* Image - Made smaller */}
                  <div className="w-80 h-80 bg-muted/30 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
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
                  <div className="flex flex-col gap-2 justify-center">
                    <Button 
                      onClick={() => console.log("Confirm")}
                      className="h-10 w-10 p-0 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      title="Confirm"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => onDownload?.()}
                      variant="outline"
                      className="h-10 w-10 p-0 border-primary/30 hover:bg-primary/10"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => console.log("Share")}
                      variant="outline"
                      className="h-10 w-10 p-0"
                      title="Share"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button 
                      onClick={() => onRetry?.()}
                      variant="outline"
                      className="h-10 w-10 p-0"
                      title="Retry"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Prompt Copilot */}
              <div className="h-48">
                <PromptCopilot
                  onImageUpload={handleCopilotImageUpload}
                  onPromptToTags={handlePromptToTags}
                  generatedTags={copilotTags}
                  className="h-full"
                />
              </div>
            </div>

            {/* Right - Tags Area */}
            <div className="w-64 flex-shrink-0">
              <TagArea 
                tags={editTags}
                onTagsChange={setEditTags}
                className="h-full"
              />
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;