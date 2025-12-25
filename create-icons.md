# Creating App Icons

You need to create two icon files for the PWA:

1. `icons/icon-192.png` (192x192 pixels)
2. `icons/icon-512.png` (512x512 pixels)

## Quick Method: Using Online Tools

1. Visit https://realfavicongenerator.net/
2. Upload `AppLogo.png` from the parent directory
3. Generate favicons and app icons
4. Download the 192x192 and 512x512 icons
5. Save them as `icons/icon-192.png` and `icons/icon-512.png`

## Alternative: Using ImageMagick (if installed)

```bash
cd icons
convert ../AppLogo.png -resize 192x192 icon-192.png
convert ../AppLogo.png -resize 512x512 icon-512.png
```

## Manual Method

1. Open `AppLogo.png` in an image editor (Photoshop, GIMP, Preview, etc.)
2. Resize to 192x192 pixels, save as `icons/icon-192.png`
3. Resize to 512x512 pixels, save as `icons/icon-512.png`
4. Ensure both are PNG format

The icons should be square and will be automatically masked by the browser.

