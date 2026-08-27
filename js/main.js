/* Кафе «Белка» — скрипты интерфейса */
(function () {
  'use strict';

  /* ---------- Мобильное меню ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Тень у шапки при скролле ---------- */
  var header = document.getElementById('header');
  var onScroll = function () {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Переключение разделов меню ---------- */
  var tabs = document.querySelectorAll('.menu__tab');
  var panels = document.querySelectorAll('.menu__panel');

  Array.prototype.forEach.call(tabs, function (tab) {
    tab.addEventListener('click', function () {
      var cat = tab.dataset.cat;

      Array.prototype.forEach.call(tabs, function (t) {
        var active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      Array.prototype.forEach.call(panels, function (p) {
        p.classList.toggle('is-active', p.dataset.panel === cat);
      });
    });
  });

  /* ---------- Появление блоков при скролле ---------- */
  var revealables = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    Array.prototype.forEach.call(revealables, function (el) { io.observe(el); });
  } else {
    showAll();
  }

  function showAll() {
    Array.prototype.forEach.call(revealables, function (el) { el.classList.add('is-visible'); });
  }

  /* Подстраховка: если наблюдатель по какой-то причине не сработал,
     через 4 секунды показываем содержимое в любом случае. */
  window.setTimeout(showAll, 4000);
})();
