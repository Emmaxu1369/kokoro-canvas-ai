import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Upload, Clipboard, ChevronDown, ChevronRight, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSetSidebarProps {
  className?: string;
  onImageUpload?: (file: File) => void;
  imageTags?: string[];
}

const ImageSetSidebar = ({ className, onImageUpload, imageTags = [] }: ImageSetSidebarProps) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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
      setUploadedImage(url);
      onImageUpload?.(file);
    }
  };

  const handleGenerateImageTags = () => {
    console.log("Generate tags from uploaded image");
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

  const imageSizes = [
    { label: "Square 512×512", value: "512x512" },
    { label: "Square 1024×1024", value: "1024x1024" },
    { label: "Portrait 768×1024", value: "768x1024" },
    { label: "Landscape 1024×768", value: "1024x768" }
  ];

  return (
    <div className={cn(
      "h-full bg-card/80 backdrop-blur-sm border-r border-border/50 w-80 flex flex-col",
      className
    )}>
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-2">Set Generation</h2>
          <p className="text-sm text-muted-foreground">
            Create image sets and storyboards
          </p>
        </div>

        {/* Image Upload */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Upload Image</Label>
          <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="image-upload"
            />
            
            {uploadedImage ? (
              <div className="space-y-3">
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="max-w-full max-h-32 mx-auto rounded-lg"
                />
                <p className="text-xs text-muted-foreground">Image uploaded</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                <div className="space-y-2">
                  <label
                    htmlFor="image-upload"
                    className="inline-flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-lg cursor-pointer hover:bg-primary/90 transition-colors"
                  >
                    Upload
                  </label>
                  <button
                    onClick={handlePaste}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-secondary text-secondary-foreground text-sm rounded-lg hover:bg-secondary/80 transition-colors ml-2"
                  >
                    <Clipboard className="h-4 w-4" />
                    Paste
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Reference Image to Tags */}
        {uploadedImage && (
          <div className="space-y-3 p-4 bg-card/30 rounded-lg border border-border/50">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Image to Tags</Label>
              <Button 
                size="sm" 
                onClick={handleGenerateImageTags}
                className="h-7 px-3 text-xs"
              >
                Generate Tags
              </Button>
            </div>
            
            {imageTags.length > 0 && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Generated Tags:</p>
                <div className="flex flex-wrap gap-1">
                  {imageTags.map((tag, index) => (
                    <span 
                      key={index}
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData('text/plain', tag)}
                      className="px-2 py-1 bg-primary/20 text-primary text-xs rounded cursor-move hover:bg-primary/30 transition-colors select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Image Size */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Image Size</Label>
          <Select value={settings.size} onValueChange={(value) => handleSettingChange("size", value)}>
            <SelectTrigger>
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
          <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-card/30 rounded-lg hover:bg-card/50 transition-colors">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="font-medium text-foreground">AI Settings</span>
            </div>
            <ChevronRight className={cn(
              "h-4 w-4 text-muted-foreground transition-transform duration-200",
              aiSettingsExpanded && "rotate-90"
            )} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="space-y-4 pt-4">
            {/* CFG Scale */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">CFG Scale</Label>
                <span className="text-sm text-muted-foreground">{settings.cfgScale[0]}</span>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Steps</Label>
                <span className="text-sm text-muted-foreground">{settings.steps[0]}</span>
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
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-sm font-medium">Seed</Label>
                <span className="text-sm text-muted-foreground">
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
        <div className="space-y-3 mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <Label className="font-medium">History</Label>
          </div>
          <div className="text-sm text-muted-foreground">
            No history yet
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSetSidebar;