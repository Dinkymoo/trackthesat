async function initMap() {
  // Request needed libraries.
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
  const cowImg = document.createElement('img');
  cowImg.src = './assets/image/crazyCow.png';

  try {
    const response = await fetch('http://api.open-notify.org/iss-now.json', { referrerPolicy: 'unsafe-url' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const latitude = Number(data['iss_position'].latitude);
    const longitude = Number(data['iss_position'].longitude);

    const map = new Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 5,
      mapId: '911e7beff6d83398',
    });
    map.setCenter({ lat: latitude, lng: longitude });

    const cowMarker = new AdvancedMarkerElement({
      map,
      position: { lat: latitude, lng: longitude },
      content: cowImg,
      title: 'A marker using a custom PNG Image',
    });
    cowMarker.setMap(map);
  } catch (error) {
    console.error('Fetch error: ', error);
  }
}

initMap();
