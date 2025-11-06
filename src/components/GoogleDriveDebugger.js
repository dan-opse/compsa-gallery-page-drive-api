import React, { useState } from 'react';
import { fetchFolderImages, testGoogleDriveConnection, debugFolder } from '../services/googleDriveService';

const GoogleDriveDebugger = () => {
  const [folderId, setFolderId] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const testFolder = async () => {
    if (!folderId.trim()) {
      alert('Please enter a folder ID');
      return;
    }

    setLoading(true);
    setResults(null);

    try {
      console.log('🧪 Starting debug test...');
      
      // Test 1: Basic API connection
      const connectionTest = await testGoogleDriveConnection(folderId);
      
      // Test 2: Fetch images
      const images = await fetchFolderImages(folderId);
      
      // Test 3: Debug folder
      const debugInfo = await debugFolder(folderId);
      
      setResults({
        connectionTest,
        images,
        debugInfo,
        apiKey: process.env.REACT_APP_GOOGLE_DRIVE_API_KEY ? 'Present' : 'Missing'
      });
      
    } catch (error) {
      setResults({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '20px', 
      border: '2px solid #ccc',
      borderRadius: '8px',
      zIndex: 1000,
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <h3>🔧 Google Drive Debugger</h3>
      <div style={{ marginBottom: '10px' }}>
        <input
          type="text"
          placeholder="Enter folder ID"
          value={folderId}
          onChange={(e) => setFolderId(e.target.value)}
          style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button 
          onClick={testFolder} 
          disabled={loading}
          style={{ width: '100%', padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
        >
          {loading ? 'Testing...' : 'Test Folder'}
        </button>
      </div>
      
      {results && (
        <div style={{ marginTop: '15px', fontSize: '12px' }}>
          <h4>Results:</h4>
          <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '4px', overflow: 'auto', maxHeight: '300px' }}>
            {JSON.stringify(results, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default GoogleDriveDebugger;