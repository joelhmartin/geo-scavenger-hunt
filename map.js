'use strict';

let map;
let marker;
let tracker;
let isTracking = false;
let locations = JSON.parse(localStorage.getItem('locations')) || [];

function initializeMap() {
  map = L.map('map').setView([0, 0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  marker = L.marker([0, 0]);
  marker.addTo(map);

  getPosition()
    .then((position) => {
      updateMapPosition(position.coords.latitude, position.coords.longitude)
    })
    .catch(noGeo);
}
  
function updateMapPosition(lat, lon) {
    map.panTo([lat, lon]);
    marker.setLatLng([lat, lon]);
}
  
function noGeo(e) {
    console.error(e);
    alert('Location not provided. ' + e.message);
}
  
function getPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true });
    });
}

function startTracking() {
  isTracking = !isTracking;
  if (isTracking) {
    navigator.geolocation.getCurrentPosition(checkLocation, noGeo, { enableHighAccuracy: true });
    tracker = navigator.geolocation.watchPosition(checkLocation, noGeo, { enableHighAccuracy: true });
    document.getElementById("start-tracking").innerHTML = 'Stop Tracking';
    toggleBlink(isTracking);
  } else {
    navigator.geolocation.clearWatch(tracker);
    document.getElementById("how-close").innerHTML = '&nbsp;';
    document.getElementById("start-tracking").innerHTML = 'Start Tracking';
    toggleBlink(isTracking);
  }
}
