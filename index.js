async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { Marker } = await google.maps.importLibrary('marker');

  // Fetch the data from the Azure Function.
  const url = 'https://cow-sat-nav-function-app.azurewebsites.net/api/cowSatNavFunc?code=AQCtEj1qe9q4wK6McdVH_v9laabr6MFSz6TtZ9xkQYTaAzFu0WQHjQ%3D%3D';
  // const url = 'http://localhost:7071/api/cowSatNavFunc';
  let response = await fetch(url);
  const data = await response.json();

  const latitude = Number(data['iss_position'].latitude);
  const longitude = Number(data['iss_position'].longitude);

  const map = new Map(document.getElementById('map'), {
    center: { lat: latitude, lng: longitude },
    zoom: 3,
    mapId: '911e7beff6d83398',
    minZoom: 3,
    maxZoom: 3,
  });

  map.setCenter({ lat: latitude, lng: longitude });

  const icon = {
    url: 'https://cowsatnavstorageacc.blob.core.windows.net/satnavcowassets/cow.png?sp=r&st=2025-01-31T08:34:04Z&se=2025-02-15T16:34:04Z&spr=https&sv=2022-11-02&sr=b&sig=OO0LFI7Kj5GsiXwjx5469qEBcB4inJr1hfxp0moeIfc%3D', // url
    scaledSize: new google.maps.Size(200, 200), // scaled size
    origin: new google.maps.Point(0, 0), // origin
    anchor: new google.maps.Point(0, 0), // anchor
  };

  new Marker({
    map: map,
    position: { lat: latitude, lng: longitude },
    icon: icon,
  });
}
initMap();
