mapboxgl.accessToken = mapToken;
number = 1;
Style = 'mapbox://styles/mapbox/streets-v11';

var Popup = new mapboxgl.Popup({offset:25})
                .setHTML(
                    `<h3>${location_name}<h3><a href="/slots"><button>BOOK</button></a>`
                )

$('#button-sat').on("click", () => {
        if(number==1){
            number=0;
        }else{
            number=1;
        }
        color = (!number)?"Yellow":"white"; 
    $('#button-sat').css({color:color}) 
    Style = ((number)?'mapbox://styles/mapbox/streets-v11':'mapbox://styles/mapbox/satellite-v9').toString();
    var map = new mapboxgl.Map({
        container: 'map',
        style: Style, 
        center: locate.coordinates,
        zoom: 13 
    });
    var marker = new mapboxgl.Marker()
        .setLngLat(locate.coordinates)
        .setPopup(Popup)
        .addTo(map);
});


var map = new mapboxgl.Map({
    container: 'map', 
    style: Style, 
    center: locate.coordinates, 
    zoom: 13 
});

var marker = new mapboxgl.Marker()
  .setLngLat(locate.coordinates)
  .setPopup(Popup)
  .addTo(map);



