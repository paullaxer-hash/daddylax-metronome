# Quick Deploy Instructions

## ✅ Step 1: Icons Created
The app icons have been created:
- `icons/icon-192.png` ✓
- `icons/icon-512.png` ✓

## ✅ Step 2: Git Repository Initialized
The git repository has been initialized and files are committed.

## Next: Push to GitHub

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `metronome-web` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

### 2. Push to GitHub

Run these commands in your terminal:

```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"

# Add your GitHub repository (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub.com
2. Click **Settings** → **Pages**
3. Under **Source**:
   - Select **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

### 4. Wait for Deployment

1. Click the **Actions** tab
2. Wait 1-2 minutes for deployment to complete
3. Your app will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### 5. Install on Your Phone

**iPhone:**
1. Open Safari
2. Go to your GitHub Pages URL
3. Tap Share → Add to Home Screen

**Android:**
1. Open Chrome
2. Go to your GitHub Pages URL
3. Tap Menu → Install app

## All Done!

Your metronome web app is now deployed and installable on your phone!

