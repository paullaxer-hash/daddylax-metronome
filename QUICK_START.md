# Quick Start - Deploy Your Metronome Web App

## ✅ Completed Steps

1. **Icons Created** ✓
   - `icons/icon-192.png` - Created
   - `icons/icon-512.png` - Created

2. **Git Repository Initialized** ✓
   - All files committed
   - Ready to push to GitHub

## 🚀 Deploy Now (3 Simple Steps)

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `metronome-web` (or your choice)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** add README, .gitignore, or license
5. Click **Create repository**

### Step 2: Push to GitHub

**Option A: Use the deployment script (easiest)**
```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"
./deploy.sh
```

**Option B: Manual commands**
```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"

# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/YOUR_REPO_NAME`
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**:
   - Select **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

### Step 4: Wait & Install

1. Click the **Actions** tab - you'll see deployment in progress
2. Wait 1-2 minutes
3. Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
4. Open that URL on your phone
5. **iPhone**: Safari → Share → Add to Home Screen
6. **Android**: Chrome → Menu → Install app

## 🎉 Done!

Your metronome is now installed on your phone and works offline!

