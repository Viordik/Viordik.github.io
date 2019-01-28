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



const weight = document.getElementById('weight-select');


weight.addEventListener('change', function() {
  const x = weight.options[weight.selectedIndex].value;
  console.log(x);
  return x;
});

const revers = document.getElementById('engines-select');

revers.addEventListener('change', function() {
  const l = revers.options[revers.selectedIndex].value;
  console.log(l);
  return l;
});

const flaps = document.getElementById('flaps');
const angleFlaps = document.getElementById('angle-flaps');

console.log(flaps);
console.log(angleFlaps);


flaps.addEventListener('change', function () {
  if (flaps.value == '1') {
    angleFlaps.removeAttribute('disabled', 'disabled');
    angleFlaps.classList.remove('disabled');
    console.log('Жмакс')
  }

  if (flaps.value == '0') {
    angleFlaps.setAttribute('disabled', 'disabled');
    angleFlaps.classList.add('disabled');
    console.log('Все плохо!');
  }
});

const slats = document.getElementById('slats');
const angleSlats = document.getElementById('angle-slats');

console.log(flaps);
console.log(angleFlaps);


slats.addEventListener('change', function () {
  if (slats.value == '1') {
    angleSlats.removeAttribute('disabled', 'disabled');
    angleSlats.classList.remove('disabled');
    console.log('Жмакс')
  }

  if (slats.value == '0') {
    angleSlats.setAttribute('disabled', 'disabled');
    angleSlats.classList.add('disabled');
    console.log('Все плохо!');
  }
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
