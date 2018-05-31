var btnMenu = document.querySelector('.menu__btn');
var menu = document.querySelector('.menu-nav');


btnMenu.addEventListener('click', function () {
  menu.classList.toggle('menu-nav--active');
});

//===============================================
//Раскрывающиеся блоки с историей компании на странице "О компании"
var yearButtons = document.querySelectorAll('.history-company__btn-year');
var blockHide = document.querySelectorAll('.history-company__text-hide');
var lotHouse = document.querySelectorAll('.lot-house__description-hide');
var news = document.querySelectorAll('.text-hide')

console.log(lotHouse);

Array.prototype.forEach.call(yearButtons, function(yearButton, index) {
  yearButton.addEventListener('click', function(evt) {
    blockHide[index].classList.toggle('history-company__text-hide--active');
    // lotHouse[index].classList.toggle('lot-house__description-hide--active');
    // news[index].classList.toggle('text-hide--active');
  })
});

//===============================================

// $(document).ready(function(){
//   $('.owl-carousel').owlCarousel({
//     loop:true,
//     margin:10,
//     nav:true,
//     responsive:{
//         0:{
//           item:1
//         },
//         600:{
//           item:3
//         },
//         1000:{
//           item:5
//         }
//     }
//   })
// });


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
    myMap.behaviors.disable('drag');
    myPlacemark = new ymaps.Placemark([55.709622, 37.624885], { hintContent: 'ГБЭС', balloonContent: 'Холодильный переулок д.3, корп.1, оф. 4402' });

    myMap.geoObjects.add(myPlacemark);
}
