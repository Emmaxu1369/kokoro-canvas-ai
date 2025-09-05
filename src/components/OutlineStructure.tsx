import { useState } from "react";
import { Plus, Play, Download, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CutCard from "./CutCard";
import BatchOperationsToolbar from "./BatchOperationsToolbar";
import EditModal from "./EditModal";

interface Frame {
  id: string;
  tags: string[];
  imageUrl?: string;
  isGenerated: boolean;
  isSelected?: boolean;
}

interface Cut {
  id: string;
  title: string;
  prompt: string;
  frames: Frame[];
}

interface OutlineStructureProps {
  sidebarCollapsed?: boolean;
  className?: string;
}

const OutlineStructure = ({ sidebarCollapsed = false, className }: OutlineStructureProps) => {
  const [cuts, setCuts] = useState<Cut[]>([
    {
      id: "1",
      title: "Opening Scene",
      prompt: "Character introduction in school courtyard",
      frames: [
        { id: "1-1", tags: ["school uniform", "smiling", "long hair"], isGenerated: false },
        { id: "1-2", tags: ["school uniform", "walking", "backpack"], isGenerated: true, imageUrl: "/placeholder.svg" },
        { id: "1-3", tags: ["close-up", "surprised", "big eyes"], isGenerated: false },
        { id: "1-4", tags: ["school uniform", "waving", "happy"], isGenerated: false },
      ]
    },
    {
      id: "2", 
      title: "Classroom Scene",
      prompt: "Character sitting at desk, taking notes",
      frames: [
        { id: "2-1", tags: ["classroom", "sitting", "studying"], isGenerated: false },
        { id: "2-2", tags: ["notebook", "writing", "concentrated"], isGenerated: false },
        { id: "2-3", tags: ["teacher", "blackboard", "listening"], isGenerated: true, imageUrl: "/placeholder.svg" },
        { id: "2-4", tags: ["lunch break", "friends", "talking"], isGenerated: false },
      ]
    }
  ]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFrame, setEditingFrame] = useState<{ cutId: string; frameId: string } | null>(null);

  const handleAddCut = () => {
    const newCut: Cut = {
      id: Date.now().toString(),
      title: `Scene ${cuts.length + 1}`,
      prompt: "",
      frames: [
        { id: `${Date.now()}-1`, tags: [], isGenerated: false },
        { id: `${Date.now()}-2`, tags: [], isGenerated: false },
      ]
    };
    setCuts(prev => [...prev, newCut]);
  };

  const handleCutEdit = (cutId: string, field: 'title' | 'prompt', value: string) => {
    setCuts(prev => prev.map(cut => 
      cut.id === cutId ? { ...cut, [field]: value } : cut
    ));
  };

  const handleCutDelete = (cutId: string) => {
    setCuts(prev => prev.filter(cut => cut.id !== cutId));
  };

  const handleFrameSelect = (cutId: string, frameId: string, selected: boolean) => {
    setCuts(prev => prev.map(cut =>
      cut.id === cutId
        ? {
            ...cut,
            frames: cut.frames.map(frame =>
              frame.id === frameId ? { ...frame, isSelected: selected } : frame
            )
          }
        : cut
    ));
  };

  const handleFrameEdit = (cutId: string, frameId: string) => {
    setEditingFrame({ cutId, frameId });
    setEditModalOpen(true);
  };

  const handleFrameAdd = (cutId: string) => {
    setCuts(prev => prev.map(cut =>
      cut.id === cutId
        ? {
            ...cut,
            frames: [
              ...cut.frames,
              { id: `${cutId}-${Date.now()}`, tags: [], isGenerated: false }
            ]
          }
        : cut
    ));
  };

  const handleGenerateAll = () => {
    console.log("Generating all frames...");
  };

  const handleDownloadAll = () => {
    console.log("Downloading all frames...");
  };

  const handleExportVideo = () => {
    console.log("Exporting video...");
  };

  const selectedCount = cuts.reduce((total, cut) => 
    total + cut.frames.filter(frame => frame.isSelected).length, 0
  );

  const totalFrames = cuts.reduce((total, cut) => total + cut.frames.length, 0);
  const generatedFrames = cuts.reduce((total, cut) => 
    total + cut.frames.filter(frame => frame.isGenerated).length, 0
  );

  return (
    <div className={cn(
      "transition-all duration-300",
      sidebarCollapsed ? "ml-16" : "ml-80",
      className
    )}>
      <div className="p-6 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Image Set Generation
              </span>
            </h1>
            <p className="text-muted-foreground">
              {generatedFrames} of {totalFrames} frames generated
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              onClick={handleGenerateAll}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Play className="h-4 w-4 mr-2" />
              Generate All
            </Button>
            <Button
              variant="outline"
              onClick={handleDownloadAll}
              className="border-primary/20 hover:border-primary/40"
            >
              <Download className="h-4 w-4 mr-2" />
              Download All
            </Button>
            <Button
              variant="outline"
              onClick={handleExportVideo}
              className="border-primary/20 hover:border-primary/40"
            >
              <Video className="h-4 w-4 mr-2" />
              Export Video
            </Button>
          </div>
        </div>

        {/* Batch Operations Toolbar */}
        <BatchOperationsToolbar
          selectedCount={selectedCount}
          onClearSelection={() => {
            setCuts(prev => prev.map(cut => ({
              ...cut,
              frames: cut.frames.map(frame => ({ ...frame, isSelected: false }))
            })));
          }}
          onSaveTemplate={() => console.log("Save template")}
          onAddTag={() => console.log("Add tag")}
          onReplaceTag={() => console.log("Replace tag")}
          onRetryAll={() => console.log("Retry all")}
          onDeleteAll={() => console.log("Delete all")}
        />

        {/* Cuts */}
        <div className="space-y-6">
          {cuts.map((cut) => (
            <CutCard
              key={cut.id}
              cut={cut}
              onCutEdit={handleCutEdit}
              onCutDelete={handleCutDelete}
              onFrameSelect={handleFrameSelect}
              onFrameEdit={handleFrameEdit}
              onFrameRetry={(cutId, frameId) => console.log("Retry frame", cutId, frameId)}
              onFrameDownload={(cutId, frameId) => console.log("Download frame", cutId, frameId)}
              onFrameGenerate={(cutId, frameId) => console.log("Generate frame", cutId, frameId)}
              onFrameAdd={handleFrameAdd}
            />
          ))}

          {/* Add Cut Button */}
          <div
            className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer group"
            onClick={handleAddCut}
          >
            <Plus className="h-12 w-12 text-muted-foreground group-hover:text-primary mx-auto mb-4 transition-colors" />
            <h3 className="text-lg font-medium text-muted-foreground group-hover:text-primary transition-colors mb-2">
              Add New Cut
            </h3>
            <p className="text-sm text-muted-foreground">
              Create a new scene with multiple frames
            </p>
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
        onSave={() => {
          setEditModalOpen(false);
          setEditingFrame(null);
        }}
        onEdit={(prompt, tags) => console.log("Edit frame", prompt, tags)}
        onRetry={() => console.log("Retry frame")}
        onDownload={() => console.log("Download frame")}
      />
    </div>
  );
};

export default OutlineStructure;