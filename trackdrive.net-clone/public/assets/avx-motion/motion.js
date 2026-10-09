/*
 * Avortyx motion layer — progressive enhancement for every marketing page.
 * Pages render normally without it; this only adds classes and decorative layers.
 */
(function () {
  'use strict';

  var ASSETS = '/assets/trackdrive_marketing/brand-assets/ringba%20assets/';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var BAKED = '/assets/avx-baked/';
  var DARK = document.documentElement.getAttribute('data-bs-theme') === 'dark';
  // colored spheres that have a pre-tinted blue twin in /assets/avx-baked
  var BLUE_TWIN = /^(green-sphere-120|orange_sphere-120|pink-sphere-120|purple-sphere-120|icon-sphere--green|icon-sphere--pink|icon-sphere--orange)\.png$/;

  function img(name, className) {
    var el = document.createElement('img');
    var twin = BLUE_TWIN.test(name) && !/avx-keep/.test(className || '');
    el.src = twin ? BAKED + name.replace('.png', '-b.png') : ASSETS + name;
    el.alt = '';
    el.decoding = 'async';
    if (className) el.className = className;
    // colored spheres are tinted to the hero blue, unless marked avx-keep
    return el;
  }

  // theme-matched pre-rendered art: <base>-l.png (light) or <base>-d.png (dark)
  function baked(base, className) {
    return bakedFile(base + (DARK ? '-d' : '-l') + '.png', className);
  }

  function bakedFile(file, className) {
    var el = document.createElement('img');
    el.src = BAKED + file;
    el.alt = '';
    el.decoding = 'async';
    if (className) el.className = className;
    return el;
  }

  function onVisible(el, enter, leave, threshold) {
    if (!('IntersectionObserver' in window)) { enter(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) enter();
        else if (leave) leave();
      });
    }, { threshold: threshold || 0.15 }).observe(el);
  }

  // ---------- Scroll progress ----------

  function initProgress() {
    var bar = document.createElement('div');
    bar.className = 'avx-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    if (window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()')) return; // runs in CSS
    var max = 1, ticking = false;
    function measure() { max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight); }
    function update() {
      bar.style.transform = 'scaleX(' + Math.min(window.scrollY / max, 1).toFixed(4) + ')';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(document.body);
    measure();
    update();
  }

  // ---------- Scroll reveal ----------

  var REVEAL = [
    'main .mktg-section-header',
    'main section h2',
    'main section .lead',
    'main section .row > [class*="col-"]',
    'main .flow-node',
    'main .flow-arrow',
    'main .flow-arrow-down',
    'main .card',
    'main .integration-logo-card',
    'main .bg-light.rounded-3',
    'main ul.list-unstyled > li',
    '.marketing-cta-band .container',
    'footer .row > [class*="col-"]'
  ].join(',');

  // these stagger inside an already-revealing parent
  var STAGGER = '.flow-node, .flow-arrow, .flow-arrow-down, .card, .integration-logo-card, li';
  var SKIP = '.marketing-hero-simple, .mktg-lead-flow, .modal, nav, header, .navbar';

  function initReveal() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        io.unobserve(el);
        el.classList.add('avx-in');
        var delay = parseInt(el.style.getPropertyValue('--avx-delay'), 10) || 0;
        setTimeout(function () {
          el.classList.remove('avx-reveal', 'avx-in');
          el.style.removeProperty('--avx-delay');
        }, delay + 1100);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    var counts = new Map();
    document.querySelectorAll(REVEAL).forEach(function (el) {
      if (el.closest(SKIP)) return;
      if (el.parentElement && el.parentElement.closest('.avx-reveal') && !el.matches(STAGGER)) return;
      var parent = el.parentElement;
      var i = counts.get(parent) || 0;
      counts.set(parent, i + 1);
      el.style.setProperty('--avx-delay', Math.min(i * 90, 630) + 'ms');
      el.classList.add('avx-reveal');
      if (parent) parent.classList.add('avx-stage');
      io.observe(el);
    });
  }

  // ---------- Pointer tilt ----------

  function initTilt() {
    if (!finePointer) return;
    document.querySelectorAll('main .card, main .integration-logo-card, main .mktg-spotlight-visual, main .marketing-subpage-content .bg-light.rounded-3').forEach(function (el) {
      if (el.closest('.modal')) return;
      el.classList.add('avx-tilt');
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--avx-ry', (x * 10).toFixed(2) + 'deg');
        el.style.setProperty('--avx-rx', (y * -10).toFixed(2) + 'deg');
        el.classList.add('avx-tilting');
      });
      el.addEventListener('pointerleave', function () {
        el.classList.remove('avx-tilting');
      });
    });
  }

  // ---------- Floating spheres (heroes, CTA bands, convert section) ----------

  function addFloats(host, spheres, extraClass) {
    host.classList.add('avx-fx-host');
    var fx = document.createElement('div');
    fx.className = 'avx-fx' + (extraClass ? ' ' + extraClass : '');
    fx.setAttribute('aria-hidden', 'true');
    spheres.forEach(function (s) {
      var wrap = document.createElement('div');
      wrap.className = 'avx-float' + (s.soft ? ' avx-soft' : '') + (s.hideSm ? ' avx-hide-sm' : '');
      ['top', 'right', 'bottom', 'left'].forEach(function (k) { if (s[k]) wrap.style[k] = s[k]; });
      wrap.style.setProperty('--size', s.size + 'px');
      wrap.style.setProperty('--depth', s.depth);
      wrap.style.setProperty('--bob', s.bob || '9s');
      wrap.style.setProperty('--spin', s.spin || '40s');
      wrap.style.setProperty('--delay', s.delay || '0s');
      if (s.alpha) wrap.style.setProperty('--alpha', s.alpha);
      wrap.appendChild(s.baked ? bakedFile(s.baked) : img(s.src));
      fx.appendChild(wrap);
    });
    host.insertBefore(fx, host.firstChild);
    if (!reduced) parallax(host, fx);
    dimOverText(host, fx);
    return fx;
  }

  // fade any sphere whose resting position overlaps copy (positions are tuned for
  // centered layouts; left-aligned heroes and narrow screens wrap text beneath them)
  function dimOverText(host, fx) {
    function check() {
      var text = Array.prototype.map.call(
        host.querySelectorAll('h1, h2, h3, p, .lead, .btn, .flow-item'),
        function (t) { return t.getBoundingClientRect(); });
      Array.prototype.forEach.call(fx.children, function (f) {
        var r = f.getBoundingClientRect(), inset = r.width * 0.15;
        var hit = r.width > 0 && text.some(function (t) {
          return t.width > 0 && r.left + inset < t.right && r.right - inset > t.left &&
            r.top + inset < t.bottom && r.bottom - inset > t.top;
        });
        f.classList.toggle('avx-over-text', hit);
      });
    }
    requestAnimationFrame(check);
    window.addEventListener('load', check);
    var t = 0;
    window.addEventListener('resize', function () { clearTimeout(t); t = setTimeout(check, 200); });
  }

  // Writes a custom property only when its value changes (avoids needless style recalcs).
  function setVar(el, name, value) {
    var key = '_avx' + name;
    if (el[key] !== value) {
      el[key] = value;
      el.style.setProperty(name, value);
    }
  }

  // Eases pointer position and reports it with the host's scroll position.
  // All drivers share one rAF: every position is read first, then all styles are
  // written, so a frame never interleaves reads and writes (no layout thrashing).
  // Frames run only while something is moving.
  var drivers = [], driverRaf = 0;

  function scheduleDrivers() {
    if (!driverRaf) driverRaf = requestAnimationFrame(runDrivers);
  }

  function runDrivers() {
    driverRaf = 0;
    var active = drivers.filter(function (d) { return d.visible && d.dirty; });
    var y = window.scrollY;
    active.forEach(function (d) {          // read phase: cached geometry, no layout reads
      d.dirty = false;
      d.px += (d.tx - d.px) * d.ease;
      d.py += (d.ty - d.py) * d.ease;
      d.rect = d.pointerOnly ? null
        : { top: d.docTop - y, bottom: d.docTop + d.height - y, height: d.height };
    });
    active.forEach(function (d) {          // write phase
      d.onFrame(d.px, d.py, d.rect);
      if (Math.abs(d.tx - d.px) > 0.001 || Math.abs(d.ty - d.py) > 0.001) d.dirty = true;
    });
    if (drivers.some(function (d) { return d.visible && d.dirty; })) scheduleDrivers();
  }

  // section geometry is measured once (and on resize), never during scroll frames
  function measureDriver(d) {
    var r = d.host.getBoundingClientRect();
    d.docTop = r.top + window.scrollY;
    d.height = r.height;
  }

  function measureDrivers() {
    drivers.forEach(measureDriver);
    drivers.forEach(function (d) { d.dirty = true; });
    scheduleDrivers();
  }

  window.addEventListener('resize', measureDrivers);
  window.addEventListener('load', measureDrivers);
  if ('ResizeObserver' in window) {
    var resizeTimer = 0;
    new ResizeObserver(function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measureDrivers, 120);
    }).observe(document.documentElement);
  }

  function driver(host, ease, onFrame, pointerOnly) {
    var d = { host: host, ease: ease, onFrame: onFrame, pointerOnly: !!pointerOnly,
      px: 0, py: 0, tx: 0, ty: 0, visible: false, dirty: false, rect: null, docTop: 0, height: 0 };
    drivers.push(d);
    measureDriver(d);
    if (finePointer) {
      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect();
        d.tx = (e.clientX - r.left) / r.width - 0.5;
        d.ty = (e.clientY - r.top) / r.height - 0.5;
        d.dirty = true;
        scheduleDrivers();
      });
      host.addEventListener('pointerleave', function () { d.tx = 0; d.ty = 0; d.dirty = true; scheduleDrivers(); });
    }
    onVisible(host, function () { measureDriver(d); d.visible = true; d.dirty = true; scheduleDrivers(); },
      function () { d.visible = false; }, 0);
  }

  function parallax(host, target) {
    driver(host, 0.08, function (px, py, r) {
      setVar(target, '--avx-px', (px * 24).toFixed(2));
      setVar(target, '--avx-py', (py * 24).toFixed(2));
    });
  }

  function initHeroFx() {
    var hero = document.querySelector('main > section');
    if (!hero || hero.closest('.modal')) return;
    addFloats(hero, [
      { src: 'blue-sphere-120.png', top: '14%', left: '5%', size: 84, depth: 1.6, bob: '8s', spin: '38s' },
      { src: 'icon-sphere--green.png', top: '20%', right: '6%', size: 96, depth: 2.2, bob: '10s', spin: '55s', delay: '-3s' },
      { src: 'orange_sphere-120.png', bottom: '10%', left: '14%', size: 46, depth: 0.9, bob: '7s', delay: '-2s', hideSm: true },
      { src: 'purple-sphere-120.png', bottom: '14%', right: '16%', size: 58, depth: 1.2, bob: '11s', delay: '-5s', hideSm: true },
      { src: 'icon-sphere--pink.png', top: '6%', left: '38%', size: 30, depth: 0.6, bob: '6s', delay: '-1s', hideSm: true }
    ]);
  }

  function initCtaFx() {
    document.querySelectorAll('.marketing-cta-band').forEach(function (band) {
      var fx = addFloats(band, [
        { src: 'blue-sphere-120.png', top: '18%', left: '8%', size: 70, depth: 1.4, alpha: .8 },
        { src: 'icon-sphere--green.png', bottom: '12%', right: '9%', size: 90, depth: 2, delay: '-4s', alpha: .85 }
      ]);
      fx.insertBefore(bakedFile('cta-glow.png', 'avx-waves'), fx.firstChild);
    });
  }

  // ---------- "Everything you need to convert" 3D lead-flow scene ----------

  function initLeadFlow() {
    document.querySelectorAll('.mktg-lead-flow').forEach(function (flowWrap) {
      var flow = flowWrap.querySelector('.hero-simple-flow');
      if (!flow) return;
      flowWrap.classList.add('avx-flow3d');

      var leads = flowWrap.querySelector('.hero-simple-node-leads .hero-simple-node-icon');
      var revenue = flowWrap.querySelector('.hero-simple-node-revenue .hero-simple-node-icon');
      var hubIcon = flowWrap.querySelector('.hero-simple-hub-icon');
      if (leads) leads.insertBefore(img('blue-sphere-120.png', 'avx-orb'), leads.firstChild);
      if (revenue) revenue.insertBefore(img('green-sphere-120.png', 'avx-orb'), revenue.firstChild);
      if (hubIcon) {
        hubIcon.insertBefore(img('icon-sphere--blue.png', 'avx-orb'), hubIcon.firstChild);
        // the animated Avortyx mark replaces the bolt above the name
        var bolt = hubIcon.querySelector('.fa-bolt');
        if (bolt) bolt.parentNode.replaceChild(vortexSvg('avx-vx-hub', 'avx-hub-mark'), bolt);
        var orbits = document.createElement('div');
        orbits.className = 'avx-orbits';
        orbits.setAttribute('aria-hidden', 'true');
        ['pink-sphere-120.png', 'orange_sphere-120.png'].forEach(function (name) {
          var orbit = document.createElement('div');
          orbit.className = 'avx-orbit';
          orbit.appendChild(img(name, 'avx-sat'));
          orbits.appendChild(orbit);
        });
        hubIcon.parentElement.insertBefore(orbits, hubIcon);
      }

      var section = flowWrap.closest('section');
      if (section) {
        addFloats(section, [
          { baked: 'blue-sphere-soft.png', top: '4%', left: '-6%', size: 360, depth: 1.2, bob: '14s', spin: '90s' },
          { baked: 'green-sphere-soft-b.png', bottom: '-12%', right: '-5%', size: 320, depth: 1.8, bob: '12s', spin: '80s', delay: '-6s' }
        ], 'avx-convert-bg');
      }

      // tilt wrapper: the entrance and pointer tilt live here (updated only while the
      // pointer moves); the idle sway is a pure CSS animation on the flow itself
      var tilt = document.createElement('div');
      tilt.className = 'avx-flow-tilt';
      flow.parentNode.insertBefore(tilt, flow);
      tilt.appendChild(flow);

      if (reduced) { flowWrap.classList.add('avx-seen', 'avx-settled'); return; }

      driver(flowWrap, 0.06, function (hx, hy) {
        setVar(tilt, '--avx-hx', hx.toFixed(3));
        setVar(tilt, '--avx-hy', hy.toFixed(3));
      }, true);
      onVisible(flowWrap, function () {
        if (flowWrap.classList.contains('avx-seen')) return;
        flowWrap.classList.add('avx-seen');
        setTimeout(function () { flowWrap.classList.add('avx-settled'); }, 1500);
      }, null, 0.2);
    });
  }

  // ---------- Spotlight headings: unique 3D scene behind each heading ----------

  var HEADING_FX = [
    { re: /^ping\s*\/\s*post$/i, type: 'ping', w: 340, h: 340 },
    { re: /^power dialer$/i, type: 'dialer', w: 360, h: 360 },
    { re: /^call tracking$/i, type: 'tracking', w: 460, h: 260 },
    { re: /^lead automation$/i, type: 'automation', w: 360, h: 360 },
    { re: /^agent control center$/i, type: 'gyro', w: 320, h: 320 }
  ];

  function buildHeadingFx(type) {
    var anim = document.createElement('div');
    anim.className = 'avx-hfx-anim';
    function add(el) { anim.appendChild(el); return el; }
    function div(cls) { var d = document.createElement('div'); d.className = cls; return d; }

    if (type === 'ping') {
      add(baked('shine', 'avx-core'));
      for (var i = 0; i < 3; i++) add(div('avx-echo'));
    } else if (type === 'dialer') {
      add(baked('dial', 'avx-core'));
      add(div('avx-dial-face'));
      var holes = add(div('avx-dial-holes'));
      for (var k = 0; k < 10; k++) {
        var hole = div('avx-dial-hole');
        hole.style.setProperty('--a', (k * 30 + 60) + 'deg');
        holes.appendChild(hole);
      }
      add(img('green-sphere-120.png', 'avx-dial-stop'));
      add(div('avx-dial-ring'));
    } else if (type === 'tracking') {
      // attribution map: calls land as pins, each traced to its source and number
      var floor = add(div('avx-trk-floor'));
      // the masked grid is its own layer: a mask on the floor itself would flatten the pins
      var grid = div('avx-trk-grid');
      grid.appendChild(div('avx-trk-scan'));
      floor.appendChild(grid);
      setTimeout(function () { trackingPins(floor); }, 0);
    } else if (type === 'automation') {
      var loop = add(div('avx-loop'));
      ['blue-sphere-120.png', 'green-sphere-120.png', 'orange_sphere-120.png', 'pink-sphere-120.png', 'purple-sphere-120.png']
        .forEach(function (name, n, all) {
          var slot = div('avx-slot');
          slot.style.setProperty('--a', (360 / all.length * n) + 'deg');
          slot.style.setProperty('--r', '180px');
          slot.appendChild(img(name));
          loop.appendChild(slot);
        });
    } else if (type === 'gyro') {
      [1, 2, 3].forEach(function (n) {
        var g = add(div('avx-gyro avx-gyro-' + n));
        g.appendChild(baked('gyro'));
      });
      add(img('blue-sphere-120.png', 'avx-gyro-core'));
    }
    return anim;
  }

  var TRK_SOURCES = ['Google Ads', 'Meta', 'Bing', 'TikTok', 'Email', 'Direct', 'Affiliate'];

  function trackingPins(floor) {
    if (reduced) return;
    var timer = null, side = 0;
    function drop() {
      timer = setTimeout(drop, 1300 + Math.random() * 700);
      if (motionPaused() || floor.querySelectorAll('.avx-pin').length > 3) return;
      // alternate sides and keep clear of the heading in the middle
      side = 1 - side;
      var x = side ? 58 + Math.random() * 28 : 14 + Math.random() * 28;
      var y = 22 + Math.random() * 56;
      var pin = document.createElement('div');
      pin.className = 'avx-pin';
      pin.style.left = x.toFixed(1) + '%';
      pin.style.top = y.toFixed(1) + '%';
      var num = '(888) 5' + (10 + Math.floor(Math.random() * 89)) + '-0' + (100 + Math.floor(Math.random() * 899));
      pin.innerHTML = '<i class="avx-pin-ring"></i><i class="avx-pin-ring avx-pin-ring-2"></i>' +
        '<div class="avx-pin-stand"><b class="avx-pin-stem"></b><span class="avx-pin-tag"><em>' +
        TRK_SOURCES[Math.floor(Math.random() * TRK_SOURCES.length)] + '</em>' + num + '</span></div>';
      floor.appendChild(pin);
      setTimeout(function () { if (pin.parentNode) pin.parentNode.removeChild(pin); }, 3600);
    }
    onVisible(floor, function () { if (!timer) timer = setTimeout(drop, 300); },
      function () { clearTimeout(timer); timer = null; }, 0.05);
  }

  function initHeadingFx() {
    document.querySelectorAll('main .mktg-section-header > h2').forEach(function (h2) {
      var text = h2.textContent.trim();
      var cfg = HEADING_FX.filter(function (c) { return c.re.test(text); })[0];
      if (!cfg) return;
      var host = h2.parentElement;
      var section = host.closest('section') || host;
      host.classList.add('avx-hfx-host');
      section.classList.add('avx-clip');

      var fx = document.createElement('div');
      fx.className = 'avx-hfx avx-hfx-' + cfg.type;
      fx.setAttribute('aria-hidden', 'true');
      fx.style.setProperty('--w', cfg.w + 'px');
      fx.style.setProperty('--h', cfg.h + 'px');
      var stage = document.createElement('div');
      stage.className = 'avx-hfx-stage';
      stage.appendChild(buildHeadingFx(cfg.type));
      fx.appendChild(stage);
      host.insertBefore(fx, h2);
      if (reduced) return;

      // pointer + scroll make the scene react in 3D while it is on screen
      driver(section, 0.07, function (hx, hy, r) {
        setVar(fx, '--avx-hx', hx.toFixed(3));
        setVar(fx, '--avx-hy', hy.toFixed(3));
      });
    });
  }

  // ---------- Bottom-of-page 3D wave floors (one style per page) ----------

  // layer: [image, mode (tile|drift|zoom), extra classes, {alpha, speed, swell, y, z, pos, delay}]
  var WAVE_STYLES = {
    strands: { tilt: '52deg', layers: [
      ['strands', 'tile', '', { alpha: .45, speed: '70s', swell: '7s', y: '-40px', z: '-120px' }],
      ['strands2', 'tile', 'avx-bw-reverse avx-bw-mirror', { alpha: .7, speed: '52s', swell: '5.5s' }],
      ['strands', 'tile', '', { alpha: .95, speed: '34s', swell: '4.5s', y: '50px', z: '80px' }]
    ] },
    ribbons: { tilt: '38deg', layers: [
      ['ribbons', 'drift', 'avx-bw-mirror', { alpha: .35, speed: '22s', swell: '9s', y: '-30px', z: '-140px', pos: '55%' }],
      ['ribbons', 'drift', '', { alpha: .6, speed: '16s', swell: '6s', pos: '62%' }]
    ] },
    mesh: { tilt: '48deg', layers: [
      ['mesh', 'drift', '', { alpha: .85, speed: '20s', swell: '7s', pos: '70%' }]
    ] },
    grid: { tilt: '66deg', layers: [
      [null, 'grid', '', { alpha: .9 }]
    ], noswell: true },
    // five stacked layers swelling in sequence: a rolling 3D tide
    tide: { tilt: '60deg', layers: [
      ['strands', 'tile', '', { alpha: .35, speed: '90s', swell: '5s', swellDelay: '0s', y: '-110px', z: '-320px' }],
      ['strands2', 'tile', 'avx-bw-reverse avx-bw-mirror', { alpha: .5, speed: '70s', swell: '5s', swellDelay: '-1s', y: '-60px', z: '-200px' }],
      ['strands', 'tile', '', { alpha: .65, speed: '55s', swell: '5s', swellDelay: '-2s', y: '-10px', z: '-90px' }],
      ['strands2', 'tile', 'avx-bw-mirror', { alpha: .8, speed: '42s', swell: '5s', swellDelay: '-3s', y: '40px', z: '10px' }],
      ['strands', 'tile', 'avx-bw-reverse', { alpha: .95, speed: '32s', swell: '5s', swellDelay: '-4s', y: '90px', z: '110px' }]
    ] },
    signal: { tilt: '42deg', layers: [
      ['signal', 'tile', 'avx-bw-mirror avx-bw-reverse', { alpha: .35, speed: '60s', swell: '1.9s', y: '-30px', z: '-110px' }],
      ['signal', 'tile', '', { alpha: .85, speed: '40s', swell: '1.3s' }]
    ] },
    streak: { tilt: '46deg', layers: [
      ['streak-bot', 'drift', 'avx-bw-mirror', { alpha: .5, speed: '20s', swell: '8s', y: '-30px', z: '-120px', pos: '70%' }],
      ['streak-top', 'drift', '', { alpha: .7, speed: '14s', swell: '6s', y: '30px', z: '60px', pos: '40%' }]
    ] }
  };

  var WAVE_BY_PAGE = {
    '/': 'strands',
    '/features.html': 'ribbons',
    '/pricing.html': 'mesh',
    '/careers.html': 'streak',
    '/sign_up.html': 'grid',
    '/users/sign_in.html': 'tide',
    '/features/integrations.html': 'strands',
    '/brand_assets.html': 'signal',
    '/privacy_policy.html': 'mesh',
    '/terms_of_service.html': 'ribbons'
  };
  var WAVE_ROTATION = ['ribbons', 'mesh', 'grid', 'signal', 'streak'];

  function pageKey() {
    var path = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    return path === '/' ? '/' : (/\.html$/.test(path) ? path : path + '.html');
  }

  function pageWaveStyle() {
    var key = pageKey();
    if (WAVE_BY_PAGE[key]) return WAVE_BY_PAGE[key];
    var h = 0;
    for (var i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) >>> 0;
    return WAVE_ROTATION[h % WAVE_ROTATION.length];
  }

  function buildWaveLayers(style, container) {
    style.layers.forEach(function (l) {
      var o = l[3] || {};
      var layer = document.createElement('div');
      layer.className = 'avx-bw-layer' + (style.noswell ? ' avx-bw-noswell' : '');
      if (o.swell) layer.style.setProperty('--swell', o.swell);
      if (o.swellDelay) layer.style.setProperty('--swell-delay', o.swellDelay);
      if (o.y) layer.style.setProperty('--y', o.y);
      if (o.z) layer.style.setProperty('--z', o.z);
      var im = document.createElement('div');
      im.className = 'avx-bw-img avx-bw-' + l[1] + ' ' + l[2];
      if (l[0]) im.style.setProperty('--src', 'url("' + BAKED + l[0] + (DARK ? '-d' : '-l') + '.png")');
      if (o.alpha) im.style.setProperty('--alpha', o.alpha);
      if (o.speed) im.style.setProperty('--speed', o.speed);
      if (o.pos) im.style.setProperty('--pos', o.pos);
      if (o.delay) im.style.setProperty('--delay', o.delay);
      layer.appendChild(im);
      container.appendChild(layer);
    });
  }

  // pointerOnly: the target ignores scroll position, so scrolling never touches it
  function reactive(host, target, pointerOnly) {
    if (reduced) return;
    driver(host, 0.06, function (hx, hy, r) {
      setVar(target, '--avx-hx', hx.toFixed(3));
      setVar(target, '--avx-hy', hy.toFixed(3));
    }, pointerOnly);
  }

  // sections inside <main> that are not nested in another section
  function topSections() {
    return Array.prototype.filter.call(document.querySelectorAll('main section'), function (sec) {
      return !sec.parentElement.closest('section') && !sec.closest('.modal');
    });
  }

  // pages whose closing scene is drawn on canvas instead of the baked wave art
  var BOTTOM_SCENES = {
    '/p/contact.html': function () { return globeScene('avx-cv-bottom avx-cv-globe'); },
    '/sign_up.html': function () { return lanesScene('avx-cv-bottom avx-cv-lanes'); },
    '/pricing.html': function () {
      return silkScene('avx-cv-bottom', [
        { color: '59,130,246', lines: 44, alpha: .3, base: .6, amp: .15, spread: .36, freq: 1, phase: 0, speed: .3 },
        { color: '165,180,252', lines: 16, alpha: .2, base: .64, amp: .1, spread: .18, freq: .7, phase: 2.2, speed: .22 }
      ]);
    },
    '/features/integrations.html': function () {
      return silkScene('avx-cv-bottom', [
        { color: '56,189,248', lines: 36, alpha: .28, base: .56, amp: .13, spread: .3, freq: .9, phase: 1, speed: .26 },
        { color: '99,102,241', lines: 30, alpha: .26, base: .66, amp: .12, spread: .28, freq: 1.2, phase: 3.6, speed: .2 }
      ]);
    }
  };

  function initBottomWaves() {
    if (/^\/features(\.html)?\/?$/.test(location.pathname)) return; // features page ends clean
    if (/^\/features\/(voice_agents|ai_sms_bots|transcriptions)\b/.test(location.pathname)) return; // AI pages too
    var sections = topSections().filter(function (sec) {
      return !sec.classList.contains('marketing-cta-band');
    });
    var host = sections[sections.length - 1];
    if (!host) return;
    var scene = BOTTOM_SCENES[pageKey()];
    if (scene) {
      host.classList.add('avx-fx-host', 'avx-bwaves-host');
      host.appendChild(scene());
      return;
    }
    var style = WAVE_STYLES[pageWaveStyle()];
    host.classList.add('avx-fx-host', 'avx-bwaves-host');

    var waves = document.createElement('div');
    waves.className = 'avx-bwaves';
    waves.setAttribute('aria-hidden', 'true');
    var plane = document.createElement('div');
    plane.className = 'avx-bwaves-plane';
    plane.style.setProperty('--tilt', style.tilt);
    buildWaveLayers(style, plane);
    waves.appendChild(plane);
    host.appendChild(waves);
    reactive(host, waves);
  }

  // ---------- Sign-in: one tilted ring behind the login card ----------

  function initAuthRing() {
    if (!/\/users\/sign_in(\.html)?$/.test(location.pathname)) return;
    var card = document.querySelector('main .mktg-auth-card');
    if (!card) return;
    var stage = card.parentElement;
    stage.classList.add('avx-auth-stage');
    var section = card.closest('section');
    if (section) section.classList.add('avx-fx-host');

    var ring = sbg('avx-authring');
    var tilt = document.createElement('div');
    tilt.className = 'avx-authring-tilt';
    var sway = document.createElement('div');
    sway.className = 'avx-authring-sway';
    sway.appendChild(baked('rings'));
    tilt.appendChild(sway);
    ring.appendChild(tilt);
    stage.insertBefore(ring, card);
    if (section) reactive(section, ring, true);
  }

  // ---------- Integrations page: 3D hub of orbiting integration logos ----------

  function initIntegrationsHub() {
    if (!/\/features\/integrations(\.html)?$/.test(location.pathname)) return;
    var h1 = document.querySelector('main section h1');
    var section = h1 && h1.closest('section');
    var container = section && section.querySelector('.container');
    if (!container) return;
    var logos = Array.prototype.slice.call(document.querySelectorAll('main .integration-card img'), 0, 8);
    if (logos.length < 4) return;
    section.classList.add('avx-ihub-host');

    var hub = document.createElement('div');
    hub.className = 'avx-ihub';
    hub.setAttribute('aria-hidden', 'true');
    var stage = document.createElement('div');
    stage.className = 'avx-ihub-stage';
    var orbit = document.createElement('div');
    orbit.className = 'avx-ihub-orbit';
    var spin = document.createElement('div');
    spin.className = 'avx-ihub-spin';

    logos.forEach(function (logo, i) {
      var a = (360 / logos.length * i) + 'deg';
      var spoke = document.createElement('div');
      spoke.className = 'avx-ihub-spoke';
      spoke.style.setProperty('--a', a);
      spoke.style.setProperty('--pd', (-i * 0.3) + 's');
      spin.appendChild(spoke);

      var slot = document.createElement('div');
      slot.className = 'avx-ihub-slot';
      slot.style.setProperty('--a', a);
      var tile = document.createElement('div');
      tile.className = 'avx-ihub-tile';
      var copy = document.createElement('img');
      copy.src = logo.currentSrc || logo.src;
      copy.alt = '';
      tile.appendChild(copy);
      slot.appendChild(tile);
      spin.appendChild(slot);
    });

    orbit.appendChild(spin);
    stage.appendChild(img('icon-sphere--blue.png', 'avx-ihub-core'));
    stage.appendChild(orbit);
    hub.appendChild(stage);
    container.appendChild(hub);
    reactive(section, hub, true);
  }

  // ---------- Integrations heading: 3D environment behind the top section ----------

  function initIntegrationsBackdrop() {
    if (!/\/features\/integrations(\.html)?$/.test(location.pathname)) return;
    var h1 = document.querySelector('main section h1');
    var section = h1 && h1.closest('section');
    if (!section) return;
    section.classList.add('avx-fx-host');

    section.insertBefore(streamsScene('avx-ibg', section), section.firstChild);
  }

  // ---------- Pricing header: eclipse horizon ----------

  function initPricingHorizon() {
    var hero = document.querySelector('main section.pricing-hero');
    if (!hero) return;
    hero.classList.add('avx-fx-host');
    hero.insertBefore(horizonScene('avx-cv-horizon'), hero.firstChild);
  }

  // ---------- Section backgrounds ----------

  function sbg(cls) {
    var el = document.createElement('div');
    el.className = 'avx-sbg ' + cls;
    el.setAttribute('aria-hidden', 'true');
    return el;
  }

  function initSectionBackgrounds() {
    // page-hero titles get tilted portal rings, like the landing page hero
    document.querySelectorAll('main section.mktg-subpage-hero h1').forEach(function (h1) {
      var wrap = document.createElement('div');
      wrap.className = 'avx-h1wrap';
      h1.parentNode.insertBefore(wrap, h1);
      var rings = sbg('avx-sbg-rings');
      var tilt = document.createElement('div');
      tilt.className = 'avx-sbg-rings-tilt';
      tilt.appendChild(baked('rings'));
      rings.appendChild(tilt);
      wrap.appendChild(rings);
      wrap.appendChild(h1);
      var section = wrap.closest('section');
      if (section) section.classList.add('avx-fx-host');
    });

    // "How It Works" boxes get a grid floor moving forward
    document.querySelectorAll('main .bg-light.rounded-3').forEach(function (box) {
      if (!box.querySelector('.flow-diagram, .flow-diagram-vertical')) return;
      box.classList.add('avx-sbg-host');
      var floor = sbg('avx-sbg-floor');
      buildWaveLayers(WAVE_STYLES.mesh, floor);
      box.insertBefore(floor, box.firstChild);
    });

    // integration logo sections get a slowly turning glow orb
    topSections().forEach(function (section) {
      if (section.querySelectorAll('.integration-logo-card').length < 3) return;
      var h2 = section.querySelector('h2');
      if (h2 && /bring your own voip/i.test(h2.textContent)) return;
      section.classList.add('avx-fx-host');
      var orb = sbg('avx-sbg-orb');
      orb.appendChild(baked('orb'));
      section.insertBefore(orb, section.firstChild);
    });

    // card grids and pricing get a dot-matrix floor
    topSections().forEach(function (section) {
      var cards = section.querySelectorAll('.card').length;
      if (!(cards >= 3 || section.classList.contains('pricing-body'))) return;
      if (section.classList.contains('avx-bwaves-host')) return; // keep the bottom waves clear
      section.classList.add('avx-fx-host');
      var dots = sbg('avx-sbg-dots');
      var plane = document.createElement('div');
      plane.className = 'avx-sbg-dots-plane';
      dots.appendChild(plane);
      section.insertBefore(dots, section.firstChild);
    });
  }

  // ---------- Step-by-step highlight for flow diagrams ----------

  var ORB_BY_BG = [
    ['bg-primary', 'blue-sphere-120.png'],
    ['bg-info', 'icon-sphere--blue.png'],
    ['bg-warning', 'orange_sphere-120.png'],
    ['bg-success', 'green-sphere-120.png'],
    ['bg-danger', 'pink-sphere-120.png']
  ];

  function initFlowSequences() {
    document.querySelectorAll('.flow-node-icon').forEach(function (icon) {
      var match = ORB_BY_BG.filter(function (m) { return icon.classList.contains(m[0]); })[0];
      icon.insertBefore(img(match ? match[1] : 'purple-sphere-120.png', 'avx-orb avx-keep'), icon.firstChild);
    });
    if (reduced) return;

    document.querySelectorAll('.spotlight-flow-steps, .flow-diagram, .flow-diagram-vertical').forEach(function (group) {
      var items = Array.prototype.filter.call(group.children, function (c) {
        return c.matches('.spotlight-flow-step, .spotlight-flow-arrow, .flow-node, .flow-arrow, .flow-arrow-down');
      });
      if (items.length < 2) return;
      var index = -1, timer = null, lastNode = null;
      function target(item) {
        return item.classList.contains('flow-node') ? item.querySelector('.flow-node-icon') || item : item;
      }
      function step() {
        if (motionPaused()) { timer = setTimeout(step, 800); return; }
        index = (index + 1) % items.length;
        var item = items[index];
        var isArrow = /arrow/.test(item.className);
        var t = target(item);
        if (isArrow) {
          // Web Animations run on the compositor and restart without forcing a reflow
          var down = !item.classList.contains('flow-arrow'); // only .flow-arrow points sideways
          if (t.animate) {
            t.animate([{ translate: '0 0', scale: '1' },
              { translate: down ? '0 4px' : '4px 0', scale: '1.25' },
              { translate: '0 0', scale: '1' }], { duration: 700, easing: 'ease' });
          }
          t.classList.add('avx-active');
          setTimeout(function () { t.classList.remove('avx-active'); }, 700);
        } else {
          if (lastNode) lastNode.classList.remove('avx-active');
          t.classList.add('avx-active');
          lastNode = t;
        }
        timer = setTimeout(step, isArrow ? 450 : (index === items.length - 1 ? 1600 : 900));
      }
      onVisible(group, function () {
        if (!timer) timer = setTimeout(step, 500);
      }, function () {
        clearTimeout(timer);
        timer = null;
      }, 0.3);
    });
  }

  // ---------- Count-up stats ----------

  function initCounters() {
    document.querySelectorAll('.hero-proof-stats .fs-3').forEach(function (el) {
      var m = el.textContent.trim().match(/^([\d.,]+)(.*)$/);
      if (!m || reduced) return;
      var target = parseFloat(m[1].replace(/,/g, ''));
      var decimals = (m[1].split('.')[1] || '').length;
      var suffix = m[2];
      el.classList.add('avx-count');
      onVisible(el, function () {
        if (el.dataset.avxCounted) return;
        el.dataset.avxCounted = '1';
        var t0 = performance.now();
        (function tick(now) {
          var p = Math.min((now - t0) / 1600, 1);
          var v = target * (1 - Math.pow(1 - p, 3));
          el.textContent = v.toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      }, null, 0.6);
    });
  }

  // ---------- Pause animations in off-screen sections ----------

  function initOffscreenPause() {
    if (!('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { e.target.classList.toggle('avx-offscreen', !e.isIntersecting); });
    }, { rootMargin: '200px 0px' });
    topSections().concat(Array.prototype.slice.call(document.querySelectorAll('footer'))).forEach(function (sec) {
      io.observe(sec);
    });
  }

  // ---------- Features page: platform diagram as a 3D data network ----------

  var SVGNS = 'http://www.w3.org/2000/svg';

  // the avortyx.com vortex mark; rings carry classes so CSS can spin them
  function vortexSvg(id, className) {
    var svg = document.createElementNS(SVGNS, 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('aria-hidden', 'true');
    if (className) svg.setAttribute('class', className);
    svg.innerHTML =
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0%" style="stop-color: var(--vortyx-bright)"/>' +
      '<stop offset="55%" style="stop-color: var(--vortyx-teal)"/>' +
      '<stop offset="100%" style="stop-color: var(--vortyx-deep)"/></linearGradient></defs>' +
      '<path class="avx-vx-r1" d="M52 32a20 20 0 1 1-13.2-18.8" stroke="url(#' + id + ')" stroke-width="3" stroke-linecap="round"/>' +
      '<path class="avx-vx-r2" d="M44.5 32a12.5 12.5 0 1 1-8.9-11.9" stroke="url(#' + id + ')" stroke-width="2.5" stroke-linecap="round" opacity=".9"/>' +
      '<path class="avx-vx-r3" d="M38 32a6 6 0 1 1-4.2-5.7" stroke="url(#' + id + ')" stroke-width="2" stroke-linecap="round" opacity=".8"/>' +
      '<circle cx="32" cy="32" r="1.7" style="fill: var(--vortyx-ultra)"/>';
    return svg;
  }

  // layout position inside root (ignores transforms, so 3D tilt never skews the wires)
  function offsetIn(el, root) {
    var x = 0, y = 0, n = el;
    while (n && n !== root) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x: x, y: y, w: el.offsetWidth, h: el.offsetHeight };
  }

  function initPlatformFlow() {
    document.querySelectorAll('.flow-platform-diagram').forEach(function (diagram, di) {
      var cols = diagram.querySelectorAll(':scope > .flow-column');
      var hub = diagram.querySelector('.flow-center-box');
      if (cols.length < 2 || !hub) return;
      var sources = Array.prototype.slice.call(cols[0].querySelectorAll('.flow-item'));
      var outputs = Array.prototype.slice.call(cols[cols.length - 1].querySelectorAll('.flow-item'));

      // stage > tilt > diagram: entrance and pointer tilt on the wrapper, idle sway in CSS
      var stage = document.createElement('div');
      stage.className = 'avx-plat3d';
      var host = diagram.closest('section');
      if (host) host.classList.add('avx-clip'); // the hub vortex may extend past narrow screens
      var tilt = document.createElement('div');
      tilt.className = 'avx-plat-tilt';
      diagram.parentNode.insertBefore(stage, diagram);
      stage.appendChild(tilt);
      tilt.appendChild(diagram);

      // hub: the vortex mark replaces the bolt, with a large tilted vortex behind the box
      var bolt = hub.querySelector('.flow-center-title .fa-bolt');
      if (bolt) bolt.parentNode.replaceChild(vortexSvg('avx-vx-t' + di, 'avx-plat-mark'), bolt);
      var halo = document.createElement('div');
      halo.className = 'avx-plat-halo';
      halo.setAttribute('aria-hidden', 'true');
      halo.appendChild(vortexSvg('avx-vx-h' + di, 'avx-plat-vortex'));
      hub.parentNode.insertBefore(halo, hub);

      // wires and packets
      var svg = document.createElementNS(SVGNS, 'svg');
      svg.setAttribute('class', 'avx-plat-links');
      svg.setAttribute('aria-hidden', 'true');
      var packets = document.createElement('div');
      packets.className = 'avx-plat-packets';
      packets.setAttribute('aria-hidden', 'true');
      diagram.insertBefore(svg, diagram.firstChild);
      diagram.appendChild(packets);

      sources.concat(outputs).forEach(function (item, i) {
        var out = i >= sources.length;
        var k = out ? i - sources.length : i;
        // sources fire first, the hub pulses, then the outcomes light up
        item.style.setProperty('--avx-d', ((out ? 2 : 0) + k * 0.18).toFixed(2) + 's');
        item.classList.add(out ? 'avx-plat-out' : 'avx-plat-in');
      });

      function curve(x1, y1, x2, y2) {
        var dx = (x2 - x1) * 0.55;
        return 'M' + x1 + ' ' + y1 + ' C' + (x1 + dx) + ' ' + y1 + ' ' + (x2 - dx) + ' ' + y2 + ' ' + x2 + ' ' + y2;
      }

      function layout() {
        var h = offsetIn(hub, diagram);
        var first = sources[0] && offsetIn(sources[0], diagram);
        // only draw wires when the columns sit side by side
        var horizontal = first && h.x > first.x + first.w;
        stage.classList.toggle('avx-plat-wired', !!horizontal);
        svg.innerHTML = '';
        packets.innerHTML = '';
        if (!horizontal) return;
        svg.setAttribute('width', diagram.offsetWidth);
        svg.setAttribute('height', diagram.offsetHeight);
        var defs = '<defs><linearGradient id="avx-plat-g' + di + '" x1="0" y1="0" x2="1" y2="0">' +
          '<stop offset="0%" stop-color="#60a5fa" stop-opacity=".15"/>' +
          '<stop offset="50%" stop-color="#3b82f6" stop-opacity=".7"/>' +
          '<stop offset="100%" stop-color="#60a5fa" stop-opacity=".15"/></linearGradient></defs>';
        var paths = '';
        function wire(item, i, n, out) {
          var r = offsetIn(item, diagram);
          var hy = Math.round(h.y + h.h * (n > 1 ? 0.28 + 0.44 * i / (n - 1) : 0.5));
          var d = out
            ? curve(h.x + h.w, hy, r.x, Math.round(r.y + r.h / 2))
            : curve(r.x + r.w, Math.round(r.y + r.h / 2), h.x, hy);
          paths += '<path class="avx-plat-wire" d="' + d + '" stroke="url(#avx-plat-g' + di + ')"/>' +
            '<path class="avx-plat-flow" d="' + d + '" style="--avx-d:' + item.style.getPropertyValue('--avx-d') + '"/>';
          var p = document.createElement('div');
          p.className = 'avx-plat-packet';
          p.style.offsetPath = 'path("' + d + '")';
          p.style.setProperty('--avx-d', item.style.getPropertyValue('--avx-d'));
          p.appendChild(img(out ? 'icon-sphere--blue.png' : 'blue-sphere-120.png'));
          packets.appendChild(p);
        }
        sources.forEach(function (s, i) { wire(s, i, sources.length, false); });
        outputs.forEach(function (o, i) { wire(o, i, outputs.length, true); });
        svg.innerHTML = defs + paths;
      }

      layout();
      window.addEventListener('load', layout);
      if ('ResizeObserver' in window) {
        var t = 0;
        new ResizeObserver(function () { clearTimeout(t); t = setTimeout(layout, 120); }).observe(diagram);
      }

      if (reduced) { stage.classList.add('avx-seen', 'avx-settled'); return; }
      driver(stage, 0.06, function (hx, hy) {
        setVar(tilt, '--avx-hx', hx.toFixed(3));
        setVar(tilt, '--avx-hy', hy.toFixed(3));
      }, true);
      onVisible(stage, function () {
        if (stage.classList.contains('avx-seen')) return;
        stage.classList.add('avx-seen');
        setTimeout(function () { stage.classList.add('avx-settled'); }, 1500);
      }, null, 0.2);
    });
  }

  // ---------- Aurora: drifting light behind sections that have no scene of their own ----------

  function initAurora() {
    topSections().forEach(function (section) {
      if (section.matches('.marketing-cta-band, .marketing-hero-simple, .hero-constellation-bg')) return;
      if (section.querySelector('.avx-sbg, .avx-fx, .avx-bwaves, .avx-ibg, .avx-flow3d, .avx-plat3d, .avx-hfx')) return;
      section.classList.add('avx-fx-host');
      var aurora = document.createElement('div');
      aurora.className = 'avx-aurora';
      aurora.setAttribute('aria-hidden', 'true');
      aurora.innerHTML = '<i></i><i></i><i></i>';
      section.insertBefore(aurora, section.firstChild);
    });
  }

  // ---------- Ringba art (optimized copies of /ringba assets) ----------

  var RB = '/assets/avx-ringba/';

  function rb(file, className) {
    var el = document.createElement('img');
    el.src = RB + file;
    el.alt = '';
    el.decoding = 'async';
    if (className) el.className = className;
    return el;
  }

  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html) n.innerHTML = html;
    return n;
  }

  // ---------- Grid rails: hairlines at the content edges, crosshairs at section seams ----------

  function initRails() {
    var rails = el('div', 'avx-rails');
    rails.setAttribute('aria-hidden', 'true');
    document.body.appendChild(rails);
    function measure() {
      var c = document.querySelector('main .container, footer .container');
      if (!c) return;
      var r = c.getBoundingClientRect();
      document.documentElement.style.setProperty('--avx-rail-l', Math.round(r.left) + 'px');
      document.documentElement.style.setProperty('--avx-rail-r', Math.round(window.innerWidth - r.right) + 'px');
    }
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('load', measure);

    var seams = topSections().concat(Array.prototype.slice.call(document.querySelectorAll('.marketing-cta-band, footer.marketing-footer')));
    seams = seams.filter(function (sec, i) { return seams.indexOf(sec) === i; });
    seams.forEach(function (sec, i) {
      if (i === 0 && sec.closest('main')) return; // no seam under the navbar
      sec.classList.add('avx-seam-host');
      var seam = el('div', 'avx-seam', '<i class="avx-cross avx-cross-l"></i><i class="avx-cross avx-cross-r"></i>');
      seam.setAttribute('aria-hidden', 'true');
      sec.insertBefore(seam, sec.firstChild);
    });
  }

  // ---------- Pointer spotlight on cards (fine pointers only) ----------

  var SPOT = '.card, .feature-card, .features-grid-card, .integration-card, .integration-logo-card, ' +
    '.flow-item, .spotlight-flow-step, .mktg-brand-card, .mktg-careers-card, .mktg-auth-card, ' +
    '.pricing-highlight-card, .pricing-table-wrap, .pricing-accordion .accordion-item, .pricing-calculator-breakdown';

  function initSpotlight() {
    if (!finePointer) return;
    document.querySelectorAll(SPOT).forEach(function (card) {
      if (card.closest('.modal')) return;
      card.classList.add('avx-spot');
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      });
    });
  }

  // ---------- Headings: words rise out of a blur as they scroll in ----------

  function splitWords(node, counter) {
    Array.prototype.slice.call(node.childNodes).forEach(function (child) {
      if (child.nodeType === 3) {
        var parts = child.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        parts.forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          var w = el('span', 'avx-w');
          w.textContent = part;
          w.style.setProperty('--i', counter.n++);
          frag.appendChild(w);
        });
        child.parentNode.replaceChild(frag, child);
      } else if (child.nodeType === 1 && !/^(BR|SVG|I|IMG)$/i.test(child.tagName) &&
                 !child.classList.contains('avx-count')) {
        splitWords(child, counter);
      }
    });
  }

  function initHeadingWords() {
    if (reduced || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        io.unobserve(e.target);
        e.target.classList.add('avx-words-in');
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('main h1, main h2, .marketing-cta-band h2').forEach(function (h) {
      // accordion headers wrap a flex button: split words would lose their spaces
      if (h.closest('.modal') || h.querySelector('button') || h.textContent.trim().length > 90) return;
      splitWords(h, { n: 0 });
      h.classList.add('avx-words');
      io.observe(h);
    });
  }

  // ---------- Landing hero: synthwave floor, hologram, and a live routing panel ----------

  var LIVE_BUYERS = ['Apex Insurance', 'Northwind Benefits', 'Meridian Health', 'Summit Solar', 'Lakeside Legal', 'Harbor Home', 'Pinnacle Auto'];
  var LIVE_STATES = [['Connected', 'ok'], ['Ringing', 'ring'], ['Bidding', 'bid'], ['Connected', 'ok']];

  function liveRow() {
    var st = LIVE_STATES[Math.floor(Math.random() * LIVE_STATES.length)];
    var area = 200 + Math.floor(Math.random() * 700);
    var row = el('div', 'avx-live-row',
      '<span class="avx-live-num">(' + area + ') ··' + (10 + Math.floor(Math.random() * 89)) + '</span>' +
      '<span class="avx-live-buyer">' + LIVE_BUYERS[Math.floor(Math.random() * LIVE_BUYERS.length)] + '</span>' +
      '<span class="avx-live-pay">$' + (28 + Math.floor(Math.random() * 45)) + '.00</span>' +
      '<span class="avx-live-pill avx-pill-' + st[1] + '">' + st[0] + '</span>');
    return row;
  }

  function initRingbaHero() {
    var hero = document.querySelector('.marketing-hero-simple.hero-constellation-bg');
    if (!hero) return;
    hero.classList.add('avx-rb-hero');

    hero.insertBefore(buildSignalSea(hero), hero.firstChild);

    var holo = buildSignalCore();
    hero.appendChild(holo);

    var panel = el('div', 'avx-live',
      '<div class="avx-live-head"><span><i class="avx-live-dot"></i>Live routing</span><b class="avx-live-count">18 live</b></div>' +
      '<div class="avx-live-cols"><span>Caller</span><span>Buyer</span><span>Payout</span><span>Status</span></div>' +
      '<div class="avx-live-rows"></div>' +
      '<div class="avx-live-spark"></div>' +
      '<div class="avx-live-foot"><span>Avg. decision</span><b class="avx-live-ms">41 ms</b></div>');
    panel.setAttribute('aria-hidden', 'true');
    hero.appendChild(panel);
    var rows = panel.querySelector('.avx-live-rows');
    for (var i = 0; i < 5; i++) rows.appendChild(liveRow());
    if (!reduced) {
      parallax(hero, holo);
      var spark = makeChart({ type: 'area', points: 28, min: 40, max: 96, start: 64, step: 9, bare: true });
      panel.querySelector('.avx-live-spark').appendChild(spark.svg);
      liveChart(hero, spark, 1600);
      var live = 18, timer = null;
      function tick() {
        if (motionPaused()) { timer = setTimeout(tick, 800); return; }
        var row = liveRow();
        row.classList.add('avx-live-new');
        rows.insertBefore(row, rows.firstChild);
        if (rows.children.length > 5) rows.removeChild(rows.lastChild);
        live = Math.max(9, Math.min(31, live + (Math.random() > .5 ? 1 : -1)));
        panel.querySelector('.avx-live-count').textContent = live + ' live';
        panel.querySelector('.avx-live-ms').textContent = (34 + Math.floor(Math.random() * 14)) + ' ms';
        timer = setTimeout(tick, 2200);
      }
      onVisible(hero, function () { if (!timer) timer = setTimeout(tick, 1200); },
        function () { clearTimeout(timer); timer = null; }, 0.1);
    }
  }

  // ---------- Motion toggle: one button pauses every 3D scene and live feed ----------

  var MOTION_KEY = 'avx-motion';

  function motionPaused() {
    return document.documentElement.classList.contains('avx-paused');
  }

  function setPaused(on) {
    document.documentElement.classList.toggle('avx-paused', on);
    var btn = document.querySelector('.avx-motion-toggle');
    if (btn) {
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
      btn.setAttribute('aria-label', on ? 'Play animations' : 'Pause animations');
      btn.title = on ? 'Play animations' : 'Pause animations';
    }
  }

  function initMotionToggle() {
    var stored = null;
    try { stored = localStorage.getItem(MOTION_KEY); } catch (e) { /* storage blocked */ }
    var btn = el('button', 'avx-motion-toggle',
      '<svg class="avx-mt-pause" viewBox="0 0 16 16" aria-hidden="true"><rect x="4" y="3" width="2.6" height="10" rx="1"/><rect x="9.4" y="3" width="2.6" height="10" rx="1"/></svg>' +
      '<svg class="avx-mt-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L5.9 2.7a.6.6 0 0 0-.9.5z"/></svg>');
    btn.type = 'button';
    btn.addEventListener('click', function () {
      var on = !motionPaused();
      setPaused(on);
      try { localStorage.setItem(MOTION_KEY, on ? 'paused' : 'playing'); } catch (e) { /* storage blocked */ }
    });
    document.body.appendChild(btn);
    setPaused(stored ? stored === 'paused' : reduced);
  }

  // ---------- Landing intro: "Signal Sea" — a 3D field of light that ripples with each call ----------
  // A perspective-projected grid of points rolls like a voice waveform; every few
  // seconds a call lands somewhere in the field and a ripple spreads out from it.

  function buildSignalSea(hero) {
    var wrap = el('div', 'avx-intro');
    wrap.setAttribute('aria-hidden', 'true');
    wrap.appendChild(el('div', 'avx-intro-glow'));
    var canvas = el('canvas', 'avx-sea');
    wrap.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return wrap;

    var COLS = 72, ROWS = 34, X0 = -2100, X1 = 2100, Z0 = 380, Z1 = 2900;
    var W = 0, H = 0, dpr = 1, f = 1, horizon = 0, camY = 170, ZC = (Z0 + Z1) / 2;
    var pings = [], nextPing = 0.6, raf = 0, visible = false, clock = 0, last = 0;
    // ten pre-built colours from deep blue to near-white, picked by brightness
    var SHADES = [];
    for (var i = 0; i < 10; i++) {
      var k = i / 9;
      SHADES.push('rgb(' + Math.round(37 + k * 182) + ',' + Math.round(99 + k * 135) + ',' + Math.round(235 + k * 19) + ')');
    }

    function size() {
      var r = hero.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      f = W * 0.7;
      horizon = H * 0.52;
    }

    function height(x, z, t) {
      // two slow swells crossing each other, like a sustained voice waveform
      var h = 52 * Math.sin(x * 0.0019 + t * 0.5) * Math.cos(z * 0.0016 - t * 0.34) +
              24 * Math.sin((x + z) * 0.0031 - t * 0.75);
      var glow = 0;
      for (var p = 0; p < pings.length; p++) {
        var g = pings[p], age = t - g.t;
        var d = Math.sqrt((x - g.x) * (x - g.x) + (z - g.z) * (z - g.z));
        var front = d - age * 560, fade = Math.max(0, 1 - age / 3.2);
        var wave = Math.exp(-(front * front) / 12000) * fade;
        h += 95 * wave;
        glow += wave;
      }
      return [h, glow];
    }

    var lastDraw = 0;
    function frame(now) {
      raf = 0;
      // the swell is slow, so 30 fps reads the same and halves the work
      if (!reduced && now - lastDraw < 32) { schedule(); return; }
      lastDraw = now;
      // scene time only advances while running, so a pause resumes without a jump
      clock += last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      var t = clock;
      if (t > nextPing && !reduced) {
        pings.push({ x: (Math.random() - 0.5) * 2600, z: Z0 + 500 + Math.random() * 1500, t: t });
        nextPing = t + 2.6 + Math.random() * 2.2;
      }
      pings = pings.filter(function (g) { return t - g.t < 3.4; });

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var cx = W / 2, rows = [];
      // the camera drifts slowly from side to side so the field reads in depth
      var yaw = 0.07 * Math.sin(t * 0.12), cy = Math.cos(yaw), sy0 = Math.sin(yaw);
      for (var r = 0; r < ROWS; r++) {
        var z = Z1 - (Z1 - Z0) * (r / (ROWS - 1)), row = [];
        for (var c = 0; c < COLS; c++) {
          var x = X0 + (X1 - X0) * (c / (COLS - 1));
          var hv = height(x, z, t);
          var xr = x * cy - (z - ZC) * sy0, zr = (z - ZC) * cy + x * sy0 + ZC;
          var sx = cx + xr * f / zr, sy = horizon + (camY - hv[0]) * f / zr;
          row.push([sx, sy, hv[0], hv[1], z]);
        }
        rows.push(row);
      }

      // faint contour lines along each row give the field its surface
      ctx.lineWidth = 1;
      for (r = 0; r < ROWS; r++) {
        var depth = r / (ROWS - 1);
        ctx.strokeStyle = 'rgba(96,165,250,' + (0.03 + depth * 0.1).toFixed(3) + ')';
        ctx.beginPath();
        for (c = 0; c < COLS; c++) {
          var pt = rows[r][c];
          if (c) ctx.lineTo(pt[0], pt[1]); else ctx.moveTo(pt[0], pt[1]);
        }
        ctx.stroke();
      }

      // points: nearer and higher points are larger and brighter; ripples flare white
      for (r = 0; r < ROWS; r++) {
        depth = r / (ROWS - 1);
        for (c = 0; c < COLS; c++) {
          pt = rows[r][c];
          if (pt[0] < -4 || pt[0] > W + 4 || pt[1] < H * 0.36 || pt[1] > H) continue;
          var lift = Math.max(0, Math.min(1, (pt[2] + 50) / 150));
          var bright = Math.min(1, 0.3 + lift * 0.5 + pt[3] * 1.2);
          // fade in from the horizon and out towards the bottom edge
          var a = Math.min(1, (0.15 + depth * 1.6)) * Math.min(1, (H - pt[1]) / 60) *
            Math.min(1, (pt[1] - H * 0.36) / (H * 0.14)) * (0.45 + bright * 0.55);
          if (a < 0.03) continue;
          var sz = (0.9 + depth * 2.4) * (1 + pt[3] * 1.1);
          ctx.globalAlpha = a;
          ctx.fillStyle = SHADES[Math.min(9, Math.round(bright * 9))];
          ctx.fillRect(pt[0] - sz / 2, pt[1] - sz / 2, sz, sz);
        }
      }
      ctx.globalAlpha = 1;
      schedule();
    }

    function schedule() {
      if (raf || !visible || reduced) return;
      if (motionPaused()) { last = 0; setTimeout(schedule, 400); return; }
      raf = requestAnimationFrame(frame);
    }

    function start() {
      size();
      if (reduced) { frame(performance.now()); return; }
      schedule();
    }

    var resizeT = 0;
    window.addEventListener('resize', function () { clearTimeout(resizeT); resizeT = setTimeout(function () { size(); if (reduced) frame(performance.now()); }, 150); });
    onVisible(hero, function () { visible = true; last = 0; start(); }, function () { visible = false; }, 0);
    return wrap;
  }

  // ---------- Canvas scenes: procedural backdrops drawn edge-free (no image tiles or seams) ----------

  // shared runner: sizes to its box, 30 fps, pauses off-screen and with the motion toggle
  function canvasScene(cls, draw) {
    var wrap = el('div', 'avx-cv ' + cls);
    wrap.setAttribute('aria-hidden', 'true');
    var canvas = el('canvas', 'avx-cv-canvas');
    wrap.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    if (!ctx) return wrap;
    var W = 0, H = 0, dpr = 1, raf = 0, visible = false, clock = 0, last = 0, lastDraw = 0, state = {};

    function size() {
      var r = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      W = Math.max(1, Math.round(r.width));
      H = Math.max(1, Math.round(r.height));
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      state.sized = false;
    }

    function frame(now) {
      raf = 0;
      if (!reduced && now - lastDraw < 32) { schedule(); return; }
      lastDraw = now;
      clock += last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, W, H);
      draw(ctx, W, H, clock + 4, state, wrap);
      schedule();
    }

    function schedule() {
      if (raf || !visible || reduced) return;
      if (motionPaused()) { last = 0; setTimeout(schedule, 400); return; }
      raf = requestAnimationFrame(frame);
    }

    var resizeT = 0;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { size(); if (reduced) frame(performance.now()); }, 150);
    });
    setTimeout(function () {
      onVisible(wrap, function () {
        visible = true; last = 0; size();
        if (reduced) frame(performance.now()); else schedule();
      }, function () { visible = false; }, 0);
    }, 0);
    return wrap;
  }

  function rgba(c, a) { return 'rgba(' + c + ',' + a.toFixed(3) + ')'; }

  // silk: bundles of hairline strands that twist around each other like a ribbon
  function silkScene(cls, ribbons) {
    return canvasScene(cls, function (ctx, W, H, t) {
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineWidth = 1;
      var step = W > 900 ? 10 : 8;
      ribbons.forEach(function (rb) {
        var grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0, rgba(rb.color, 0));
        grad.addColorStop(0.18, rgba(rb.color, 1));
        grad.addColorStop(0.82, rgba(rb.color, 1));
        grad.addColorStop(1, rgba(rb.color, 0));
        ctx.strokeStyle = grad;
        for (var i = 0; i < rb.lines; i++) {
          var k = i / (rb.lines - 1), mid = Math.sin(k * Math.PI);
          ctx.globalAlpha = rb.alpha * (0.25 + 0.75 * mid);
          ctx.beginPath();
          for (var x = -step; x <= W + step; x += step) {
            var u = x / W, ts = t * rb.speed;
            var y = H * rb.base +
              rb.amp * H * Math.sin(u * 6.2 * rb.freq + ts + rb.phase) * Math.cos(u * 3.1 - ts * 0.6 + k * 0.6) +
              (k - 0.5) * rb.spread * H * Math.sin(u * 5.4 + ts * 0.8 + rb.phase);
            if (x < 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      });
    });
  }

  // contact: a dotted planet rising over the horizon, calls arcing between cities
  function globeScene(cls) {
    return canvasScene(cls, function (ctx, W, H, t, s) {
      if (!s.pts) {
        s.pts = [];
        var N = 2000, ga = Math.PI * (3 - Math.sqrt(5));
        for (var i = 0; i < N; i++) {
          var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = ga * i;
          s.pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
        }
        s.arcs = []; s.next = 0;
      }
      var R = Math.min(W * 0.36, 460), cx = W / 2, cy = H + R * 0.38;
      var rot = t * 0.06, tilt = -0.42, cr = Math.cos(rot), sr = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
      function proj(p, lift) {
        var x = p[0] * cr - p[2] * sr, z = p[0] * sr + p[2] * cr, y = p[1];
        var y2 = y * ct - z * st, z2 = y * st + z * ct, m = R * (lift || 1);
        return [cx + x * m, cy - y2 * m, z2];
      }

      // atmosphere: a thin lit limb, brightest along the top
      var limb = ctx.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.16);
      limb.addColorStop(0, 'rgba(59,130,246,0)');
      limb.addColorStop(0.3, 'rgba(96,165,250,.22)');
      limb.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = limb;
      ctx.beginPath(); ctx.arc(cx, cy, R * 1.16, 0, Math.PI * 2); ctx.fill();
      var body = ctx.createRadialGradient(cx, cy - R * 0.6, R * 0.1, cx, cy, R);
      body.addColorStop(0, '#0d1730');
      body.addColorStop(1, '#05070d');
      ctx.fillStyle = body;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(147,197,253,.55)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.08, Math.PI * 1.92); ctx.stroke();

      // faint graticule: a few parallels and meridians on the front face
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(96,165,250,.16)';
      for (var g = 0; g < 12; g++) {
        var lat = g < 5 ? -0.6 + g * 0.3 : null, lon = g >= 5 ? (g - 5) * Math.PI / 7 : 0, started = false;
        ctx.beginPath();
        for (var u = 0; u <= 48; u++) {
          var a0 = u / 48 * Math.PI * 2, pp;
          if (lat !== null) { var rr = Math.sqrt(1 - lat * lat); pp = [Math.cos(a0) * rr, lat, Math.sin(a0) * rr]; }
          else pp = [Math.cos(a0) * Math.cos(lon), Math.sin(a0), Math.cos(a0) * Math.sin(lon)];
          var q0 = proj(pp);
          if (q0[2] < 0) { started = false; continue; }
          if (started) ctx.lineTo(q0[0], q0[1]); else { ctx.moveTo(q0[0], q0[1]); started = true; }
        }
        ctx.stroke();
      }

      // land-like dots: only the front hemisphere, dimmer towards the limb
      ctx.fillStyle = '#93c5fd';
      for (var j = 0; j < s.pts.length; j++) {
        var q = proj(s.pts[j]);
        if (q[2] < 0.05 || q[1] > H + 2) continue;
        ctx.globalAlpha = 0.1 + q[2] * 0.55;
        var d = 0.7 + q[2] * 1.1;
        ctx.fillRect(q[0] - d / 2, q[1] - d / 2, d, d);
      }

      // a new call every ~1.3s: an arc lifts between two visible points and runs end to end
      if (t > s.next && !reduced) {
        // endpoints come from the lit, on-screen face of the globe
        var seen = s.pts.filter(function (p) { var q = proj(p); return q[2] > 0.3 && q[1] < H - 40 && q[0] > 20 && q[0] < W - 20; });
        if (seen.length > 10) {
          var a = seen[(Math.random() * seen.length) | 0], b, tries = 0;
          do { b = seen[(Math.random() * seen.length) | 0]; tries++; }
          while (tries < 20 && Math.abs(proj(a)[0] - proj(b)[0]) < R * 0.25);
          s.arcs.push({ a: a, b: b, t: t });
        }
        s.next = t + 1.1 + Math.random() * 0.8;
      }
      s.arcs = s.arcs.filter(function (c) { return t - c.t < 2.6; });
      ctx.lineWidth = 1.3;
      s.arcs.forEach(function (c) {
        var age = (t - c.t) / 2.6, head = Math.min(1, age * 1.8), tail = Math.max(0, age * 1.8 - 0.8);
        var fade = age > 0.75 ? (1 - age) / 0.25 : 1, n = 28, pts = [];
        for (var i = 0; i <= n; i++) {
          var u = i / n, p = [c.a[0] + (c.b[0] - c.a[0]) * u, c.a[1] + (c.b[1] - c.a[1]) * u, c.a[2] + (c.b[2] - c.a[2]) * u];
          var len = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]) || 1;
          pts.push(proj([p[0] / len, p[1] / len, p[2] / len], 1 + Math.sin(u * Math.PI) * 0.22));
        }
        var i0 = Math.floor(tail * n), i1 = Math.ceil(head * n);
        ctx.strokeStyle = 'rgba(191,219,254,' + (0.75 * fade).toFixed(3) + ')';
        ctx.beginPath();
        for (i = i0; i <= i1; i++) { if (i === i0) ctx.moveTo(pts[i][0], pts[i][1]); else ctx.lineTo(pts[i][0], pts[i][1]); }
        ctx.stroke();
        [pts[0], pts[n]].forEach(function (e, k) {
          var on = k ? head >= 1 : true;
          if (!on) return;
          var ring = ((t - c.t) * 1.6) % 1;
          ctx.globalAlpha = fade;
          ctx.fillStyle = '#dbeafe';
          ctx.fillRect(e[0] - 1.5, e[1] - 1.5, 3, 3);
          ctx.globalAlpha = fade * (1 - ring) * 0.8;
          ctx.strokeStyle = '#60a5fa';
          ctx.beginPath(); ctx.ellipse(e[0], e[1], 3 + ring * 12, (3 + ring * 12) * 0.45, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.globalAlpha = 1;
        });
      });
    });
  }

  // sign up: light trails racing in from the horizon along a fan of lanes
  function lanesScene(cls) {
    return canvasScene(cls, function (ctx, W, H, t, s) {
      var LANES = 31, vx = W / 2, vy = H * 0.3, spread = W * 2.4;
      if (!s.trails) {
        s.trails = [];
        for (var i = 0; i < 34; i++) s.trails.push({ lane: (Math.random() * LANES) | 0, p: Math.random(), v: 0.16 + Math.random() * 0.2 });
      }
      function at(lane, p) {
        // p: 0 at the horizon, 1 at the viewer; perspective squeezes the far end
        var e = p, x0 = vx + (lane / (LANES - 1) - 0.5) * spread;
        return [vx + (x0 - vx) * e, vy + (H + 40 - vy) * e];
      }
      function edge(x) { var d = Math.abs(x - vx) / (W / 2); return Math.max(0, 1 - d * d); }

      // horizon: a thin bright line where the lanes meet
      var hz = ctx.createLinearGradient(0, 0, W, 0);
      hz.addColorStop(0, 'rgba(96,165,250,0)');
      hz.addColorStop(0.5, 'rgba(191,219,254,.55)');
      hz.addColorStop(1, 'rgba(96,165,250,0)');
      ctx.fillStyle = hz;
      ctx.fillRect(0, vy - 0.5, W, 1);
      ctx.save();
      ctx.translate(vx, vy);
      ctx.scale(1, 0.12);
      var sky = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.45);
      sky.addColorStop(0, 'rgba(96,165,250,.16)');
      sky.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = sky;
      ctx.beginPath(); ctx.arc(0, 0, W * 0.45, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      ctx.lineWidth = 1;
      for (var l = 0; l < LANES; l++) {
        var a = at(l, 0.02), b = at(l, 1);
        var g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, 'rgba(59,130,246,0)');
        g.addColorStop(1, 'rgba(59,130,246,' + (0.22 * edge(b[0])).toFixed(3) + ')');
        ctx.strokeStyle = g;
        ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
      }

      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      s.trails.forEach(function (tr) {
        tr.p += tr.v * 0.033 * (0.35 + tr.p);
        if (tr.p > 1.15) { tr.p = 0; tr.lane = (Math.random() * LANES) | 0; tr.v = 0.16 + Math.random() * 0.2; }
        var head = at(tr.lane, Math.min(1.1, tr.p)), tail = at(tr.lane, Math.max(0, tr.p - 0.05 - tr.p * 0.12));
        var vis = edge(head[0]) * Math.min(1, tr.p / 0.15);
        if (vis < 0.02) return;
        var g = ctx.createLinearGradient(tail[0], tail[1], head[0], head[1]);
        g.addColorStop(0, 'rgba(96,165,250,0)');
        g.addColorStop(1, 'rgba(219,234,254,' + (0.9 * vis).toFixed(3) + ')');
        ctx.strokeStyle = g;
        ctx.lineWidth = 0.6 + tr.p * 1.8;
        ctx.beginPath(); ctx.moveTo(tail[0], tail[1]); ctx.lineTo(head[0], head[1]); ctx.stroke();
      });
    });
  }

  // pricing header: an eclipse horizon, a light sweeping slowly along its rim
  function horizonScene(cls) {
    return canvasScene(cls, function (ctx, W, H, t, s) {
      if (!s.stars) {
        s.stars = [];
        for (var i = 0; i < 90; i++) s.stars.push([Math.random(), Math.random() * 0.8, Math.random() * Math.PI * 2, 0.4 + Math.random() * 0.9]);
      }
      var R = Math.max(W * 0.72, 640), cx = W / 2, cy = H * 0.8 + R;
      function rimY(x) { return cy - Math.sqrt(Math.max(0, R * R - (x - cx) * (x - cx))); }
      ctx.fillStyle = '#c7dcff';
      s.stars.forEach(function (st) {
        var x = st[0] * W, y = st[1] * H;
        if (y > rimY(x) - 6) return;
        ctx.globalAlpha = (0.18 + 0.32 * Math.abs(Math.sin(t * 0.6 + st[2]))) * Math.min(1, Math.abs(x - cx) / (W * 0.18));
        ctx.fillRect(x, y, st[3], st[3]);
      });
      ctx.globalAlpha = 1;

      // the atmosphere: layered faint arcs above the rim (clipped to the sky, the planet stays see-through)
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip('evenodd');
      for (var k = 6; k >= 1; k--) {
        ctx.strokeStyle = 'rgba(59,130,246,' + (0.09 / k + 0.02).toFixed(3) + ')';
        ctx.lineWidth = k * 9;
        ctx.beginPath(); ctx.arc(cx, cy, R + k * 4, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke();
      }
      ctx.restore();
      // just under the rim, a faint lit surface
      var surf = ctx.createRadialGradient(cx, cy, R - 70, cx, cy, R);
      surf.addColorStop(0, 'rgba(59,130,246,0)');
      surf.addColorStop(1, 'rgba(59,130,246,.16)');
      ctx.fillStyle = surf;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

      // the rim, lit by a highlight that drifts back and forth across the top
      var sweep = 0.5 + 0.32 * Math.sin(t * 0.18);
      var g = ctx.createLinearGradient(0, 0, W, 0);
      g.addColorStop(0, 'rgba(96,165,250,0)');
      g.addColorStop(Math.max(0.01, sweep - 0.3), 'rgba(96,165,250,.35)');
      g.addColorStop(sweep, 'rgba(239,246,255,.95)');
      g.addColorStop(Math.min(0.99, sweep + 0.3), 'rgba(96,165,250,.35)');
      g.addColorStop(1, 'rgba(96,165,250,0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.arc(cx, cy, R, Math.PI * 1.02, Math.PI * 1.98); ctx.stroke();

      // a faint light column where the highlight sits
      var hx = sweep * W, top = rimY(hx);
      var col = ctx.createRadialGradient(hx, top, 0, hx, top, H * 0.9);
      col.addColorStop(0, 'rgba(147,197,253,.16)');
      col.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = col;
      ctx.fillRect(0, 0, W, top);
    });
  }

  // integrations header: data streams curving in from the edges and feeding the hub
  function streamsScene(cls, host) {
    return canvasScene(cls, function (ctx, W, H, t, s, wrap) {
      if (!s.sized) {
        s.sized = true;
        var hub = host.querySelector('.avx-ihub-stage') || host.querySelector('.avx-ihub');
        var wr = wrap.getBoundingClientRect(), hr = hub && hub.getBoundingClientRect();
        s.hx = hr && hr.width ? hr.left + hr.width / 2 - wr.left : W * 0.5;
        s.hy = hr && hr.height ? hr.top + hr.height / 2 - wr.top : H * 0.75;
        s.lines = [];
        for (var i = 0; i < 30; i++) {
          var left = i < 22, k = left ? i / 21 : (i - 22) / 7;
          s.lines.push({
            sx: left ? -30 : W + 30, sy: H * (0.04 + k * 0.92),
            bend: (Math.random() - 0.5) * H * 0.5, ph: Math.random(), v: 0.08 + Math.random() * 0.1
          });
        }
      }
      var hx = s.hx, hy = s.hy;
      var halo = ctx.createRadialGradient(hx, hy, 0, hx, hy, Math.min(W, 900) * 0.42);
      halo.addColorStop(0, 'rgba(59,130,246,.16)');
      halo.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, W, H);

      function pt(L, u) {
        var mx = (L.sx + hx) / 2, my = (L.sy + hy) / 2 + L.bend, v = 1 - u;
        return [v * v * L.sx + 2 * v * u * mx + u * u * hx, v * v * L.sy + 2 * v * u * my + u * u * hy];
      }
      ctx.lineWidth = 1;
      s.lines.forEach(function (L) {
        var g = ctx.createLinearGradient(L.sx, L.sy, hx, hy);
        g.addColorStop(0, 'rgba(59,130,246,0)');
        g.addColorStop(0.5, 'rgba(59,130,246,.09)');
        g.addColorStop(0.92, 'rgba(96,165,250,.22)');
        g.addColorStop(1, 'rgba(96,165,250,0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        for (var i = 0; i <= 32; i++) { var p = pt(L, i / 32); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }
        ctx.stroke();
      });

      // a packet rides each stream into the hub
      ctx.globalCompositeOperation = 'lighter';
      ctx.lineCap = 'round';
      s.lines.forEach(function (L) {
        var u = (t * L.v + L.ph) % 1, u0 = Math.max(0, u - 0.07);
        var a = pt(L, u0), b = pt(L, u), vis = Math.sin(u * Math.PI);
        var g = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
        g.addColorStop(0, 'rgba(96,165,250,0)');
        g.addColorStop(1, 'rgba(219,234,254,' + (0.85 * vis).toFixed(3) + ')');
        ctx.strokeStyle = g;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (var i = 0; i <= 6; i++) { var p = pt(L, u0 + (u - u0) * i / 6); if (i) ctx.lineTo(p[0], p[1]); else ctx.moveTo(p[0], p[1]); }
        ctx.stroke();
      });
    });
  }

  // ---------- Live charts: a tiny SVG chart engine in the site's glass style ----------

  var chartId = 0;

  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function walk(v, o) {
    var next = v + (Math.random() - 0.48) * o.step;
    return Math.max(o.min, Math.min(o.max, next));
  }

  // returns { svg, update(), value() } — update() advances the data one tick
  function makeChart(o) {
    var id = 'avx-ch' + (++chartId);
    var svg, update, value;

    if (o.type === 'area') {
      var W = 240, H = o.bare ? 46 : 64, N = o.points || 24, step = W / (N - 1);
      var data = [], v = o.start;
      for (var i = 0; i <= N; i++) { v = walk(v, o); data.push(v); }
      svg = svgEl('svg', { viewBox: '0 0 ' + W + ' ' + H, preserveAspectRatio: 'none', class: 'avx-ch avx-ch-area' });
      svg.innerHTML = '<defs><linearGradient id="' + id + 'f" x1="0" y1="0" x2="0" y2="1">' +
        '<stop offset="0%" stop-color="#60a5fa" stop-opacity=".45"/><stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/></linearGradient>' +
        '<linearGradient id="' + id + 's" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#93c5fd"/><stop offset="100%" stop-color="#60a5fa"/></linearGradient>' +
        '<clipPath id="' + id + 'c"><rect width="' + W + '" height="' + H + '"/></clipPath></defs>' +
        (o.bare ? '' : '<g class="avx-ch-grid"><line x1="0" x2="' + W + '" y1="' + (H * .33) + '" y2="' + (H * .33) + '"/><line x1="0" x2="' + W + '" y1="' + (H * .66) + '" y2="' + (H * .66) + '"/></g>') +
        '<g clip-path="url(#' + id + 'c)"><g class="avx-ch-scroll"><path class="avx-ch-fill" fill="url(#' + id + 'f)"/><path class="avx-ch-line" stroke="url(#' + id + 's)"/></g></g>' +
        '<circle class="avx-ch-dot" r="3"/>';
      var scroll = svg.querySelector('.avx-ch-scroll'), line = svg.querySelector('.avx-ch-line'),
        fill = svg.querySelector('.avx-ch-fill'), dot = svg.querySelector('.avx-ch-dot');
      function y(val) { return (H - 4) - (val - o.min) / (o.max - o.min) * (H - 10); }
      function draw() {
        var d = '';
        data.forEach(function (val, k) { d += (k ? ' L' : 'M') + (k * step).toFixed(1) + ' ' + y(val).toFixed(1); });
        line.setAttribute('d', d);
        fill.setAttribute('d', d + ' L' + ((data.length - 1) * step).toFixed(1) + ' ' + H + ' L0 ' + H + ' Z');
        dot.setAttribute('cx', ((N - 1) * step).toFixed(1));
        dot.setAttribute('cy', y(data[N - 1]).toFixed(1));
      }
      draw();
      update = function () {
        // slide left one step, then redraw with the new point in place
        scroll.style.transition = 'transform .9s linear';
        scroll.style.transform = 'translateX(' + (-step) + 'px)';
        dot.setAttribute('cy', y(data[N]).toFixed(1));
        setTimeout(function () {
          data.shift(); data.push(walk(data[data.length - 1], o));
          scroll.style.transition = 'none';
          scroll.style.transform = 'none';
          draw();
        }, 920);
      };
      value = function () { return data[N - 1]; };
    } else if (o.type === 'bars') {
      var labels = o.labels, BW = 240, BH = 70, gap = 8, bw = (BW - gap * (labels.length - 1)) / labels.length;
      var vals = labels.map(function () { return o.min + Math.random() * (o.max - o.min); });
      svg = svgEl('svg', { viewBox: '0 0 ' + BW + ' ' + (BH + 14), class: 'avx-ch avx-ch-bars' });
      var html = '<defs><linearGradient id="' + id + 'b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#3b82f6" stop-opacity=".35"/></linearGradient></defs>';
      labels.forEach(function (lb, k) {
        var x = k * (bw + gap);
        html += '<rect class="avx-ch-track" x="' + x.toFixed(1) + '" y="0" width="' + bw.toFixed(1) + '" height="' + BH + '" rx="3"/>' +
          '<rect class="avx-ch-bar" x="' + x.toFixed(1) + '" y="0" width="' + bw.toFixed(1) + '" height="' + BH + '" rx="3" fill="url(#' + id + 'b)"/>' +
          '<text x="' + (x + bw / 2).toFixed(1) + '" y="' + (BH + 11) + '">' + lb + '</text>';
      });
      svg.innerHTML = html;
      var bars = svg.querySelectorAll('.avx-ch-bar');
      function setBars() {
        vals.forEach(function (val, k) { bars[k].style.transform = 'scaleY(' + ((val - o.min * .6) / (o.max - o.min * .6)).toFixed(3) + ')'; });
      }
      setBars();
      update = function () { vals = vals.map(function (val) { return walk(val, o); }); setBars(); };
      value = function () { return vals.reduce(function (a, b) { return a + b; }, 0) / (o.avg ? vals.length : 1); };
    } else if (o.type === 'donut') {
      var segs = o.labels.map(function (lb, k) { return { lb: lb, v: o.weights[k] }; });
      var R = 30, C = 2 * Math.PI * R, colors = ['#60a5fa', '#2563eb', '#93c5fd', '#475569', '#34d399'];
      svg = svgEl('svg', { viewBox: '0 0 240 76', class: 'avx-ch avx-ch-donut' });
      var dh = '<circle class="avx-ch-ring" cx="38" cy="38" r="' + R + '"/>';
      segs.forEach(function (sg, k) {
        dh += '<circle class="avx-ch-seg" cx="38" cy="38" r="' + R + '" stroke="' + colors[k] + '" transform="rotate(-90 38 38)"/>' +
          '<circle cx="92" cy="' + (14 + k * 16) + '" r="3.2" fill="' + colors[k] + '"/>' +
          '<text class="avx-ch-lg" x="101" y="' + (17.5 + k * 16) + '">' + sg.lb + '</text>' +
          '<text class="avx-ch-pct" x="236" y="' + (17.5 + k * 16) + '" text-anchor="end"></text>';
      });
      svg.innerHTML = dh;
      var arcs = svg.querySelectorAll('.avx-ch-seg'), pcts = svg.querySelectorAll('.avx-ch-pct');
      function setDonut() {
        var total = segs.reduce(function (a, sg) { return a + sg.v; }, 0), acc = 0;
        segs.forEach(function (sg, k) {
          var len = sg.v / total * C;
          arcs[k].style.strokeDasharray = Math.max(0, len - 2).toFixed(2) + ' ' + C.toFixed(2);
          arcs[k].style.strokeDashoffset = (-acc).toFixed(2);
          pcts[k].textContent = Math.round(sg.v / total * 100) + '%';
          acc += len;
        });
      }
      setDonut();
      update = function () { segs.forEach(function (sg) { sg.v = Math.max(4, sg.v + (Math.random() - .5) * sg.v * .18); }); setDonut(); };
      value = function () { var t = segs.reduce(function (a, sg) { return a + sg.v; }, 0); return segs[0].v / t * 100; };
    } else if (o.type === 'gauge') {
      var GR = 46, GC = Math.PI * GR, gv = o.start;
      svg = svgEl('svg', { viewBox: '0 0 240 70', class: 'avx-ch avx-ch-gauge' });
      svg.innerHTML = '<defs><linearGradient id="' + id + 'g" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#93c5fd"/><stop offset="100%" stop-color="#60a5fa"/></linearGradient></defs>' +
        '<path class="avx-ch-ring" d="M74 62 A46 46 0 0 1 166 62"/>' +
        '<path class="avx-ch-arc" d="M74 62 A46 46 0 0 1 166 62" stroke="url(#' + id + 'g)" style="stroke-dasharray:' + GC.toFixed(1) + '"/>' +
        '<text class="avx-ch-gv" x="120" y="58" text-anchor="middle"></text>';
      var arc = svg.querySelector('.avx-ch-arc'), gtext = svg.querySelector('.avx-ch-gv');
      function setGauge() {
        arc.style.strokeDashoffset = (GC * (1 - (gv - o.min) / (o.max - o.min))).toFixed(1);
        gtext.textContent = o.sub || 'LIVE';
      }
      setGauge();
      update = function () { gv = walk(gv, o); setGauge(); };
      value = function () { return gv; };
    }
    return { svg: svg, update: update, value: value, o: o };
  }

  // glass card: mono title + live dot, display-font value with a delta pill, chart
  function chartCard(o) {
    var chart = makeChart(o);
    var card = el('div', 'avx-chart-card',
      '<div class="avx-cc-head"><span><i class="avx-live-dot"></i>' + o.title + '</span><em class="avx-cc-delta"></em></div>' +
      '<div class="avx-cc-value"></div>');
    card.setAttribute('aria-hidden', 'true');
    card.appendChild(chart.svg);
    var valueEl = card.querySelector('.avx-cc-value'), deltaEl = card.querySelector('.avx-cc-delta');
    var last = chart.value();
    function show() {
      var v = chart.value();
      valueEl.textContent = o.fmt(v);
      var d = last ? (v - last) / last * 100 : 0;
      deltaEl.textContent = (d >= 0 ? '▲ ' : '▼ ') + Math.abs(d).toFixed(1) + '%';
      deltaEl.className = 'avx-cc-delta ' + (d >= 0 ? 'avx-up' : 'avx-down');
      last = v;
    }
    show();
    chart.onTick = show;
    return { card: card, chart: chart };
  }

  // advance a chart while its host is on screen
  function liveChart(host, chart, every) {
    if (reduced) return;
    var timer = null;
    function tick() {
      if (motionPaused()) { timer = setTimeout(tick, 800); return; }
      chart.update();
      if (chart.onTick) setTimeout(chart.onTick, 950);
      timer = setTimeout(tick, every + Math.random() * 600);
    }
    onVisible(host, function () { if (!timer) timer = setTimeout(tick, 600 + Math.random() * 800); },
      function () { clearTimeout(timer); timer = null; }, 0.05);
  }

  var money = function (d) { return function (v) { return '$' + v.toFixed(d); }; };
  var int = function (v) { return Math.round(v).toLocaleString('en-US'); };
  var pct = function (v) { return v.toFixed(1) + '%'; };

  var HERO_CHARTS = {
    'call management': [
      { type: 'area', title: 'Calls / hour', min: 820, max: 1400, start: 1080, step: 90, fmt: int },
      { type: 'donut', title: 'Call outcomes', labels: ['Connected', 'Transferred', 'Voicemail', 'Missed'], weights: [58, 21, 13, 8], fmt: function (v) { return v.toFixed(0) + '% live'; } }
    ],
    'tracking & attribution': [
      { type: 'bars', title: 'Calls by source', labels: ['GOOG', 'META', 'BING', 'TTOK', 'MAIL', 'DIR'], min: 120, max: 980, step: 90, fmt: function (v) { return int(v) + ' calls'; } },
      { type: 'area', title: 'Conversion rate', min: 8, max: 17, start: 12.4, step: 1.1, fmt: pct }
    ],
    'ping/post': [
      { type: 'bars', title: 'Top bids · $/call', labels: ['APX', 'NWB', 'MRD', 'SMT', 'LKS', 'HBR'], min: 18, max: 72, step: 6, avg: true, fmt: money(2) },
      { type: 'gauge', title: 'Bid win rate', sub: 'TARGET 75%', min: 40, max: 95, start: 71, step: 4, decimals: 1, fmt: pct }
    ],
    'ai': [
      { type: 'area', title: 'AI minutes / hr', min: 300, max: 920, start: 610, step: 60, fmt: int },
      { type: 'donut', title: 'Caller sentiment', labels: ['Positive', 'Neutral', 'Negative'], weights: [62, 27, 11], fmt: function (v) { return v.toFixed(0) + '% positive'; } }
    ],
    'automation': [
      { type: 'bars', title: 'Touches by channel', labels: ['SMS', 'MAIL', 'CALL', 'HOOK', 'WAIT'], min: 80, max: 640, step: 60, fmt: function (v) { return int(v) + ' sent'; } },
      { type: 'gauge', title: 'Contact rate', sub: 'LAST 24H', min: 30, max: 90, start: 64, step: 4, decimals: 1, fmt: pct }
    ],
    'phone numbers': [
      { type: 'area', title: 'Active numbers', min: 3200, max: 4100, start: 3650, step: 80, fmt: int },
      { type: 'donut', title: 'Number pool', labels: ['Local', 'Toll-free', 'Pooled'], weights: [54, 28, 18], fmt: function (v) { return v.toFixed(0) + '% local'; } }
    ],
    'security & compliance tools': [
      { type: 'bars', title: 'Blocked by rule', labels: ['DNC', 'SPAM', 'TCPA', 'GEO', 'VEL'], min: 20, max: 380, step: 40, fmt: function (v) { return int(v) + ' blocked'; } },
      { type: 'gauge', title: 'Clean traffic', sub: 'SCREENED', min: 90, max: 100, start: 97.6, step: .6, decimals: 1, fmt: pct }
    ],
    'integrations': [
      { type: 'area', title: 'Webhook events / min', min: 1800, max: 4200, start: 2900, step: 260, fmt: int },
      { type: 'gauge', title: 'Delivery success', sub: 'SLA 99.9%', min: 95, max: 100, start: 99.4, step: .3, decimals: 2, fmt: pct }
    ],
    'pricing': [
      { type: 'area', title: 'Avg cost / call', min: .041, max: .061, start: .052, step: .003, fmt: money(4) },
      { type: 'donut', title: 'Spend mix', labels: ['Inbound', 'Forwarding', 'SMS', 'AI'], weights: [46, 31, 13, 10], fmt: function (v) { return v.toFixed(0) + '% inbound'; } }
    ]
  };

  function initHeroCharts() {
    var hero = document.querySelector('main section.mktg-subpage-hero, main section.pricing-hero');
    if (!hero) return;
    var key = hero.classList.contains('pricing-hero') ? 'pricing' :
      ((hero.querySelector('.mktg-subpage-hero-eyebrow') || {}).textContent || '').trim().toLowerCase();
    // feature pages without a category label fall back on their address
    if (!HERO_CHARTS[key] && /^\/features\//.test(location.pathname)) {
      key = /ping_post/.test(location.pathname) ? 'ping/post' : 'call management';
    }
    var set = HERO_CHARTS[key];
    if (!set) return;
    hero.classList.add('avx-has-charts');
    var wrap = el('div', 'avx-hero-charts');
    wrap.setAttribute('aria-hidden', 'true');
    set.forEach(function (o, i) {
      var c = chartCard(o);
      c.card.classList.add(i ? 'avx-cc-right' : 'avx-cc-left');
      wrap.appendChild(c.card);
      liveChart(hero, c.chart, 2000 + i * 400);
    });
    hero.appendChild(wrap);
  }

  // ---------- Landing hero: the Signal Core, built from ringba art ----------

  function buildSignalCore() {
    var core = el('div', 'avx-core3d');
    core.setAttribute('aria-hidden', 'true');
    var stage = el('div', 'avx-c-stage');
    core.appendChild(stage);

    var floor = el('div', 'avx-c-floor');
    floor.appendChild(rb('pt-hero-rings.webp', 'avx-c-portal'));
    floor.appendChild(rb('platform-ring-indigo.webp', 'avx-c-dots'));
    stage.appendChild(floor);
    stage.appendChild(el('div', 'avx-c-beam'));

    // radial bar radar: 24 spokes whose lengths stream live data, with a sweep
    var radar = svgEl('svg', { viewBox: '-100 -100 200 200', class: 'avx-radar' });
    var rh = '<defs><radialGradient id="avx-rd-bg"><stop offset="0%" stop-color="#0f1d3d" stop-opacity=".9"/><stop offset="100%" stop-color="#0b0c10" stop-opacity="0"/></radialGradient>' +
      '<linearGradient id="avx-rd-bar" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="#3b82f6"/><stop offset="100%" stop-color="#bfdbfe"/></linearGradient>' +
      '<linearGradient id="avx-rd-sw" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#60a5fa" stop-opacity="0"/><stop offset="100%" stop-color="#60a5fa" stop-opacity=".45"/></linearGradient></defs>' +
      '<circle r="86" fill="url(#avx-rd-bg)"/><circle class="avx-rd-ring" r="30"/><circle class="avx-rd-ring" r="56"/><circle class="avx-rd-ring" r="82"/>' +
      '<g class="avx-rd-sweep"><path d="M0 0 L82 0 A82 82 0 0 0 58 -58 Z" fill="url(#avx-rd-sw)"/></g><g class="avx-rd-bars">';
    for (var i = 0; i < 24; i++) rh += '<g transform="rotate(' + (i * 15) + ')"><rect class="avx-rd-bar" x="-1.8" y="-80" width="3.6" height="48" rx="1.8" fill="url(#avx-rd-bar)"/></g>';
    rh += '</g><text class="avx-rd-val" y="8" text-anchor="middle">92</text><text class="avx-rd-lbl" y="22" text-anchor="middle">INTENT</text>';
    radar.innerHTML = rh;

    var heart = el('div', 'avx-c-core');
    heart.appendChild(radar);
    heart.appendChild(rb('ct-features-img--transparent-702.webp', 'avx-c-neon'));
    var gyro = el('div', 'avx-c-gyro');
    gyro.appendChild(rb('icon-sphere--blue.webp'));
    heart.appendChild(gyro);
    stage.appendChild(heart);

    var orbit = el('div', 'avx-c-orbit');
    [['purple-sphere-312.webp', 0], ['icon-sphere--blue.webp', 120], ['purple-sphere-312.webp', 240]].forEach(function (s) {
      var slot = el('div', 'avx-c-slot');
      slot.style.setProperty('--a', s[1] + 'deg');
      slot.appendChild(rb(s[0], 'avx-c-sat'));
      orbit.appendChild(slot);
    });
    stage.appendChild(orbit);


    var chipA = el('div', 'avx-c-chip avx-c-chip-a', '<span>Routed today</span><b>1,283</b>');
    var chipB = el('div', 'avx-c-chip avx-c-chip-b', '<span>Buyer payout</span><b>$65.00</b>');
    core.appendChild(chipA);
    core.appendChild(chipB);

    if (!reduced) {
      var bars = radar.querySelectorAll('.avx-rd-bar'), lvl = [], score = 92, routed = 1283, timer = null;
      for (var b = 0; b < 24; b++) lvl.push(.35 + Math.random() * .6);
      function pulse() {
        if (motionPaused()) { timer = setTimeout(pulse, 800); return; }
        lvl = lvl.map(function (v, j) { return Math.max(.2, Math.min(1, v + (Math.random() - .5) * .35 + (j % 6 === 0 ? .05 : 0))); });
        Array.prototype.forEach.call(bars, function (bar, j) { bar.style.transform = 'scaleY(' + lvl[j].toFixed(3) + ')'; });
        score = Math.max(71, Math.min(99, score + Math.round((Math.random() - .45) * 4)));
        radar.querySelector('.avx-rd-val').textContent = score;
        routed += 1 + Math.floor(Math.random() * 4);
        chipA.querySelector('b').textContent = routed.toLocaleString('en-US');
        chipB.querySelector('b').textContent = '$' + (38 + Math.floor(Math.random() * 40)) + '.00';
        timer = setTimeout(pulse, 1400);
      }
      onVisible(core, function () { if (!timer) timer = setTimeout(pulse, 400); },
        function () { clearTimeout(timer); timer = null; }, 0.05);
    }
    return core;
  }

  // ---------- Ping/Post: live consoles replace the static dashboard screenshots ----------
  // Each console mirrors what its screenshot showed, with demo data that keeps moving.

  var PP_OFFERS = ['Medicare', 'Auto Ins.', 'Solar', 'Home Svc', 'Legal', 'Debt'];
  var PP_SOURCES = ['Google Ads', 'Meta', 'Bing', 'Native', 'Email', 'Affiliates'];
  var PP_BUYERS = ['Apex Insurance', 'Northwind', 'Meridian Health', 'Summit Solar', 'Lakeside Legal', 'Harbor Home'];
  var rnd = function (a, b) { return a + Math.random() * (b - a); };
  var pick = function (arr) { return arr[Math.floor(Math.random() * arr.length)]; };
  var fmtInt = function (v) { return Math.round(v).toLocaleString('en-US'); };
  var fmtMoney = function (v) { return '$' + Math.round(v).toLocaleString('en-US'); };

  function consoleShell(title, sub) {
    var c = el('div', 'avx-console',
      '<div class="avx-cs-bar"><i></i><i></i><i></i><span class="avx-cs-path">app.avortyx.com / ping-post / <b>' + title + '</b></span>' +
      '<span class="avx-cs-live"><i class="avx-live-dot"></i>Live</span></div>' +
      '<div class="avx-cs-body"></div>' +
      '<div class="avx-cs-foot">' + sub + ' · demo data</div>');
    c.setAttribute('role', 'img');
    return c;
  }

  // run fn every `every` ms while the console is on screen and motion is playing
  function ticker(host, every, fn) {
    if (reduced) return;
    var timer = null;
    function tick() {
      if (!motionPaused()) fn();
      timer = setTimeout(tick, every);
    }
    onVisible(host, function () { if (!timer) timer = setTimeout(tick, 500); },
      function () { clearTimeout(timer); timer = null; }, 0.05);
  }

  function ppDashboard(c) {
    var body = c.querySelector('.avx-cs-body');
    var k = { pings: rnd(9000, 9400), accept: rnd(20, 23), toCall: rnd(10.5, 12), revenue: rnd(168000, 172000), payout: rnd(134000, 138000), ms: rnd(320, 360) };
    var tiles = [['pings', 'Pings today', fmtInt], ['accept', 'Accept rate', function (v) { return v.toFixed(1) + '%'; }],
      ['toCall', 'Ping → call', function (v) { return v.toFixed(1) + '%'; }], ['revenue', 'Revenue', fmtMoney],
      ['payout', 'Payout', fmtMoney], ['ms', 'Avg response', function (v) { return Math.round(v) + 'ms'; }]];
    var html = '<div class="avx-kpis">';
    tiles.forEach(function (t) { html += '<div class="avx-kpi" data-k="' + t[0] + '"><span>' + t[1] + '</span><b></b><em></em></div>'; });
    html += '</div><div class="avx-cs-grid"><div class="avx-cs-card"><h6>Pings over time</h6><div class="avx-cs-chart"></div></div>' +
      '<div class="avx-cs-card"><h6>Ping → post funnel</h6><div class="avx-funnel"></div></div></div>';
    body.innerHTML = html;
    var chart = makeChart({ type: 'area', points: 30, min: 120, max: 420, start: 260, step: 45 });
    body.querySelector('.avx-cs-chart').appendChild(chart.svg);
    var funnel = body.querySelector('.avx-funnel');
    var stages = [['Pings', 1], ['Accepted', .21], ['Posted', .16], ['Converted', .11]];
    funnel.innerHTML = stages.map(function (s) { return '<div class="avx-fn-row"><span>' + s[0] + '</span><i><b></b></i><em></em></div>'; }).join('');
    var prev = {};
    function render() {
      tiles.forEach(function (t) {
        var tile = body.querySelector('[data-k="' + t[0] + '"]');
        tile.querySelector('b').textContent = t[2](k[t[0]]);
        if (prev[t[0]] !== undefined) {
          var up = k[t[0]] >= prev[t[0]];
          var em = tile.querySelector('em');
          em.textContent = up ? '▲' : '▼';
          em.className = up ? 'avx-up' : 'avx-down';
        }
        prev[t[0]] = k[t[0]];
      });
      var rows = funnel.querySelectorAll('.avx-fn-row');
      stages.forEach(function (s, i) {
        var share = i ? s[1] * (k.accept / 21) : 1;
        rows[i].querySelector('b').style.transform = 'scaleX(' + Math.max(.04, share).toFixed(3) + ')';
        rows[i].querySelector('em').textContent = fmtInt(k.pings * share);
      });
    }
    render();
    ticker(c, 1800, function () {
      k.pings += rnd(4, 18); k.accept = Math.max(18, Math.min(25, k.accept + rnd(-.4, .4)));
      k.toCall = Math.max(9, Math.min(13, k.toCall + rnd(-.25, .25)));
      k.revenue += rnd(40, 260); k.payout += rnd(30, 210); k.ms = Math.max(280, Math.min(420, k.ms + rnd(-14, 14)));
      chart.update();
      render();
    });
  }

  function ppSources(c) {
    var body = c.querySelector('.avx-cs-body');
    var rows = PP_SOURCES.map(function (s) {
      return { s: s, acc: rnd(14, 34), conv: rnd(60, 420), rev: rnd(4000, 28000), pay: rnd(.7, .86) };
    });
    body.innerHTML = '<table class="avx-cs-table"><thead><tr><th>Traffic source</th><th>Accept</th><th>Conv.</th><th>Revenue</th><th>Payout</th><th>Margin</th></tr></thead><tbody></tbody></table>';
    var tb = body.querySelector('tbody');
    function render(changed) {
      tb.innerHTML = rows.map(function (r, i) {
        var payout = r.rev * r.pay, margin = (r.rev - payout) / r.rev * 100;
        return '<tr' + (i === changed ? ' class="avx-cs-hot"' : '') + '><td>' + r.s + '</td><td>' + r.acc.toFixed(1) + '%</td><td>' + fmtInt(r.conv) +
          '</td><td>' + fmtMoney(r.rev) + '</td><td>' + fmtMoney(payout) + '</td><td><span class="avx-cs-bar-in"><i style="transform:scaleX(' +
          (margin / 30).toFixed(2) + ')"></i></span>' + margin.toFixed(1) + '%</td></tr>';
      }).join('');
    }
    render(-1);
    ticker(c, 1600, function () {
      var i = Math.floor(Math.random() * rows.length), r = rows[i];
      r.acc = Math.max(10, Math.min(40, r.acc + rnd(-1.2, 1.4)));
      r.conv += rnd(1, 6); r.rev += rnd(40, 320); r.pay = Math.max(.68, Math.min(.88, r.pay + rnd(-.006, .006)));
      render(i);
    });
  }

  function ppLog(c) {
    var body = c.querySelector('.avx-cs-body');
    body.innerHTML = '<table class="avx-cs-table avx-cs-log"><thead><tr><th>Time</th><th>Offer</th><th>Source</th><th>Buyers</th><th>Winning bid</th><th>Status</th></tr></thead><tbody></tbody></table>';
    var tb = body.querySelector('tbody');
    var ST = [['Won', 'ok'], ['Won', 'ok'], ['Posted', 'ring'], ['No bid', 'bid'], ['Won', 'ok'], ['Capped', 'cap']];
    function row(fresh) {
      var d = new Date(), st = pick(ST), buyers = 1 + Math.floor(Math.random() * 6);
      var tr = document.createElement('tr');
      if (fresh) tr.className = 'avx-live-new';
      tr.innerHTML = '<td>' + d.toLocaleTimeString('en-US', { hour12: false }) + '</td><td>' + pick(PP_OFFERS) + '</td><td>' + pick(PP_SOURCES) +
        '</td><td>' + buyers + ' matched</td><td>' + (st[0] === 'No bid' ? '—' : '$' + rnd(18, 74).toFixed(2)) +
        '</td><td><span class="avx-live-pill avx-pill-' + st[1] + '">' + st[0] + '</span></td>';
      return tr;
    }
    for (var i = 0; i < 7; i++) tb.appendChild(row(false));
    ticker(c, 1300, function () {
      tb.insertBefore(row(true), tb.firstChild);
      if (tb.children.length > 7) tb.removeChild(tb.lastChild);
    });
  }

  function ppUsage(c) {
    var body = c.querySelector('.avx-cs-body');
    var days = [], labels = [];
    for (var i = 13; i >= 0; i--) {
      var d = new Date(Date.now() - i * 864e5);
      labels.push((d.getMonth() + 1) + '/' + d.getDate());
      days.push(i ? rnd(160, 290) : 40);
    }
    body.innerHTML = '<div class="avx-cs-grid avx-cs-grid-wide"><div class="avx-cs-card"><h6>Unique pings / day (thousands)</h6><div class="avx-usage"></div></div>' +
      '<div class="avx-cs-card"><h6>Cost today</h6><ul class="avx-cost"></ul></div></div>';
    var u = body.querySelector('.avx-usage');
    u.innerHTML = days.map(function (v, i) { return '<div class="avx-ub' + (i === 13 ? ' avx-ub-today' : '') + '"><i><b></b></i><span>' + labels[i] + '</span></div>'; }).join('');
    var cost = body.querySelector('.avx-cost');
    function render() {
      var bars = u.querySelectorAll('b');
      days.forEach(function (v, i) { bars[i].style.transform = 'scaleY(' + (v / 300).toFixed(3) + ')'; });
      var today = days[13] * 1000, billed = today * .82;
      cost.innerHTML =
        '<li><span>Unique pings</span><b>' + fmtInt(today) + '</b></li>' +
        '<li><span>Duplicates (free)</span><b>' + fmtInt(today - billed) + '</b></li>' +
        '<li><span>Billable</span><b>' + fmtInt(billed) + '</b></li>' +
        '<li class="avx-cost-total"><span>Est. cost @ $0.12/1k</span><b>$' + (billed / 1000 * .12).toFixed(2) + '</b></li>';
    }
    render();
    ticker(c, 1500, function () { days[13] = Math.min(300, days[13] + rnd(1.5, 5)); render(); });
  }

  var PP_DEMOS = [
    [/ping-post-dashboard-1/, 'dashboard', 'KPIs and the ping-to-post funnel', ppDashboard],
    [/ping-post-dashboard-3/, 'sources', 'Performance by traffic source', ppSources],
    [/ping-post-dashboard-5/, 'ping-log', 'Real-time ping log', ppLog],
    [/ping-post-analytics-1/, 'usage', 'Usage and cost', ppUsage]
  ];

  function initPingPostDemos() {
    document.querySelectorAll('main img').forEach(function (im) {
      var demo = PP_DEMOS.filter(function (d) { return d[0].test(im.getAttribute('src') || ''); })[0];
      if (!demo) return;
      var c = consoleShell(demo[1], demo[2]);
      c.setAttribute('aria-label', im.getAttribute('alt') || demo[2]);
      var target = im.closest('.zoomable-marketing-image') || im;
      if (im.classList.contains('mb-4')) c.classList.add('mb-4');
      target.parentNode.insertBefore(c, target);
      target.classList.add('avx-replaced');
      demo[3](c);
    });
  }

  // ---------- Page heroes: ringba portal rings with a counter-rotating shine ----------

  function initPortals() {
    document.querySelectorAll('.avx-sbg-rings-tilt').forEach(function (tilt) {
      tilt.innerHTML = '';
      tilt.appendChild(rb('pt-hero-rings.webp', 'avx-portal-rings'));
      tilt.appendChild(rb('pt-hero-shine.webp', 'avx-portal-shine'));
    });
  }

  // ---------- CTA band: neon trading waves flowing across ----------

  function initCtaWaves() {
    document.querySelectorAll('.marketing-cta-band').forEach(function (band) {
      var fx = band.querySelector('.avx-fx');
      if (!fx) return;
      var waves = el('div', 'avx-cta-waves');
      ['trading-waves--top-1900.webp', 'trading-waves--bottom-1700.webp'].forEach(function (f, i) {
        var lane = el('div', 'avx-wave-lane avx-wave-lane-' + (i + 1));
        lane.appendChild(rb(f));
        lane.appendChild(rb(f));
        waves.appendChild(lane);
      });
      fx.insertBefore(waves, fx.firstChild);
    });
  }

  // ---------- Tables: staggered rows, live header sheen, count-up prices, row + column focus ----------

  var MONEY = /^\$\s?(\d[\d,]*)(\.\d+)?$/;

  function countUp(cell) {
    var m = cell.textContent.trim().match(MONEY);
    if (!m) return;
    var target = parseFloat((m[1] + (m[2] || '')).replace(/,/g, ''));
    var decimals = m[2] ? m[2].length - 1 : 0;
    var t0 = performance.now();
    (function step(now) {
      var p = Math.min((now - t0) / 1100, 1);
      cell.textContent = '$' + (target * (1 - Math.pow(1 - p, 3))).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
    })(t0);
  }

  function initTables() {
    document.querySelectorAll('main table').forEach(function (table) {
      if (table.closest('.modal, .avx-console')) return; // live consoles animate themselves
      table.classList.add('avx-table');
      var rows = table.querySelectorAll('tbody tr');
      Array.prototype.forEach.call(rows, function (tr, i) { tr.style.setProperty('--i', Math.min(i, 14)); });
      var pricing = table.classList.contains('pricing-table');

      // row + column focus
      table.addEventListener('pointerover', function (e) {
        var cell = e.target.closest('td, th');
        if (!cell || !table.contains(cell)) return;
        var idx = cell.cellIndex;
        if (table._avxCol === idx) return;
        table._avxCol = idx;
        table.querySelectorAll('.avx-col').forEach(function (c) { c.classList.remove('avx-col'); });
        if (idx > 0) {
          Array.prototype.forEach.call(table.rows, function (r) { if (r.cells[idx]) r.cells[idx].classList.add('avx-col'); });
        }
      });
      table.addEventListener('pointerleave', function () {
        table._avxCol = -1;
        table.querySelectorAll('.avx-col').forEach(function (c) { c.classList.remove('avx-col'); });
      });

      if (reduced || !('IntersectionObserver' in window)) { table.classList.add('avx-table-in'); return; }
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          io.unobserve(table);
          table.classList.add('avx-table-in');
          if (pricing) table.querySelectorAll('tbody td').forEach(countUp);
        });
      }, { threshold: 0.15 });
      io.observe(table);
    });

    // calculator totals flash when the estimate changes
    document.querySelectorAll('.pricing-calculator-row-total .pricing-calculator-row-rate, .pricing-calculator-row-rate').forEach(function (cell) {
      if (!('MutationObserver' in window)) return;
      new MutationObserver(function () {
        var row = cell.closest('.pricing-calculator-row') || cell;
        row.classList.remove('avx-flash');
        void row.offsetWidth; // restart the animation
        row.classList.add('avx-flash');
      }).observe(cell, { childList: true, characterData: true, subtree: true });
    });
  }

  // ---------- Wide tables: fade the edge that has more to scroll ----------

  function initScrollHints() {
    document.querySelectorAll('.pricing-table-wrap, .table-responsive').forEach(function (wrap) {
      wrap.classList.add('avx-scroll-hint');
      function update() {
        var max = wrap.scrollWidth - wrap.clientWidth;
        wrap.classList.toggle('avx-more-left', max > 1 && wrap.scrollLeft > 1);
        wrap.classList.toggle('avx-more-right', max > 1 && wrap.scrollLeft < max - 1);
      }
      wrap.addEventListener('scroll', update, { passive: true });
      window.addEventListener('resize', update, { passive: true });
      update();
    });
  }

  function initHeroRings() {
    var rings = document.querySelector('.hero-rings img');
    if (rings) rings.src = BAKED + 'rings-' + (DARK ? 'd' : 'l') + '.png';
  }

  // lift the boot gate once the page is built and the web fonts are in (or after a short wait)
  function reveal() {
    var root = document.documentElement;
    if (!root.classList.contains('avx-boot')) return;
    function show() {
      requestAnimationFrame(function () {
        root.classList.add('avx-booted');
        root.classList.remove('avx-boot');
      });
    }
    if (document.fonts && document.fonts.ready) {
      Promise.race([document.fonts.ready, new Promise(function (r) { setTimeout(r, 800); })]).then(show, show);
    } else {
      show();
    }
  }

  function init() {
    try {
      build();
    } finally {
      reveal();
    }
  }

  function build() {
    initMotionToggle();
    initProgress();
    initHeroRings();
    initRingbaHero();
    initLeadFlow();
    initPlatformFlow();
    initHeadingFx();
    initBottomWaves();
    initSectionBackgrounds();
    initPortals();
    initHeroCharts();
    initPingPostDemos();
    initAuthRing();
    initIntegrationsHub();
    initIntegrationsBackdrop();
    initPricingHorizon();
    initFlowSequences();
    initCtaFx();
    initCtaWaves();
    initAurora();
    initRails();
    initTables();
    initCounters();
    initOffscreenPause();
    initScrollHints();
    initSpotlight();
    if (!reduced) {
      initHeadingWords();
      initReveal();
      initTilt();
    }
    setPaused(motionPaused()); // apply a saved pause to scenes built after the toggle
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
