import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronRight, Settings, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface VariationSidebarProps {
  currentImage?: string;
  onSettingsChange?: (settings: any) => void;
}

const VariationSidebar = ({ currentImage, onSettingsChange }: VariationSidebarProps) => {
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [settings, setSettings] = useState({
    quantity: 3,
    size: "1024x1024",
    cfg: 7.5,
    steps: 30,
    seed: -1
  });

  const handleSettingChange = (key: string, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange?.(newSettings);
  };

  return (
    <div className="w-80 bg-card border-r border-border/50 flex flex-col h-full">
      {/* Current Editing Image */}
      <div className="p-4 border-b border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Current Image</h3>
        <div className="aspect-square rounded-lg overflow-hidden bg-muted/30">
          {currentImage ? (
            <img 
              src={currentImage} 
              alt="Current editing image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image selected
            </div>
          )}
        </div>
      </div>

      {/* Generation Settings */}
      <div className="flex-1 p-4 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-medium">Generation Settings</h3>
        </div>

        {/* Image Quantity */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Image Quantity</Label>
          <Select 
            value={settings.quantity.toString()} 
            onValueChange={(value) => handleSettingChange("quantity", parseInt(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Image</SelectItem>
              <SelectItem value="3">3 Images</SelectItem>
              <SelectItem value="6">6 Images</SelectItem>
              <SelectItem value="9">9 Images</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Image Size */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Image Size</Label>
          <Select 
            value={settings.size} 
            onValueChange={(value) => handleSettingChange("size", value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="512x512">512×512</SelectItem>
              <SelectItem value="768x768">768×768</SelectItem>
              <SelectItem value="1024x1024">1024×1024</SelectItem>
              <SelectItem value="1280x720">1280×720</SelectItem>
              <SelectItem value="720x1280">720×1280</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* CFG Scale */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-xs text-muted-foreground">CFG Scale</Label>
            <span className="text-xs text-muted-foreground">{settings.cfg}</span>
          </div>
          <Slider
            value={[settings.cfg]}
            onValueChange={(value) => handleSettingChange("cfg", value[0])}
            min={1}
            max={20}
            step={0.5}
            className="w-full"
          />
        </div>

        {/* Steps */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-xs text-muted-foreground">Steps</Label>
            <span className="text-xs text-muted-foreground">{settings.steps}</span>
          </div>
          <Slider
            value={[settings.steps]}
            onValueChange={(value) => handleSettingChange("steps", value[0])}
            min={10}
            max={50}
            step={1}
            className="w-full"
          />
        </div>

        {/* Seed */}
        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Seed</Label>
          <Input
            type="number"
            value={settings.seed}
            onChange={(e) => handleSettingChange("seed", parseInt(e.target.value) || -1)}
            placeholder="Random (-1)"
            className="text-sm"
          />
        </div>
      </div>

      {/* History */}
      <div className="border-t border-border/50">
        <Button
          variant="ghost"
          className="w-full p-4 justify-between rounded-none"
          onClick={() => setHistoryExpanded(!historyExpanded)}
        >
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">History</span>
          </div>
          {historyExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </Button>
        
        {historyExpanded && (
          <div className="p-4 pt-0 space-y-2 max-h-64 overflow-y-auto">
            <div className="text-xs text-muted-foreground text-center py-4">
              No history yet
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariationSidebar;