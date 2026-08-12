
//access the map token from env file
// let mapToken= mapToken;
mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: 'map', // container ID
    //choose from mapbox core styles or make ur own style with mapbox studio
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, //now send out coordinates //[77.2090 , 28.6139], starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

// Create a default Marker and add it to the map.
const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates)  //listing.geometry.coordinates hai that use in marker
    .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML(
            `<h4>${listing.title}</h4><p>Exact Location will be provided after booking!</p>`
        )
    )
    .addTo(map);
