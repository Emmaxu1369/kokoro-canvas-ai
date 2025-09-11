import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Clipboard, ChevronRight, Clock, Settings, Wand2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DraggableTag from "./DraggableTag";

interface EditSidebarProps {
  className?: string;
  onImageUpload?: (file: File) => void;
  onTagGenerated?: (tags: string[]) => void;
}

const EditSidebar = ({ className, onImageUpload, onTagGenerated }: EditSidebarProps) => {
  const [referenceImage, setReferenceImage] = useState<string | null>(null);
  const [referenceTags, setReferenceTags] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    size: "1024x1024",
    cfgScale: [7.5],
    steps: [30],
    seed: [-1]
  });
  const [aiSettingsExpanded, setAiSettingsExpanded] = useState(false);

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleImageUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setReferenceImage(url);
      onImageUpload?.(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleImageUpload(files[0]);
    }
  };

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read();
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          if (type.startsWith('image/')) {
            const blob = await clipboardItem.getType(type);
            const file = new File([blob], 'pasted-image.png', { type });
            handleImageUpload(file);
            return;
          }
        }
      }
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err);
    }
  };

  const handleGenerateTags = () => {
    // Mock tag generation from reference image
    const mockTags = ["reference", "style", "composition", "lighting", "character"];
    setReferenceTags(mockTags);
    onTagGenerated?.(mockTags);
  };

  return (
    <Card className={cn(
      "h-full bg-card/80 backdrop-blur-sm border-border/50 flex flex-col",
      className
    )}>
      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Header */}
        <div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Edit Settings</h3>
          <p className="text-xs text-muted-foreground">
            Upload reference and adjust parameters
          </p>
        </div>

        {/* Reference Image Upload */}
        <div className="space-y-2">
          <Label className="text-xs font-medium">Upload Image</Label>
          <div className="border-2 border-dashed border-border/50 rounded-lg p-3 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="reference-upload"
            />
            
            {referenceImage ? (
              <div className="space-y-2">
                <img
                  src={referenceImage}
                  alt="Reference"
                  className="max-w-full max-h-24 mx-auto rounded-lg"
                />
                <p className="text-xs text-muted-foreground">Reference uploaded</p>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-6 w-6 text-muted-foreground mx-auto" />
                <div className="flex gap-1 justify-center">
                  <label
                    htmlFor="reference-upload"
                    className="inline-flex items-center gap-1 px-2 py-1 bg-primary text-primary-foreground text-xs rounded cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Upload
                  </label>
                  <button
                    onClick={handlePaste}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded hover:bg-secondary/80 transition-colors"
                  >
                    <Clipboard className="h-3 w-3" />
                    Paste
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {referenceImage && (
            <Button 
              size="sm" 
              className="w-full h-7 text-xs" 
              onClick={handleGenerateTags}
            >
              <Wand2 className="w-3 h-3 mr-1" />
              Generate Tags
            </Button>
          )}
          
          {/* Generated Tags from Reference */}
          {referenceTags.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground">Generated Tags:</p>
              <div className="flex flex-wrap gap-1">
                {referenceTags.map((tag, index) => (
                  <DraggableTag 
                    key={index} 
                    tag={tag} 
                    className="text-xs px-2 py-0.5"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Size */}
        <div className="space-y-1">
          <Label className="text-xs font-medium">Image Size</Label>
          <Select value={settings.size} onValueChange={(value) => handleSettingChange("size", value)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512x512">512 × 512</SelectItem>
              <SelectItem value="768x768">768 × 768</SelectItem>
              <SelectItem value="1024x1024">1024 × 1024</SelectItem>
              <SelectItem value="1536x1024">1536 × 1024</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* AI Settings (Collapsible) */}
        <Collapsible open={aiSettingsExpanded} onOpenChange={setAiSettingsExpanded}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-2 bg-card/30 rounded-lg hover:bg-card/50 transition-colors">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <span className="text-xs font-medium text-foreground">AI Settings</span>
            </div>
            <ChevronRight className={cn(
              "h-3 w-3 text-muted-foreground transition-transform duration-200",
              aiSettingsExpanded && "rotate-90"
            )} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-3 pt-3">
            {/* CFG Scale */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">CFG Scale</Label>
                <span className="text-xs text-muted-foreground">{settings.cfgScale[0]}</span>
              </div>
              <Slider
                value={settings.cfgScale}
                onValueChange={(value) => handleSettingChange("cfgScale", value)}
                min={1}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Steps */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">Steps</Label>
                <span className="text-xs text-muted-foreground">{settings.steps[0]}</span>
              </div>
              <Slider
                value={settings.steps}
                onValueChange={(value) => handleSettingChange("steps", value)}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Seed */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <Label className="text-xs font-medium">Seed</Label>
                <span className="text-xs text-muted-foreground">
                  {settings.seed[0] === -1 ? "Random" : settings.seed[0]}
                </span>
              </div>
              <Slider
                value={settings.seed}
                onValueChange={(value) => handleSettingChange("seed", value)}
                min={-1}
                max={2147483647}
                step={1}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* History */}
        <div className="space-y-2 mt-auto pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-3 w-3" />
            <Label className="text-xs font-medium">History</Label>
          </div>
          <div className="text-xs text-muted-foreground">
            No history yet
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EditSidebar;