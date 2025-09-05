import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface SettingsPanelProps {
  className?: string;
}

const SettingsPanel = ({ className }: SettingsPanelProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [settings, setSettings] = useState({
    quantity: [4],
    size: "1024x1024",
    cfgScale: [7.5],
    steps: [30],
    seed: [-1]
  });

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const imageSizes = [
    { label: "Square 512×512", value: "512x512" },
    { label: "Square 1024×1024", value: "1024x1024" },
    { label: "Portrait 768×1024", value: "768x1024" },
    { label: "Landscape 1024×768", value: "1024x768" },
    { label: "Wide 1536×640", value: "1536x640" }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-card/30 rounded-xl hover:bg-card/50 transition-colors">
          <span className="font-medium text-foreground">Generation Settings</span>
          {isExpanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent className="space-y-6 pt-4">
          {/* Image Quantity */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                Image Quantity
              </label>
              <span className="text-sm text-muted-foreground">
                {settings.quantity[0]}
              </span>
            </div>
            <Slider
              value={settings.quantity}
              onValueChange={(value) => handleSettingChange('quantity', value)}
              min={1}
              max={8}
              step={1}
              className="w-full"
            />
          </div>

          {/* Image Size */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">
              Image Size
            </label>
            <Select
              value={settings.size}
              onValueChange={(value) => handleSettingChange('size', value)}
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

          {/* CFG Scale */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                CFG Scale
              </label>
              <span className="text-sm text-muted-foreground">
                {settings.cfgScale[0]}
              </span>
            </div>
            <Slider
              value={settings.cfgScale}
              onValueChange={(value) => handleSettingChange('cfgScale', value)}
              min={1}
              max={20}
              step={0.5}
              className="w-full"
            />
          </div>

          {/* Steps */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                Steps
              </label>
              <span className="text-sm text-muted-foreground">
                {settings.steps[0]}
              </span>
            </div>
            <Slider
              value={settings.steps}
              onValueChange={(value) => handleSettingChange('steps', value)}
              min={10}
              max={100}
              step={5}
              className="w-full"
            />
          </div>

          {/* Seed */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-foreground">
                Seed
              </label>
              <span className="text-sm text-muted-foreground">
                {settings.seed[0] === -1 ? "Random" : settings.seed[0]}
              </span>
            </div>
            <Slider
              value={settings.seed}
              onValueChange={(value) => handleSettingChange('seed', value)}
              min={-1}
              max={2147483647}
              step={1}
              className="w-full"
            />
            <div className="text-xs text-muted-foreground">
              Use -1 for random seed
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SettingsPanel;