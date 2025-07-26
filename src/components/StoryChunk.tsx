import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";

interface Choice {
  id: string;
  text: string;
}

interface StoryData {
  id: string;
  text: string;
  choices: Choice[];
}

interface StoryChunkProps {
  genre: string;
  tone: string;
  length: string;
  onComplete: () => void;
}

// Mock story data - in real app, this would come from API
const mockStoryChunks: Record<string, StoryData[]> = {
  "fantasy-funny-short": [
    {
      id: "1",
      text: "You wake up in a mystical forest with a talking squirrel sitting on your chest. The squirrel introduces himself as Gerald, the self-proclaimed 'Guardian of Nuts and Nonsense.' He explains that you've been chosen to find the legendary Golden Acorn, but first you must prove your worthiness by... solving his riddle about proper nut storage techniques.",
      choices: [
        { id: "1a", text: "Accept Gerald's ridiculous challenge with enthusiasm" },
        { id: "1b", text: "Question Gerald's qualifications as a guardian" }
      ]
    },
    {
      id: "2",
      text: "Gerald beams with joy at your response and conjures a tiny wizard hat for himself. 'Excellent choice, brave adventurer!' he squeaks. He points his tiny paw toward two glowing paths through the forest. The left path sparkles with golden light and smells like fresh cookies, while the right path glimmers with silver moonbeams and sounds like distant laughter.",
      choices: [
        { id: "2a", text: "Follow the cookie-scented golden path" },
        { id: "2b", text: "Take the moonbeam path toward the laughter" }
      ]
    },
    {
      id: "3",
      text: "Your adventure leads you to a clearing where a magnificent tree holds the Golden Acorn, but it's guarded by a dragon... who's wearing reading glasses and appears to be writing poetry. Gerald whispers that this is Bookworm the Dragon, and he's actually quite friendly if you appreciate literature. The dragon looks up and recites a terrible poem about acorns.",
      choices: [
        { id: "3a", text: "Compliment the dragon's poetry enthusiastically" },
        { id: "3b", text: "Offer to help improve his rhyme scheme" }
      ]
    }
  ]
};

const getLengthLimit = (length: string): number => {
  switch (length) {
    case "short": return 3;
    case "medium": return 6;
    case "long": return 10;
    default: return 3;
  }
};

const StoryChunk = ({ genre, tone, length, onComplete }: StoryChunkProps) => {
  const [currentChunk, setCurrentChunk] = useState<number>(0);
  const [storyData, setStoryData] = useState<StoryData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const maxChunks = getLengthLimit(length);
  const progress = ((currentChunk + 1) / maxChunks) * 100;

  useEffect(() => {
    // Load initial story data
    const storyKey = `${genre}-${tone}-${length}`;
    const mockData = mockStoryChunks[storyKey] || mockStoryChunks["fantasy-funny-short"];
    setStoryData(mockData);
  }, [genre, tone, length]);

  useEffect(() => {
    // Typewriter effect for story text
    if (storyData[currentChunk]) {
      setIsTyping(true);
      setDisplayedText("");
      const text = storyData[currentChunk].text;
      let index = 0;
      
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.substring(0, index + 1));
          index++;
        } else {
          setIsTyping(false);
          clearInterval(timer);
        }
      }, 30);

      return () => clearInterval(timer);
    }
  }, [currentChunk, storyData]);

  const handleChoice = async (choiceId: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentChunk + 1 >= maxChunks) {
      onComplete();
    } else {
      setCurrentChunk(currentChunk + 1);
    }
    
    setIsLoading(false);
  };

  if (storyData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-primary">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading your story...</span>
        </div>
      </div>
    );
  }

  const currentStory = storyData[currentChunk];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24">
      {/* Progress Bar */}
      <div className="w-full max-w-2xl mb-6">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Chapter {currentChunk + 1} of {maxChunks}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress 
          value={progress} 
          className="h-2 glow-primary"
        />
      </div>

      {/* Story Card */}
      <Card className="w-full max-w-2xl glow-card transition-glow animate-fade-in">
        <CardContent className="p-8">
          {/* Story Text */}
          <div className="prose prose-invert max-w-none mb-8">
            <p className="text-lg leading-relaxed text-foreground">
              {displayedText}
              {isTyping && <span className="animate-pulse">|</span>}
            </p>
          </div>

          {/* Choices */}
          {!isTyping && !isLoading && currentStory?.choices && (
            <div className="space-y-4 animate-slide-up">
              <h3 className="text-xl font-semibold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                What do you choose?
              </h3>
              <div className="grid gap-3">
                {currentStory.choices.map((choice, index) => (
                  <Button
                    key={choice.id}
                    variant="outline"
                    className={`h-auto p-4 text-left justify-start transition-glow hover:glow-primary hover:border-primary ${
                      index === 0 ? "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary-glow/10" :
                      "hover:bg-gradient-to-r hover:from-secondary/10 hover:to-secondary-glow/10"
                    }`}
                    onClick={() => handleChoice(choice.id)}
                  >
                    <span className="text-base">{choice.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 animate-fade-in">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-primary">Loading next chapter...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryChunk;