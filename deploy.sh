#!/bin/bash

echo "🚀 Solyn App Deployment Script"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Build the project
echo "📦 Building the project..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Check if environment variables are set
echo "🔧 Checking environment variables..."
if [ -z "$NEXT_PUBLIC_SUPABASE_URL" ] && [ -z "$GOOGLE_AI_API_KEY" ]; then
    echo "⚠️  Warning: Environment variables not set. Make sure to set them in your deployment platform."
    echo "   Required variables:"
    echo "   - NEXT_PUBLIC_SUPABASE_URL"
    echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "   - GOOGLE_AI_API_KEY"
fi

echo ""
echo "🎉 Your app is ready for deployment!"
echo ""
echo "Next steps:"
echo "1. Go to https://vercel.com (recommended for Next.js)"
echo "2. Import your GitHub repository: https://github.com/verantai18/Solyn-app.git"
echo "3. Add your environment variables"
echo "4. Deploy!"
echo ""
echo "📖 See DEPLOYMENT.md for detailed instructions." 