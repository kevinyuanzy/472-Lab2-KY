// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the completed map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.660168], // starting position [lng, lat]. I used the starting location centered approximately at Queen's Park, Toronto. 
    zoom: 13.5, // starting zoom level. I use the zoom level that can display the whole U of T campus.
});

//Add "on load" event listener
map.on('load', () => {
    //Add the .geojson file from GitHub repository
    map.addSource('ParksAroundUofT', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab2-KY/refs/heads/main/ParksAroundUofT.geojson' // The URL to my GeoJson polygon.
    });
    
    // Add layer style to the map to represent polygons
    map.addLayer({
        'id': 'parks-polygons',
        'type': 'fill',
        'source': 'ParksAroundUofT',
        'paint': {
            'fill-color': '#00b33c', 
            'fill-opacity': 0.4,
            'fill-outline-color': 'black'
        }
    });


    
    


});



