import React, { useState, useRef } from 'react';
import './Gallery.css';

const Gallery = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredRowId, setHoveredRowId] = useState(null);
  const [animatingRows, setAnimatingRows] = useState(new Set());
  
  const trackRefs = useRef({});
  const animationStates = useRef({});

  // Event data with COMPSA events
  const events = [
    {
      id: 1,
      title: "Cruise",
      description: "COMPSA annual cruise event",
      folder: "cruise",
      images: Array.from({ length: 49 }, (_, i) => `compsacruise-${i + 1}.jpg`),
      date: "November 2025"
    },
    {   
      id: 2,
      title: "QWIC Welcome Home Night",
      description: "Welcome home celebration for QWIC members",
      folder: "qwic-welcome",
      images: Array.from({ length: 24 }, (_, i) => `qwic-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "October 2025"
    },
    {
      id: 3,
      title: "AI Collective",
      description: "AI and machine learning workshop collective",
      folder: "ai-collective",
      images: Array.from({ length: 60 }, (_, i) => `aicollective-${i + 1}.jpg`),
      date: "September 2025"
    },
    {
      id: 4,
      title: "Orientation 2025",
      description: "Welcome new students to COMPSA",
      folder: "orientation-2025",
      images: Array.from({ length: 53 }, (_, i) => `orientation-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "September 2025"
    },
    {
      id: 5,
      title: "Resume Roast",
      description: "Get feedback on your resume from professionals",
      folder: "resume-roast",
      images: Array.from({ length: 15 }, (_, i) => `resume-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "August 2025"
    },
    {
      id: 6,
      title: "COMPSA Group Shots",
      description: "Official COMPSA team photography session",
      folder: "group-shots",
      images: Array.from({ length: 21 }, (_, i) => `group-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "July 2025"
    },
    {
      id: 7,
      title: "2025 Formal",
      description: "Annual COMPSA formal dinner and dance",
      folder: "formal-2025",
      images: Array.from({ length: 178 }, (_, i) => `compsa-formal-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "May 2025"
    },
    {
      id: 8,
      title: "2025 Merch Shoot",
      description: "Photography session for COMPSA merchandise",
      folder: "merch-shoot",
      images: Array.from({ length: 103 }, (_, i) => `merch-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "April 2025"
    },
    {
      id: 9,
      title: "COMPSA Basketball Tournament",
      description: "Annual basketball competition between teams",
      folder: "basketball",
      images: Array.from({ length: 128 }, (_, i) => `bball-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "March 2025"
    },
    {
      id: 10,
      title: "2025 Fall Night Out",
      description: "Fall semester social gathering for students",
      folder: "fall-night",
      images: Array.from({ length: 172 }, (_, i) => `fno-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "October 2024"
    },
    {
      id: 11,
      title: "2024 Soccer Tournament",
      description: "Soccer competition from the previous year",
      folder: "soccer-2024",
      images: Array.from({ length: 97 }, (_, i) => `soccer-${String(i + 1).padStart(3, '0')}.jpg`),
      date: "September 2024"
    }
  ];

  // Helper function to get image paths for an event
  const getEventImages = (event) => {
    if (event.images && event.images.length > 0) {
      // Map filenames to full paths
      return event.images.map(filename => `/events/${event.folder}/${filename}`);
    }
    // Return empty array if no images
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