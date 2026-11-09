// fleet/releases — hero terminal typing loop. Respects prefers-reduced-motion.
(function () {
  var el = document.getElementById('typed');
  var out = document.getElementById('tout');
  if (!el) return;
  var lines = JSON.parse(el.dataset.lines || '[]');
  if (!lines.length) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = lines[0][0];
    out.textContent = lines[0][1];
    return;
  }
  var li = 0, ci = 0, deleting = false;
  function tick() {
    var cmd = lines[li][0], res = lines[li][1];
    if (!deleting) {
      ci++;
      el.textContent = cmd.slice(0, ci);
      if (ci >= cmd.length) {
        out.textContent = res;
        deleting = true;
        setTimeout(tick, 2200);
        return;
      }
      setTimeout(tick, 34 + Math.random() * 46);
    } else {
      ci -= 4;
      if (ci <= 0) {
        ci = 0; deleting = false; out.textContent = '';
        li = (li + 1) % lines.length;
        setTimeout(tick, 500);
        return;
      }
      el.textContent = cmd.slice(0, ci);
      setTimeout(tick, 18);
    }
  }
  tick();
})();
