import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft, ChevronRight, History } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatSession {
  id: string;
  title: string;
  timestamp: Date;
  thumbnail?: string;
  messageCount: number;
}

interface ChatSidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  sessions?: ChatSession[];
  currentSessionId?: string;
  onSessionSelect?: (sessionId: string) => void;
}

const mockSessions: ChatSession[] = [
  {
    id: "1",
    title: "Anime girl with school uniform",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    thumbnail: "/placeholder.svg",
    messageCount: 8
  },
  {
    id: "2",
    title: "Cat ears and magical background",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    thumbnail: "/placeholder.svg",
    messageCount: 5
  },
  {
    id: "3",
    title: "Character variations",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    thumbnail: "/placeholder.svg",
    messageCount: 12
  }
];

const ChatSidebar = ({
  isCollapsed,
  onToggle,
  sessions = mockSessions,
  currentSessionId = "1",
  onSessionSelect
}: ChatSidebarProps) => {
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

  return (
    <div className={cn(
      "border-r border-border/50 bg-card/20 backdrop-blur-sm transition-all duration-300 flex flex-col h-full",
      isCollapsed ? "w-12" : "w-80"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-border/50 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <History className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-foreground">Chat History</h2>
          </div>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0 hover:bg-muted/50"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Sessions List */}
      {!isCollapsed && (
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-2">
            {sessions.map((session) => (
              <Card
                key={session.id}
                className={cn(
                  "cursor-pointer transition-all hover:bg-card/70",
                  currentSessionId === session.id 
                    ? "bg-primary/10 border-primary/30" 
                    : "bg-card/30 border-border/30"
                )}
                onClick={() => onSessionSelect?.(session.id)}
              >
                <CardContent className="p-3">
                  <div className="flex gap-3">
                    {/* Thumbnail */}
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted/50 flex-shrink-0">
                      {session.thumbnail ? (
                        <img 
                          src={session.thumbnail} 
                          alt="Session thumbnail"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20"></div>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {session.title}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">
                          {session.messageCount} messages
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(session.timestamp)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Collapsed state indicator */}
      {isCollapsed && (
        <div className="flex-1 flex items-center justify-center">
          <History className="h-6 w-6 text-muted-foreground" />
        </div>
      )}
    </div>
  );
};

export default ChatSidebar;