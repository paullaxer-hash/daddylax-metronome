#!/bin/bash
# Deployment script for Metronome Web App

echo "🚀 Metronome Web App Deployment"
echo "================================"
echo ""

# Check if git remote is already set
if git remote -v | grep -q "origin"; then
    echo "⚠️  Git remote 'origin' already exists."
    echo "Current remotes:"
    git remote -v
    echo ""
    read -p "Do you want to update it? (y/n) " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        read -p "Enter your GitHub username: " GITHUB_USERNAME
        read -p "Enter your repository name: " REPO_NAME
        git remote set-url origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
    else
        echo "Using existing remote."
    fi
else
    echo "📝 Setting up GitHub remote..."
    read -p "Enter your GitHub username: " GITHUB_USERNAME
    read -p "Enter your repository name (e.g., metronome-web): " REPO_NAME
    git remote add origin "https://github.com/$GITHUB_USERNAME/$REPO_NAME.git"
fi

echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. Go to https://github.com/$GITHUB_USERNAME/$REPO_NAME"
    echo "2. Click Settings → Pages"
    echo "3. Select 'Deploy from a branch'"
    echo "4. Branch: main, Folder: / (root)"
    echo "5. Click Save"
    echo ""
    echo "⏳ Wait 1-2 minutes for deployment, then visit:"
    echo "   https://$GITHUB_USERNAME.github.io/$REPO_NAME/"
else
    echo ""
    echo "❌ Push failed. Please check:"
    echo "   - Repository exists on GitHub"
    echo "   - You have push permissions"
    echo "   - Internet connection is working"
fi

