# 🔗 Google Drive Integration Setup

## 📋 What You Need To Do

### 1. Add Your API Key
In your `.env` file, replace `your_api_key_here` with your actual Google Drive API key:
```
REACT_APP_GOOGLE_DRIVE_API_KEY=your_actual_api_key_here
```

### 2. Add Your Folder IDs
In `src/components/Gallery.js`, find each event and replace the placeholder folder IDs:

**Find lines like this:**
```javascript
folderId: "your_cruise_folder_id_here", // Replace with actual folder ID
```

**Replace with your actual folder IDs from Google Drive URLs:**
```javascript
folderId: "1ABC123XYZ_your_actual_folder_id", // Your real folder ID
```

### 3. How to Get Folder IDs
1. Go to your Google Drive folder
2. Copy the folder ID from the URL:
   `https://drive.google.com/drive/folders/1ABC123XYZ_FOLDER_ID_HERE`
3. The part after `/folders/` is your folder ID

### 4. Events That Need Folder IDs
- Cruise
- QWIC Welcome Home Night  
- AI Collective
- Orientation 2025
- Resume Roast
- COMPSA Group Shots
- 2025 Formal
- 2025 Merch Shoot
- COMPSA Basketball Tournament
- 2025 Fall Night Out
- 2024 Soccer Tournament

### 5. Make Sure Your Folders Are Public
Each Google Drive folder needs to be set to "Anyone with the link can view" for the API to access them.

## 🚀 Features Ready
- ✅ Loading states while fetching images
- ✅ Error handling with fallback to Obama images
- ✅ Dynamic image loading from Google Drive
- ✅ All your existing animations and effects preserved
- ✅ Modal displays real Google Drive images

## 🐛 If Something Goes Wrong
- Check browser console for API errors
- Verify your API key is correct
- Make sure folders are public
- Check that folder IDs are correct

Once you add your real folder IDs, the gallery will automatically load your Google Drive images! 🎉