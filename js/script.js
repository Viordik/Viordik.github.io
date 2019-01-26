// 'use strict'

const approachSpeed = document.querySelector('#approach-speed');
const landingSpeed = document.querySelector('#landing-speed');
const error = document.querySelector('.error-block');
const difference = 20;

(function () {
  approachSpeed.addEventListener('change', function () {
    if (approachSpeed.value <= 150) {
      error.innerHTML = ('<p class="error error--warning">Число не должно быть меньше или равно 150!</p>');
      console.log('Число не должно быть меньше или равно 150');
    } else {
      error.innerHTML = ('<p class="error error--good">Корректные данные</p>');
      landingSpeed.value = approachSpeed.value - difference;
      // console.log(typeof approachSpeed.value);
      // console.log(typeof landingSpeed.value);
    };
  });
})();

// const calculationSpeed = new Vue({
//   el: '#speed-aircraft',
//   data: {
//     approachSpeed: '0',
//     landingSpeed: '0',
//     v: '20',
//   },
//   methods: {
//     calculation: (function () {
//       return this.landingSpeed = approachSpeed - 20;
//     }),
//   }
// });



const weight = document.getElementById('weightSelect');

// function

weight.addEventListener('click', function () {
  const x = weight.options[weight.selectedIndex].value;
  console.log(x);
});



const foto = new Vue({
  el: '#foto',
  data: {
    camera: 'Sony Alpha DSLR-A390',
    cameraSecond: 'Nikon D7500'
  }
});




(function () {
  $('.foto-block__carusel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    infinite: true,
    speed: 500,
    fade: true,
    cssEase: 'linear',
    mobileFirst: true,
  });
})();
