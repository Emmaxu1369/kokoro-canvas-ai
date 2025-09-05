import { useState } from "react";
import { Download, Maximize2, Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PreviewAreaProps {
  imageUrl?: string;
  prompt?: string;
  isLoading?: boolean;
  className?: string;
}

const PreviewArea = ({ imageUrl, prompt, isLoading = false, className }: PreviewAreaProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = () => {
    if (navigator.share && imageUrl) {
      navigator.share({
        title: 'Generated Anime Image',
        text: prompt || 'Check out this anime image I generated!',
        url: imageUrl
      });
    } else if (imageUrl) {
      navigator.clipboard.writeText(imageUrl);
    }
  };

  const handleFullscreen = () => {
    if (imageUrl) {
      window.open(imageUrl, '_blank');
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Preview</h3>
        {imageUrl && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className={cn(
                "transition-colors",
                isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground"
            >
              <Share2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFullscreen}
              className="text-muted-foreground hover:text-foreground"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Preview Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-card/30 border border-border/50">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-muted-foreground">Generating your image...</p>
            </div>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Generated preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mx-auto">
                <svg
                  className="w-8 h-8 text-muted-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                Your generated image will appear here
              </p>
            </div>
          </div>
        )}

        {/* Gradient Overlay for better text readability */}
        {imageUrl && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              {prompt && (
                <p className="text-white text-sm bg-black/50 backdrop-blur-sm rounded-lg p-3">
                  {prompt}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {imageUrl && (
        <div className="flex gap-3">
          <Button
            onClick={handleDownload}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex-1 border-primary/20 hover:border-primary/40"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      )}
    </div>
  );
};

export default PreviewArea;