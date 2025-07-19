# Solyn Voter Database

A comprehensive voter database application built with Next.js, TypeScript, and Supabase. Features include voter management, demographic analysis, and campaign tools.

## 🚀 Features

- **Voter Database**: Complete voter information management
- **Category Analysis**: Automatic categorization by demographics, geography, and voting patterns
- **Search & Filter**: Advanced search capabilities across all voter data
- **Responsive Design**: Mobile-friendly interface
- **Real-time Data**: Live Supabase integration
- **Production Ready**: Optimized for deployment

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Styling**: Tailwind CSS with custom components

## 📊 Data Structure

The application includes 50 realistic voter records with:
- Demographic information (age, gender)
- Geographic data (wards, precincts)
- Voting history and patterns
- Registration details
- Activity status

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd solyn-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Seed the database**
   ```bash
   ./seed-database.sh
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 🚀 Production Deployment

### 1. GitHub Setup
```bash
./setup-github.sh
```

### 2. Production Deployment
```bash
./deploy-production.sh
```

### 3. Custom Domain Setup

1. **Vercel Dashboard**: Add your custom domain
2. **DNS Configuration**: Update your domain's DNS records
3. **SSL Certificate**: Vercel automatically provides SSL

## 📁 Project Structure

```
solyn-app/
├── app/                    # Next.js app directory
│   ├── the-van/           # Main voter database page
│   ├── minivan/           # Campaign management tools
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── main-nav.tsx      # Navigation component
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── scripts/              # Deployment and setup scripts
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |

### Database Schema

The application uses a `voters` table with the following structure:

```sql
CREATE TABLE voters (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  birth_year INTEGER,
  gender TEXT,
  voter_precinct TEXT,
  ward TEXT,
  congressional_district TEXT,
  legislative_district TEXT,
  senate_district TEXT,
  registration_date DATE,
  township TEXT,
  assigned_highschool TEXT,
  assigned_middleschool TEXT,
  assigned_elementaryschool TEXT,
  neighborhood TEXT,
  is_active BOOLEAN DEFAULT true,
  vote_history_1 BOOLEAN DEFAULT false,
  vote_history_2 BOOLEAN DEFAULT false,
  vote_history_3 BOOLEAN DEFAULT false,
  vote_history_4 BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🎯 Features in Detail

### Voter Database
- Complete voter information display
- Search and filtering capabilities
- Real-time data updates
- Responsive table design

### Category Analysis
- **Demographics**: Age groups, gender distribution
- **Geographic**: Ward and precinct analysis
- **Voting Patterns**: Active/inactive voters, voting frequency
- **Priority Levels**: High, medium, low priority classifications

### Campaign Tools
- Voter outreach planning
- Resource allocation
- Event management
- Analytics dashboard

## 🔒 Security

- Environment variables for sensitive data
- Supabase Row Level Security (RLS)
- HTTPS enforcement in production
- Input validation and sanitization

## 📈 Performance

- Next.js 15 with App Router
- Optimized database queries
- Lazy loading for components
- CDN delivery via Vercel

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the deployment logs

## 🔄 Updates

To update the application:

1. Pull the latest changes
2. Update dependencies: `npm update`
3. Test locally: `npm run dev`
4. Deploy: `./deploy-production.sh`

---

**Built with ❤️ for efficient voter management and campaign operations.**
