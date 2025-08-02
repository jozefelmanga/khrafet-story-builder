# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/fba8b29c-acc7-41b6-81d9-cfb0d9ca13b3

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/fba8b29c-acc7-41b6-81d9-cfb0d9ca13b3) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/fba8b29c-acc7-41b6-81d9-cfb0d9ca13b3) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

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
