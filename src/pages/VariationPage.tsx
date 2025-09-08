import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import VariationSidebar from "@/components/VariationSidebar";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "system";
  content: string;
  image?: string;
  images?: string[];  // For multiple candidate images
  timestamp: Date;
  mode?: "variation" | "remix";
}

const VariationPage = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState<"en" | "jp">("en");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "system",
      content: "Welcome! Upload an image and tell me how you'd like to modify it.",
      timestamp: new Date()
    }
  ]);
  const [selectedImage, setSelectedImage] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    quantity: 3,
    size: "1024x1024",
    cfg: 7.5,
    steps: 30,
    seed: -1
  });

  const handleSendMessage = (content: string, mode: "variation" | "remix") => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
      mode
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsGenerating(true);

    // Simulate AI response after delay
    setTimeout(() => {
      // Generate candidate images based on settings
      const candidateImages = Array.from({ length: generationSettings.quantity }, () => "/placeholder.svg");

      const systemMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "system",
        content: `Generated ${mode} based on: "${content}"`,
        images: candidateImages, // Multiple candidates
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, systemMessage]);
      setIsGenerating(false);
    }, 2000);
  };

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
  };

  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleRetry = () => {
    // Implement retry logic
    console.log("Retrying generation...");
  };

  const handleDownload = (imageUrl: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'generated-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = (imageUrl: string) => {
    // Implement save logic
    console.log("Saving image:", imageUrl);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />
      
      <div className="flex h-screen pt-16">
        {/* Fixed Sidebar */}
        <VariationSidebar
          currentImage={selectedImage}
          onSettingsChange={setGenerationSettings}
        />
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header with Back Button */}
          <div className="flex items-center gap-4 p-6 pb-2 border-b border-border/50">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="hover:bg-muted/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-semibold text-foreground">AI Variation Generator</h1>
          </div>
          
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6 pt-4">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    type={message.type}
                    content={message.content}
                    image={message.image}
                    images={message.images}
                    timestamp={message.timestamp}
                    onRetry={handleRetry}
                    onDownload={handleDownload}
                    onSave={handleSave}
                    onSelectImage={handleSelectImage}
                  />
                ))}
                
                {isGenerating && (
                  <div className="flex gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-4 h-4 rounded-full bg-primary animate-pulse"></div>
                    </div>
                    <div className="bg-card border border-border/50 rounded-2xl px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce"></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                        <span className="text-sm text-muted-foreground">Generating...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t border-border/50">
            <div className="max-w-4xl mx-auto">
              <ChatInput
                onSendMessage={handleSendMessage}
                onImageUpload={handleImageUpload}
                disabled={isGenerating}
                selectedImage={undefined}
                onClearImage={() => setSelectedImage(undefined)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationPage;