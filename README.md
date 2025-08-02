# Khrafet Tales - Interactive Story Generator

An AI-powered interactive storytelling web application that creates unique, dynamic stories based on user choices.

## Features

- **Interactive Storytelling**: Choose your path through dynamically generated stories
- **AI-Powered Content**: Each story chunk is generated in real-time using OpenRouter API
- **Multiple Genres**: Fantasy, Sci-Fi, Mystery, Adventure, and more
- **Customizable Tone**: Choose from various story tones and moods
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Generation**: Stories adapt to your choices as you play

## Technologies Used

This project is built with:

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **OpenRouter API** - AI story generation
- **React Router** - Client-side routing
- **React Query** - Data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+ and npm/bun
- OpenRouter API key (see setup instructions below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd khrafet-tales
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   npm i -g vercel
   vercel
   ```

2. **Add environment variables in Vercel dashboard**
   - Go to your Vercel project settings
   - Add `VITE_OPENROUTER_API_KEY` with your API key

3. **Redeploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

The app can be deployed to any static hosting platform:
- Netlify
- GitHub Pages
- Cloudflare Pages
- AWS S3 + CloudFront

Just make sure to set the `VITE_OPENROUTER_API_KEY` environment variable.

## AI-Powered Story Generation (Updated!)

This project now uses [OpenRouter API](https://openrouter.ai/) to generate interactive stories with AI. Instead of static, pre-written story chunks, each part of your story is dynamically created by an AI model based on your genre, tone, and choices.

### How it works
- When you start a story or make a choice, the app sends a prompt to the OpenRouter API.
- The AI responds with the next part of the story and a set of choices for you to pick from.
- This process repeats, making every story unique and interactive.

### Setup Required
1. **Get an OpenRouter API key** from [OpenRouter](https://openrouter.ai/)
2. **Configure environment variables** - See `OPENROUTER_SETUP.md` for detailed instructions
3. **Create a `.env` file** with your API key and site information

### How to use
1. Follow the setup instructions in `OPENROUTER_SETUP.md`
2. Select your genre, tone, and length, then enjoy your AI-powered adventure!
3. The app uses the `deepseek/deepseek-r1-0528:free` model by default

### About OpenRouter
- [OpenRouter](https://openrouter.ai/) provides access to multiple AI models through a single API
- You can easily switch between different models by modifying the configuration
- The API is reliable and well-documented

### Development Notes
- The old Puter.js integration has been replaced with OpenRouter API
- All story content is now generated on the fly by AI
- Comprehensive error handling is included for API failures
- See `OPENROUTER_SETUP.md` for detailed configuration instructions
