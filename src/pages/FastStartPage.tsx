import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ImageUpload from "@/components/ImageUpload";
import PreviewArea from "@/components/PreviewArea";
import { 
  Dice1, 
  ZoomIn, 
  Download, 
  RotateCcw, 
  Sparkles, 
  ChevronDown,
  Settings,
  Grid3X3,
  MousePointer2
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FastStartPage = () => {
  const [storyText, setStoryText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isLongShot, setIsLongShot] = useState(false);
  const [cutCount, setCutCount] = useState([4]);
  const [frameCount, setFrameCount] = useState([8]);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const randomPrompts = [
    "A mysterious girl with silver hair walking through a glowing forest",
    "Two friends sharing secrets under cherry blossom trees",
    "A dramatic confrontation on a rooftop at sunset",
    "A magical creature awakening in an ancient library",
    "Friends having a picnic in a flower field",
    "A lone warrior standing against a storm",
    "Children discovering a hidden portal",
    "A romantic dance under starlight"
  ];

  const handleDiceClick = () => {
    const randomPrompt = randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
    setStoryText(randomPrompt);
    toast({
      title: "Random prompt generated!",
      description: "Try generating with this story idea.",
    });
  };

  const handleGenerate = async () => {
    if (!storyText.trim()) {
      toast({
        title: "Please enter a story description",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      const mockImages = Array.from({ length: cutCount[0] }, (_, i) => 
        `https://picsum.photos/400/600?random=${Date.now() + i}`
      );
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      toast({
        title: "Images generated successfully!",
        description: `Generated ${cutCount[0]} images based on your story.`,
      });
    }, 3000);
  };

  const handleImageSelect = (index: number) => {
    if (!isMultiSelectMode) return;
    
    const newSelected = new Set(selectedImages);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedImages(newSelected);
  };

  const handleRetry = () => {
    if (selectedImages.size === 0) {
      toast({
        title: "No images selected",
        description: "Please select images to retry generation.",
        variant: "destructive",
      });
      return;
    }
    handleGenerate();
  };

  const handleExport = () => {
    const imagesToExport = selectedImages.size > 0 
      ? Array.from(selectedImages).map(i => generatedImages[i])
      : generatedImages;
    
    toast({
      title: "Export started",
      description: `Exporting ${imagesToExport.length} image(s)...`,
    });
  };

  const handleMoreEdit = () => {
    if (selectedImages.size === 0) {
      toast({
        title: "No images selected",
        description: "Please select an image to edit further.",
        variant: "destructive",
      });
      return;
    }
    // Navigate to story flow page with selected images
    window.location.href = "/story-flow";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Section */}
      <div className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left - Image Upload */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Reference Image</h3>
              <ImageUpload 
                onImageUpload={setUploadedImage}
                className="h-48"
              />
            </div>

            {/* Center - Story Input + Generate */}
            <div className="lg:col-span-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Story Description</h3>
              <div className="space-y-4">
                <Textarea
                  placeholder="Briefly describe your story"
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  className="min-h-[120px] resize-none"
                />
                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full btn-hero-primary"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate Story
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Right - Dice Button */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Random Prompt</h3>
              <Button
                onClick={handleDiceClick}
                variant="outline"
                className="w-full h-48 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 hover:border-primary"
              >
                <Dice1 className="h-12 w-12 text-primary" />
                <span className="text-lg font-medium">Random Story</span>
              </Button>
            </div>
          </div>

          {/* Generation Settings */}
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Shot:</span>
                  <span className="text-sm text-muted-foreground">Short</span>
                  <Switch 
                    checked={isLongShot}
                    onCheckedChange={setIsLongShot}
                  />
                  <span className="text-sm text-muted-foreground">Long</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Cuts:</span>
                  <div className="w-24">
                    <Slider
                      value={cutCount}
                      onValueChange={setCutCount}
                      max={12}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{cutCount[0]}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">Frames:</span>
                  <div className="w-24">
                    <Slider
                      value={frameCount}
                      onValueChange={setFrameCount}
                      max={16}
                      min={4}
                      step={2}
                      className="w-full"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{frameCount[0]}</span>
                </div>
              </div>

              <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Advanced Settings
                    <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="absolute right-0 top-full mt-2 z-10">
                  <Card className="p-4 w-64 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">AI Creativity</label>
                      <Slider defaultValue={[0.7]} max={1} min={0} step={0.1} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Style Strength</label>
                      <Slider defaultValue={[0.8]} max={1} min={0} step={0.1} />
                    </div>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </div>
      </div>

      {/* Main Generation Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="relative">
          {/* Top-right Controls */}
          <div className="absolute top-0 right-0 z-10 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.2, 2))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsMultiSelectMode(!isMultiSelectMode)}
              className={isMultiSelectMode ? "bg-primary text-primary-foreground" : ""}
            >
              <MousePointer2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleExport}
              disabled={generatedImages.length === 0}
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleGenerate}
              disabled={isGenerating}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRetry}
              disabled={generatedImages.length === 0 || selectedImages.size === 0}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Results Display */}
          <div className="min-h-[600px] bg-card/20 rounded-lg border border-border backdrop-blur-sm">
            {generatedImages.length === 0 ? (
              <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                <div className="text-center space-y-4">
                  <Grid3X3 className="h-16 w-16 mx-auto opacity-50" />
                  <p className="text-lg">Enter your story description and click generate</p>
                  <p className="text-sm">Generated images will appear here</p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {generatedImages.map((image, index) => (
                    <div
                      key={index}
                      className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                        selectedImages.has(index) 
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                          : ''
                      }`}
                      style={{ transform: `scale(${zoomLevel})` }}
                      onClick={() => handleImageSelect(index)}
                    >
                      <img
                        src={image}
                        alt={`Generated frame ${index + 1}`}
                        className="w-full h-48 object-cover"
                      />
                      {isMultiSelectMode && (
                        <div className="absolute top-2 right-2">
                          <div className={`w-6 h-6 rounded-full border-2 ${
                            selectedImages.has(index)
                              ? 'bg-primary border-primary'
                              : 'bg-background/80 border-border'
                          }`}>
                            {selectedImages.has(index) && (
                              <div className="w-full h-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-primary-foreground rounded-full"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom-right More Edit Button */}
          {generatedImages.length > 0 && (
            <div className="absolute bottom-6 right-6">
              <Button 
                onClick={handleMoreEdit}
                className="btn-hero-outline"
                size="lg"
              >
                More Edit
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FastStartPage;