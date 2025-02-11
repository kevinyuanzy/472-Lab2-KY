// Add the default map token from the Mapbox account
mapboxgl.accessToken = 'pk.eyJ1Ijoia2V2aW55dWFuenkiLCJhIjoiY201eHprYXU0MGZwejJsb242Y3Nza25oYyJ9.h05hqdnqlx2BwgwbQNuKCg'; 

//Import the map style from MapBox. 
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

    //Add layer style to the legend
    const layers = [
        'Parks',
        'TTC Subway Stations'
    ];
    const colors = [
        '#00b33c',
        '#ff1a1a'
    ];

    // create legend
    const legend = document.getElementById('legend');

    layers.forEach((layer, i) => {
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    const value = document.createElement('span');
    value.innerHTML = `${layer}`;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
    });

    // Create a popup, so the information about places will appear when mouse hovers on features. Codes are from https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/
    const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    map.on('mouseenter', 'parks-polygons', (e) => {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        // Copy coordinates array.
        const coordinates = e.features[0].geometry.coordinates.slice();
        const description = e.features[0].properties.Name;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        if (['mercator', 'equirectangular'].includes(map.getProjection().name)) {
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(Lab2Map);
    });

    map.on('mouseleave', 'parks-polygons', () => {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });
});



