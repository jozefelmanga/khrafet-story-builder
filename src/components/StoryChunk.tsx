import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { openRouterAPI } from "@/lib/openrouter";

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

// Helper to build prompt for AI
const buildPrompt = (genre: string, tone: string, storySoFar: string, userChoice: string | null) => {
  let base = `You are an interactive story generator. Write the next part of a ${genre} story in a ${tone} tone.`;
  if (storySoFar) base += ` The story so far: ${storySoFar}`;
  if (userChoice) base += ` The user chose: ${userChoice}`;
  base += `\nRespond ONLY with a valid JSON object in this format (no explanation, no markdown, no extra text):\n\n{\n  "text": "<the next part of the story>",\n  "choices": ["<choice 1>", "<choice 2>", "<choice 3>"]\n}\n\nDo not include any commentary or formatting.`;
  return base;
};

// Add missing getLengthLimit function
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
  const [error, setError] = useState<string | null>(null);

  const maxChunks = getLengthLimit(length);
  const progress = ((currentChunk + 1) / maxChunks) * 100;

  // Helper to get story so far
  const getStorySoFar = () => storyData.map(chunk => chunk.text).join(" ");

  // Fetch next story chunk from AI
  const fetchNextChunk = async (userChoice: string | null) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await openRouterAPI.generateStoryChunk(
        genre,
        tone,
        getStorySoFar(),
        userChoice
      );
      
      const newChunk: StoryData = {
        id: (storyData.length + 1).toString(),
        text: response.text,
        choices: response.choices.map((c: string, i: number) => ({ 
          id: `${storyData.length + 1}${String.fromCharCode(97 + i)}`, 
          text: c 
        }))
      };
      
      setStoryData(prev => [...prev, newChunk]);
      setCurrentChunk(storyData.length); // move to new chunk
    } catch (e: any) {
      setError("Failed to generate story. Please try again. " + (e?.message || ""));
    } finally {
      setIsLoading(false);
    }
  };

  // On mount, start story
  useEffect(() => {
    setStoryData([]);
    setCurrentChunk(0);
    fetchNextChunk(null);
    // eslint-disable-next-line
  }, [genre, tone, length]);

  // Typewriter effect for story text
  useEffect(() => {
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
    const choiceText = storyData[currentChunk].choices.find(c => c.id === choiceId)?.text || "";
    if (currentChunk + 1 >= maxChunks) {
      onComplete();
      setIsLoading(false);
      return;
    }
    await fetchNextChunk(choiceText);
    setIsLoading(false);
  };

  if (isLoading && storyData.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2 text-primary">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading your story...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <span className="text-red-500">{error}</span>
          <Button onClick={() => fetchNextChunk(null)}>Retry</Button>
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