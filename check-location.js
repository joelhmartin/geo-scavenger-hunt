'use strict';

// Earth's radius in kilometers
const r = 6378.137; 

// Haversine formula
function distance(lat1, lon1, lat2, lon2) {
  lat1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  lon1 *= Math.PI / 180;
  lon2 *= Math.PI / 180;
  let h = Math.pow(Math.sin((lat2 - lat1) / 2), 2) + (Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin((lon2 - lon1) / 2), 2));
  return 1000 * (2 * r * Math.asin(Math.sqrt(h)));
}

function checkLocation(position) {
  // Watch user's current position using Geolocation API
  let lat1 = position.coords.latitude;
  let lon1 = position.coords.longitude;
  let lat2 = landmarks[currentIndex].latitude;
  let lon2 = landmarks[currentIndex].longitude;
  let d = distance(lat1, lon1, lat2, lon2);
  // Use constantly updated location to update map position and slowly deblur image
  updateMapPosition(lat1, lon1)
  updateImageBlur(d)
  
  // Check if the user is within 10 meters of the current landmark
  if (d <= 10) {
    found[currentIndex] = true;
    checkStatus();
  } else {
    // Display distance from the current landmark
    displayHowClose(d);
  }
}

function checkStatus() {
  unfoundIndex = found.findIndex(item => item === false);
  if (unfoundIndex !== -1) {
    currentIndex = unfoundIndex;
    displaySuccess();
    removeTrackingButton();
    displayNextClueButton();
  } else {
    displayWin();
    displayStartOverButton();
    updateProgress();
    updateGameState();
    updateWinState();
  }
}