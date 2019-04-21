(function () {
'use strict';

function _AwaitValue(value) {
  this.wrapped = value;
}

function _AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume("next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen.return !== "function") {
    this.return = undefined;
  }
}

if (typeof Symbol === "function" && Symbol.asyncIterator) {
  _AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
    return this;
  };
}

_AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

_AsyncGenerator.prototype.throw = function (arg) {
  return this._invoke("throw", arg);
};

_AsyncGenerator.prototype.return = function (arg) {
  return this._invoke("return", arg);
};

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

window.addEventListener('load', function () {
  var soundElements = document.querySelectorAll('.sound');
  var pads = document.querySelectorAll('.pad');
  var visual = document.querySelector('.visual');
  var rec = document.querySelector('.rec');
  var play = document.querySelector('.play');
  var reset = document.querySelector('.reset');
  var colors = ['#60d394', '#d36060', '#c060d3', '#d3d160', '#6860d3', '#60b2d3'];

  var makeStore = function makeStore() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var subscribers = [];

    var subscribe = function subscribe(fn) {
      if (typeof fn === 'function') {
        subscribers.push(fn);
      }
    };

    var setState = function setState() {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      state = typeof newState === 'function' ? _objectSpread({}, state, newState(state)) : _objectSpread({}, state, newState);
      subscribers.forEach(function (fn) {
        fn(state);
      });
    };

    var getState = function getState() {
      return state;
    };

    return {
      getState: getState,
      subscribe: subscribe,
      setState: setState
    };
  };

  var store = makeStore({
    sounds: [],
    isRecord: false,
    isPlay: false
  });
  store.subscribe(function (state) {
    if (state.isPlay || state.sounds.length === 0) {
      play.disabled = true;
      play.style.backgroundColor = 'gray';
    } else {
      play.disabled = false;
      play.style.backgroundColor = '#add8e6';
    }
  }); //Перебераем список с цветными падами и навешиваем обработчик на каждый пад и функцию воспроизвдения музыки

  pads.forEach(function (pad, index) {
    pad.addEventListener('click', function () {
      soundElements[index].currentTime = 0; //Запускаем проеигравание музыки с начала, при повторном нажатие на pad или многократном нажатие

      soundElements[index].play();
      createBubbles(index); //Создание шарика

      if (store.getState().isRecord) {
        store.setState(function (oldState) {
          var sounds = [].concat(_toConsumableArray(oldState.sounds), [soundElements[index]]);
          return {
            sounds: sounds
          };
        });
      }
    });
  });
  store.subscribe(function (state) {
    rec.style.backgroundColor = state.isRecord ? 'red' : '#add8e6'; //Если isRecord = true то присваиваем background красный цвет, т.е. при нажатие на кнопку rec background будет красным
  });
  rec.addEventListener('click', function () {
    store.setState(function (oldState) {
      return {
        isRecord: !oldState.isRecord
      };
    });
  });

  function playSounds() {
    var sounds = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    if (sounds.length === 0) {
      store.setState({
        isPlay: false
      });
      return;
    }

    if (!store.getState().isPlay) {
      store.setState({
        isPlay: true
      });
    }

    var sound = sounds.shift();
    sound.currentTime = 0;
    sound.play();
    sound.addEventListener('ended', function () {
      playSounds(sounds);
    }, {
      once: true
    });
  }

  play.addEventListener('click', function () {
    playSounds(_toConsumableArray(store.getState().sounds));
  });
  reset.addEventListener('click', function () {
    store.setState({
      sounds: []
    });
  }); //Функция для создания цветного шарика

  var createBubbles = function createBubbles(index) {
    var bubble = document.createElement('div');
    visual.appendChild(bubble);
    bubble.style.backgroundColor = colors[index];
    bubble.style.animation = 'jump 1s ease';
    bubble.addEventListener('animationend', function () {
      visual.removeChild(this);
    });
  };

  store.setState({});
});

}());
