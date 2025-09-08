import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import HistoryRecords from "@/components/HistoryRecords";
import { 
  Dice1, 
  Download, 
  Sparkles, 
  ChevronDown,
  Settings,
  Grid3X3,
  History,
  Upload
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const FastStartPage = () => {
  const navigate = useNavigate();
  const [storyText, setStoryText] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isLongShot, setIsLongShot] = useState(false);
  const [cutCount, setCutCount] = useState("4");
  const [frameCount, setFrameCount] = useState("8");
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());
  const [zoomLevel, setZoomLevel] = useState([50]);
  const [isDragging, setIsDragging] = useState(false);
  const [creativity, setCreativity] = useState([0.7]);
  const [styleStrength, setStyleStrength] = useState([0.8]);

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

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      handleImageUpload(files[0]);
    }
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
      const mockImages = Array.from({ length: parseInt(cutCount) }, (_, i) => 
        `https://picsum.photos/400/600?random=${Date.now() + i}`
      );
      setGeneratedImages(mockImages);
      setIsGenerating(false);
      toast({
        title: "Images generated successfully!",
        description: `Generated ${cutCount} images based on your story.`,
      });
    }, 3000);
  };

  const handleImageSelect = (index: number) => {
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
    // Navigate to image set page with pre-generated state
    navigate("/image-set");
  };

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen bg-background flex w-full">
        {/* History Sidebar */}
        <Sidebar className="border-r border-border">
          <SidebarTrigger className="m-2" />
          <SidebarContent>
            <div className="p-4">
              <HistoryRecords />
            </div>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <div className="flex-1">
          {/* Top Section */}
          <div className="border-b border-border bg-card/30 backdrop-blur-sm">
            <div className="container mx-auto px-6 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left - Image Upload */}
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Reference Image</h3>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 h-48 bg-card/50 backdrop-blur-sm ${
                      isDragging
                        ? "border-primary bg-primary/5 scale-105"
                        : "border-border hover:border-primary/50 hover:bg-card/70"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />
                    
                    {uploadedImage ? (
                      <div className="h-full flex items-center justify-center">
                        <img
                          src={uploadedImage}
                          alt="Uploaded"
                          className="max-w-full max-h-full rounded-lg shadow-lg object-contain"
                        />
                      </div>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center">
                        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Drag & drop image here
                        </p>
                        <label
                          htmlFor="image-upload"
                          className="text-primary hover:underline cursor-pointer text-sm"
                        >
                          or click to upload
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Center - Story Input + Generate */}
                <div className="lg:col-span-6">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Story Description</h3>
                  <Card className="p-4 space-y-4">
                    <Textarea
                      placeholder="Briefly describe your story"
                      value={storyText}
                      onChange={(e) => setStoryText(e.target.value)}
                      className="min-h-[120px] resize-none"
                    />
                    
                    {/* Generation Settings */}
                    <div className="space-y-4 pt-4 border-t border-border">
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
                          <Input
                            type="number"
                            value={cutCount}
                            onChange={(e) => setCutCount(e.target.value)}
                            className="w-16 h-8"
                            min="1"
                            max="12"
                          />
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Frames:</span>
                          <Input
                            type="number"
                            value={frameCount}
                            onChange={(e) => setFrameCount(e.target.value)}
                            className="w-16 h-8"
                            min="4"
                            max="16"
                          />
                        </div>
                      </div>

                      {/* Advanced Settings */}
                      <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
                        <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" />
                            Advanced Settings
                            <ChevronDown className={`h-4 w-4 transition-transform ${isAdvancedOpen ? 'rotate-180' : ''}`} />
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <div className="mt-4 space-y-4 p-4 bg-muted/20 rounded-lg">
                            <div className="space-y-2">
                              <label className="text-sm font-medium">AI Creativity</label>
                              <Slider 
                                value={creativity} 
                                onValueChange={setCreativity}
                                max={1} 
                                min={0} 
                                step={0.1} 
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-sm font-medium">Style Strength</label>
                              <Slider 
                                value={styleStrength} 
                                onValueChange={setStyleStrength}
                                max={1} 
                                min={0} 
                                step={0.1} 
                              />
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                    
                    <Button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="w-full"
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
                  </Card>
                </div>

                {/* Right - Dice Button */}
                <div className="lg:col-span-3">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Random Prompt</h3>
                  <Button
                    onClick={handleDiceClick}
                    variant="outline"
                    className="w-full h-48 flex flex-col items-center justify-center gap-4 hover:bg-primary/10 hover:border-primary"
                  >
                    <Dice1 className="h-16 w-16 text-primary" />
                    <span className="text-lg font-medium">Random Story</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Generation Area */}
          <div className="container mx-auto px-6 py-8">
            <div className="relative">
              {/* Top-right Controls */}
              <div className="absolute top-0 right-0 z-10 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Zoom:</span>
                  <Slider
                    value={zoomLevel}
                    onValueChange={setZoomLevel}
                    max={100}
                    min={25}
                    step={5}
                    className="w-24"
                  />
                </div>
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
                    <div 
                      className="grid gap-4" 
                      style={{ 
                        gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(150, 300 * zoomLevel[0] / 100)}px, 1fr))` 
                      }}
                    >
                      {generatedImages.map((image, index) => (
                        <div
                          key={index}
                          className={`relative group cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                            selectedImages.has(index) 
                              ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                              : ''
                          }`}
                          onClick={() => handleImageSelect(index)}
                        >
                          <img
                            src={image}
                            alt={`Generated frame ${index + 1}`}
                            className="w-full aspect-[3/4] object-cover"
                          />
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
                    variant="outline"
                    size="lg"
                  >
                    More Edit
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FastStartPage;