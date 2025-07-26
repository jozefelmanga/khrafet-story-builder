import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, RotateCcw, Share2 } from "lucide-react";

interface StoryCompleteProps {
  onRestart: () => void;
}

const StoryComplete = ({ onRestart }: StoryCompleteProps) => {
  const handleShare = () => {
    // In a real app, this would implement sharing functionality
    navigator.share?.({
      title: "I just completed an interactive story on Khrafet!",
      text: "Check out this amazing interactive storytelling app",
      url: window.location.href
    }).catch(() => {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard?.writeText(window.location.href);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <Card className="w-full max-w-lg glow-card transition-glow animate-fade-in">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center glow-primary">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Story Complete!
          </CardTitle>
          <CardDescription className="text-lg">
            Congratulations! You've reached the end of your adventure. Your choices shaped a unique narrative experience.
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Story Stats */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg text-center">Your Journey</h3>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">✨</div>
                <div className="text-sm text-muted-foreground">Unique Path</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-secondary">🎭</div>
                <div className="text-sm text-muted-foreground">Story Complete</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={onRestart}
              className="w-full h-12 glow-primary bg-gradient-to-r from-primary to-primary-glow transition-glow hover:glow-primary"
              size="lg"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Start New Adventure
            </Button>
            
            <Button
              onClick={handleShare}
              variant="outline"
              className="w-full h-12 transition-glow hover:glow-secondary hover:border-secondary"
              size="lg"
            >
              <Share2 className="w-5 h-5 mr-2" />
              Share Your Experience
            </Button>
          </div>

          {/* Footer Message */}
          <div className="text-center text-sm text-muted-foreground pt-4">
            Thank you for exploring with <span className="text-primary font-semibold">Khrafet</span>!
            <br />
            Every choice creates a new story.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryComplete;