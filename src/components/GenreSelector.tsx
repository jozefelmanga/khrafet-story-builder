import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Genre {
  id: string;
  name: string;
  description: string;
  gradient: string;
}

interface Tone {
  id: string;
  name: string;
  emoji: string;
}

interface Length {
  id: string;
  name: string;
  description: string;
  chunks: number;
}

interface GenreSelectorProps {
  onSelectionComplete: (genre: string, tone: string, length: string) => void;
}

const genres: Genre[] = [
  { id: "fantasy", name: "Fantasy", description: "Magic, dragons, and mystical worlds", gradient: "from-primary to-primary-glow" },
  { id: "sci-fi", name: "Sci-Fi", description: "Future tech, space, and alien worlds", gradient: "from-secondary to-secondary-glow" },
  { id: "mystery", name: "Mystery", description: "Puzzles, secrets, and detective work", gradient: "from-accent to-accent-glow" },
  { id: "romance", name: "Romance", description: "Love stories and emotional journeys", gradient: "from-pink-500 to-pink-300" },
  { id: "horror", name: "Horror", description: "Scary tales and supernatural frights", gradient: "from-red-600 to-red-400" },
  { id: "adventure", name: "Adventure", description: "Action, exploration, and quests", gradient: "from-green-500 to-green-300" }
];

const tones: Tone[] = [
  { id: "funny", name: "Funny", emoji: "😄" },
  { id: "dark", name: "Dark", emoji: "🌑" },
  { id: "romantic", name: "Romantic", emoji: "💕" },
  { id: "serious", name: "Serious", emoji: "🎭" },
  { id: "mysterious", name: "Mysterious", emoji: "🔍" },
  { id: "uplifting", name: "Uplifting", emoji: "✨" }
];

const lengths: Length[] = [
  { id: "short", name: "Short", description: "Quick story", chunks: 3 },
  { id: "medium", name: "Medium", description: "Standard length", chunks: 6 },
  { id: "long", name: "Long", description: "Epic journey", chunks: 10 }
];

const GenreSelector = ({ onSelectionComplete }: GenreSelectorProps) => {
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedTone, setSelectedTone] = useState<string>("");
  const [selectedLength, setSelectedLength] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  const handleNext = () => {
    if (step === 1 && selectedGenre) {
      setStep(2);
    } else if (step === 2 && selectedTone) {
      setStep(3);
    } else if (step === 3 && selectedLength) {
      onSelectionComplete(selectedGenre, selectedTone, selectedLength);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 pt-24">
      <Card className="w-full max-w-4xl glow-card transition-glow">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {step === 1 && "Choose Your Genre"}
            {step === 2 && "Select Your Tone"}
            {step === 3 && "Pick Story Length"}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {step === 1 && "What kind of story adventure awaits you?"}
            {step === 2 && "How should your story feel?"}
            {step === 3 && "How long should your journey be?"}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Step 1: Genre Selection */}
          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
              {genres.map((genre) => (
                <Button
                  key={genre.id}
                  variant={selectedGenre === genre.id ? "default" : "outline"}
                  className={`h-auto p-6 flex flex-col items-center space-y-2 transition-glow ${
                    selectedGenre === genre.id 
                      ? `glow-primary bg-gradient-to-br ${genre.gradient}` 
                      : "hover:glow-primary hover:border-primary"
                  }`}
                  onClick={() => setSelectedGenre(genre.id)}
                >
                  <span className="text-lg font-semibold">{genre.name}</span>
                  <span className="text-sm text-center opacity-80">{genre.description}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Step 2: Tone Selection */}
          {step === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 animate-fade-in">
              {tones.map((tone) => (
                <Button
                  key={tone.id}
                  variant={selectedTone === tone.id ? "default" : "outline"}
                  className={`h-24 flex flex-col items-center space-y-2 transition-glow ${
                    selectedTone === tone.id 
                      ? "glow-secondary bg-gradient-to-br from-secondary to-secondary-glow" 
                      : "hover:glow-secondary hover:border-secondary"
                  }`}
                  onClick={() => setSelectedTone(tone.id)}
                >
                  <span className="text-2xl">{tone.emoji}</span>
                  <span className="font-medium">{tone.name}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Step 3: Length Selection */}
          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
              {lengths.map((length) => (
                <Button
                  key={length.id}
                  variant={selectedLength === length.id ? "default" : "outline"}
                  className={`h-32 flex flex-col items-center justify-center space-y-2 transition-glow ${
                    selectedLength === length.id 
                      ? "glow-accent bg-gradient-to-br from-accent to-accent-glow" 
                      : "hover:glow-accent hover:border-accent"
                  }`}
                  onClick={() => setSelectedLength(length.id)}
                >
                  <span className="text-xl font-bold">{length.name}</span>
                  <span className="text-sm text-center opacity-80">{length.description}</span>
                  <span className="text-xs opacity-60">{length.chunks} chapters</span>
                </Button>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={step === 1}
              className="transition-glow hover:glow-primary"
            >
              Back
            </Button>
            
            <div className="flex space-x-2">
              {[1, 2, 3].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`w-3 h-3 rounded-full transition-all ${
                    stepNum === step 
                      ? "bg-primary glow-primary" 
                      : stepNum < step 
                        ? "bg-primary/60" 
                        : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={
                (step === 1 && !selectedGenre) ||
                (step === 2 && !selectedTone) ||
                (step === 3 && !selectedLength)
              }
              className="glow-primary bg-gradient-to-r from-primary to-primary-glow transition-glow hover:glow-primary"
            >
              {step === 3 ? "Start Story" : "Next"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenreSelector;