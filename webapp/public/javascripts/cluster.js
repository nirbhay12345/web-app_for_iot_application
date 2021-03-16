
mapboxgl.accessToken = mapToken;
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    center: Center,
    zoom: 10
});



PArkingAreas.forEach(area => {

    console.log(area.slots[0]);
    var Popup = new mapboxgl.Popup({offset:25})
                .setHTML(
                    `<h3>${area.name}<h3>
                    <a href="/slots/${area.slots[0]}">
                    <button>BOOK</button></a>`
                );

    var marker = new mapboxgl.Marker()
        .setLngLat(area.location.coordinates)
        .setPopup(Popup)
        .addTo(map);
});
