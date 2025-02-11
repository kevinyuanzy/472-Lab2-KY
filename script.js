// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the completed map style from MapBox. 
const map = new mapboxgl.Map({
    container: 'Lab2Map', // map container ID in the index.html file.
    style: 'mapbox://styles/kevinyuanzy/cm6ztbpqc003s01qwcvdrf6ft', // style URL from created MapBox style.
    center: [-79.391820, 43.660168], // starting position [lng, lat]. I used the starting location centered approximately at Queen's Park, Toronto. 
    zoom: 13.5, // starting zoom level. I use the zoom level that can display the whole U of T campus.
});

//Use "map.on" event listener to add features to the webmap. This is an important step!
map.on('load', () => {
    //Add the ParksAroundUofT.geojson file from GitHub repository. This file, which I created during the lab 1, represents parks around UofT as polygons. 
    map.addSource('ParksAroundUofT', {
        type: 'geojson',
        data: 'https://raw.githubusercontent.com/kevinyuanzy/472-Lab2-KY/refs/heads/main/ParksAroundUofT.geojson' // The URL to my GeoJson polygon.
    });
    
    // Add layer style to the map to represent park polygons.
    map.addLayer({
        'id': 'parks-polygons',
        'type': 'fill',
        'source': 'ParksAroundUofT',
        'paint': {
            'fill-color': '#00b33c', 
            'fill-opacity': 0.5,
            'fill-outline-color': 'black'
        }
    });

    //Add the MapBox Tileset from MapBox. This file represents Subway Stations around UofT as points. 
    map.addSource('TTCStations', {
        'type': 'vector',
        'url': 'mapbox://kevinyuanzy.d14yokfo' // Add MapBox tileset ID
    });

    //Add layer style to the map to represent subway stations points.
    map.addLayer({
        'id': 'stations-points', 
        'type': 'circle', 
        'source': 'TTCStations',
        'paint': {
            'circle-color': '#ff1a1a',
            'circle-radius': 5 
        },
        'source-layer': 'TTCSubway-11dp0f' // Tileset NAME (diff to ID) from mapbox tileset page
    });

    


});



