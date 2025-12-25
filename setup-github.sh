#!/bin/bash
# Complete setup script for daddylax-metronome

echo "🎵 Setting up daddylax-metronome on GitHub"
echo "=========================================="
echo ""

# Step 1: Create repository on GitHub (manual step)
echo "📝 STEP 1: Create GitHub Repository"
echo "-----------------------------------"
echo "1. Go to: https://github.com/new"
echo "2. Repository name: daddylax-metronome"
echo "3. Make it PUBLIC (required for free GitHub Pages)"
echo "4. DO NOT initialize with README, .gitignore, or license"
echo "5. Click 'Create repository'"
echo ""
read -p "Press Enter after you've created the repository on GitHub..."

# Step 2: Add remote and push
echo ""
echo "📤 STEP 2: Pushing to GitHub..."
echo "--------------------------------"

# Get GitHub username
read -p "Enter your GitHub username: " GITHUB_USERNAME

# Set remote
git remote remove origin 2>/dev/null
git remote add origin "https://github.com/$GITHUB_USERNAME/daddylax-metronome.git"

# Push to GitHub
echo ""
echo "Pushing code to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    
    # Step 3: Enable GitHub Pages
    echo "🌐 STEP 3: Enable GitHub Pages"
    echo "-------------------------------"
    echo ""
    echo "1. Go to: https://github.com/$GITHUB_USERNAME/daddylax-metronome/settings/pages"
    echo "2. Under 'Source':"
    echo "   - Select 'Deploy from a branch'"
    echo "   - Branch: main"
    echo "   - Folder: / (root)"
    echo "3. Click 'Save'"
    echo ""
    echo "⏳ Wait 1-2 minutes for deployment..."
    echo ""
    echo "📱 Your app will be live at:"
    echo "   https://$GITHUB_USERNAME.github.io/daddylax-metronome/"
    echo ""
    echo "🎉 To install on your phone:"
    echo "   iPhone: Open Safari → Go to the URL → Share → Add to Home Screen"
    echo "   Android: Open Chrome → Go to the URL → Menu → Install app"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   - Repository 'daddylax-metronome' exists on GitHub"
    echo "   - You have push permissions"
    echo "   - Internet connection is working"
    echo "   - Your GitHub username is correct"
fi

