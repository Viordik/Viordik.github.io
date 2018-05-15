var btnMenu = document.querySelector('.menu__btn');
var menu = document.querySelector('.menu-nav');


btnMenu.addEventListener('click', function () {
  menu.classList.toggle('menu-nav--active');
});

//===============================================
//Раскрывающиеся блоки с историей компании на странице О компании
var btnYear = document.querySelectorAll('.history-company__btn-year');
var blockHide = document.querySelectorAll('.history-company__text-hide');


//===============================================
// Yandex Map

ymaps.ready(init);
var myMap;

function init(){
    myMap = new ymaps.Map("map", {
        center: [55.709622, 37.624885],
        zoom: 16
    });
    myMap.behaviors.disable('scrollZoom');
    myPlacemark = new ymaps.Placemark([55.709622, 37.624885], { hintContent: 'ГБЭС', balloonContent: 'Холодильный переулок д.3, корп.1, оф. 4402' });

    myMap.geoObjects.add(myPlacemark);
}
