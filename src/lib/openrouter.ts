// OpenRouter API service
export interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface StoryChunkResponse {
  text: string;
  choices: string[];
}

class OpenRouterAPI {
  private apiKey: string;
  private siteUrl: string;
  private siteName: string;
  private baseUrl = "https://openrouter.ai/api/v1/chat/completions";

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || "";
    this.siteUrl = import.meta.env.VITE_SITE_URL || "";
    this.siteName = import.meta.env.VITE_SITE_NAME || "";
  }

  private async makeRequest(requestBody: OpenRouterRequest): Promise<OpenRouterResponse> {
    if (!this.apiKey) {
      throw new Error("OpenRouter API key not configured. Please set VITE_OPENROUTER_API_KEY in your environment variables.");
    }

    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Content-Type": "application/json"
    };

    // Add optional headers only if they are provided
    if (this.siteUrl) {
      headers["HTTP-Referer"] = this.siteUrl;
    }
    if (this.siteName) {
      headers["X-Title"] = this.siteName;
    }

    const response = await fetch(this.baseUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  async generateStoryChunk(
    genre: string,
    tone: string,
    storySoFar: string,
    userChoice: string | null
  ): Promise<StoryChunkResponse> {
    const prompt = this.buildPrompt(genre, tone, storySoFar, userChoice);
    
    const requestBody: OpenRouterRequest = {
      model: "deepseek/deepseek-r1-0528:free",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.8,
      max_tokens: 1000
    };

    try {
      const response = await this.makeRequest(requestBody);
      const content = response.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error("No content received from OpenRouter API");
      }

      // Parse the JSON response from the AI
      const parsed = this.parseAIResponse(content);
      
      return {
        text: parsed.text,
        choices: parsed.choices
      };
    } catch (error) {
      console.error("OpenRouter API error:", error);
      throw error;
    }
  }

  private buildPrompt(genre: string, tone: string, storySoFar: string, userChoice: string | null): string {
    let base = `You are an interactive story generator. Write the next part of a ${genre} story in a ${tone} tone.`;
    
    if (storySoFar) {
      base += ` The story so far: ${storySoFar}`;
    }
    
    if (userChoice) {
      base += ` The user chose: ${userChoice}`;
    }
    
    base += `\n\nRespond ONLY with a valid JSON object in this format (no explanation, no markdown, no extra text):\n\n{\n  "text": "<the next part of the story>",\n  "choices": ["<choice 1>", "<choice 2>", "<choice 3>"]\n}\n\nDo not include any commentary or formatting.`;
    
    return base;
  }

  private parseAIResponse(response: string): StoryChunkResponse {
    try {
      // First, try to parse the response directly as JSON
      const parsed = JSON.parse(response);
      
      if (parsed.text && Array.isArray(parsed.choices)) {
        return {
          text: parsed.text,
          choices: parsed.choices
        };
      }
    } catch {
      // If direct parsing fails, try to extract JSON from the text
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.text && Array.isArray(parsed.choices)) {
            return {
              text: parsed.text,
              choices: parsed.choices
            };
          }
        } catch {
          // If JSON parsing still fails, create a fallback response
        }
      }
    }

    // Fallback: create a simple response if JSON parsing fails
    throw new Error("Failed to parse AI response. The AI did not return valid JSON format.");
  }
}

// Export a singleton instance
export const openRouterAPI = new OpenRouterAPI(); 