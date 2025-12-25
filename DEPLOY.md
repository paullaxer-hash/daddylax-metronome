# Deployment Guide - Metronome Web App

## Quick Start: Deploy to GitHub Pages

### Prerequisites
- GitHub account
- Git installed on your computer

### Step-by-Step Instructions

#### 1. Create Icons (Required Before Deployment)

Before deploying, you need to create two icon files:

**Option A: Use Online Tool (Easiest)**
1. Go to https://realfavicongenerator.net/
2. Upload `../AppLogo.png` (from parent directory)
3. Generate icons
4. Download the 192x192 and 512x512 PNG files
5. Save them as:
   - `icons/icon-192.png`
   - `icons/icon-512.png`

**Option B: Manual Resize**
1. Open `AppLogo.png` in any image editor
2. Resize to 192x192, save as `icons/icon-192.png`
3. Resize to 512x512, save as `icons/icon-512.png`

#### 2. Initialize Git Repository

```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"
git init
git add .
git commit -m "Initial commit: Metronome web app"
```

#### 3. Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `metronome-web` (or any name you prefer)
3. Make it **Public** (required for free GitHub Pages)
4. **Don't** initialize with README, .gitignore, or license
5. Click **Create repository**

#### 4. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

#### 5. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll to **Pages** (left sidebar)
4. Under **Source**:
   - Select **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

#### 6. Wait for Deployment

1. Click the **Actions** tab in your repository
2. You should see "Deploy to GitHub Pages" workflow running
3. Wait 1-2 minutes for it to complete
4. Once done, your app will be live at:
   `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Install on iPhone

1. Open **Safari** on your iPhone (Chrome won't work for "Add to Home Screen")
2. Navigate to your GitHub Pages URL
3. Tap the **Share** button (square with up arrow) at the bottom
4. Scroll down and tap **Add to Home Screen**
5. Edit the name if desired (default: "Metronome")
6. Tap **Add** in the top right
7. The app icon will appear on your home screen
8. Tap it to open the app full-screen

## Install on Android

1. Open **Chrome** on your Android device
2. Navigate to your GitHub Pages URL
3. Tap the **Menu** (three dots) in the top right
4. Tap **Add to Home screen** or **Install app**
5. Tap **Install** or **Add**
6. The app will be installed and appear in your app drawer

## Testing Locally

To test the app before deploying:

```bash
cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"

# Using Python 3
python3 -m http.server 8000

# Or using Node.js (if installed)
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

**Note:** Service workers require HTTPS or localhost. GitHub Pages provides HTTPS automatically.

## Troubleshooting

### Icons Not Showing
- Verify `icons/icon-192.png` and `icons/icon-512.png` exist
- Check file paths in `manifest.json` are correct (should be `./icons/...`)
- Clear browser cache

### Service Worker Not Working
- Must use HTTPS (GitHub Pages provides this)
- Or use localhost for testing
- Check browser console for errors

### App Won't Install
- Verify `manifest.json` is valid JSON
- Check all required fields are present
- Ensure you're accessing via HTTPS
- On iOS, must use Safari (not Chrome)

### Deployment Fails
- Check GitHub Actions tab for error messages
- Ensure all files are committed and pushed
- Verify `.github/workflows/deploy.yml` exists

## Updating the App

After making changes:

```bash
git add .
git commit -m "Update: description of changes"
git push
```

GitHub Actions will automatically redeploy. Wait 1-2 minutes for the update to go live.

