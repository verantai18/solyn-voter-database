# Solyn App - Production Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `GOOGLE_AI_API_KEY`: Your Google AI API key
5. Deploy!

### Option 2: Netlify
1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up/login
3. Click "New site from Git" and connect your repository
4. Build command: `npm run build`
5. Publish directory: `.next`
6. Add environment variables in Site settings

### Option 3: Railway
1. Push your code to GitHub
2. Go to [railway.app](https://railway.app) and sign up/login
3. Create new project from GitHub repo
4. Add environment variables in the Variables tab

## 🔧 Environment Variables Required

Create a `.env.local` file in your project root with:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xximnqpzbiicytrmkfqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4aW1ucXB6YmlpY3l0cm1rZnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MzkxNDMsImV4cCI6MjA2ODUxNTE0M30.So0RuqFBBkUh1FuYyzcQX3HqmMtOWNIxwklCSnEra34

# Google AI (Gemini) Configuration
GOOGLE_AI_API_KEY=your_google_ai_api_key_here
```

## 📋 Pre-Deployment Checklist

- [ ] Code builds successfully (`npm run build`)
- [ ] All environment variables are set
- [ ] Supabase database is configured
- [ ] Google AI API key is valid
- [ ] Domain is configured (if using custom domain)

## 🛠️ Local Testing

Test your production build locally:

```bash
npm run build
npm start
```

## 🔍 Troubleshooting

### Build Errors
- Check that all dependencies are installed: `npm install`
- Verify TypeScript compilation: `npm run build`
- Check for missing environment variables

### Runtime Errors
- Verify Supabase connection
- Check Google AI API key validity
- Review browser console for client-side errors

### Performance Issues
- Enable Next.js image optimization
- Consider using CDN for static assets
- Monitor bundle size with `npm run build`

## 📞 Support

If you encounter issues:
1. Check the deployment platform's logs
2. Verify all environment variables are set correctly
3. Test locally with production build
4. Check Supabase dashboard for database issues 