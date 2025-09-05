import { useState } from "react";
import { Edit3, Trash2, Download, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface HistoryRecord {
  id: string;
  prompt: string;
  originalImage: string;
  resultImage: string;
  timestamp: Date;
  mode: "variation" | "remix";
}

interface HistoryRecordsProps {
  records?: HistoryRecord[];
  onRecordSelect?: (record: HistoryRecord) => void;
  onRecordDelete?: (id: string) => void;
  onPromptEdit?: (id: string, newPrompt: string) => void;
  className?: string;
}

const mockRecords: HistoryRecord[] = [
  {
    id: "1",
    prompt: "Change to school uniform, smiling face",
    originalImage: "/placeholder.svg",
    resultImage: "/placeholder.svg", 
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    mode: "variation"
  },
  {
    id: "2", 
    prompt: "Add cat ears, change background to classroom",
    originalImage: "/placeholder.svg",
    resultImage: "/placeholder.svg",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    mode: "remix"
  }
];

const HistoryRecords = ({ 
  records = mockRecords, 
  onRecordSelect, 
  onRecordDelete, 
  onPromptEdit,
  className 
}: HistoryRecordsProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPrompt, setEditPrompt] = useState("");

  const handleEditStart = (record: HistoryRecord) => {
    setEditingId(record.id);
    setEditPrompt(record.prompt);
  };

  const handleEditSave = (id: string) => {
    onPromptEdit?.(id, editPrompt);
    setEditingId(null);
    setEditPrompt("");
  };

  const handleEditCancel = () => {
    setEditingId(null);
    setEditPrompt("");
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">History</h3>
        <span className="text-sm text-muted-foreground">
          {records.length} generation{records.length !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
        {records.length === 0 ? (
          <Card className="bg-card/30 border-border/50">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No generations yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Your history will appear here
              </p>
            </CardContent>
          </Card>
        ) : (
          records.map((record) => (
            <Card
              key={record.id}
              className="bg-card/50 border-border/50 hover:bg-card/70 transition-colors cursor-pointer"
              onClick={() => onRecordSelect?.(record)}
            >
              <CardContent className="p-4 space-y-3">
                {/* Header with mode and timestamp */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "px-2 py-1 text-xs rounded-full",
                      record.mode === "variation" 
                        ? "bg-primary/20 text-primary" 
                        : "bg-accent/20 text-accent"
                    )}>
                      {record.mode === "variation" ? "Variation" : "Remix"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatTimestamp(record.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(record.resultImage);
                      }}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditStart(record);
                      }}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-foreground"
                    >
                      <Edit3 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRecordDelete?.(record.id);
                      }}
                      className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Prompt */}
                <div className="space-y-2">
                  {editingId === record.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={editPrompt}
                        onChange={(e) => setEditPrompt(e.target.value)}
                        className="w-full p-2 text-sm bg-background border border-border rounded-md focus:border-primary/50 focus:outline-none resize-none"
                        rows={2}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditSave(record.id);
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          Save
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditCancel();
                          }}
                          className="h-6 px-2 text-xs"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-foreground line-clamp-2">
                      {record.prompt}
                    </p>
                  )}
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Original</p>
                    <div className="aspect-square rounded-md overflow-hidden bg-muted/30">
                      <img
                        src={record.originalImage}
                        alt="Original"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Result</p>
                    <div className="aspect-square rounded-md overflow-hidden bg-muted/30">
                      <img
                        src={record.resultImage}
                        alt="Result"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryRecords;