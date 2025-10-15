#!/bin/bash

echo "🚀 Building Web Version..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build for web
echo "🔨 Building for web..."
npx expo export --platform web

echo "✅ Build complete! Files are in 'dist' folder"
echo ""
echo "📤 To deploy to GitHub Pages:"
echo "   npm install -g gh-pages"
echo "   gh-pages -d dist"
echo ""
echo "🌐 Or deploy to Vercel:"
echo "   npm install -g vercel"
echo "   vercel --prod"
