import React, { useState, useEffect } from 'react';

const DistanceMatrix = (arrival) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState(arrival);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setOrigin(`${latitude},${longitude}`);
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please enable location services.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = () => {
    const service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        unitSystem: window.google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      },
      (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
          return;
        }

        const results = response.rows[0].elements[0];
        if (results) {
          setDistance(results.distance.text);
          setDuration(results.duration.text);
        }
      }
    );
  };

    getUserLocation();
    calculateDistance();
    console.log('RESUTLS DIST AN DUR', distance, duration)

  return { distance, duration };
};

export default DistanceMatrix;
