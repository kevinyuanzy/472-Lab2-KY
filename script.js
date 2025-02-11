mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 
// Add the default map token from the Mapbox account

const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.660168], // starting position [lng, lat]. I used the starting location centered approximately at Queen's Park, Toronto. 
    zoom: 12.5, // starting zoom level. I use the zoom level that can display the whole Downtown Toronto.
});
//Import the completed map style from MapBox. 

