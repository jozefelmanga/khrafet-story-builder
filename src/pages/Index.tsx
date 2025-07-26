import { useState } from "react";
import Header from "@/components/Header";
import GenreSelector from "@/components/GenreSelector";
import StoryChunk from "@/components/StoryChunk";
import StoryComplete from "@/components/StoryComplete";

type AppState = "selection" | "story" | "complete";

interface StorySettings {
  genre: string;
  tone: string;
  length: string;
}

const Index = () => {
  const [appState, setAppState] = useState<AppState>("selection");
  const [storySettings, setStorySettings] = useState<StorySettings>({
    genre: "",
    tone: "",
    length: ""
  });

  const handleSelectionComplete = (genre: string, tone: string, length: string) => {
    setStorySettings({ genre, tone, length });
    setAppState("story");
  };

  const handleStoryComplete = () => {
    setAppState("complete");
  };

  const handleRestart = () => {
    setStorySettings({ genre: "", tone: "", length: "" });
    setAppState("selection");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {appState === "selection" && (
        <GenreSelector onSelectionComplete={handleSelectionComplete} />
      )}
      
      {appState === "story" && (
        <StoryChunk 
          genre={storySettings.genre}
          tone={storySettings.tone}
          length={storySettings.length}
          onComplete={handleStoryComplete}
        />
      )}
      
      {appState === "complete" && (
        <StoryComplete onRestart={handleRestart} />
      )}
    </div>
  );
};

export default Index;