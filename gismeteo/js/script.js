(function () {
  const  btn = document.querySelector('.banner__btn');
  const banner = document.querySelector('.banner');

  if(btn) {
    btn.addEventListener('click', function () {
      banner.classList.add('banner--hide');
    })
  }
})();
