const API_KEY = process.env.REACT_APP_GOOGLE_DRIVE_API_KEY;
const GOOGLE_DRIVE_API_URL = 'https://www.googleapis.com/drive/v3/files';

/**
 * Fetch images from a specific Google Drive folder
 * @param {string} folderId - The Google Drive folder ID
 * @returns {Promise<Array>} Array of image objects with downloadUrl and name
 */
export const fetchFolderImages = async (folderId) => {
  try {
    if (!API_KEY) {
      console.error('Google Drive API key not found in environment variables');
      throw new Error('Google Drive API key not found in environment variables');
    }

    if (!folderId) {
      console.error('Folder ID is required');
      throw new Error('Folder ID is required');
    }

    // Query parameters for Google Drive API
    const queryParams = new URLSearchParams({
      key: API_KEY,
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: 'files(id,name,webContentLink,webViewLink,thumbnailLink,mimeType)',
      orderBy: 'name'
    });

    const apiUrl = `${GOOGLE_DRIVE_API_URL}?${queryParams}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Google Drive API error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`Google Drive API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.files) {
      console.warn(`No 'files' property in response`);
      return [];
    }

    // Transform the response to our expected format
    const images = data.files.map(file => {
      return {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        // Use thumbnail for direct display (works better for web apps)
        downloadUrl: file.thumbnailLink ? file.thumbnailLink.replace('=s220', '=s800') : `https://drive.google.com/uc?export=view&id=${file.id}`,
        directUrl: `https://drive.google.com/file/d/${file.id}/view`,
        thumbnailUrl: file.thumbnailLink,
        webViewLink: file.webViewLink,
        // Alternative URLs for fallback
        alternativeUrl: `https://lh3.googleusercontent.com/d/${file.id}`,
        googleUcUrl: `https://drive.google.com/uc?export=view&id=${file.id}`
      };
    });

    console.log(`✅ Successfully loaded ${images.length} images from folder`);
    
    return images;

  } catch (error) {
    console.error('Error fetching folder images:', error);
    return []; // Return empty array on error to prevent app crashes
  }
};

/**
 * Fetch images for all events
 * @param {Array} eventFolders - Array of event objects with folderId
 * @returns {Promise<Object>} Object mapping event IDs to image arrays
 */
export const fetchAllEventImages = async (eventFolders) => {
  try {
    console.log('🔄 Starting to fetch images for events:', eventFolders.map(e => ({ id: e.id, title: e.title, folderId: e.folderId })));
    
    const imagePromises = eventFolders.map(async (event) => {
      if (!event.folderId) {
        console.warn(`No folder ID provided for event: ${event.title}`);
        return { eventId: event.id, images: [] };
      }

      console.log(`📂 Fetching images for event ${event.id} (${event.title}) from folder ${event.folderId}`);
      const images = await fetchFolderImages(event.folderId);
      console.log(`📊 Event ${event.id} fetched ${images.length} images`);
      return { eventId: event.id, images };
    });

    const results = await Promise.all(imagePromises);
    
    // Convert array to object mapping eventId to images
    const imageMap = {};
    results.forEach(({ eventId, images }) => {
      imageMap[eventId] = images;
      console.log(`🗂️ Mapped event ${eventId} to ${images.length} images`);
    });

    console.log('📋 Final image map:', imageMap);
    return imageMap;

  } catch (error) {
    console.error('Error fetching all event images:', error);
    return {};
  }
};

/**
 * Test function to verify API connection
 * @param {string} folderId - Test folder ID
 * @returns {Promise<boolean>} True if connection successful
 */
export const testGoogleDriveConnection = async (folderId) => {
  try {
    if (!API_KEY) {
      console.error('API Key missing from environment');
      return false;
    }
    
    const images = await fetchFolderImages(folderId);
    
    if (images.length > 0) {
      console.log(`✅ Google Drive API test successful: ${images.length} images found`);
      return true;
    } else {
      console.warn(`⚠️ API connection successful but no images found in folder`);
      return true; // Connection works, just no images
    }
  } catch (error) {
    console.error('Google Drive API test failed:', error);
    return false;
  }
};

/**
 * Debug function to check a specific folder
 */
export const debugFolder = async (folderId) => {
  console.log(`🔍 DEBUG: Checking folder ${folderId}`);
  console.log(`🔑 API Key: ${API_KEY ? 'Present' : 'Missing'}`);
  
  // Test 1: Check if folder exists and is accessible
  const folderCheckUrl = `https://www.googleapis.com/drive/v3/files/${folderId}?key=${API_KEY}&fields=id,name,mimeType,capabilities`;
  console.log(`📁 Checking folder existence...`);
  
  try {
    const folderResponse = await fetch(folderCheckUrl);
    const folderData = await folderResponse.json();
    console.log(`📁 Folder info:`, folderData);
    
    // Test 2: Check ALL files in folder (not just images)
    const allFilesUrl = `https://www.googleapis.com/drive/v3/files?key=${API_KEY}&q='${folderId}' in parents&fields=files(id,name,mimeType,parents)`;
    console.log(`� Checking all files in folder...`);
    
    const allFilesResponse = await fetch(allFilesUrl);
    const allFilesData = await allFilesResponse.json();
    console.log(`📄 All files:`, allFilesData);
    
    // Test 3: Check specifically for images
    const imageFilesUrl = `https://www.googleapis.com/drive/v3/files?key=${API_KEY}&q='${folderId}' in parents and mimeType contains 'image/' and trashed=false&fields=files(id,name,mimeType,parents)`;
    console.log(`🖼️ Checking image files specifically...`);
    
    const imageFilesResponse = await fetch(imageFilesUrl);
    const imageFilesData = await imageFilesResponse.json();
    console.log(`�️ Image files:`, imageFilesData);
    
    return {
      folderExists: folderResponse.ok,
      folderInfo: folderData,
      allFiles: allFilesData,
      imageFiles: imageFilesData,
      totalFiles: allFilesData.files ? allFilesData.files.length : 0,
      totalImages: imageFilesData.files ? imageFilesData.files.length : 0
    };
    
  } catch (error) {
    console.error(`❌ Debug failed:`, error);
    return { error: error.message };
  }
};