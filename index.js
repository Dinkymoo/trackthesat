async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { Marker } = await google.maps.importLibrary('marker');
  // Fetch the data from the Azure Function.
  const url = 'https://cowsatnav.azurewebsites.net/api/cowSatNavFunc?code=O2rKrzg2URQil2XBB0c7arLz4x9eUySa1qbONSqK8z-8AzFuPvCEEg%3D%3D';
  // const url = 'http://localhost:7071/api/cowSatNavFunc';
  let response = await fetch(url);
  const data = await response.json();
  const latitude = Number(data['iss_position'].latitude);
  const longitude = Number(data['iss_position'].longitude);

  const map = new Map(document.getElementById('map'), {
    center: { lat: latitude, lng: longitude },
    zoom: 5,
    mapId: '911e7beff6d83398',
    minZoom: 5,
    maxZoom: 5,
  });

  map.setCenter({ lat: latitude, lng: longitude });

  const icon = {
    url: 'https://cowsatnav.blob.core.windows.net/scm-releases/cow.png?sp=r&st=2025-01-25T11:22:34Z&se=2025-12-31T19:22:34Z&spr=https&sv=2022-11-02&sr=b&sig=RAcCLRWmHo5o5OIA6p3acm20c%2Bj%2BimUxnE8t%2FX4uWto%3D', // url
    scaledSize: new google.maps.Size(400, 400), // scaled size
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
