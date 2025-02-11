// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the completed map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.660168], // starting position [lng, lat]. I used the starting location centered approximately at Queen's Park, Toronto. 
    zoom: 12.5, // starting zoom level. I use the zoom level that can display the whole Downtown Toronto.
});

// Add a data source from a GeoJSON file
map.addSource('ParksAroundUofT', {
    type: 'geojson',
    data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab2-KY/refs/heads/main/ParksAroundUofT.geojson' // Your URL to your buildings.geojson file
});

map.addLayer({
    'id': 'parks-polygons',
    'type': 'fill',
    'source': 'ParksAroundUofT',
    'paint': {
        'circle-radius': 5,
        'circle-color': '#007cbf'
    }
});
