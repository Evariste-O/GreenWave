'use client'
import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            console.error('Error getting location:', error);
          }
        );
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
    };

    // Fetch location only if it hasn't been fetched yet
    if (!userLocation) {
      getLocation();
    }
  }, [userLocation]); // Only fetch location if userLocation is null

  return (
    <LocationContext.Provider value={userLocation}>
      {children}
    </LocationContext.Provider>
  );
};