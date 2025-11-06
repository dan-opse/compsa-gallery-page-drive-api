import React, { useState, useRef, useEffect } from 'react';
import './Gallery.css';
import { fetchAllEventImages } from '../services/googleDriveService';

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [animatingRows, setAnimatingRows] = useState(new Set());
  const [eventImages, setEventImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const trackRefs = useRef({});
  const animationStates = useRef({});

  // Event data with COMPSA events - ADD YOUR FOLDER IDs HERE
  const events = [
    {
      id: 1,
      title: "Cruise",
      description: "COMPSA annual cruise event",
      folderId: "1CqViy79QBKEmbzw0GIquIZ4jjDw0rwK8",
      images: [], // Will be populated from Google Drive
      date: "November 2025"
    },
    {   
      id: 2,
      title: "QWIC Welcome Home Night",
      description: "Welcome home celebration for QWIC members",
      folderId: "1Dm8XW-vuQir4VR3iATseTpN0oqmEMrCt",
      images: [],
      date: "October 2025"
    },
    {
      id: 3,
      title: "AI Collective",
      description: "AI and machine learning workshop collective",
      folderId: "1aA8oTs6VvLakyU6Zo-y1oqEOCHqdNn-_",
      images: [],
      date: "September 2025"
    },
    {
      id: 4,
      title: "Orientation 2025",
      description: "Welcome new students to COMPSA",
      folderId: "1cES9baR3QQ3L_XfRbul4iN4Ii4jZCL8L",
      images: [],
      date: "September 2025"
    },
    {
      id: 5,
      title: "Resume Roast",
      description: "Get feedback on your resume from professionals",
      folderId: "1xdurCURrawU0c5xlro7O1j0cyjcB16fX",
      images: [],
      date: "August 2025"
    },
    {
      id: 6,
      title: "COMPSA Group Shots",
      description: "Official COMPSA team photography session",
      folderId: "1V2g2B30cvt5GOWkIgpPRVw556-wejKog",
      images: [],
      date: "July 2025"
    },
    {
      id: 7,
      title: "2025 Formal",
      description: "Annual COMPSA formal dinner and dance",
      folderId: "1JC998FxRyrRRytJsCeVLx-3uuZuO5qFW",
      images: [],
      date: "May 2025"
    },
    {
      id: 8,
      title: "2025 Merch Shoot",
      description: "Photography session for COMPSA merchandise",
      folderId: "1qh-HDs9jEBdgXyZ9W9UuGfpWdwbKH7G9",
      images: [],
      date: "April 2025"
    },
    {
      id: 9,
      title: "COMPSA Basketball Tournament",
      description: "Annual basketball competition between teams",
      folderId: "1RhXuxj2BicHRvqhlJNsB4LmiVtqdsD4p",
      images: [],
      date: "March 2025"
    },
    {
      id: 10,
      title: "2025 Fall Night Out",
      description: "Fall semester social gathering for students",
      folderId: "1Lnhu3W9BJwO7VEaoXiCUeL7Q9dHhib0M",
      images: [],
      date: "October 2024"
    },
    {
      id: 11,
      title: "2024 Soccer Tournament",
      description: "Soccer competition from the previous year",
      folderId: "15-fC7LgZeVXe9h9bxXgptRqu5LUtOpQ-",
      images: [],
      date: "September 2024"
    }
  ];

  // Fetch images from Google Drive on component mount
  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🔄 useEffect triggered - Starting to load images...');
        
        // Filter events that have folder IDs
        const eventsWithFolders = events.filter(event => 
          event.folderId && event.folderId !== "your_" + event.title.toLowerCase().replace(/\s+/g, '_') + "_folder_id_here"
        );
        
        if (eventsWithFolders.length === 0) {
          console.warn('No events with valid folder IDs found. Please add your Google Drive folder IDs to the events array.');
          setLoading(false);
          return;
        }
        
        console.log(`Loading images for ${eventsWithFolders.length} events...`);
        const imageMap = await fetchAllEventImages(eventsWithFolders);
        console.log('📊 Image map received:', imageMap);
        setEventImages(imageMap);
        console.log('✅ State updated with images');
        
      } catch (err) {
        console.error('❌ Failed to load images:', err);
        setError('Failed to load images from Google Drive. Please check your API key and folder permissions.');
      } finally {
        setLoading(false);
      }
    };

    loadImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array = run once on mount

  // Helper function to get images for an event
  const getEventImages = (event) => {
    console.log(`🔍 Getting images for event ${event.id} (${event.title})`);
    const driveImages = eventImages[event.id];
    console.log(`📁 Drive images for event ${event.id}:`, driveImages);
    
    if (driveImages && driveImages.length > 0) {
      // Use Google Drive images, map to the downloadUrl
      console.log(`✅ Using ${driveImages.length} Google Drive images for ${event.title}`);
      return driveImages.map(img => img.downloadUrl);
    }
    
    // Return empty array if no Google Drive images available
    console.log(`📁 No Google Drive images found for ${event.title}`);
    return [];
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const handleImageHover = (rowId, index) => {
    setHoveredRowId(rowId);
    setHoveredIndex(index);
  };

  const handleImageLeave = () => {
    setHoveredRowId(null);
    setHoveredIndex(null);
  };

  const handleRowHover = (rowId) => {
    const track = trackRefs.current[rowId];
    if (!track) return;

    const computedStyle = window.getComputedStyle(track);
    const currentTransform = computedStyle.transform;
    
    let currentX = 0;
    if (currentTransform && currentTransform !== 'none') {
      const matrix = new DOMMatrix(currentTransform);
      currentX = matrix.m41;
    }

    if (!animationStates.current[rowId]) {
      animationStates.current[rowId] = { currentX: 0 };
    }
    animationStates.current[rowId].currentX = currentX;

    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX}px)`;
    
    void track.offsetHeight;
    
    const trackWidth = track.scrollWidth / 2;
    const remainingDistance = trackWidth + Math.abs(currentX);
    const remainingPercentage = (remainingDistance / trackWidth) * 100;
    const animationDuration = (remainingPercentage / 100) * 40;
    
    track.style.animation = `slideFromCurrent ${animationDuration}s linear infinite`;
    track.style.setProperty('--start-x', `${currentX}px`);
    
    setAnimatingRows(prev => new Set([...prev, rowId]));
  };

  const handleRowLeave = (rowId) => {
    const track = trackRefs.current[rowId];
    if (!track) return;

    const computedStyle = window.getComputedStyle(track);
    const currentTransform = computedStyle.transform;
    
    let currentX = 0;
    if (currentTransform && currentTransform !== 'none') {
      const matrix = new DOMMatrix(currentTransform);
      currentX = matrix.m41;
    }
    
    if (!animationStates.current[rowId]) {
      animationStates.current[rowId] = { currentX: 0 };
    }
    animationStates.current[rowId].currentX = currentX;
    
    track.style.animation = 'none';
    track.style.transform = `translateX(${currentX}px)`;
    
    setAnimatingRows(prev => {
      const newSet = new Set(prev);
      newSet.delete(rowId);
      return newSet;
    });
  };

      const getImageScale = (rowId, imageIndex) => {
    if (hoveredRowId !== rowId || hoveredIndex === null) return 1;
    
    const distance = Math.abs(imageIndex - hoveredIndex);
    if (distance === 0) return 1.1;
    if (distance === 1) return 1.02;
    if (distance === 2) return 1.01;
    return 1;
  };

  return (
    <div className="gallery-container">
      <header className="gallery-header">
        <h1>COMPSA Events Gallery</h1>
        <p>Discover memorable moments from our community events</p>
      </header>

      {loading && (
        <div className="loading-container">
          <p>Loading images from Google Drive...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p>⚠️ {error}</p>
          <p>Falling back to placeholder images.</p>
        </div>
      )}

      <div className="events-slider-container">
        {events.map((event) => {
          const eventImages = getEventImages(event);
          
          return (
            <div 
              key={event.id} 
              className="event-container"
              onMouseEnter={() => handleRowHover(event.id)}
              onMouseLeave={() => handleRowLeave(event.id)}
            >
              <div className="event-info">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div className="event-date">{event.date}</div>
              </div>
              <div className="images-slider">
                <div 
                  className="images-track"
                  ref={el => trackRefs.current[event.id] = el}
                >
                  {eventImages.map((image, index) => {
                    const scale = getImageScale(event.id, index);
                    const isScaled = scale > 1;
                    const isCenter = hoveredRowId === event.id && hoveredIndex === index;
                    
                    let zIndex = 1;
                    if (isCenter) {
                      zIndex = 100;
                    } else if (isScaled) {
                      zIndex = 5;
                    }
                    
                    return (
                      <div 
                        key={`first-${index}`} 
                        className="image-slide"
                        style={{
                          transform: `scale(${scale})`,
                          zIndex: zIndex,
                          filter: isCenter ? 'drop-shadow(0 3px 24px rgba(0, 0, 0, 0.95))' : 'none'
                        }}
                        onMouseEnter={() => handleImageHover(event.id, index)}
                        onMouseLeave={handleImageLeave}
                        onClick={() => openModal(event)}
                      >
                        <img 
                          src={image} 
                          alt={`${event.title} ${index + 1}`}
                          onError={(e) => {
                            console.error(`Failed to load image: ${image}`);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    );
                  })}
                  {eventImages.map((image, index) => {
                    const scale = getImageScale(event.id, index + eventImages.length);
                    const isScaled = scale > 1;
                    const isCenter = hoveredRowId === event.id && hoveredIndex === index + eventImages.length;
                  
                    let zIndex = 1;
                    if (isCenter) {
                      zIndex = 100;
                    } else if (isScaled) {
                      zIndex = 5;
                    }
                    
                    return (
                      <div 
                        key={`second-${index}`} 
                        className="image-slide"
                        style={{
                          transform: `scale(${scale})`,
                          zIndex: zIndex,
                          filter: isCenter ? 'drop-shadow(0 3px 24px rgba(0, 0, 0, 0.95))' : 'none'
                        }}
                        onMouseEnter={() => handleImageHover(event.id, index + eventImages.length)}
                        onMouseLeave={handleImageLeave}
                        onClick={() => openModal(event)}
                      >
                        <img 
                          src={image} 
                          alt={`${event.title} ${index + 1} (duplicate)`}
                          onError={(e) => {
                            console.error(`Failed to load duplicate image: ${image}`);
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>×</button>
            <h2>{selectedEvent.title}</h2>
            <p>{selectedEvent.description}</p>
            <div className="modal-images">
              {getEventImages(selectedEvent).map((image, index) => (
                <img 
                  key={index} 
                  src={image} 
                  alt={`${selectedEvent.title} ${index + 1}`}
                  className="modal-image"
                  onError={(e) => {
                    console.error(`Failed to load modal image: ${image}`);
                    e.target.style.display = 'none';
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;