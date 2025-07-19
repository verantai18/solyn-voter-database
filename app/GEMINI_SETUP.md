# Google Gemini API Setup for Debugging

## 🔑 Getting Your API Key

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API key" in the top right
4. Create a new API key or use an existing one
5. Copy the API key

## 🌍 Environment Variables

### For Local Development:
Create a `.env.local` file in your project root:
```
GOOGLE_AI_API_KEY=your_api_key_here
```

### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Add:
   - **Name**: `GOOGLE_AI_API_KEY`
   - **Value**: Your API key from Google AI Studio
5. Click "Save"

## 🚀 Using the Debug Tool

1. **Deploy to Vercel** (should work now with relative paths)
2. **Visit**: `yourdomain.com/debug`
3. **Test Connection**: Click "Test Gemini Connection"
4. **Analyze Issues**: Paste Vercel error logs and click "Analyze Deployment Issue"

## 🔧 What Gemini Can Help With

- **Module Resolution Issues**: Analyzing import/export problems
- **Path Mapping Conflicts**: Identifying TypeScript path issues
- **Build Configuration**: Suggesting Next.js config fixes
- **Code Structure Analysis**: Finding architectural problems
- **Deployment Strategies**: Providing alternative approaches

## 📝 Example Usage

1. Copy error logs from Vercel dashboard
2. Paste into the text area on `/debug`
3. Click "Analyze Deployment Issue"
4. Follow Gemini's specific recommendations

## 🛠️ Troubleshooting

If Gemini isn't working:
1. Check your API key is correct
2. Ensure environment variable is set in Vercel
3. Check the API response in browser dev tools
4. Try the "Test Gemini Connection" button first 