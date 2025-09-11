import { useState } from "react";
import { Upload, Dice6, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DraggableTag from "./DraggableTag";

interface PromptCopilotProps {
  onImageUpload?: (file: File) => void;
  onPromptToTags?: (prompt: string) => void;
  generatedTags?: string[];
  className?: string;
}

const PromptCopilot = ({
  onImageUpload,
  onPromptToTags,
  generatedTags = [],
  className
}: PromptCopilotProps) => {
  const [prompt, setPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
      onImageUpload?.(file);
    }
  };

  const handlePromptToTags = () => {
    if (prompt.trim()) {
      onPromptToTags?.(prompt.trim());
    }
  };

  return (
    <Card className={`bg-card/30 backdrop-blur-sm border-border/50 ${className}`}>
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground uppercase tracking-wide">
          Prompt Copilot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          {/* Left - Image Upload */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="copilot-image-upload"
              />
              <label
                htmlFor="copilot-image-upload"
                className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary/50 transition-colors cursor-pointer"
              >
                {uploadedImage ? (
                  <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-muted-foreground mb-1" />
                    <span className="text-xs text-muted-foreground">Upload Image</span>
                  </>
                )}
              </label>
            </div>
            <Button 
              size="sm" 
              className="w-full mt-2"
              onClick={() => console.log("Convert image to tags")}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              To Tags
            </Button>
          </div>

          {/* Right - Prompt Input */}
          <div className="flex-1">
            <Input
              placeholder="Enter prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-2"
              onKeyPress={(e) => e.key === 'Enter' && handlePromptToTags()}
            />
            <Button 
              size="sm" 
              className="w-full"
              onClick={handlePromptToTags}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              To Tags
            </Button>
          </div>
        </div>

        {/* Generated Tags */}
        {generatedTags.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground mb-2">Generated Tags:</p>
            <div className="flex flex-wrap gap-2">
              {generatedTags.map((tag, index) => (
                <DraggableTag 
                  key={index} 
                  tag={tag} 
                  onDragStart={(tag) => console.log(`Dragging: ${tag}`)}
                />
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PromptCopilot;