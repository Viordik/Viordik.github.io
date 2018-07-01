'use strick'
// const item = document.querySelectorAll('.block-link');
// const table = document.querySelector('.table');


// Array.prototype.forEach.call(item, function(item) {
//   item.addEventListener('click', function() {
//     table.classList.toggle('table--active');
//   })
// });


// $('.lol').slick({
//   slidesToShow: 5,
//   slidesToScroll: 5,
//   dots: true,
//   autoplay: true,
//   autoplaySpeed: 2000,
//   speed: 1000,
//   adaptiveHeight: true,
// });


// $(document).ready(function(){
//   $('.lol').slick({
//     slidesToShow: 5,
//     slidesToScroll: 5,
//     autoplay: true,
//     autoplaySpeed: 2000,
//     speed: 1000,
//     infinite: true,
//     dots: true,
//     variableWidth: true,
//     adaptiveHeight: true,
//     dots: true,
//   });
// });


$.ajax ({
  url: 'test.json',
  dataType: 'json',
  type: 'get',
  chache: false,
  success: function(data) {
    $(data).each(function ( index, value) {
      $('.lol').append(
        // '<div class="item">' +
          '<a href="#table" class="block-link">' +
            '<img src="'+ value.picture +'" width="140" height="200">' +
            '<p class="name-book">' + value.name + '</p>' +
            '<p class="author">'+ value.author.last + '</p>' +
            '<p class="price">' + value.price + '</p>' +
            '<p class="discount">' + value.discount + '</p>' +
          '</a>');
        // '</div>');
    });
  }
});

// const item = document.querySelectorAll('.block-link');
// const table = document.querySelector('.table');


// Array.prototype.forEach.call(item, function(item) {
//   item.addEventListener('click', function() {
//     table.classList.toggle('table--active');
//   })
// });



$(document).ready(function(){
  $('.carusel').slick({
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    infinite: true,
    dots: true,
    variableWidth: true,
    adaptiveHeight: true,
    dots: true,
  });
});
