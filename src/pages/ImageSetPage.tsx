import { useState } from "react";
import Header from "@/components/Header";
import ImageSetSidebar from "@/components/ImageSetSidebar";
import EnhancedCutCard from "@/components/EnhancedCutCard";
import BatchOperationsToolbar from "@/components/BatchOperationsToolbar";
import EditModal from "@/components/EditModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, Play, ZoomIn, ZoomOut, MoreHorizontal, Edit } from "lucide-react";
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
  const [cuts, setCuts] = useState<Cut[]>(mockCuts);
  const [globalGenerated, setGlobalGenerated] = useState(false);
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);
  const [previewMode, setPreviewMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(50);
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
    setGlobalGenerated(true);
    setPreviewMode(true);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* Fixed Sidebar */}
        <ImageSetSidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Controls */}
          <div className="p-4 border-b border-border/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* Empty left side for future controls */}
            </div>
            
            <div className="flex items-center gap-2">
              {previewMode && (
                <>
                  <div className="flex items-center gap-2 mr-4">
                    <ZoomOut className="w-4 h-4 text-muted-foreground" />
                    <Slider
                      value={[zoomLevel]}
                      onValueChange={(value) => setZoomLevel(value[0])}
                      min={25}
                      max={200}
                      step={25}
                      className="w-24"
                    />
                    <ZoomIn className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground w-12">{zoomLevel}%</span>
                  </div>
                </>
              )}
              <Button
                onClick={handleGenerateAll}
                className="bg-primary hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Generate All
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-8" style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top left' }}>
              {cuts.map((cut) => (
                <EnhancedCutCard
                  key={cut.id}
                  id={cut.id}
                  title={cut.title}
                  description={cut.description}
                  frames={cut.frames}
                  selectedFrames={selectedFrames}
                  isGenerated={globalGenerated}
                  previewMode={previewMode}
                  onTitleChange={(id, title) => {
                    setCuts(prev => prev.map(c => c.id === id ? { ...c, title } : c));
                  }}
                  onDescriptionChange={(id, description) => {
                    setCuts(prev => prev.map(c => c.id === id ? { ...c, description } : c));
                  }}
                  onFrameSelect={handleFrameSelect}
                  onFrameTagsChange={handleFrameTagsChange}
                  onFrameGenerate={handleFrameGenerate}
                  onFrameEdit={handleFrameEdit}
                  onFrameRetry={handleFrameRetry}
                  onFrameDownload={handleFrameDownload}
                  onFramePreview={handleFramePreview}
                  onAddFrame={handleAddFrame}
                  onDelete={(id) => {
                    setCuts(prev => prev.filter(c => c.id !== id));
                  }}
                />
              ))}
              
              {/* Add Cut Placeholder */}
              <div 
                className="border-2 border-dashed border-border/50 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                onClick={handleAddCut}
              >
                <Plus className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Add New Cut</p>
              </div>
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