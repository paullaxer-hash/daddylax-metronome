# Setup Instructions for daddylax-metronome

## ✅ Already Completed
- ✅ Icons created (192x192 and 512x512)
- ✅ Git repository initialized
- ✅ All files committed

## 🚀 Complete Setup (3 Steps)

### Step 1: Create GitHub Repository

1. Go to: **https://github.com/new**
2. Repository name: **`daddylax-metronome`**
3. Make it **PUBLIC** (required for free GitHub Pages)
4. **DO NOT** check "Add a README file"
5. **DO NOT** add .gitignore or license
6. Click **"Create repository"**

### Step 2: Push to GitHub

**Option A: Run the setup script (easiest)**
```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"
./setup-github.sh
```

The script will:
- Ask for your GitHub username
- Add the remote repository
- Push all files to GitHub

**Option B: Manual commands**
```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/daddylax-metronome.git
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to: **https://github.com/YOUR_USERNAME/daddylax-metronome/settings/pages**
2. Under **"Source"**:
   - Select **"Deploy from a branch"**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
3. Click **"Save"**

### Step 4: Wait & Install

1. Click the **Actions** tab in your repository
2. Wait 1-2 minutes for deployment to complete
3. Your app will be live at:
   **`https://YOUR_USERNAME.github.io/daddylax-metronome/`**

4. **Install on iPhone:**
   - Open Safari
   - Go to the URL above
   - Tap Share button (square with arrow)
   - Tap "Add to Home Screen"
   - Tap "Add"

5. **Install on Android:**
   - Open Chrome
   - Go to the URL above
   - Tap Menu (three dots)
   - Tap "Install app" or "Add to Home screen"

## 🎉 Done!

Your metronome is now installed on your phone and works offline!

