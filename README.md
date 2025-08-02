
# 📖 Khrafet Tales – AI-Powered Interactive Story Generator

**Khrafet Tales** is a web-based, AI-powered interactive storytelling platform where each story is generated on-the-fly based on your choices, genre, and tone. Powered by OpenRouter, it offers a new adventure every time you play.

> ✨ *Choose your path. Shape your tale. Let AI bring your imagination to life.*

---

## 🚀 Features

- 🧠 **AI-Generated Stories** — Every plot twist and decision is crafted in real-time using LLMs.
- 🧭 **Branching Narratives** — Your choices guide the story’s direction, ensuring each playthrough is unique.
- 🎭 **Customizable Experiences** — Pick your genre (Fantasy, Sci-Fi, Mystery, etc.) and tone (Light, Dark, Humorous, etc.)
- 📱 **Responsive Design** — Optimized UI for desktops, tablets, and mobile.
- ⚡ **Real-Time Generation** — Minimal latency, dynamic rendering as you explore.
- 💡 **Beautiful UI** — Clean and accessible components built with `shadcn/ui` and Tailwind CSS.

---

## 🧰 Tech Stack

| Category         | Technologies Used                                         |
|------------------|-----------------------------------------------------------|
| Frontend         | [React 18](https://reactjs.org), [TypeScript](https://www.typescriptlang.org), [Vite](https://vitejs.dev) |
| Styling          | [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com) |
| State & Data     | [React Router](https://reactrouter.com), [React Query](https://tanstack.com/query/latest) |
| AI Integration   | [OpenRouter API](https://openrouter.ai) |
| Deployment       | [Vercel](https://vercel.com), supports Netlify/GitHub Pages/Cloudflare |

---

## 🧑‍💻 Getting Started

### ✅ Prerequisites

- Node.js 18+ and `npm` or `bun`
- An [OpenRouter API Key](https://openrouter.ai)

---

### 🔧 Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd khrafet-tales

# 2. Install dependencies
npm install  # or bun install

# 3. Set up environment variables
echo "VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here" > .env

# 4. Start the dev server
npm run dev   # or bun dev
````

Now open your browser and navigate to [http://localhost:5173](http://localhost:5173).

---

## 🚀 Deployment

### ▶ Recommended: Vercel

```bash
npm i -g vercel
vercel
```

Then:

1. Add your `VITE_OPENROUTER_API_KEY` to Vercel’s environment settings.
2. Redeploy with:

```bash
vercel --prod
```
Just ensure your environment variables are set up appropriately.

---

## 🤖 AI-Powered Story Engine

Khrafet Tales uses [OpenRouter](https://openrouter.ai) to generate stories dynamically.

### 🧬 How it Works

1. You select the story genre and tone.
2. The app sends a prompt to OpenRouter using the `deepseek/deepseek-r1-0528:free` model.
3. The AI responds with the next part of the story + user choices.
4. The cycle repeats — your path is built in real-time.

> ⚠ Requires a valid API key. 

---

## 🛠️ Development Notes

* ✨ OpenRouter for better generation control
* ✅ Robust error handling for API failures and invalid responses
* 📦 Modular and scalable codebase
* 🔒 API key is required and securely handled via environment variables

---

## 🧭 Roadmap *(Ideas / Planned Features)*

* [ ] Save & resume story sessions
* [ ] Model switching via dropdown (GPT-4, Claude, etc.)
* [ ] Shareable story links
* [ ] Export to PDF/eBook
* [ ] User accounts (optional)

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


> Built with love, AI, and too much coffee ☕


