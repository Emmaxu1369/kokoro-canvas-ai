import { useState } from "react";
import Header from "@/components/Header";
import ImageSetSidebar from "@/components/ImageSetSidebar";
import EnhancedCutCard from "@/components/EnhancedCutCard";
import BatchOperationsToolbar from "@/components/BatchOperationsToolbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Download, Video } from "lucide-react";

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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [cuts, setCuts] = useState<Cut[]>(mockCuts);
  const [selectedFrames, setSelectedFrames] = useState<string[]>([]);

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
    setCuts(prev => prev.map(cut => ({
      ...cut,
      frames: cut.frames.map(frame => ({
        ...frame,
        isGenerated: true,
        imageUrl: "/placeholder.svg"
      }))
    })));
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex h-screen pt-16">
        <ImageSetSidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col">
          {/* Batch Operations Toolbar */}
          {selectedFrames.length > 0 && (
            <BatchOperationsToolbar
              selectedCount={selectedFrames.length}
              onSaveTemplate={() => console.log("Save template")}
              onAddTag={() => console.log("Add tag")}
              onReplaceTag={() => console.log("Replace tag")}
              onDeleteAll={() => console.log("Delete frames")}
              onClearSelection={() => setSelectedFrames([])}
            />
          )}

          {/* Main Controls */}
          <div className="border-b border-border/50 bg-card/20 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button onClick={handleAddCut} className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Cut
                </Button>
                <Button 
                  onClick={handleGenerateAll}
                  className="bg-primary hover:bg-primary/90"
                >
                  Generate All
                </Button>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Download All
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Video className="h-4 w-4" />
                  Generate Video
                </Button>
              </div>
            </div>
          </div>

          {/* Cuts and Frames */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-8 max-w-7xl mx-auto">
              {cuts.map((cut) => (
                <EnhancedCutCard
                  key={cut.id}
                  id={cut.id}
                  title={cut.title}
                  description={cut.description}
                  frames={cut.frames}
                  selectedFrames={selectedFrames}
                  onTitleChange={(id, title) => {
                    setCuts(prev => prev.map(c => c.id === id ? { ...c, title } : c));
                  }}
                  onDescriptionChange={(id, description) => {
                    setCuts(prev => prev.map(c => c.id === id ? { ...c, description } : c));
                  }}
                  onFrameSelect={handleFrameSelect}
                  onFrameTagsChange={handleFrameTagsChange}
                  onFrameGenerate={handleFrameGenerate}
                  onFrameEdit={(frameId) => console.log("Edit frame", frameId)}
                  onFrameRetry={(frameId) => console.log("Retry frame", frameId)}
                  onFrameDownload={(frameId) => console.log("Download frame", frameId)}
                  onFramePreview={(frameId) => console.log("Preview frame", frameId)}
                  onAddFrame={handleAddFrame}
                  onDelete={(id) => {
                    setCuts(prev => prev.filter(c => c.id !== id));
                  }}
                />
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default ImageSetPage;