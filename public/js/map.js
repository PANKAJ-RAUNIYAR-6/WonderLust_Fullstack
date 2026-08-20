
mapboxgl.accessToken = mapToken;


const map = new mapboxgl.Map({
    container: 'map', 
    style: "mapbox://styles/mapbox/streets-v12",
    center: listing.geometry.coordinates, 
    zoom: 9 
});


const popup = new mapboxgl.Popup({
    anchor: "bottom",
    offset: 25,
    closeButton: true,
    closeOnClick: false,
    maxWidth: "250px"
})
.setHTML(`
    <div class="listing-popup">

        <h4 class="popup-title">
            ${listing.title}
        </h4>

        <p class="popup-text">
            Exact location will be provided after booking!
        </p>

    </div>
`);


const marker = new mapboxgl.Marker({ color: 'red' })
    .setLngLat(listing.geometry.coordinates) 
    .setPopup(popup)
    .addTo(map);
