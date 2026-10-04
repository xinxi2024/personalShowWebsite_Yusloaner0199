/* Sloaner Nexus · interactive constellation effects. No backend or storage access. */
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = matchMedia('(hover: hover) and (pointer: fine)');
  const hero = document.getElementById('top');
  let destroyPointerEffects = null;

  function enablePointerEffects() {
    const events = new AbortController();
    const options = { passive: true, signal: events.signal };
    const layer = document.createElement('div');
    layer.className = 'nexus-cursor';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<canvas class="nexus-cursor-trail"></canvas><div class="nexus-cursor-ring"><span>↗</span></div><div class="nexus-cursor-dot"></div>';
    document.body.appendChild(layer);
    const trail = layer.querySelector('canvas');
    const dot = layer.querySelector('.nexus-cursor-dot');
    const ring = layer.querySelector('.nexus-cursor-ring');
    const ctx = trail.getContext('2d');
    if (!ctx || getComputedStyle(dot).position !== 'fixed') { layer.remove(); return () => {}; }
    let frame = null, visible = false, pressed = false, hover = false, outbound = false;
    let x = 0, y = 0, rx = 0, ry = 0, angle = 0, particles = [], lastX = 0, lastY = 0;
    let magnet = null, magnetX = 0, magnetY = 0;
    const MAX_PARTICLES = 48;
    const nativeInput = 'input,textarea,select,[contenteditable]:not([contenteditable="false"])';

    function resizeTrail() {
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      trail.width = Math.round(innerWidth * ratio);
      trail.height = Math.round(innerHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      // A resize invalidates the old viewport coordinates; wait for the next pointer move.
      hide();
    }
    function schedule() {
      if (frame === null && visible && !document.hidden) frame = requestAnimationFrame(draw);
    }
    function addParticle(px, py, burst = false) {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      const a = Math.random() * Math.PI * 2;
      const speed = burst ? 28 + Math.random() * 55 : 8 + Math.random() * 14;
      particles.push({ x: px, y: py, dx: Math.cos(a) * speed, dy: Math.sin(a) * speed,
        start: performance.now(), life: burst ? 620 : 420, radius: burst ? 1.2 + Math.random() * 1.5 : 1 + Math.random(),
        color: Math.random() > .45 ? '103,232,249' : '183,166,255' });
    }
    function resetMagnet() {
      if (magnet) { magnet.style.removeProperty('translate'); magnet = null; }
    }
    function hide() {
      visible = false; pressed = false; particles = [];
      document.body.classList.remove('nexus-cursor-ready');
      layer.classList.remove('is-pressed');
      if (frame !== null) { cancelAnimationFrame(frame); frame = null; }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      resetMagnet();
      hero.style.removeProperty('--scene-x'); hero.style.removeProperty('--scene-y');
      hero.style.removeProperty('--scene-rx'); hero.style.removeProperty('--scene-ry');
    }
    function draw(now) {
      frame = null;
      if (!visible || document.hidden) return;
      rx += (x - rx) * .2; ry += (y - ry) * .2;
      const moving = Math.hypot(x - rx, y - ry) > .15;
      dot.style.transform = `translate3d(${x}px,${y}px,0)`;
      ring.style.transform = `translate3d(${rx.toFixed(2)}px,${ry.toFixed(2)}px,0)`;
      ring.style.setProperty('--cursor-angle', `${angle.toFixed(1)}deg`);
      ring.classList.toggle('is-hover', hover);
      ring.classList.toggle('is-outbound', outbound);
      layer.classList.toggle('is-pressed', pressed);
      if (magnet) {
        magnet.style.translate = `${magnetX.toFixed(1)}px ${magnetY.toFixed(1)}px`;
        magnet.style.setProperty('--button-x', `${x - magnet.getBoundingClientRect().left}px`);
        magnet.style.setProperty('--button-y', `${y - magnet.getBoundingClientRect().top}px`);
      }
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      particles = particles.filter(p => now - p.start < p.life);
      for (const p of particles) {
        const age = Math.max(0, (now - p.start) / p.life), fade = 1 - age;
        const px = p.x + p.dx * age, py = p.y + p.dy * age;
        ctx.beginPath(); ctx.arc(px, py, p.radius * fade, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${fade * .8})`; ctx.fill();
        ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px - p.dx * .06, py - p.dy * .06);
        ctx.strokeStyle = `rgba(${p.color},${fade * .35})`; ctx.lineWidth = .7; ctx.stroke();
      }
      layer.dataset.settled = String(!moving && particles.length === 0);
      if (moving || particles.length) schedule();
    }
    function move(e) {
      if (e.pointerType !== 'mouse' || document.hidden) return;
      if (!(e.target instanceof Element) || e.target.closest(nativeInput)) { hide(); return; }
      const target = e.target.closest('a,button,summary,[role="button"]');
      hover = Boolean(target && !target.matches(':disabled'));
      outbound = Boolean(target?.matches('a[target="_blank"]'));
      x = e.clientX; y = e.clientY;
      if (!visible) {
        visible = true; rx = x; ry = y; lastX = x; lastY = y;
        document.body.classList.add('nexus-cursor-ready');
      }
      const distance = Math.hypot(x - lastX, y - lastY);
      if (distance >= 12) {
        angle = Math.atan2(y - lastY, x - lastX) * 180 / Math.PI;
        const count = Math.min(3, Math.floor(distance / 12));
        for (let i = 1; i <= count; i++) addParticle(lastX + (x - lastX) * i / count, lastY + (y - lastY) * i / count);
        lastX = x; lastY = y;
      }
      const nextMagnet = e.target.closest('.hero__btns .btn,.contact-strip .btn,.nav__cta');
      if (nextMagnet !== magnet) { resetMagnet(); magnet = nextMagnet; }
      if (magnet) {
        const r = magnet.getBoundingClientRect();
        magnetX = Math.max(-5, Math.min(5, (x - r.left - r.width / 2) * .07));
        magnetY = Math.max(-4, Math.min(4, (y - r.top - r.height / 2) * .12));
      }
      if (hero.contains(e.target)) {
        const r = hero.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, (x - r.left) / r.width * 2 - 1));
        const ny = Math.max(-1, Math.min(1, (y - r.top) / r.height * 2 - 1));
        hero.style.setProperty('--scene-x', `${(nx * 12).toFixed(2)}px`);
        hero.style.setProperty('--scene-y', `${(ny * 9).toFixed(2)}px`);
        hero.style.setProperty('--scene-rx', `${(-ny * 4).toFixed(2)}deg`);
        hero.style.setProperty('--scene-ry', `${(nx * 5).toFixed(2)}deg`);
      }
      schedule();
    }
    document.addEventListener('pointermove', move, options);
    document.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || !visible || e.target.closest(nativeInput)) return;
      x = e.clientX; y = e.clientY; pressed = true;
      for (let i = 0; i < 14; i++) addParticle(x, y, true);
      schedule();
    }, options);
    document.addEventListener('pointerup', () => { pressed = false; schedule(); }, options);
    document.addEventListener('pointerout', e => { if (!e.relatedTarget) hide(); }, options);
    document.addEventListener('keydown', hide, { signal: events.signal });
    document.addEventListener('visibilitychange', () => { if (document.hidden) hide(); }, { signal: events.signal });
    window.addEventListener('blur', hide, { signal: events.signal });
    window.addEventListener('resize', resizeTrail, options);
    resizeTrail();
    return () => { hide(); events.abort(); layer.remove(); };
  }
  function syncEffects() {
    if (destroyPointerEffects) { destroyPointerEffects(); destroyPointerEffects = null; }
    if (!reduced.matches && pointer.matches) destroyPointerEffects = enablePointerEffects();
  }
  reduced.addEventListener('change', syncEffects);
  pointer.addEventListener('change', syncEffects);
  syncEffects();

  // Add staggered reveals without making content dependent on JavaScript or observers.
  if (!reduced.matches && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('has-arrived'); observer.unobserve(entry.target);
      }
    }, { threshold: .08 });
    document.querySelectorAll('.about__card,.ability,.honor-highlights article').forEach((el, i) => {
      el.classList.add('constellation-reveal');
      el.style.setProperty('--reveal-delay', `${i % 3 * 70}ms`);
      observer.observe(el);
    });
  }
})();
