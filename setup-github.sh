#!/bin/bash

echo "🐙 GitHub Repository Setup"
echo "=========================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📦 Initializing Git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
else
    echo -e "${GREEN}✅ Git repository already exists${NC}"
fi

# Create .gitignore if it doesn't exist
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}📝 Creating .gitignore file...${NC}"
    cat > .gitignore << EOF
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Next.js
.next/
out/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Vercel
.vercel

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db

# Logs
*.log

# Runtime data
pids
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/

# nyc test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port
EOF
    echo -e "${GREEN}✅ .gitignore file created${NC}"
fi

# Add all files to git
echo -e "${YELLOW}📁 Adding files to Git...${NC}"
git add .
echo -e "${GREEN}✅ Files added to staging${NC}"

# Create initial commit
echo -e "${YELLOW}💾 Creating initial commit...${NC}"
git commit -m "Initial commit: Voter Database Application

- Next.js application with TypeScript
- Supabase integration for voter data
- Category system for voter analysis
- Responsive UI with shadcn/ui components
- Production-ready deployment setup"
echo -e "${GREEN}✅ Initial commit created${NC}"

echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. 🐙 Create a new repository on GitHub:"
echo "   - Go to https://github.com/new"
echo "   - Name: solyn-voter-database (or your preferred name)"
echo "   - Make it public or private"
echo "   - Don't initialize with README (we already have one)"
echo ""
echo "2. 🔗 Connect your local repository:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. 🚀 Deploy to production:"
echo "   ./deploy-production.sh"
echo ""
echo -e "${GREEN}✅ GitHub setup instructions complete!${NC}" 