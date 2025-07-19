#!/bin/bash

echo "🚀 Production Deployment Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo -e "${RED}❌ .env.local file not found!${NC}"
    echo "Please create a .env.local file with your production credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key"
    echo ""
    exit 1
fi

# Load environment variables
source .env.local

echo -e "${BLUE}📋 Deployment Steps:${NC}"
echo "1. ✅ Environment variables loaded"
echo "2. 🔄 Update database seeding script"
echo "3. 🌱 Seed production database"
echo "4. 📦 Build production application"
echo "5. 🚀 Deploy to Vercel"
echo "6. 🌐 Configure custom domain"
echo ""

# Step 2: Update seeding script with production credentials
echo -e "${YELLOW}🔄 Updating database seeding script...${NC}"
sed -i '' "s/YOUR_SUPABASE_URL/$NEXT_PUBLIC_SUPABASE_URL/g" seed-database.js
sed -i '' "s/YOUR_SUPABASE_ANON_KEY/$NEXT_PUBLIC_SUPABASE_ANON_KEY/g" seed-database.js
echo -e "${GREEN}✅ Updated seed script with production credentials${NC}"

# Step 3: Seed production database
echo -e "${YELLOW}🌱 Seeding production database...${NC}"
node seed-database.js
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database seeded successfully${NC}"
else
    echo -e "${RED}❌ Database seeding failed${NC}"
    exit 1
fi

# Step 4: Build production application
echo -e "${YELLOW}📦 Building production application...${NC}"
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

# Step 5: Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Installing Vercel CLI...${NC}"
    npm install -g vercel
fi

# Step 6: Deploy to Vercel
echo -e "${YELLOW}🚀 Deploying to Vercel...${NC}"
echo "This will open Vercel in your browser for configuration."
echo "Please follow the prompts to:"
echo "  - Link to your GitHub repository"
echo "  - Configure your custom domain"
echo "  - Set up environment variables"
echo ""
read -p "Press Enter to continue with Vercel deployment..."

vercel --prod

echo ""
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. 🌐 Configure your custom domain in Vercel dashboard"
echo "2. 🔗 Set up DNS records for your domain"
echo "3. 🔒 Ensure SSL certificate is active"
echo "4. 📊 Monitor your application performance"
echo ""
echo -e "${BLUE}🔗 Useful Links:${NC}"
echo "• Vercel Dashboard: https://vercel.com/dashboard"
echo "• Supabase Dashboard: https://supabase.com/dashboard"
echo "• GitHub Repository: Check your connected repo"
echo ""
echo -e "${GREEN}✅ Your voter database application is now live!${NC}" 