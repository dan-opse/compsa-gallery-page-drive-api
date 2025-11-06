# How to Add Images to the Gallery

## 📁 Folder Structure

All event images are stored in the `public/events/` folder. Each event has its own subfolder:

```
public/
└── events/
    ├── cruise/
    ├── qwic-welcome/
    ├── ai-collective/
    ├── orientation-2025/
    ├── resume-roast/
    ├── group-shots/
    ├── formal-2025/
    ├── merch-shoot/
    ├── basketball/
    ├── fall-night/
    └── soccer-2024/
```

## 📸 Adding Images (3 Steps)

### Step 1: Add image files to the correct folder

Copy your images into the appropriate event folder in `public/events/`.

For example, for the Cruise event:
```bash
public/events/cruise/
├── photo1.jpg
├── photo2.jpg
└── photo3.jpg
```

**Supported formats:** `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

### Step 2: Update Gallery.js

Open `src/components/Gallery.js` and find the event you want to update. Add the filenames to the `images` array:

**Before:**
```javascript
{
  id: 1,
  title: "Cruise",
  description: "COMPSA annual cruise event",
  folder: "cruise",
  images: [
    // Add image filenames here
  ],
  date: "November 2025"
}
```

**After:**
```javascript
{
  id: 1,
  title: "Cruise",
  description: "COMPSA annual cruise event",
  folder: "cruise",
  images: [
    "photo1.jpg",
    "photo2.jpg",
    "photo3.jpg"
  ],
  date: "November 2025"
}
```

### Step 3: Refresh the browser

Save the file and refresh your browser. The images should appear!

## 💡 Tips

- **Image naming:** Use simple names without spaces (use dashes or underscores instead)
  - ✅ Good: `cruise-photo-1.jpg`, `group_shot.jpg`
  - ❌ Bad: `cruise photo 1.jpg`, `my image.jpg`

- **Image size:** Optimize images before uploading (recommended max: 2MB per image)
  - Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)

- **Order matters:** Images will appear in the gallery in the order you list them

## 🔧 Example: Full Event Setup

1. Copy images to folder:
```bash
public/events/formal-2025/
├── entrance-1.jpg
├── entrance-2.jpg
├── dance-floor-1.jpg
└── group-photo.jpg
```

2. Update Gallery.js:
```javascript
{
  id: 7,
  title: "2025 Formal",
  description: "Annual COMPSA formal dinner and dance",
  folder: "formal-2025",
  images: [
    "entrance-1.jpg",
    "entrance-2.jpg",
    "dance-floor-1.jpg",
    "group-photo.jpg"
  ],
  date: "May 2025"
}
```

3. Refresh browser - Done! 🎉

## ❓ Troubleshooting

**Images not showing?**
- Check that filenames in Gallery.js **exactly** match the actual filenames (including capitalization)
- Verify images are in the correct folder under `public/events/`
- Hard refresh the browser: `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows)
- Check browser console for errors (F12 → Console tab)

**Need to add a new event?**
1. Create a new folder in `public/events/` (use lowercase with dashes)
2. Add a new event object to the `events` array in Gallery.js
3. Follow the same pattern as existing events
