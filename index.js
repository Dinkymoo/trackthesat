async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { Marker } = await google.maps.importLibrary('marker');

  try {
    const response = await fetch('https://cowsatnav.azurewebsites.net/api/cowSatNavFunc?code=O2rKrzg2URQil2XBB0c7arLz4x9eUySa1qbONSqK8z-8AzFuPvCEEg%3D%3D');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const latitude = Number(data['iss_position'].latitude);
    const longitude = Number(data['iss_position'].longitude);

    const map = new Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 4,
      mapId: '911e7beff6d83398',
    });
    map.setCenter({ lat: latitude, lng: longitude });

    // const cowImg = document.createElement('img');
    // cowImg.src = '/image/crazyCow.png';

    const cowMarker = new Marker({
      map,
      position: { lat: latitude, lng: longitude },
      //   content: cowImg,
      //   title: 'A marker using a custom PNG Image',
    });
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

initMap();
