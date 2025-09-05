import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import ImageSetSidebar from "@/components/ImageSetSidebar";
import EnhancedCutCard from "@/components/EnhancedCutCard";
import BatchOperationsToolbar from "@/components/BatchOperationsToolbar";
import EditModal from "@/components/EditModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, Play, ZoomIn, ZoomOut, MoreHorizontal, Edit, ArrowLeft } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Frame {
  id: string;
  title: string;
  tags: string[];
  isGenerated: boolean;
  imageUrl?: string;
}

interface Cut {
  id: string;
  title: string;
  description: string;
  frames: Frame[];
}

const mockCuts: Cut[] = [
  {
    id: "1",
    title: "Opening Scene",
    description: "Character introduction in classroom setting",
    frames: [
      {
        id: "f1",
        title: "Wide shot",
        tags: ["classroom", "wide angle", "students"],
        isGenerated: false
      },
      {
        id: "f2", 
        title: "Close-up",
        tags: ["face", "smiling", "school uniform"],
        isGenerated: true,
        imageUrl: "/placeholder.svg"
      }
    ]
  }
];

const ImageSetPage = () => {
  const navigate = useNavigate();
  const [cuts, setCuts] = useState<Cut[]>(mockCuts);
  const [allGenerated, setAllGenerated] = useState(false);
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);
  const [zoomLevel, setZoomLevel] = useState(17); // Default to show 6 images per row
  const [uploadedImage, setUploadedImage] = useState<string>();
  
  // Edit modal state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFrame, setEditingFrame] = useState<any>(null);

  const handleFrameSelect = (frameId: string, selected: boolean) => {
    setSelectedFrames(prev => 
      selected 
        ? [...prev, frameId]
        : prev.filter(id => id !== frameId)
    );
  };

  const handleFrameTagsChange = (frameId: string, tags: string[]) => {
    setCuts(prev => prev.map(cut => ({
      ...cut,
      frames: cut.frames.map(frame => 
        frame.id === frameId ? { ...frame, tags } : frame
      )
    })));
  };

  const handleFrameGenerate = (frameId: string) => {
    setCuts(prev => prev.map(cut => ({
      ...cut,
      frames: cut.frames.map(frame => 
        frame.id === frameId 
          ? { ...frame, isGenerated: true, imageUrl: "/placeholder.svg" }
          : frame
      )
    })));
  };

  const handleGenerateAll = () => {
    setAllGenerated(true);
    // Simulate generation for all frames
    const updatedCuts = cuts.map(cut => ({
      ...cut,
      frames: cut.frames.map(frame => ({
        ...frame,
        isGenerated: true,
        imageUrl: "/placeholder.svg" // Simulate generated image
      }))
    }));
    setCuts(updatedCuts);
  };

  const handleDownloadAll = () => {
    console.log("Download all frames");
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setUploadedImage(url);
    
    // Auto-populate Cut1 Frame1 with uploaded image variant
    const updatedCuts = [...cuts];
    if (updatedCuts[0]?.frames[0]) {
      updatedCuts[0].frames[0] = {
        ...updatedCuts[0].frames[0],
        isGenerated: true,
        imageUrl: url,
        tags: ["uploaded image", "base variant"]
      };
    }
    setCuts(updatedCuts);
  };

  const handleAddCut = () => {
    const newCut: Cut = {
      id: Date.now().toString(),
      title: `Cut ${cuts.length + 1}`,
      description: "",
      frames: [
        {
          id: `f${Date.now()}`,
          title: "Frame 1",
          tags: [],
          isGenerated: false
        }
      ]
    };
    setCuts(prev => [...prev, newCut]);
  };

  const handleAddFrame = (cutId: string) => {
    setCuts(prev => prev.map(cut => 
      cut.id === cutId 
        ? {
            ...cut,
            frames: [...cut.frames, {
              id: `f${Date.now()}`,
              title: `Frame ${cut.frames.length + 1}`,
              tags: [],
              isGenerated: false
            }]
          }
        : cut
    ));
  };

  const handleFrameEdit = (frameId: string) => {
    // Find the frame to edit
    for (const cut of cuts) {
      const frame = cut.frames.find(f => f.id === frameId);
      if (frame) {
        setEditingFrame(frame);
        setEditModalOpen(true);
        break;
      }
    }
  };

  const handleFrameRetry = (frameId: string) => {
    console.log("Retry frame", frameId);
  };

  const handleFrameDownload = (frameId: string) => {
    console.log("Download frame", frameId);
  };

  const handleFramePreview = (frameId: string) => {
    console.log("Preview frame", frameId);
  };

  const handleTitleChange = (id: string, title: string) => {
    setCuts(prev => prev.map(c => c.id === id ? { ...c, title } : c));
  };

  const handleDescriptionChange = (id: string, description: string) => {
    setCuts(prev => prev.map(c => c.id === id ? { ...c, description } : c));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* Fixed Sidebar */}
        <ImageSetSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col ml-80 p-6">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="hover:bg-muted/50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Image Set Creation</h1>
            </div>
            {!allGenerated && (
              <div className="flex items-center gap-2">
                <Button onClick={handleGenerateAll}>
                  Generate All
                </Button>
              </div>
            )}
          </div>

          {/* Multi-select bar */}
          {selectedFrames.length > 0 && allGenerated && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-background border-2 border-dashed border-primary text-foreground px-6 py-3 rounded-lg shadow-lg flex items-center gap-4">
              <span>Selected {selectedFrames.length} images</span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => console.log("Retry")}>
                  Retry
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log("Delete")}>
                  Delete
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log("Replace Tag")}>
                  Replace Tag
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log("Download")}>
                  Download
                </Button>
                <Button size="sm" variant="outline" onClick={() => console.log("Share")}>
                  Share
                </Button>
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setSelectedFrames([])}
                className="h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
              >
                ✕
              </Button>
            </div>
          )}

          {/* Main Content */}
          <div className="space-y-6">
            {allGenerated ? (
              // Preview Mode - Grid of all generated images
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Generated Images</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Zoom</span>
                    <Slider
                      value={[zoomLevel]}
                      onValueChange={([value]) => setZoomLevel(value)}
                      max={100}
                      min={10}
                      step={5}
                      className="w-24"
                    />
                  </div>
                </div>
                
                <div 
                  className="grid gap-4" 
                  style={{ 
                    gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(120, 200 * zoomLevel / 100)}px, 1fr))` 
                  }}
                >
                  {cuts.flatMap(cut => cut.frames.filter(frame => frame.isGenerated)).map((frame) => (
                    <div key={frame.id} className="group relative">
                      <div 
                        className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/50 transition-colors"
                        onClick={() => handleFrameSelect(frame.id, !selectedFrames.includes(frame.id))}
                      >
                        {frame.imageUrl ? (
                          <img src={frame.imageUrl} alt={frame.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                        )}
                        
                        {selectedFrames.includes(frame.id) && (
                          <div className="absolute inset-0 bg-primary/20 border-2 border-primary" />
                        )}
                      </div>
                      
                      {/* Three dots menu below image */}
                      <div className="flex justify-center mt-2">
                        <div className="relative group/menu">
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="h-6 w-6 p-0 opacity-70 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                          >
                            ⋯
                          </Button>
                          
                          {/* Dropdown Menu */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-popover border border-border rounded-lg shadow-lg py-2 min-w-[140px] opacity-0 group-hover/menu:opacity-100 pointer-events-none group-hover/menu:pointer-events-auto transition-opacity z-50">
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => handleFrameEdit(frame.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => handleFrameDownload(frame.id)}
                            >
                              Download
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => handleFrameRetry(frame.id)}
                            >
                              Retry
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => console.log("Share frame", frame.id)}
                            >
                              Share
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => console.log("Duplicate frame", frame.id)}
                            >
                              Duplicate
                            </button>
                            <button 
                              className="w-full px-3 py-1.5 text-left text-sm hover:bg-muted transition-colors"
                              onClick={() => console.log("Add more frames", frame.id)}
                            >
                              Add More
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Edit Mode - Cuts and Frames
              <>
                {cuts.map((cut) => (
                  <EnhancedCutCard
                    key={cut.id}
                    id={cut.id}
                    title={cut.title}
                    description={cut.description}
                    frames={cut.frames}
                    selectedFrames={selectedFrames}
                    isGenerated={allGenerated}
                    previewMode={allGenerated}
                    onTitleChange={handleTitleChange}
                    onDescriptionChange={handleDescriptionChange}
                    onFrameSelect={handleFrameSelect}
                    onFrameTagsChange={handleFrameTagsChange}
                    onFrameGenerate={handleFrameGenerate}
                    onFrameEdit={handleFrameEdit}
                    onFrameRetry={handleFrameRetry}
                    onFrameDownload={handleFrameDownload}
                    onFramePreview={handleFramePreview}
                    onAddFrame={handleAddFrame}
                    onDelete={(cutId) => setCuts(prev => prev.filter(c => c.id !== cutId))}
                  />
                ))}
                
                {/* Add new cut button */}
                <div 
                  className="border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 flex flex-col items-center justify-center min-h-[200px] hover:border-primary/50 transition-colors cursor-pointer"
                  onClick={handleAddCut}
                >
                  <Plus className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-muted-foreground">Add New Cut</span>
                </div>
              </>
            )}
          </div>
        </div>
        </div>
      </div>

      {/* Edit Modal */}
      <EditModal
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditingFrame(null);
        }}
        originalImage={editingFrame?.imageUrl}
        currentImage={editingFrame?.imageUrl}
        tags={editingFrame?.tags}
        prompt={`Edit ${editingFrame?.title}`}
      />
    </div>
  );
};

export default ImageSetPage;