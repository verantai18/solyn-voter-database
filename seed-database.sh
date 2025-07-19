#!/bin/bash

echo "🌱 Seeding Supabase Database with Dummy Voter Data..."
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "Please create a .env.local file with your Supabase credentials:"
    echo ""
    echo "NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key"
    echo ""
    exit 1
fi

# Load environment variables
source .env.local

# Update the seed script with actual credentials
sed -i '' "s/YOUR_SUPABASE_URL/$NEXT_PUBLIC_SUPABASE_URL/g" seed-database.js
sed -i '' "s/YOUR_SUPABASE_ANON_KEY/$NEXT_PUBLIC_SUPABASE_ANON_KEY/g" seed-database.js

echo "📝 Updated seed script with your Supabase credentials"
echo "🚀 Running database seeding..."

# Run the seed script
node seed-database.js

echo ""
echo "✅ Database seeding complete!"
echo "🌐 Visit http://localhost:3000/the-van to see your data"
echo ""
echo "💡 The main page now includes:"
echo "   - Voter Database tab (with real Supabase data)"
echo "   - Categories tab (automatically calculated from voter data)" 