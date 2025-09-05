import { useState } from "react";
import Header from "@/components/Header";
import ImageUpload from "@/components/ImageUpload";
import ModeToggle from "@/components/ModeToggle";
import TagCloud from "@/components/TagCloud";
import SettingsPanel from "@/components/SettingsPanel";
import PreviewArea from "@/components/PreviewArea";
import HistoryRecords from "@/components/HistoryRecords";

const VariationPage = () => {
  const [selectedMode, setSelectedMode] = useState<"variation" | "remix">("variation");
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [previewImage, setPreviewImage] = useState<string>();
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const handleTagClick = (tag: string) => {
    setCurrentPrompt(prev => prev ? `${prev}, ${tag}` : tag);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-6 py-8 pt-24">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Variation & Remix
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform your anime images with precision editing. Keep characters consistent or freely modify with natural language.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Control Panel */}
          <div className="space-y-6 lg:order-1 order-2">
            <ImageUpload onImageUpload={handleImageUpload} />
            
            <ModeToggle 
              onModeChange={setSelectedMode}
              onPromptChange={setCurrentPrompt}
            />
            
            <TagCloud onTagClick={handleTagClick} />
            
            <SettingsPanel />
          </div>

          {/* Right Column - Results Panel */}
          <div className="space-y-6 lg:order-2 order-1">
            <PreviewArea 
              imageUrl={previewImage}
              prompt={currentPrompt}
              isLoading={isGenerating}
            />
            
            <HistoryRecords />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariationPage;