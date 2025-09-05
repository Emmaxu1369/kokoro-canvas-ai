import { useState } from "react";
import { ChevronLeft, ChevronRight, Settings, Upload, Image as ImageIcon, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface ImageSetSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  className?: string;
}

const ImageSetSidebar = ({ isCollapsed = false, onToggle, className }: ImageSetSidebarProps) => {
  const [globalPrompt, setGlobalPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [settings, setSettings] = useState({
    shotLength: [50], // 0-100 (Short to Long)
    cuts: [4],
    frames: [8],
    size: "1024x1024",
    cfgScale: [7.5],
    steps: [30],
    seed: [-1]
  });
  const [aiSettingsExpanded, setAiSettingsExpanded] = useState(false);

  const handleImageUpload = (file: File) => {
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setUploadedImage(url);
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

  const imageSizes = [
    { label: "Square 512×512", value: "512x512" },
    { label: "Square 1024×1024", value: "1024x1024" },
    { label: "Portrait 768×1024", value: "768x1024" },
    { label: "Landscape 1024×768", value: "1024x768" }
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-card/80 backdrop-blur-sm border-r border-border/50 transition-all duration-300 z-40",
      isCollapsed ? "w-16" : "w-80",
      className
    )}>
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-10 top-1/2 -translate-y-1/2 bg-card border border-border/50 rounded-r-lg rounded-l-none h-16 w-10 p-0"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className={cn(
        "h-full overflow-y-auto p-6 space-y-6",
        isCollapsed && "opacity-0 pointer-events-none"
      )}>
        {/* Header */}
        <div className="pt-16">
          <h2 className="text-lg font-semibold text-foreground mb-2">Image Set Generation</h2>
          <p className="text-sm text-muted-foreground">
            Create consistent character sets and storyboards
          </p>
        </div>

        {/* Original Image Upload */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Original Image</label>
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
                    <ImageIcon className="h-4 w-4" />
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

        {/* Global Prompt */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Global Prompt</label>
          <Textarea
            value={globalPrompt}
            onChange={(e) => setGlobalPrompt(e.target.value)}
            placeholder="Describe the overall style and setting for your image set..."
            className="min-h-[80px] bg-card/50 border-border/50 focus:border-primary/50"
          />
        </div>

        {/* Shot Length Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">Shot Length</label>
            <span className="text-sm text-muted-foreground">
              {settings.shotLength[0] < 33 ? "Short" : settings.shotLength[0] < 67 ? "Medium" : "Long"}
            </span>
          </div>
          <Slider
            value={settings.shotLength}
            onValueChange={(value) => setSettings(prev => ({ ...prev, shotLength: value }))}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Short</span>
            <span>Long</span>
          </div>
        </div>

        {/* Cuts and Frames */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Cuts</label>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Count</span>
              <span className="text-sm text-muted-foreground">{settings.cuts[0]}</span>
            </div>
            <Slider
              value={settings.cuts}
              onValueChange={(value) => setSettings(prev => ({ ...prev, cuts: value }))}
              min={1}
              max={12}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Frames</label>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Per Cut</span>
              <span className="text-sm text-muted-foreground">{settings.frames[0]}</span>
            </div>
            <Slider
              value={settings.frames}
              onValueChange={(value) => setSettings(prev => ({ ...prev, frames: value }))}
              min={2}
              max={16}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Image Size */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Image Size</label>
          <Select
            value={settings.size}
            onValueChange={(value) => setSettings(prev => ({ ...prev, size: value }))}
          >
            <SelectTrigger className="w-full bg-card/50 border-border/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {imageSizes.map((size) => (
                <SelectItem key={size.value} value={size.value}>
                  {size.label}
                </SelectItem>
              ))}
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
                <label className="text-sm font-medium text-foreground">CFG Scale</label>
                <span className="text-sm text-muted-foreground">{settings.cfgScale[0]}</span>
              </div>
              <Slider
                value={settings.cfgScale}
                onValueChange={(value) => setSettings(prev => ({ ...prev, cfgScale: value }))}
                min={1}
                max={20}
                step={0.5}
                className="w-full"
              />
            </div>

            {/* Steps */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Steps</label>
                <span className="text-sm text-muted-foreground">{settings.steps[0]}</span>
              </div>
              <Slider
                value={settings.steps}
                onValueChange={(value) => setSettings(prev => ({ ...prev, steps: value }))}
                min={10}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* Seed */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground">Seed</label>
                <span className="text-sm text-muted-foreground">
                  {settings.seed[0] === -1 ? "Random" : settings.seed[0]}
                </span>
              </div>
              <Slider
                value={settings.seed}
                onValueChange={(value) => setSettings(prev => ({ ...prev, seed: value }))}
                min={-1}
                max={2147483647}
                step={1}
                className="w-full"
              />
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default ImageSetSidebar;