# Metronome Web App

A professional metronome web application with PWA support, installable on mobile devices.

## Features

- **Tempo Control**: Adjustable BPM from 30-300 with slider and +/- buttons
- **Time Signatures**: 1/4 through 12/4
- **Subdivisions**: Quarter, Eighth, Triplet, Sixteenth notes
- **Click Sounds**: Classic, Rim Shot, Woodblock, Stick, Electronic, Bell
- **Frequency Control**: Adjustable accent and beat frequencies (400-2000 Hz)
- **Visual Pulse**: Animated circle indicator
- **Haptic Feedback**: Vibration support on mobile devices
- **PWA Support**: Installable on home screen, works offline

## Deploy + Install on Phone

### Step 1: Push to GitHub

1. Create a new repository on GitHub (e.g., `metronome-web`)

2. In your terminal, navigate to the web-version directory:
   ```bash
   cd "/Users/paullaxer/Desktop/2026 DEV/Metronome App/web-version"
   ```

3. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Metronome web app"
   ```

4. Add your GitHub repository as remote and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository on GitHub.com
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**
5. Wait a few minutes for GitHub Actions to deploy (check the **Actions** tab)

Your app will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Step 3: Create App Icons

Before deploying, you need to create icon files. You can:

**Option A: Use the existing logo**
1. Copy `AppLogo.png` from the parent directory
2. Resize it to 192x192 and 512x512 pixels
3. Save as `icons/icon-192.png` and `icons/icon-512.png`

**Option B: Use an online tool**
1. Visit https://realfavicongenerator.net/ or similar
2. Upload your logo
3. Generate and download the icons
4. Place them in the `icons/` folder

**Option C: Quick placeholder icons**
Run this in the web-version directory:
```bash
# Create simple colored icons (requires ImageMagick or similar)
# Or manually create 192x192 and 512x512 PNG files with your logo
```

### Step 4: Install on iPhone

1. Open Safari on your iPhone
2. Navigate to your GitHub Pages URL: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
3. Tap the **Share** button (square with arrow)
4. Scroll down and tap **Add to Home Screen**
5. Customize the name if desired (default: "Metronome")
6. Tap **Add**
7. The app icon will appear on your home screen

### Step 5: Install on Android

1. Open Chrome on your Android device
2. Navigate to your GitHub Pages URL
3. Tap the **Menu** (three dots) → **Add to Home screen** or **Install app**
4. Tap **Install** or **Add**
5. The app will be installed and appear in your app drawer

## Local Development

To test locally:

1. Serve the files using a local server (required for service worker):
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server -p 8000
   ```

2. Open `http://localhost:8000` in your browser

3. For PWA testing, use HTTPS or localhost (service workers require secure context)

## File Structure

```
web-version/
├── index.html          # Main HTML file
├── styles.css          # All styles
├── app.js              # Main app controller
├── metronome-engine.js # Audio engine using Web Audio API
├── manifest.json       # PWA manifest
├── service-worker.js    # Service worker for offline support
├── icons/              # App icons (192x192 and 512x512)
│   ├── icon-192.png
│   └── icon-512.png
└── .github/
    └── workflows/
        └── deploy.yml  # GitHub Actions deployment
```

## Browser Support

- **Chrome/Edge**: Full support
- **Safari (iOS)**: Full support (iOS 11.3+)
- **Firefox**: Full support
- **Safari (macOS)**: Full support

## Notes

- The app requires HTTPS (or localhost) for service worker to work
- GitHub Pages provides HTTPS automatically
- Audio may require user interaction on some browsers (tap to start)
- Haptic feedback only works on devices that support vibration API

## Troubleshooting

**Service Worker not registering:**
- Ensure you're using HTTPS or localhost
- Check browser console for errors
- Clear browser cache and reload

**Icons not showing:**
- Verify icon files exist in `icons/` folder
- Check that paths in `manifest.json` are correct
- Ensure icons are PNG format

**App not installable:**
- Verify manifest.json is valid JSON
- Check that all required manifest fields are present
- Ensure you're accessing via HTTPS

