/*
 * Avortyx motion layer — progressive enhancement for every marketing page.
 * Pages render normally without it; this only adds classes and decorative layers.
 */
(function () {
  'use strict';

  var ASSETS = '/assets/trackdrive_marketing/brand-assets/ringba%20assets/';
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function img(name, className) {
    var el = document.createElement('img');
    el.src = ASSETS + name;
    el.alt = '';
    el.decoding = 'async';
    if (className) el.className = className;
    // colored spheres are tinted to the hero blue, unless marked avx-keep
    if (/sphere/.test(name) && !/blue/.test(name) && !/avx-keep/.test(className || '')) el.classList.add('avx-tint');
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
    var ticking = false;
    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.setProperty('--avx-progress', max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
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
      wrap.appendChild(img(s.src));
      fx.appendChild(wrap);
    });
    host.insertBefore(fx, host.firstChild);
    if (!reduced) parallax(host);
    return fx;
  }

  // Eases pointer position and reports it with the host's scroll position.
  // Frames run only while something is moving, so idle pages cost nothing.
  function driver(host, ease, onFrame) {
    var px = 0, py = 0, tx = 0, ty = 0, visible = false, raf = 0;
    function frame() {
      raf = 0;
      px += (tx - px) * ease;
      py += (ty - py) * ease;
      onFrame(px, py, host.getBoundingClientRect());
      if (Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001) kick();
    }
    function kick() {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    }
    if (finePointer) {
      host.addEventListener('pointermove', function (e) {
        var r = host.getBoundingClientRect();
        tx = (e.clientX - r.left) / r.width - 0.5;
        ty = (e.clientY - r.top) / r.height - 0.5;
        kick();
      });
      host.addEventListener('pointerleave', function () { tx = 0; ty = 0; kick(); });
    }
    window.addEventListener('scroll', kick, { passive: true });
    onVisible(host, function () { visible = true; kick(); }, function () { visible = false; }, 0);
  }

  function parallax(host) {
    driver(host, 0.08, function (px, py, r) {
      host.style.setProperty('--avx-px', (px * 24).toFixed(2));
      host.style.setProperty('--avx-py', (py * 24).toFixed(2));
      host.style.setProperty('--avx-scroll', Math.max(-600, Math.min(600, -r.top)).toFixed(0));
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
      fx.insertBefore(img('green-waves.png', 'avx-waves'), fx.firstChild);
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
          { src: 'blue-sphere-312.png', top: '4%', left: '-6%', size: 360, depth: 1.2, soft: true, bob: '14s', spin: '90s' },
          { src: 'green-sphere-312.png', bottom: '-12%', right: '-5%', size: 320, depth: 1.8, soft: true, bob: '12s', spin: '80s', delay: '-6s' }
        ], 'avx-convert-bg');
      }

      if (reduced) { flowWrap.classList.add('avx-seen'); return; }

      // entrance + idle sway + pointer tilt, driven per frame while visible
      var visible = false, running = false, start = 0;
      var px = 0, py = 0, tx = 0, ty = 0;
      function ease(t) { return 1 - Math.pow(1 - t, 3); }
      function frame(now) {
        if (!start) start = now;
        var e = ease(Math.min((now - start) / 1400, 1));
        px += (tx - px) * 0.06;
        py += (ty - py) * 0.06;
        var rx = (1 - e) * 50 + 6 + py * 8;
        var ry = Math.sin(now / 2600) * 6 + px * 14;
        flow.style.transform =
          'translate3d(0,' + ((1 - e) * 60).toFixed(1) + 'px,' + ((1 - e) * -160).toFixed(1) + 'px) ' +
          'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
        if (visible) requestAnimationFrame(frame); else running = false;
      }
      if (finePointer) {
        flowWrap.addEventListener('pointermove', function (ev) {
          var r = flowWrap.getBoundingClientRect();
          tx = (ev.clientX - r.left) / r.width - 0.5;
          ty = (ev.clientY - r.top) / r.height - 0.5;
        });
        flowWrap.addEventListener('pointerleave', function () { tx = 0; ty = 0; });
      }
      onVisible(flowWrap, function () {
        flowWrap.classList.add('avx-seen');
        visible = true;
        if (!running) { running = true; requestAnimationFrame(frame); }
      }, function () { visible = false; }, 0.2);
    });
  }

  // ---------- Spotlight headings: unique 3D scene behind each heading ----------

  var HEADING_FX = [
    { re: /^ping\s*\/\s*post$/i, type: 'ping', w: 340, h: 340 },
    { re: /^power dialer$/i, type: 'dialer', w: 360, h: 360 },
    { re: /^call tracking$/i, type: 'tracking', w: 560, h: 170 },
    { re: /^lead automation$/i, type: 'automation', w: 360, h: 360 },
    { re: /^agent control center$/i, type: 'gyro', w: 320, h: 320 }
  ];

  function buildHeadingFx(type) {
    var anim = document.createElement('div');
    anim.className = 'avx-hfx-anim';
    function add(el) { anim.appendChild(el); return el; }
    function div(cls) { var d = document.createElement('div'); d.className = cls; return d; }

    if (type === 'ping') {
      add(img('pt-hero-shine.png', 'avx-core avx-inv avx-round-mask'));
      for (var i = 0; i < 3; i++) add(div('avx-echo'));
    } else if (type === 'dialer') {
      add(img('platform-bg.png', 'avx-core avx-teeth-mask'));
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
      add(img('waves-ping-tree.png', 'avx-echo-wave avx-inv'));
      add(img('waves-ping-tree.png', 'avx-core avx-inv'));
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
        g.appendChild(img('pt-hero-rings.png', 'avx-inv avx-round-mask'));
      });
      add(img('blue-sphere-120.png', 'avx-gyro-core'));
    }
    return anim;
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
        var sp = Math.max(-1, Math.min(1, (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight));
        fx.style.setProperty('--avx-hx', hx.toFixed(3));
        fx.style.setProperty('--avx-hy', hy.toFixed(3));
        fx.style.setProperty('--avx-sp', sp.toFixed(3));
      });
    });
  }

  // ---------- Bottom-of-page 3D wave floors (one style per page) ----------

  // layer: [image, mode (tile|drift|zoom), extra classes, {alpha, speed, swell, y, z, pos, delay}]
  var WAVE_STYLES = {
    strands: { tilt: '52deg', layers: [
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands', { alpha: .45, speed: '70s', swell: '7s', y: '-40px', z: '-120px' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands avx-bw-green avx-bw-reverse avx-bw-mirror', { alpha: .7, speed: '52s', swell: '5.5s' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands', { alpha: .95, speed: '34s', swell: '4.5s', y: '50px', z: '80px' }]
    ] },
    ribbons: { tilt: '38deg', layers: [
      ['bg-waves-1920%20copy.png', 'drift', 'avx-bw-inv avx-bw-mirror', { alpha: .35, speed: '22s', swell: '9s', y: '-30px', z: '-140px', pos: '55%' }],
      ['bg-waves-1920%20copy.png', 'drift', 'avx-bw-inv', { alpha: .6, speed: '16s', swell: '6s', pos: '62%' }]
    ] },
    mesh: { tilt: '48deg', layers: [
      ['slider-bg-ping-tree.png', 'drift', 'avx-bw-inv', { alpha: .85, speed: '20s', swell: '7s', pos: '70%' }]
    ] },
    grid: { tilt: '66deg', layers: [
      [null, 'grid', '', { alpha: .9 }]
    ], noswell: true },
    // five stacked layers swelling in sequence: a rolling 3D tide
    tide: { tilt: '60deg', layers: [
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands', { alpha: .35, speed: '90s', swell: '5s', swellDelay: '0s', y: '-110px', z: '-320px' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands avx-bw-green avx-bw-reverse avx-bw-mirror', { alpha: .5, speed: '70s', swell: '5s', swellDelay: '-1s', y: '-60px', z: '-200px' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands', { alpha: .65, speed: '55s', swell: '5s', swellDelay: '-2s', y: '-10px', z: '-90px' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands avx-bw-green avx-bw-mirror', { alpha: .8, speed: '42s', swell: '5s', swellDelay: '-3s', y: '40px', z: '10px' }],
      ['waves-slider-blue-4374.png', 'tile', 'avx-bw-strands avx-bw-reverse', { alpha: .95, speed: '32s', swell: '5s', swellDelay: '-4s', y: '90px', z: '110px' }]
    ] },
    signal: { tilt: '42deg', layers: [
      ['waves-ping-tree.png', 'tile', 'avx-bw-inv avx-bw-mirror avx-bw-reverse', { alpha: .35, speed: '60s', swell: '1.9s', y: '-30px', z: '-110px' }],
      ['waves-ping-tree.png', 'tile', 'avx-bw-inv', { alpha: .85, speed: '40s', swell: '1.3s' }]
    ] },
    streak: { tilt: '46deg', layers: [
      ['trading-waves--bottom-1700.png', 'drift', 'avx-bw-inv avx-bw-mirror', { alpha: .5, speed: '20s', swell: '8s', y: '-30px', z: '-120px', pos: '70%' }],
      ['trading-waves--top-1900.png', 'drift', 'avx-bw-inv', { alpha: .7, speed: '14s', swell: '6s', y: '30px', z: '60px', pos: '40%' }]
    ] }
  };

  var WAVE_BY_PAGE = {
    '/': 'strands',
    '/features.html': 'ribbons',
    '/pricing.html': 'mesh',
    '/careers.html': 'streak',
    '/sign_up.html': 'grid',
    '/users/sign_in.html': 'tide',
    '/brand_assets.html': 'signal',
    '/privacy_policy.html': 'mesh',
    '/terms_of_service.html': 'ribbons'
  };
  var WAVE_ROTATION = ['ribbons', 'mesh', 'grid', 'signal', 'streak'];

  function pageWaveStyle() {
    var path = location.pathname.replace(/index\.html$/, '').replace(/\/$/, '') || '/';
    var key = path === '/' ? '/' : (/\.html$/.test(path) ? path : path + '.html');
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
      if (l[0]) im.style.setProperty('--src', 'url("' + ASSETS + l[0] + '")');
      if (o.alpha) im.style.setProperty('--alpha', o.alpha);
      if (o.speed) im.style.setProperty('--speed', o.speed);
      if (o.pos) im.style.setProperty('--pos', o.pos);
      if (o.delay) im.style.setProperty('--delay', o.delay);
      layer.appendChild(im);
      container.appendChild(layer);
    });
  }

  function reactive(host, target) {
    if (reduced) return;
    driver(host, 0.06, function (hx, hy, r) {
      var sp = Math.max(-1, Math.min(1, (r.bottom - window.innerHeight) / window.innerHeight));
      target.style.setProperty('--avx-hx', hx.toFixed(3));
      target.style.setProperty('--avx-hy', hy.toFixed(3));
      target.style.setProperty('--avx-sp', sp.toFixed(3));
    });
  }

  // sections inside <main> that are not nested in another section
  function topSections() {
    return Array.prototype.filter.call(document.querySelectorAll('main section'), function (sec) {
      return !sec.parentElement.closest('section') && !sec.closest('.modal');
    });
  }

  function initBottomWaves() {
    var sections = topSections().filter(function (sec) {
      return !sec.classList.contains('marketing-cta-band');
    });
    var host = sections[sections.length - 1];
    if (!host) return;
    var style = WAVE_STYLES[pageWaveStyle()];
    host.classList.add('avx-fx-host', 'avx-bwaves-host');

    var waves = document.createElement('div');
    waves.className = 'avx-bwaves';
    waves.setAttribute('aria-hidden', 'true');
    var plane = document.createElement('div');
    plane.className = 'avx-bwaves-plane';
    plane.style.setProperty('--tilt', style.tilt);
    var needsBlend = style.layers.some(function (l) { return /avx-bw-inv/.test(l[2]); });
    if (!needsBlend) waves.classList.add('avx-noblend');
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
    sway.appendChild(img('pt-hero-rings.png'));
    tilt.appendChild(sway);
    ring.appendChild(tilt);
    stage.insertBefore(ring, card);
    if (section) reactive(section, ring);
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
    document.querySelectorAll('main section.mktg-subpage-hero h1, main section.pricing-hero h1').forEach(function (h1) {
      var wrap = document.createElement('div');
      wrap.className = 'avx-h1wrap';
      h1.parentNode.insertBefore(wrap, h1);
      var rings = sbg('avx-sbg-rings');
      var tilt = document.createElement('div');
      tilt.className = 'avx-sbg-rings-tilt';
      tilt.appendChild(img('pt-hero-rings.png'));
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
      section.classList.add('avx-fx-host');
      var orb = sbg('avx-sbg-orb');
      orb.appendChild(img('green-waves.png'));
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
        index = (index + 1) % items.length;
        var item = items[index];
        var isArrow = /arrow/.test(item.className);
        var t = target(item);
        if (isArrow) {
          t.classList.remove('avx-active');
          void t.offsetWidth; // restart nudge animation
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

  function init() {
    initProgress();
    initLeadFlow();
    initHeadingFx();
    initBottomWaves();
    initSectionBackgrounds();
    initAuthRing();
    initFlowSequences();
    initHeroFx();
    initCtaFx();
    initCounters();
    if (!reduced) {
      initReveal();
      initTilt();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
