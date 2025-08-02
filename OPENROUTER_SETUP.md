# OpenRouter API Setup Guide

This project has been updated to use OpenRouter API instead of Puter.js for AI story generation.

## Setup Instructions

### 1. Get an OpenRouter API Key

1. Visit [OpenRouter](https://openrouter.ai/)
2. Sign up for an account
3. Navigate to your API keys section
4. Create a new API key
5. Copy the API key

### 2. Configure Environment Variables

Create a `.env` file in the root directory of the project with the following variables:

```env
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

**Optional variables (for OpenRouter rankings):**
```env
VITE_SITE_URL=https://your-site-url.com
VITE_SITE_NAME=Khrafet Tales
```

**Important Notes:**
- Replace `your_openrouter_api_key_here` with your actual OpenRouter API key
- `VITE_SITE_URL` and `VITE_SITE_NAME` are completely optional and only used for OpenRouter rankings
- If not provided, the app will work without these optional headers

### 3. Install Dependencies

Make sure all dependencies are installed:

```bash
npm install
# or
bun install
```

### 4. Start the Development Server

```bash
npm run dev
# or
bun dev
```

## API Configuration

The project uses the following OpenRouter model by default:
- **Model**: `deepseek/deepseek-r1-0528:free`
- **Temperature**: 0.8
- **Max Tokens**: 1000

You can modify these settings in `src/lib/openrouter.ts` if needed.

## Error Handling

The application includes comprehensive error handling for:
- Missing API key
- Network errors
- Invalid API responses
- JSON parsing errors

If you encounter issues, check the browser console for detailed error messages.

## Security Notes

- Never commit your `.env` file to version control
- The API key is only used on the client side for this application
- Consider implementing a backend proxy for production use if you need additional security

## Troubleshooting

### Common Issues:

1. **"OpenRouter API key not configured"**
   - Make sure you've created a `.env` file with `VITE_OPENROUTER_API_KEY`
   - Restart your development server after adding the environment variable

2. **"OpenRouter API error: 401"**
   - Check that your API key is correct
   - Ensure your OpenRouter account has sufficient credits

3. **"Failed to parse AI response"**
   - This usually means the AI didn't return valid JSON
   - The application will retry automatically
   - Check the console for the raw response if issues persist

### Getting Help

If you continue to have issues:
1. Check the browser console for error messages
2. Verify your OpenRouter API key is valid
3. Ensure your OpenRouter account has sufficient credits
4. Check that the environment variables are properly set 