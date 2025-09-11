import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Grid, Image as ImageIcon, Download } from "lucide-react";

interface StoryCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImages: string[];
}

const StoryCardModal = ({ isOpen, onClose, selectedImages }: StoryCardModalProps) => {
  const [layoutMode, setLayoutMode] = useState<'single' | 'collage'>('single');
  const [selectedCover, setSelectedCover] = useState<string | null>(null);

  const handleDownload = () => {
    // Mock download functionality
    console.log("Downloading story card...", { layoutMode, selectedCover, images: selectedImages });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Create Story Card</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Options */}
          <div className="space-y-6">
            {/* Layout Options */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Layout Options</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={layoutMode === 'single' ? 'default' : 'outline'}
                  onClick={() => setLayoutMode('single')}
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <ImageIcon className="h-6 w-6" />
                  <span className="text-xs">Single Cover</span>
                </Button>
                <Button
                  variant={layoutMode === 'collage' ? 'default' : 'outline'}
                  onClick={() => setLayoutMode('collage')}
                  className="h-20 flex flex-col items-center justify-center gap-2"
                >
                  <Grid className="h-6 w-6" />
                  <span className="text-xs">Collage</span>
                </Button>
              </div>
            </div>

            <Separator />

            {/* Image Selection */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">
                {layoutMode === 'single' ? 'Select Cover Image' : 'Images for Collage'}
              </h3>
              <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
                {selectedImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative aspect-square cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
                      layoutMode === 'single' 
                        ? (selectedCover === image ? 'border-primary' : 'border-border hover:border-primary/50')
                        : 'border-primary/30'
                    }`}
                    onClick={() => layoutMode === 'single' && setSelectedCover(image)}
                  >
                    <img src={image} alt={`Image ${index + 1}`} className="w-full h-full object-cover" />
                    {layoutMode === 'collage' && (
                      <div className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1 rounded">
                        {index + 1}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Download Button */}
            <Button 
              onClick={handleDownload}
              disabled={layoutMode === 'single' && !selectedCover}
              className="w-full"
              size="lg"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Story Card
            </Button>
          </div>

          {/* Right Panel - Preview */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Preview</h3>
            <Card className="p-4 bg-muted/20">
              <div className="aspect-[3/4] bg-card rounded-lg border-2 border-dashed border-border/50 flex items-center justify-center relative overflow-hidden">
                {layoutMode === 'single' && selectedCover ? (
                  <img src={selectedCover} alt="Story card cover" className="w-full h-full object-cover" />
                ) : layoutMode === 'collage' ? (
                  <div className="w-full h-full grid grid-cols-2 gap-1 p-2">
                    {selectedImages.slice(0, 4).map((image, index) => (
                      <div key={index} className="bg-muted rounded overflow-hidden">
                        <img src={image} alt={`Collage ${index + 1}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Story card preview</p>
                    <p className="text-xs">Select options to see preview</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryCardModal;