// =================================================
// Кнопка вызова мобильного меню
(function () {
  const btnMenu = document.querySelector('.menu__btn');
  const menu = document.querySelector('.menu-nav');

  if (btnMenu) {
    btnMenu.addEventListener('click', function () {
      menu.classList.toggle('menu-nav--active');
    });
  };
})();


//===============================================
//Доп меню
(function () {

  const secondMenu = document.querySelector('.menu-list__dropdown');
  const open = document.querySelector('.open');
  const back = document.querySelector('.back');


  if (open) {
    open.addEventListener('click', function () {
      open.classList.toggle('open--active');
      secondMenu.classList.toggle('menu-list__dropdown--active');
    });
  }

  if (back) {
    back.addEventListener('click', function () {
      secondMenu.classList.remove('menu-list__dropdown--active');
    });
  };
})();


//============================================
//Page subscribe

(function () {
  const select = document.querySelector('#property');

  if (!select) {
    return null;
  };

  const inputState = {
    typeProperty: {
      'option1': '',
      'option2': '',
      'option3': '',
      'option4': '',
      'option5': '',
      'option6': '',
      'option7': '',
      'option8': '',
      'option9': '',
      'option10': '',
      'option11': '',
      'option12': '',
      'option13': '',
      'option14': '',
      'option15': '',
      'option16': '',
      'option17': '',
      'option18': '',
      'option19': '',
      'option20': '',
      'option21': '',
      'option22': '',
      'option23': ''
    },

    movable: {
      'option1': '',
      'option2': 'disabled',
      'option3': 'disabled',
      'option4': 'disabled',
      'option5': 'disabled',
      'option6': '',
      'option7': '',
      'option8': 'disabled',
      'option9': 'disabled',
      'option10': 'disabled',
      'option11': '',
      'option12': 'disabled',
      'option13': 'disabled',
      'option14': 'disabled',
      'option15': 'disabled',
      'option16': 'disabled',
      'option17': 'disabled',
      'option18': 'disabled',
      'option19': 'disabled',
      'option20': 'disabled',
      'option21': 'disabled',
      'option22': 'disabled',
      'option23': 'disabled'
    },

    immovables: {
      'option1': 'disabled',
      'option2': '',
      'option3': '',
      'option4': '',
      'option5': '',
      'option6': 'disabled',
      'option7': 'disabled',
      'option8': '',
      'option9': '',
      'option10': '',
      'option11': 'disabled',
      'option12': '',
      'option13': '',
      'option14': '',
      'option15': '',
      'option16': '',
      'option17': '',
      'option18': '',
      'option19': '',
      'option20': '',
      'option21': '',
      'option22': '',
      'option23': ''
    }
  }

  const input = document.querySelectorAll('input');
  // const imputImmovable = document.querySelectorAll('immovables');

  const lol = function (domCollection, fn) {
    [].forEach.call(domCollection, fn);
  };

  const changeInput = function(selectType) {
    lol(input, function(input) {
      input.disabled = inputState[selectType][input.name];
    })
  }

  select.addEventListener('change', function(e) {
    changeInput(this.value)
  });

})();




//===============================================
//Раскрывающиеся блоки с историей компании на странице "О компании"
// const yearButtons = document.querySelectorAll('.history-company__btn-year');
// const blockHide = document.querySelectorAll('.history-company__text-hide');
// const lotHouse = document.querySelectorAll('.lot-house__description-hide');
// const news = document.querySelectorAll('.text-hide')

// console.log(lotHouse);

// Array.prototype.forEach.call(yearButtons, function (yearButton, index) {
//   yearButton.addEventListener('click', function () {

//     if (blockHide.length > 0)
//       blockHide[index].classList.toggle('history-company__text-hide--active');

//     if (lotHouse.length > 0)
//       lotHouse[index].classList.toggle('lot-house__description-hide--active');

//     if (news.length > 0)
//       news[index].classList.toggle('text-hide--active');

//   })
// });


//===============================================
// Yandex Map

(function () {
  if (document.querySelector('#map')) {
    ymaps.ready(init);
    var myMap;

    function init() {
      myMap = new ymaps.Map("map", {
        center: [55.709622, 37.624885],
        zoom: 16,
        controls: ['zoomControl', 'typeSelector']
      });
      myMap.behaviors.disable('scrollZoom');
      myMap.behaviors.disable('drag');
      myPlacemark = new ymaps.Placemark([55.709622, 37.624885], {
        hintContent: 'ГБЭС',
        balloonContent: 'Холодильный переулок д.3, корп.1, оф. 4402'
      });
      myMap.events.add('dblclick', function (e) {
        e.preventDefault(); // При двойном щелчке зума не будет.
      });

      myMap.events.add('click', function (e) {
        console.log('О, карты запущены!');
        myMap.behaviors.enable('scrollZoom');
        myMap.behaviors.enable('drag');
        e.stopPropagation();
      });

      myMap.geoObjects.add(myPlacemark);
    }
  };
})();


// ================================================
// Карусели

(function () {
  // Карусуль на главной странице

  $(document).ready(function () {
    $('.services').slick({
      autoplay: true,
      autoplaySpeed: 2500,
      dots: true,
      infinite: true,
      speed: 4000,
      slidesToShow: 1,
    });
  });

  $(document).ready(function () {
    $('.our-clients__wrapper').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      dots: true,
      variableWidth: true,
    });
  });

  // Карусель на странице Лот
  $(document).ready(function () {
    $('.lot-img').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      infinite: true,
      dots: true,
      variableWidth: true,
    });
  });
})();
// =================================================
