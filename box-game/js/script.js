const btnStart = document.querySelector('#start');
const game = document.querySelector('#game');
const time = document.querySelector('#time');
const timeHeader = document.querySelector('#time-header');
const resultHeader = document.querySelector('#result-header');
const result = document.querySelector('#result');
const gameTime = document.querySelector('#game-time');

let score = 0;
let isGameStarted = false;

btnStart.addEventListener('click', startGame);
game.addEventListener('click', handleBoxClick);
gameTime.addEventListener('input', setGameTime);


function show(el) {
  el.classList.remove('hide');
}

function hide(el) {
  el.classList.add('hide');
}

function startGame() {
  score = 0;
  setGameTime();
  gameTime.setAttribute('disabled', 'disabled');
  isGameStarted = true;
  hide(btnStart);
  game.style.backgroundColor = '#ffffff';

  const interval = setInterval(function() {
    let timeSecond = parseFloat(time.textContent);

    if (timeSecond <= 0) {
      //end game
      clearInterval(interval);
      endGame();
    } else {
      time.textContent = (timeSecond - 0.1).toFixed(1);
    }
  }, 100);

  renderBox();
}

function setGameScore() {
  result.textContent = score.toString();
}

function setGameTime() {
  let t = +gameTime.value;
  time.textContent = t.toFixed(1);
  show(timeHeader);
  hide(resultHeader);
}

function endGame() {
  isGameStarted = false;
  show(start);
  game.innerHTML = '';
  game.style.backgroundColor = '#cccccc';
  show(resultHeader);
  hide(timeHeader);
  gameTime.removeAttribute('disabled');

  setGameScore();
}

function handleBoxClick(event) {
  if (!isGameStarted) {
    return;
  }

  if (event.target.dataset.box) {
    console.log(score++);
    renderBox();
  }
}

function renderBox() {
  game.innerHTML = '';
  const box = document.createElement('div');
  const boxSize = getRandom(30, 100);
  const boxColor = getRandom(0, 255);
  const boxColor2 = getRandom(0, 255);
  const boxColor3 = getRandom(0, 255);
  const gameSize = game.getBoundingClientRect();
  const maxTop = gameSize.height - boxSize;
  const maxLeft = gameSize.width - boxSize;


  box.style.height = box.style.width = boxSize + 'px';
  box.style.position = 'absolute';
  box.style.backgroundColor = `rgb(${boxColor}, ${boxColor2}, ${boxColor3})`;
  box.style.top = getRandom(0, maxTop) + 'px';
  box.style.left = getRandom(0, maxLeft) + 'px';
  box.style.cursor = 'pointer';
  box.setAttribute('data-box', 'true');

  game.insertAdjacentElement('afterbegin', box);
}


function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
