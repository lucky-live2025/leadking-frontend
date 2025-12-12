#!/bin/bash
# LeadKing Frontend - Vercel Deployment Script

set -e

echo "🚀 Deploying LeadKing Frontend to Vercel..."

cd "$(dirname "$0")/.."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
  echo "📦 Installing Vercel CLI..."
  npm install -g vercel
fi

# Login check
if ! vercel whoami &> /dev/null; then
  echo "🔐 Please login to Vercel..."
  vercel login
fi

# Link project (if not already linked)
if [ ! -f ".vercel/project.json" ]; then
  echo "🔗 Linking project to Vercel..."
  vercel link --yes
fi

# Set environment variables
echo "🔧 Setting environment variables..."
vercel env add NEXT_PUBLIC_API_URL production <<< "https://api.leadkingapp.com" 2>/dev/null || vercel env rm NEXT_PUBLIC_API_URL production --yes 2>/dev/null && vercel env add NEXT_PUBLIC_API_URL production <<< "https://api.leadkingapp.com"
vercel env add NEXT_PUBLIC_CONTRACT_ADDRESS production <<< "0x7aa81674cd1aa55af30bb4a7f42aa1217baaaa1b" 2>/dev/null || vercel env rm NEXT_PUBLIC_CONTRACT_ADDRESS production --yes 2>/dev/null && vercel env add NEXT_PUBLIC_CONTRACT_ADDRESS production <<< "0x7aa81674cd1aa55af30bb4a7f42aa1217baaaa1b"
vercel env add NEXT_PUBLIC_FRONTEND_URL production <<< "https://leadkingapp.com" 2>/dev/null || vercel env rm NEXT_PUBLIC_FRONTEND_URL production --yes 2>/dev/null && vercel env add NEXT_PUBLIC_FRONTEND_URL production <<< "https://leadkingapp.com"

# Deploy to production
echo "🌐 Deploying to production..."
vercel --prod --yes --force

echo "✅ Frontend deployed successfully!"
echo "🔗 Check deployment at: https://leadkingapp.com"

