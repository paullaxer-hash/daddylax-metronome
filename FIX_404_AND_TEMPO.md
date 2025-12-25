# Fix 404 Error and Tempo Issues

## Problem 1: 404 Error (GitHub Pages Not Enabled)

**The 404 error means GitHub Pages isn't enabled yet.**

### Solution:

1. **Go to GitHub repository settings:**
   - Open: **https://github.com/paullaxer-hash/daddylax-metronome/settings/pages**

2. **Enable GitHub Pages:**
   - Under "Source", select: **"Deploy from a branch"**
   - Branch: **`main`**
   - Folder: **`/ (root)`**
   - Click **"Save"**

3. **Wait 1-2 minutes** for GitHub to build your site

4. **Your app will be live at:**
   - **https://paullaxer-hash.github.io/daddylax-metronome/**

5. **Verify it's working:**
   - You should see a green checkmark in the settings page
   - The URL will be displayed

---

## Problem 2: Tempo Still Playing Double-Time

**If the tempo is still wrong after enabling GitHub Pages:**

1. **Clear your browser cache:**
   - **Safari (iPhone):** Settings → Safari → Clear History and Website Data
   - **Chrome:** Settings → Privacy → Clear browsing data → Cached images and files

2. **Hard refresh the page:**
   - **Safari (Mac):** Cmd + Shift + R
   - **Chrome (Mac):** Cmd + Shift + R
   - **Safari (iPhone):** Close and reopen Safari, then reload the page

3. **Check the browser console:**
   - Open Developer Tools (F12 or Cmd+Option+I)
   - Look for the debug message: `🎵 Starting metronome: BPM=120, subdivision=1.0, beatsPerSecond=2.00, interval=0.500s`
   - This confirms the calculation is correct

4. **Test with a known tempo:**
   - Set to 60 BPM (should be 1 beat per second)
   - Set to 120 BPM (should be 2 beats per second)

---

## If Issues Persist

**Check these things:**

1. **Is GitHub Pages enabled?** (See Problem 1 above)
2. **Did you wait 2-3 minutes after enabling?** (GitHub needs time to build)
3. **Are you using the correct URL?** 
   - ✅ Correct: `https://paullaxer-hash.github.io/daddylax-metronome/`
   - ❌ Wrong: `https://github.com/paullaxer-hash/daddylax-metronome` (this is the repo, not the site)
4. **Is your browser cache cleared?** (Old JavaScript might be cached)
5. **Try a different browser** to rule out browser-specific issues

---

## Install on Home Screen (After GitHub Pages is Enabled)

**iPhone:**
1. Open Safari
2. Go to: `https://paullaxer-hash.github.io/daddylax-metronome/`
3. Tap Share button (square with arrow)
4. Tap "Add to Home Screen"
5. Tap "Add"

**Android:**
1. Open Chrome
2. Go to: `https://paullaxer-hash.github.io/daddylax-metronome/`
3. Tap Menu (three dots)
4. Tap "Install app" or "Add to Home screen"

