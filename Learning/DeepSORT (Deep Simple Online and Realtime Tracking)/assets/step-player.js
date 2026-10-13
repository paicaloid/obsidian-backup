/**
 * Reusable step-through animation controller for lesson diagrams.
 * Pairs with the .viz / .step-player / .viz-node / .viz-edge classes in style.css.
 *
 * Usage:
 *   createStepPlayer(containerEl, [
 *     { label: "Start", caption: "...", render: function () { ... mutate the SVG ... } },
 *     ...
 *   ], { interval: 1800 });
 *
 * Each step's render() should set element classes/text directly (steps are not
 * diffed — render() should set full state for that step, not just deltas).
 */
function createStepPlayer(container, steps, opts) {
  opts = opts || {};
  var interval = opts.interval || 1800;
  var idx = 0;
  var timer = null;

  var captionEl = container.querySelector('.viz-caption');

  var bar = document.createElement('div');
  bar.className = 'step-player';

  var btnPrev = document.createElement('button');
  btnPrev.className = 'step-btn';
  btnPrev.type = 'button';
  btnPrev.textContent = '◀ Prev';

  var btnPlay = document.createElement('button');
  btnPlay.className = 'step-btn step-play';
  btnPlay.type = 'button';
  btnPlay.textContent = '▶ Play';

  var btnNext = document.createElement('button');
  btnNext.className = 'step-btn';
  btnNext.type = 'button';
  btnNext.textContent = 'Next ▶';

  var label = document.createElement('span');
  label.className = 'step-label';

  var dots = document.createElement('div');
  dots.className = 'step-dots';
  steps.forEach(function (_, i) {
    var d = document.createElement('button');
    d.className = 'step-dot';
    d.type = 'button';
    d.setAttribute('aria-label', 'Go to step ' + (i + 1));
    d.addEventListener('click', function () {
      stopPlay();
      goTo(i);
    });
    dots.appendChild(d);
  });

  bar.appendChild(label);
  bar.appendChild(btnPrev);
  bar.appendChild(btnPlay);
  bar.appendChild(btnNext);
  bar.appendChild(dots);
  container.appendChild(bar);

  function stopPlay() {
    if (timer) {
      clearInterval(timer);
      timer = null;
      btnPlay.textContent = '▶ Play';
    }
  }

  function render() {
    steps[idx].render();
    if (captionEl) captionEl.textContent = steps[idx].caption || '';
    label.textContent = 'Step ' + (idx + 1) + ' / ' + steps.length + (steps[idx].label ? ' — ' + steps[idx].label : '');
    Array.prototype.forEach.call(dots.children, function (d, i) {
      d.classList.toggle('active', i === idx);
    });
    btnPrev.disabled = idx === 0;
    btnNext.disabled = idx === steps.length - 1;
  }

  function goTo(i) {
    idx = Math.max(0, Math.min(steps.length - 1, i));
    render();
  }

  btnPrev.addEventListener('click', function () {
    stopPlay();
    goTo(idx - 1);
  });
  btnNext.addEventListener('click', function () {
    stopPlay();
    goTo(idx + 1);
  });
  btnPlay.addEventListener('click', function () {
    if (timer) {
      stopPlay();
      return;
    }
    if (idx === steps.length - 1) idx = 0;
    btnPlay.textContent = '⏸ Pause';
    render();
    timer = setInterval(function () {
      if (idx >= steps.length - 1) {
        stopPlay();
        return;
      }
      goTo(idx + 1);
    }, interval);
  });

  render();
  return { goTo: goTo, stop: stopPlay };
}
