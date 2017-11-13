(function () {
  'use strict';

  var panels = document.getElementsByClassName('panel');
  var spin = document.getElementById('spin');

  var cards = [
    'seven.png',
    'bell.png',
    'cherry.png'
  ];

  var stopCount = 0;
  var timers = [];

  function runslot(n) {
    timers[n] = setTimeout(function () {
      panels[n].children[0].src = 'img/' + cards[Math.floor(Math.random() * cards.length)];
      runslot(n);
    }, 50)
  }

  function initPanel() {
    for (var i = 0; i < panels.length; i++) {
      panels[i].children[1].addEventListener('click', function () {
        if (this.className.indexOf('inactive') !== -1) {
          return;
        }
        clearTimeout(timers[this.dataset.index]);
        stopCount++;
        this.className = 'stop inactive';

        if (stopCount === panels.length) {
          stopCount = 0;
          checkResults();
          spin.className = '';
        }
      });
    }
  }

  initPanel();

  spin.addEventListener("click", function () {
    if (this.className.indexOf('inactive') !== -1) {
      return;
    }
    for (var i = 0; i < panels.length; i++) {
      // 変数の初期化
      stopCount = 0;
      panels[i].children[0].className = '';
      panels[i].children[1].className = 'stop';
      this.className = 'inactive';


      runslot(i);
    }
  });

  function checkResults() {
    var imgs = [];
    for (var i = 0; i < panels.length; i++) {
      imgs[i] = panels[i].children[0];
    }

    for (var i = 0; i < imgs.length; i++) {
      var matched = false;
      for (var j = 0; j < imgs.length; j++) {
        if (i === j) {
          continue;
        }
        if (imgs[i].src === imgs[j].src) {
          matched = true;
          break;
        }
      }
      if (!matched) {
        imgs[i].className = 'unmatched';
      }

    }
  }


})();