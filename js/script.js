// 'use strict'

// Расчет посадочной скорости путем получение значения из поля скорость захода на посадку
// const approachSpeed = document.querySelector('#approach-speed');
// const landingSpeed = document.querySelector('#landing-speed');
// const error = document.querySelector('.error-block');
// const difference = 20;

// (function () {
//   approachSpeed.addEventListener('change', function () {
//     if (approachSpeed.value <= 150) {
//       error.innerHTML = ('<p class="error error--warning">Число не должно быть меньше или равно 150!</p>');
//       console.log('Число не должно быть меньше или равно 150');
//     } else {
//       error.innerHTML = ('<p class="error error--good">Корректные данные</p>');
//       landingSpeed.value = approachSpeed.value - difference;
//     };
//   });
// })();

new Vue({
  el: '#airplane',
  data: {
    speedStart: 0, //Скорость захода на посадку
    speedFinal: 0, //Посадочная скорость
    errorClass: '', //Класс стиля ошибки
    textError: '', //Текст ошибки
    weight: '', //Масса саммолета G, кг
    revers: '', //Количество отказавших двигателей, сила реверса P
    flaps: '', //Закрылки
    angleFlaps: '', //Угол отклонения закрылок
    angleFlapsClass: '', //Переменная для класса disabled
    stateFlaps: false, //Переменная для атрибута disabled
    slats: '', //Предкрылки
    angleSlats: '', //Угол отклонения предкрылок
    angleSlatsClass: '', //Переменная для класса disabled
    stateSlats: false, //Переменная для атрибута disabled
    runwayCoating: '', //Покрытие ВПП
    runwayState: '', //Состояние ВПП, Коэффициент сцепления при различном покрытии и состояние ВПП
    dragFrictionCoefficient: '', //Коэффициент трения торможения при различных состояниях ВПП
    total: '', //Длина тормозного пути
    wingArea: 184, //Площадь крыла
    airDensity: 0.125, //Плотность воздуха
    cY: 0.4, //Коэффициент лобового сопротивления, Если закрылки и предкрылки равны 0 тогда коэффициент равен 1
    cX: 0.3, //Коэффициент подъемной силы, Если закрылки и предкрылки равны 0 тогда коэффициент равен 0.1
    brakingBeginningRun: '', //Ускорение торможения в начале пробега j1
    brakingBeginningFinish: '', //Ускорение торможения в конце пробега j2
    averageAcceleration: '', //Среднее ускорение самолета jср
    xFirst: '', //Сила лобового сопротевление в начале пробега
    xSecond: '', //Сила лобового сопротивления в конце пробега
    g: 10, //Скорость свободного падения
    liftingForce: '', //Величина подъемной силы Y
    frictionForce: '', //Сила трения
    speedDrag: 33, //120км/ч Скорость(м/с) для расчета Силы лобового сопротивдения и Величины подъемной силы
    speedMetersPerSecond: '', //Переменная для хранения скорости, скорость захода в м/с
    text: '',
  },
  watch: {
    speedStart: function () {
      if (this.speedStart <= 150) {
        this.errorClass = 'warning';
        this.textError = 'Введенное значение в поле "Скорость захода на посадку" не должно быть меньше или равно 150';
        console.log('Введенное значение в поле "Скорость захода на посадку" не должно быть меньше или равно 150');
      } else {
        this.errorClass = 'good';
        this.textError = 'Корректные данные';
        console.log('Корректные данные');
      }
    },
    // weight: function () {
    //   console.log(this.weight);
    // },
    revers: function () {
      console.log(this.revers);
    },
    flaps: function () {
      if (this.flaps == 0) {
        console.log(this.flaps);
        this.stateFlaps = true;
        this.angleFlapsClass = 'disabled';
        this.angleFlaps = 0;
      } else if (this.flaps == 1) {
        console.log(this.flaps);
        this.stateFlaps = false;
        this.angleFlapsClass = '';
      }
    },
    slats: function () {
      if (this.slats == 0) {
        this.stateSlats = true;
        this.angleSlatsClass = 'disabled';
        this.angleSlats = 0;
      } else if (this.slats == 1) {
        this.stateSlats = false;
        this.angleSlatsClass = '';
      }
    },
    angleFlaps: function () {
      if(this.angleFlaps == 0 && this.angleSlats == 0) {
        this.cY = 1;
        this.cX = 0.1;
      }
      console.log(this.angleFlaps);
    },
    angleSlats: function () {
      if(this.angleFlaps == 0 && this.angleSlats == 0) {
        this.cY = 1;
        this.cX = 0.1;
      }
      console.log(this.angleSlats);
    },
    runwayCoating: function () {
      console.log(this.runwayCoating);
    },
    runwayState: function () {
      console.log(this.runwayState);
      if (this.runwayState === '0.7' || this.runwayState === '0.8') {
        this.dragFrictionCoefficient = 0.25;
        console.log(this.dragFrictionCoefficient);
      }
      if (this.runwayState === '0.5') {
        this.dragFrictionCoefficient = 0.18;
        console.log(this.dragFrictionCoefficient);
      }
      if (this.runwayState === '0.4') {
        this.dragFrictionCoefficient = 0.05;
        console.log(this.dragFrictionCoefficient);
      }
    }
  },
  computed: {
    speed: function () {
      return (this.speedFinal = this.speedStart - 20);
    },
    speedInTwo: function () {
      return (this.speedDrag = this.speedFinal / 2);
    },
  },
  methods: {
    calculation: function () {
      // const allFieldValue = ((+this.speed) + (+this.weight) + (+this.revers) + (+this.angleFlaps) + (+this.angleSlats) + (+this.runwayState));
      // return this.total = allFieldValue;
      this.speedMetersPerSecond = +(this.speedFinal * 1000 / 3600); //Перевод скорости км/ч в м/с
      this.weight = +(this.weight * 1000); //Перевод массы самолета из тонн в кг
      this.xFirst = +(this.cX * this.wingArea * (this.airDensity * (Math.pow(this.speedMetersPerSecond, 2)) / 2 )); //Формула для расчета x1 сила лобового сопротивления
      this.brakingBeginningRun = +(((this.xFirst + this.revers) / this.weight) * this.g); //Формула для расчета Ускорение торможения в начале пробега j1
      this.xSecond = +(this.cX * this.wingArea * (this.airDensity * (Math.pow(this.speedInTwo, 2)) / 2)); //Формула для расчета x2 Сила лобового сопротивления на скорости, равной половине от скорости касания
      this.liftingForce = +(this.cY * this.wingArea * (this.airDensity * (Math.pow(this.speedInTwo, 2)) / 2)); //Формула для расчеты Y Величина подъемной силы
      this.frictionForce = +(this.dragFrictionCoefficient * (this.weight - this.liftingForce)); //Формула для расчета Fтр Сила трения торможения в конце пробега
      this.brakingBeginningFinish = ((+this.xSecond + (+this.revers) + (+this.frictionForce)) / (+this.weight)) * +this.g; //Формула для расчета j2 ускорение торможения в конце пробега
      this.averageAcceleration = +((this.brakingBeginningRun + this.brakingBeginningFinish) / 2); //Формула для расчета jср Среднее ускорение торможение
      this.total = +((Math.pow(this.speedMetersPerSecond, 2)) / (2 * this.averageAcceleration)); //Формула для расчета Lпроб Длина пробега самолета
      this.text = 'Длина пробега равна:';

      console.log('Коэффициент лобового сопротивления и подъемной силы при 0 значение закрылков и предкрылков: ' + this.cY + ',' + this.cX);
      console.log('скорость в м/с: ' + this.speedMetersPerSecond);
      console.log('масса самолета в кг: ' + this.weight);
      console.log('Сила лобового сопротивления в начале пробега: ' + this.xFirst);
      console.log('Ускорение торможения в начале пробега: ' + this.brakingBeginningRun);
      console.log('Сила лобового сопротивления на скорости 120 км/ч: ' + this.xSecond);
      console.log('Величина подъемной силы на скорости равной 120 км/ч: ' + this.liftingForce);
      console.log('Сила трения: ' + this.frictionForce);
      console.log('Ускорение торможения в конце пробега: ' + this.brakingBeginningFinish);
      console.log('Среднее ускорение самолета: ' + this.averageAcceleration);
      console.log('Длина пробега торможения: ' + this.total);
      console.log('Половина посадочной скорости: ' + this.speedInTwo);
    }
  },
});


// Получения значения массы самолета
// const weight = document.getElementById('weight-select');


// weight.addEventListener('change', function() {
//   const x = weight.options[weight.selectedIndex].value;
//   console.log(x);
//   return x;
// });

// Значения реверса, если два двигателся работают то оно равно 12000, если один то 6000, если оба не работают то 0
// const revers = document.getElementById('engines-select');

// revers.addEventListener('change', function() {
//   const l = revers.options[revers.selectedIndex].value;
//   console.log(l);
//   return l;
// });

// Работоспоспособность закрылков и получения значения из поля угол отклонения закрылков
// const flaps = document.getElementById('flaps');
// const angleFlaps = document.getElementById('angle-flaps');

// console.log(flaps);
// console.log(angleFlaps);


// flaps.addEventListener('change', function () {
//   if (flaps.value == '1') {
//     angleFlaps.removeAttribute('disabled', 'disabled');
//     angleFlaps.classList.remove('disabled');
//     console.log('Жмакс')
//   }

//   if (flaps.value == '0') {
//     angleFlaps.setAttribute('disabled', 'disabled');
//     angleFlaps.classList.add('disabled');
//     console.log('Все плохо!');
//   }
// });


// angleFlaps.addEventListener('change', function () {
//   const f = angleFlaps.options[angleFlaps.selectedIndex].value;
//   console.log(f);
//   return f;
// });


// Работоспоспособность предкрылков и получение значения угла отклонения предкрылков
// const slats = document.getElementById('slats');
// const angleSlats = document.getElementById('angle-slats');

// console.log(flaps);
// console.log(angleFlaps);


// slats.addEventListener('change', function () {
//   if (slats.value == '1') {
//     angleSlats.removeAttribute('disabled', 'disabled');
//     angleSlats.classList.remove('disabled');
//     console.log('Жмакс')
//   }

//   if (slats.value == '0') {
//     angleSlats.setAttribute('disabled', 'disabled');
//     angleSlats.classList.add('disabled');
//     console.log('Все плохо!');
//   }
// });

// angleSlats.addEventListener('change', function () {
//   const s = angleSlats.options[angleSlats.selectedIndex].value;
//   console.log(s);
//   return s;
// });


// Получение значени из поля Покрытие ВПП
// const coating = document.getElementById('coating');

// coating.addEventListener('change', function () {
//   const c = coating.options[coating.selectedIndex].value;
//   console.log(c);
//   return c;
// });




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
