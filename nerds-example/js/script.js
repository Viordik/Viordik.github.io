if (document.querySelector('#map')) {
  ymaps.ready(init);
  var myMap;

  function init(){
      myMap = new ymaps.Map("map", {
          center: [59.938631, 30.323055],
          zoom: 16
      });
      myMap.behaviors.disable('scrollZoom');
      // myMap.behaviors.disable('drag');
      myPlacemark = new ymaps.Placemark([59.938631, 30.323055], { hintContent: 'NЁRDS DESIGN STUDIO', balloonContent: 'ул. Б. Конюшенная, д. 19/8' });

      myMap.geoObjects.add(myPlacemark);
  }
}
/* Viordik ======= Viordik
          ~~~~~~~~~
        %%%%%%%%%%%%
           ><__><
           slow lol
*/
