/*
 * Avortyx motion layer — progressive enhancement for every marketing page.
 * Pages render normally without it; this only adds classes and decorative layers.
 */
(function () {
  'use strict';

  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Canvas and WebGL scenes hold their current frame while the page is scrolling and pick up
  // again just after: redrawing them on top of every scroll frame was the main cause of jank.
  var scrollQuietAt = 0;
  window.addEventListener('scroll', function () { scrollQuietAt = performance.now() + 150; }, { passive: true });
  function scrolling() { return performance.now() < scrollQuietAt; }

  var BAKED = '/assets/avx-baked/';
  // decorative art from /assets/avx-ringba
  function img(name, className) {
    var el = document.createElement('img');
    el.src = RB + name;
    el.alt = '';
    el.decoding = 'async';
    el.loading = 'lazy';
    if (className) el.className = className;
    return el;
  }

  // margin widens the viewport for the test, so work can start before something arrives
  function onVisible(el, enter, leave, threshold, margin) {
    if (!('IntersectionObserver' in window)) { enter(); return; }
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) enter();
        else if (leave) leave();
      });
    }, { threshold: threshold || 0.15, rootMargin: margin || '0px' }).observe(el);
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

  // ---------- Floating spheres (heroes, CTA bands, convert section) ----------

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

  // ---------- "Everything you need to convert" 3D lead-flow scene ----------

  function initLeadFlow() {
    document.querySelectorAll('.mktg-lead-flow').forEach(function (flowWrap) {
      var flow = flowWrap.querySelector('.hero-simple-flow');
      if (!flow) return;
      flowWrap.classList.add('avx-flow3d');

      var hubIcon = flowWrap.querySelector('.hero-simple-hub-icon');
      flowWrap.classList.add('avx-lf2');
      // the scene canvas reaches past the content edges: keep it from widening the page
      var host = flowWrap.closest('section');
      if (host) host.classList.add('avx-clip');
      if (hubIcon) {
        // the animated Avortyx mark replaces the bolt above the name
        var bolt = hubIcon.querySelector('.fa-bolt');
        if (bolt) bolt.parentNode.replaceChild(vortexSvg('avx-vx-hub', 'avx-hub-mark'), bolt);
      }

      // tilt wrapper: the entrance and pointer tilt live here (updated only while the
      // pointer moves); the idle sway is a pure CSS animation on the flow itself
      var tilt = document.createElement('div');
      tilt.className = 'avx-flow-tilt';
      flow.parentNode.insertBefore(tilt, flow);
      tilt.appendChild(flow);
      leadScene(tilt, flow);

      // 3D: leadScene draws the spheres, the Avortyx globe and their platforms;
      // the icon glyphs ride on top of them
      flowWrap.classList.add('avx-lf3', 'avx-lf-sph');

      if (reduced) { flowWrap.classList.add('avx-seen', 'avx-settled'); return; }

      driver(flowWrap, 0.06, function (hx, hy) {
        setVar(tilt, '--avx-hx', hx.toFixed(3));
        setVar(tilt, '--avx-hy', hy.toFixed(3));
      }, true);
      // revealed just before it scrolls in, so it is already showing when it arrives
      onVisible(flowWrap, function () {
        if (flowWrap.classList.contains('avx-seen')) return;
        flowWrap.classList.add('avx-seen');
        setTimeout(function () { flowWrap.classList.add('avx-settled'); }, 1500);
      }, null, 0.01, '0px 0px 200px 0px');
    });
  }

  // Ringba-style holographic scene: Leads and Revenue are glass spheres, Avortyx is a
  // wireframe globe of light; each floats over a disc of glowing rings, and calls fly
  // between them as comets
  function leadScene(tilt, flow) {
    var canvas = el('canvas', 'avx-lf-canvas');
    canvas.setAttribute('aria-hidden', 'true');
    tilt.insertBefore(canvas, tilt.firstChild);
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var nodes = {
      leads: flow.querySelector('.hero-simple-node-leads .hero-simple-node-icon'),
      hub: flow.querySelector('.hero-simple-hub-icon'),
      revenue: flow.querySelector('.hero-simple-node-revenue .hero-simple-node-icon')
    };
    if (!nodes.leads || !nodes.hub || !nodes.revenue) return;
    var PAD_X = 60, PAD_T = 80, PAD_B = 110, TAU = Math.PI * 2;
    var W = 0, H = 0, dpr = 1, pos = {}, raf = 0, visible = false, clock = 0, last = 0, lastDraw = 0;
    var calls = [], nextCall = 0.4, ripples = [], flash = -9;
    // the scene is seen from slightly above
    var TILT = 0.42, CT = Math.cos(TILT), ST = Math.sin(TILT);
    var TINT = {
      leads: ['#c7d2fe', '#6d6af5', '#312e81', '#0d0b33'],
      revenue: ['#bae6fd', '#0ea5e9', '#0c4a6e', '#03172a'],
      moonA: ['#e0e7ff', '#818cf8', '#3730a3', '#110f40'],
      moonB: ['#cffafe', '#22d3ee', '#0e7490', '#041e29']
    };
    var SPR = {}, CURVES = globeCurves(), DOTS = fibSphere(140);

    function centre(elm) {
      var x = elm.offsetWidth / 2, y = elm.offsetHeight / 2, n = elm;
      while (n && n !== tilt) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
      return { x: x + PAD_X, y: y + PAD_T, r: elm.offsetWidth / 2 };
    }
    function measure() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = tilt.offsetWidth + PAD_X * 2;
      H = tilt.offsetHeight + PAD_T + PAD_B;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      pos.leads = centre(nodes.leads);
      pos.hub = centre(nodes.hub);
      pos.revenue = centre(nodes.revenue);
      SPR = { leads: glass(pos.leads.r, TINT.leads), revenue: glass(pos.revenue.r, TINT.revenue), moonA: glass(6, TINT.moonA), moonB: glass(4.5, TINT.moonB) };
    }

    function fibSphere(n) {
      var pts = [], ga = Math.PI * (3 - Math.sqrt(5));
      for (var i = 0; i < n; i++) {
        var y = 1 - (i + 0.5) / n * 2, rr = Math.sqrt(1 - y * y), a = i * ga;
        pts.push([Math.cos(a) * rr, y, Math.sin(a) * rr]);
      }
      return pts;
    }
    // the globe's wireframe: five latitudes and six meridians, as 3D polylines
    function globeCurves() {
      var c = [], i, pts;
      [-0.7, -0.36, 0, 0.36, 0.7].forEach(function (y) {
        var rr = Math.sqrt(1 - y * y);
        for (pts = [], i = 0; i <= 40; i++) pts.push([Math.cos(i / 40 * TAU) * rr, y, Math.sin(i / 40 * TAU) * rr]);
        c.push(pts);
      });
      for (var m = 0; m < 6; m++) {
        var th = m / 6 * Math.PI;
        for (pts = [], i = 0; i <= 40; i++) {
          var a = i / 40 * TAU;
          pts.push([Math.cos(a) * Math.cos(th), Math.sin(a), Math.cos(a) * Math.sin(th)]);
        }
        c.push(pts);
      }
      return c;
    }
    // turn about the vertical axis, then tip towards the viewer; z > 0 faces the viewer
    function project(P, rot) {
      var cr = Math.cos(rot), sr = Math.sin(rot);
      var x = P[0] * cr + P[2] * sr, z = -P[0] * sr + P[2] * cr, y = P[1];
      return [x, -(y * CT - z * ST), y * ST + z * CT];
    }

    // glass spheres are shaded once per size and blitted every frame
    function sprite(r) {
      var s = Math.ceil(r * 2 + 6), c = document.createElement('canvas');
      c.width = c.height = Math.round(s * dpr);
      var g = c.getContext('2d');
      g.setTransform(dpr, 0, 0, dpr, s * dpr / 2, s * dpr / 2);
      return { c: c, g: g, s: s };
    }
    function glass(r, c) {
      var o = sprite(r), g = o.g;
      g.save();
      g.beginPath(); g.arc(0, 0, r, 0, TAU); g.clip();
      var b = g.createRadialGradient(-r * 0.36, -r * 0.42, r * 0.04, -r * 0.1, -r * 0.1, r * 1.25);
      b.addColorStop(0, c[0]); b.addColorStop(0.34, c[1]); b.addColorStop(0.74, c[2]); b.addColorStop(1, c[3]);
      g.fillStyle = b; g.fillRect(-r, -r, r * 2, r * 2);
      var u = g.createRadialGradient(r * 0.1, r * 0.98, 0, r * 0.1, r * 0.98, r * 0.95);
      u.addColorStop(0, 'rgba(125,211,252,.4)'); u.addColorStop(1, 'rgba(125,211,252,0)');
      g.fillStyle = u; g.fillRect(-r, -r, r * 2, r * 2);
      var f = g.createRadialGradient(0, 0, r * 0.6, 0, 0, r);
      f.addColorStop(0, 'rgba(191,219,254,0)'); f.addColorStop(0.85, 'rgba(191,219,254,.08)'); f.addColorStop(1, 'rgba(219,234,254,.5)');
      g.fillStyle = f; g.fillRect(-r, -r, r * 2, r * 2);
      g.restore();
      g.save(); g.translate(-r * 0.36, -r * 0.46); g.rotate(-0.62); g.scale(1, 0.56);
      var h = g.createRadialGradient(0, 0, 0, 0, 0, r * 0.44);
      h.addColorStop(0, 'rgba(255,255,255,.7)'); h.addColorStop(0.45, 'rgba(255,255,255,.16)'); h.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = h; g.beginPath(); g.arc(0, 0, r * 0.44, 0, TAU); g.fill();
      g.restore();
      return o;
    }
    function blit(o, x, y) { ctx.drawImage(o.c, x - o.s / 2, y - o.s / 2, o.s, o.s); }

    function bob(name, t) {
      if (reduced) return 0;
      return Math.sin(t * 0.8 + { leads: 0, hub: 2.1, revenue: 4.2 }[name]) * (name === 'hub' ? 3 : 4);
    }

    // a disc of glowing rings with a turning ring of ticks, like Ringba's platforms
    function platform(name, t) {
      var p = pos[name], hub = name === 'hub';
      var cx = p.x, cy = p.y + p.r + (hub ? 18 : 18), rx = p.r * (hub ? 1.6 : 1.5), ry = rx * 0.26;
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      ctx.save(); ctx.translate(cx, cy); ctx.scale(1, 0.26);
      var g = ctx.createRadialGradient(0, 0, 0, 0, 0, rx * 1.2);
      g.addColorStop(0, 'rgba(59,130,246,.32)'); g.addColorStop(0.55, 'rgba(37,99,235,.1)'); g.addColorStop(1, 'rgba(37,99,235,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(0, 0, rx * 1.2, 0, TAU); ctx.fill();
      ctx.restore();
      [1, 0.8, 0.6, 0.4].forEach(function (k, i) {
        ctx.strokeStyle = 'rgba(96,165,250,' + [0.5, 0.26, 0.2, 0.14][i] + ')';
        ctx.lineWidth = i ? 1 : 1.3;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx * k, ry * k, 0, 0, TAU); ctx.stroke();
      });
      // the near edge of the outer ring catches the light
      ctx.strokeStyle = 'rgba(191,219,254,.55)';
      ctx.lineWidth = 1.6;
      ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, Math.PI * 0.12, Math.PI * 0.88); ctx.stroke();
      var n = hub ? 96 : 64, a0 = t * (hub ? 0.12 : -0.15);
      ctx.beginPath();
      for (var i = 0; i < n; i++) {
        var a = a0 + i / n * TAU, ca = Math.cos(a), sa = Math.sin(a), r2 = i % 4 === 0 ? 1.24 : 1.15;
        ctx.moveTo(cx + ca * rx * 1.08, cy + sa * ry * 1.08);
        ctx.lineTo(cx + ca * rx * r2, cy + sa * ry * r2);
      }
      ctx.strokeStyle = 'rgba(125,211,252,.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
      ripples.forEach(function (rp) {
        if (rp.name !== name) return;
        var a = (t - rp.t) / 1.2;
        if (a < 0 || a > 1) return;
        ctx.strokeStyle = 'rgba(147,197,253,' + (0.6 * (1 - a) * (1 - a)).toFixed(3) + ')';
        ctx.lineWidth = 1.4;
        ctx.beginPath(); ctx.ellipse(cx, cy, rx * (0.45 + a * 0.95), ry * (0.45 + a * 0.95), 0, 0, TAU); ctx.stroke();
      });
      if (hub) {
        // a soft beam rising from the disc into the globe
        // (a tall soft ellipse, so it has no edges)
        var bw = rx * 0.42, top = p.y - p.r * 0.3;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(1, (cy - top) / bw);
        var bg = ctx.createRadialGradient(0, 0, 0, 0, 0, bw);
        bg.addColorStop(0, 'rgba(96,165,250,.2)'); bg.addColorStop(1, 'rgba(96,165,250,0)');
        ctx.fillStyle = bg; ctx.beginPath(); ctx.arc(0, 0, bw, Math.PI, TAU); ctx.fill();
        ctx.restore();
      }
      ctx.restore();
    }

    // a thin tilted ring around a glass sphere: back half first, front half after the sphere
    function halo(x, y, r, front) {
      ctx.strokeStyle = front ? 'rgba(191,219,254,.45)' : 'rgba(147,197,253,.16)';
      ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.ellipse(x, y, r * 1.42, r * 0.34, -0.18, front ? 0 : Math.PI, front ? Math.PI : TAU); ctx.stroke();
    }
    function node(name, t, off) {
      var p = pos[name], y = p.y + off;
      halo(p.x, y, p.r, false);
      blit(SPR[name], p.x, y);
      halo(p.x, y, p.r, true);
    }

    // the Avortyx globe: a lit core, a turning wireframe and a dust of points
    function globe(t, off) {
      var p = pos.hub, x = p.x, y = p.y + off, r = p.r * 1.02, rot = reduced ? 0.4 : t * 0.35;
      var fl = Math.max(0, 1 - (t - flash) / 0.9);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      var hg = ctx.createRadialGradient(x, y, r * 0.8, x, y, r * 1.7);
      hg.addColorStop(0, 'rgba(59,130,246,' + (0.2 + fl * 0.2).toFixed(3) + ')'); hg.addColorStop(1, 'rgba(59,130,246,0)');
      ctx.fillStyle = hg; ctx.beginPath(); ctx.arc(x, y, r * 1.7, 0, TAU); ctx.fill();
      ctx.restore();
      var cg = ctx.createRadialGradient(x - r * 0.25, y - r * 0.3, r * 0.1, x, y, r);
      cg.addColorStop(0, 'rgba(37,99,235,.55)'); cg.addColorStop(0.7, 'rgba(23,37,84,.6)'); cg.addColorStop(1, 'rgba(96,165,250,.4)');
      ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      var back = new Path2D(), front = new Path2D();
      CURVES.forEach(function (pts) {
        var prev = project(pts[0], rot);
        for (var i = 1; i < pts.length; i++) {
          var q = project(pts[i], rot), path = prev[2] + q[2] > 0 ? front : back;
          path.moveTo(x + prev[0] * r, y + prev[1] * r);
          path.lineTo(x + q[0] * r, y + q[1] * r);
          prev = q;
        }
      });
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = 'rgba(96,165,250,.2)';
      ctx.stroke(back);
      ctx.lineWidth = 1.1;
      ctx.strokeStyle = 'rgba(147,213,255,' + (0.5 + fl * 0.35).toFixed(3) + ')';
      ctx.stroke(front);
      var dots = new Path2D();
      DOTS.forEach(function (P) {
        var q = project(P, rot * 1.3);
        if (q[2] < 0.2) return;
        dots.moveTo(x + q[0] * r + 1.1, y + q[1] * r);
        dots.arc(x + q[0] * r, y + q[1] * r, 1.1, 0, TAU);
      });
      ctx.fillStyle = 'rgba(191,232,255,.55)';
      ctx.fill(dots);
      // rim light, then a shell that expands when a call lands
      ctx.strokeStyle = 'rgba(147,213,255,.5)';
      ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.stroke();
      if (fl > 0) {
        var a = 1 - fl;
        ctx.strokeStyle = 'rgba(147,213,255,' + (0.5 * fl).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(x, y, r * (1 + a * 0.45), 0, TAU); ctx.stroke();
      }
      ctx.restore();
    }
    // two small glass moons orbit the globe, passing behind and in front of it
    function moons(t, off, front) {
      var p = pos.hub, rx = p.r * 1.7, ry = p.r * 0.42, rot = -0.22, cr = Math.cos(rot), sr = Math.sin(rot);
      [['moonA', 0.55, 0], ['moonB', -0.4, 2.4]].forEach(function (m) {
        var a = (reduced ? 1 : t) * m[1] + m[2], inFront = Math.sin(a) > 0;
        if (inFront !== front) return;
        var ex = Math.cos(a) * rx, ey = Math.sin(a) * ry;
        ctx.globalAlpha = front ? 1 : 0.55;
        blit(SPR[m[0]], p.x + ex * cr - ey * sr, p.y + off + ex * sr + ey * cr);
        ctx.globalAlpha = 1;
      });
    }

    // quadratic arc lifted above the scene
    function arc(a, b, t) {
      var cx = (a.x + b.x) / 2, cy = Math.min(a.y, b.y) - 60, u = 1 - t;
      return { x: u * u * a.x + 2 * u * t * cx + t * t * b.x, y: u * u * a.y + 2 * u * t * cy + t * t * b.y, s: 1 + Math.sin(t * Math.PI) * 0.3 };
    }
    function track(a, b, t) {
      ctx.save();
      ctx.setLineDash([2, 7]);
      ctx.lineDashOffset = -t * 22;
      ctx.lineWidth = 1.3;
      ctx.strokeStyle = 'rgba(147,197,253,.2)';
      ctx.beginPath();
      for (var i = 0; i <= 40; i++) {
        var q = arc(a, b, i / 40);
        if (i) ctx.lineTo(q.x, q.y); else ctx.moveTo(q.x, q.y);
      }
      ctx.stroke();
      ctx.restore();
    }
    // a call: a bright head with a fading tail of light
    function comet(a, b, e) {
      var fade = Math.min(1, e / 0.06, (1 - e) / 0.06);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      for (var k = 14; k >= 1; k--) {
        var u = e - k / 14 * 0.2;
        if (u < 0) continue;
        var q = arc(a, b, u), w = 1 - k / 14;
        ctx.fillStyle = 'rgba(125,211,252,' + (w * 0.45 * fade).toFixed(3) + ')';
        ctx.beginPath(); ctx.arc(q.x, q.y, 0.6 + w * 2.6 * q.s, 0, TAU); ctx.fill();
      }
      var h = arc(a, b, e), R = 12 * h.s;
      var g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, R);
      g.addColorStop(0, 'rgba(224,242,254,' + (0.95 * fade).toFixed(3) + ')');
      g.addColorStop(0.3, 'rgba(56,189,248,' + (0.4 * fade).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(56,189,248,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(h.x, h.y, R, 0, TAU); ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,' + fade.toFixed(3) + ')';
      ctx.beginPath(); ctx.arc(h.x, h.y, 2.2 * h.s, 0, TAU); ctx.fill();
      ctx.restore();
    }
    function hit(name, t) {
      var n = nodes[name];
      n.classList.add('avx-hit');
      setTimeout(function () { n.classList.remove('avx-hit'); }, 380);
      ripples.push({ name: name, t: t });
      if (name === 'hub') flash = t;
    }
    function ease(u) { return u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2; }

    function draw(t) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var off = { leads: bob('leads', t), hub: bob('hub', t), revenue: bob('revenue', t) };
      Object.keys(off).forEach(function (n) { nodes[n].style.translate = '0 ' + off[n].toFixed(2) + 'px'; });
      var L = { x: pos.leads.x + pos.leads.r * 0.95, y: pos.leads.y + off.leads };
      var Hin = { x: pos.hub.x - pos.hub.r * 1.02, y: pos.hub.y + off.hub };
      var Hout = { x: pos.hub.x + pos.hub.r * 1.02, y: pos.hub.y + off.hub };
      var R = { x: pos.revenue.x - pos.revenue.r * 0.95, y: pos.revenue.y + off.revenue };
      track(L, Hin, t);
      track(Hout, R, t);
      ['leads', 'hub', 'revenue'].forEach(function (n) { platform(n, t); });
      node('leads', t, off.leads);
      moons(t, off.hub, false);
      globe(t, off.hub);
      moons(t, off.hub, true);
      node('revenue', t, off.revenue);

      if (!reduced && !motionPaused() && t > nextCall) {
        calls.push({ t0: t });
        hit('leads', t);
        nextCall = t + 2.2 + Math.random() * 1.1;
      }
      var LEG = 1.6;
      calls = calls.filter(function (c) {
        var age = t - c.t0;
        if (age < LEG) { comet(L, Hin, ease(age / LEG)); return true; }
        if (!c.inHub) { c.inHub = true; hit('hub', t); }
        var age2 = age - LEG - 0.4;
        if (age2 < 0) return true; // a beat inside the globe while it routes the call
        if (age2 < LEG) { comet(Hout, R, ease(age2 / LEG)); return true; }
        hit('revenue', t);
        return false;
      });
      ripples = ripples.filter(function (r) { return t - r.t < 1.2; });
    }

    function frame(now) {
      raf = 0;
      // the calls move slowly: 30 fps reads the same and halves the work. This scene is small,
      // so unlike the big backgrounds it keeps moving while the page scrolls.
      if (!reduced && now - lastDraw < 32) { schedule(); return; }
      clock += last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      lastDraw = now;
      draw(clock + 1);
      schedule();
    }
    function schedule() {
      if (raf || !visible || reduced) return;
      // paused: hold still, but only after the first frame is on screen
      if (motionPaused() && lastDraw) { last = 0; setTimeout(schedule, 400); return; }
      raf = requestAnimationFrame(frame);
    }
    var resizeT = 0;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(function () { measure(); draw(clock + 1); }, 150);
    });
    // start 400px early: the sphere sprites are built and the first frame drawn off screen
    onVisible(tilt, function () {
      visible = true; last = 0; measure();
      draw(clock + 1);
      if (!reduced) schedule();
    }, function () { visible = false; }, 0, '400px 0px');
    // web fonts can shift the layout after the first measure
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { if (visible) measure(); });
  }

  // ---------- Spotlight headings: unique 3D scene behind each heading ----------

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
      if (l[0]) im.style.setProperty('--src', 'url("' + BAKED + l[0] + '-d.webp")');
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
    '/features/integrations.html': function () {
      return silkScene('avx-cv-bottom', [
        { color: '56,189,248', lines: 36, alpha: .28, base: .56, amp: .13, spread: .3, freq: .9, phase: 1, speed: .26 },
        { color: '99,102,241', lines: 30, alpha: .26, base: .66, amp: .12, spread: .28, freq: 1.2, phase: 3.6, speed: .2 }
      ]);
    }
  };

  function initBottomWaves() {
    if (/^\/features(\.html)?\/?$/.test(location.pathname)) return; // features page ends clean
    if (pageKey() === '/' || pageKey() === '/pricing.html' || pageKey() === '/users/sign_in.html') return; // these pages end clean
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

    // a quiet background: a faint dot grid and two soft glows drifting slowly behind the card
    if (section) {
      section.classList.add('avx-auth-calm');
      var bg = el('div', 'avx-auth-bg', '<i class="avx-auth-glow avx-auth-glow-1"></i><i class="avx-auth-glow avx-auth-glow-2"></i><span class="avx-auth-dots"></span>');
      bg.setAttribute('aria-hidden', 'true');
      section.insertBefore(bg, section.firstChild);
    }
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
    stage.appendChild(img('icon-sphere--blue.webp', 'avx-ihub-core'));
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
    hero.classList.add('avx-fx-host', 'avx-pricing-3d');
    // the same quiet 3D floor as the landing page
    hero.insertBefore(el('div', 'avx-pbg', '<div class="avx-pbg-spot"></div><div class="avx-pbg-dots"></div><div class="avx-pbg-eclipse"></div><div class="avx-pbg-fade"></div>'), hero.firstChild);
  }

  // ---------- Section backgrounds ----------

  // ---------- Step-by-step highlight for flow diagrams ----------

  function initFlowSequences() {
    if (reduced) return;

    document.querySelectorAll('.spotlight-flow-steps, .flow-diagram, .flow-diagram-vertical').forEach(function (group) {
      var items = Array.prototype.filter.call(group.children, function (c) {
        return c.matches('.spotlight-flow-step, .spotlight-flow-arrow, .flow-node, .flow-arrow, .flow-arrow-down');
      });
      if (items.length < 2 || group.classList.contains('avx-replaced')) return;
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
    document.querySelectorAll('.hero-proof-stats .fs-3, .avx-proof-num').forEach(function (el) {
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
  // the vortex mark as three stacked layers (one per ring) so each ring rotates on the GPU;
  // animating paths inside an SVG would re-run style and layout every frame
  function vortexSvg(id, className) {
    var wrap = document.createElement('span');
    wrap.className = 'avx-vxl' + (className ? ' ' + className : '');
    wrap.setAttribute('aria-hidden', 'true');
    var RINGS = [['M52 32a20 20 0 1 1-13.2-18.8', 3, 1], ['M44.5 32a12.5 12.5 0 1 1-8.9-11.9', 2.5, .9], ['M38 32a6 6 0 1 1-4.2-5.7', 2, .8]];
    var html = '';
    RINGS.forEach(function (r, i) {
      var gid = id + '-' + (i + 1);
      html += '<span class="avx-vx-r' + (i + 1) + '"><svg viewBox="0 0 64 64" fill="none">' +
        '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
        '<stop offset="0%" style="stop-color: var(--vortyx-bright)"/>' +
        '<stop offset="55%" style="stop-color: var(--vortyx-teal)"/>' +
        '<stop offset="100%" style="stop-color: var(--vortyx-deep)"/></linearGradient></defs>' +
        '<path d="' + r[0] + '" stroke="url(#' + gid + ')" stroke-width="' + r[1] + '" stroke-linecap="round" opacity="' + r[2] + '"/></svg></span>';
    });
    html += '<span class="avx-vx-c"><svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="1.7" style="fill: var(--vortyx-ultra)"/></svg></span>';
    wrap.innerHTML = html;
    return wrap;
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
      stage.classList.add('avx-plat-simple');

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
          packets.appendChild(p);
        }
        sources.forEach(function (s, i) { wire(s, i, sources.length, false); });
        outputs.forEach(function (o, i) { wire(o, i, outputs.length, true); });
        svg.innerHTML = defs + paths;
        // one dot per pair: in from a source, through the Avortyx box, out the other side
        packets.innerHTML = '';
        var n = Math.min(sources.length, outputs.length);
        for (var i = 0; i < n; i++) {
          var s = offsetIn(sources[i], diagram), o = offsetIn(outputs[i], diagram);
          var yin = Math.round(h.y + h.h * (n > 1 ? 0.28 + 0.44 * i / (n - 1) : 0.5));
          var sy = Math.round(s.y + s.h / 2), oy = Math.round(o.y + o.h / 2);
          var d = curve(s.x + s.w, sy, h.x, yin) + ' L' + (h.x + h.w) + ' ' + yin + ' ' +
            curve(h.x + h.w, yin, o.x, oy).replace(/^M[^C]+/, '');
          var p = document.createElement('div');
          p.className = 'avx-plat-packet avx-plat-thru';
          p.style.offsetPath = 'path("' + d + '")';
          var delay = (i * 1.1).toFixed(2) + 's';
          p.style.animationDelay = delay;
          sources[i].style.setProperty('--avx-d', delay);
          outputs[i].style.setProperty('--avx-d', delay);
          packets.appendChild(p);
        }
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

  // ---------- Ringba art (optimized WebP in /assets/avx-ringba) ----------

  var RB = '/assets/avx-ringba/';

  function rb(file, className) {
    var el = document.createElement('img');
    el.src = RB + file;
    el.alt = '';
    el.decoding = 'async';
    el.loading = 'lazy';
    if (className) el.className = className;
    return el;
  }

  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html) n.innerHTML = html;
    return n;
  }

  // ---------- Pointer spotlight on cards (fine pointers only) ----------

  var SPOT = '.card, .feature-card, .features-grid-card, .integration-card, .integration-logo-card, ' +
    '.flow-item, .spotlight-flow-step, .mktg-brand-card, .mktg-careers-card, .mktg-auth-card, ' +
    '.pricing-highlight-card, .pricing-table-wrap, .pricing-accordion .accordion-item, .pricing-calculator-breakdown';

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

  // ---------- Landing hero: synthwave floor, hologram, and a live routing panel ----------

  var LIVE_BUYERS = ['Apex Insurance', 'Northwind Benefits', 'Meridian Health', 'Summit Solar', 'Lakeside Legal', 'Harbor Home', 'Pinnacle Auto'];

  function initRingbaHero() {
    var hero = document.querySelector('.marketing-hero-simple.hero-constellation-bg');
    if (!hero) return;
    hero.classList.add('avx-rb-hero', 'avx-hero-calm');

    // a quiet 3D floor: a perspective grid reaching back to a soft horizon
    hero.insertBefore(el('div', 'avx-pbg', '<div class="avx-pbg-spot"></div><div class="avx-pbg-dots"></div><div class="avx-pbg-eclipse"></div><div class="avx-pbg-fade"></div>'), hero.firstChild);
  }

  // ---------- Homepage: 3D waves floating behind the integration sections (no edges) ----------

  function wavesDraw(ctx, W, H, t) {
    var N = 34, step = W > 900 ? 12 : 10;
    ctx.globalCompositeOperation = 'lighter';
    for (var k = 0; k < N; k++) {
      var d = k / (N - 1);                       // 0 far .. 1 near
      var depth = 0.55 + 0.45 * d;               // nearer lines are wider
      var yc = H * (0.5 + (d - 0.5) * 0.5);
      var amp = H * (0.07 + 0.09 * d);
      var x0 = W / 2 - W * 0.6 * depth, x1 = W / 2 + W * 0.6 * depth;
      var g = ctx.createLinearGradient(x0, 0, x1, 0);
      var a = (0.05 + 0.22 * Math.pow(d, 1.6)).toFixed(3);
      var col = d < 0.5 ? '99,102,241' : '59,130,246';
      g.addColorStop(0, 'rgba(' + col + ',0)');
      g.addColorStop(0.3, 'rgba(' + col + ',' + a + ')');
      g.addColorStop(0.7, 'rgba(' + col + ',' + a + ')');
      g.addColorStop(1, 'rgba(' + col + ',0)');
      ctx.strokeStyle = g;
      ctx.lineWidth = 0.6 + 0.9 * d;
      ctx.beginPath();
      for (var x = x0; x <= x1 + step; x += step) {
        var u = (x - W / 2) / W;
        var y = yc + amp * Math.sin(u * 7 + t * 0.32 + d * 2.6) * Math.cos(u * 3.2 - t * 0.21 + d * 1.4) +
          amp * 0.35 * Math.sin(u * 13 - t * 0.5 + d * 4);
        if (x === x0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  }

  function initIntegrationWaves() {
    if (pageKey() !== '/') return;
    var main = document.querySelector('main');
    var heads = Array.prototype.slice.call(document.querySelectorAll('main section h2'));
    var a = heads.filter(function (h) { return /we integrate with/i.test(h.textContent); })[0];
    var b = heads.filter(function (h) { return /bring your own voip/i.test(h.textContent); })[0];
    a = a && a.closest('section');
    b = b && b.closest('section');
    if (!main || !a || !b) return;
    main.classList.add('avx-main-layer');
    function place() {
      wrap.style.top = (a.offsetTop - 40) + 'px';
      wrap.style.height = (b.offsetTop + b.offsetHeight - a.offsetTop + 80) + 'px';
    }
    var wrap;
    window.addEventListener('resize', function () { if (wrap) place(); });
    wrap = canvasScene('avx-iwaves', wavesDraw);
    main.insertBefore(wrap, main.firstChild);
    place();
    window.addEventListener('load', place);
    // sections above can change height as they are first drawn (content-visibility): follow them
    if ('ResizeObserver' in window) {
      var placeRaf = 0;
      new ResizeObserver(function () {
        if (!placeRaf) placeRaf = requestAnimationFrame(function () { placeRaf = 0; place(); });
      }).observe(main);
    }
  }

  // ---------- Hero: a call attribution card (source, campaign, keyword, buyer, revenue) ----------

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
      if (!reduced && (now - lastDraw < 32 || (lastDraw && scrolling()))) { schedule(); return; }
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
      // paused: hold still, but only after the first frame is on screen
      if (motionPaused() && lastDraw) { last = 0; setTimeout(schedule, 400); return; }
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

  // ---------- Signature: the Avortyx vortex as a real-time 3D sculpture (WebGL, no library) ----------
  // Three glossy capped-torus arcs (the logo's rings) are ray-marched in a fragment shader;
  // a 2D overlay projects incoming "calls" spiralling into the core with the same camera.

  var VX_FRAG = [
    'precision highp float;',
    'uniform vec2 uRes; uniform float uTime; uniform mat3 uRotT; uniform vec3 uSpin; uniform float uCam;',
    'uniform float uSep; uniform float uAlpha; uniform float uZoom;',
    'vec2 rot(vec2 v, float a) { float c = cos(a), s = sin(a); return vec2(c * v.x - s * v.y, s * v.x + c * v.y); }',
    // iq: capped torus, aperture centred on +y, gap on -y
    'float capTorus(vec3 p, vec2 sc, float ra, float rb) {',
    '  p.x = abs(p.x); float k = (sc.y * p.x > sc.x * p.y) ? dot(p.xy, sc) : length(p.xy);',
    '  return sqrt(max(dot(p, p) + ra * ra - 2.0 * ra * k, 0.0)) - rb; }',
    // the logo gap sits up-right (35deg); rotate it to -y in each ring frame
    'vec3 ringP(vec3 p, int i) {',
    '  float fi = float(i);',
    '  p.z -= (fi - 1.0) * uSep;',
    '  p.yz = rot(p.yz, sin(uTime * 0.35 + fi * 1.7) * 0.10 * fi);',
    '  float sp = i == 0 ? uSpin.x : (i == 1 ? uSpin.y : uSpin.z);',
    '  p.xy = rot(p.xy, 4.10152 - sp);',
    '  return p; }',
    'const vec2 SC = vec2(0.5736, -0.8192);',
    'vec2 map(vec3 p) {',
    '  float d0 = capTorus(ringP(p, 0), SC, 1.0, 0.100);',
    '  float d1 = capTorus(ringP(p, 1), SC, 0.625, 0.088);',
    '  float d2 = capTorus(ringP(p, 2), SC, 0.30, 0.076);',
    '  float d3 = length(p - vec3(0.0, 0.0, uSep)) - 0.075;',
    '  vec2 r = vec2(d0, 0.0);',
    '  if (d1 < r.x) r = vec2(d1, 1.0);',
    '  if (d2 < r.x) r = vec2(d2, 2.0);',
    '  if (d3 < r.x) r = vec2(d3, 3.0);',
    '  return r; }',
    // central differences: smooth, stable normals right up to the silhouette
    'vec3 normalAt(vec3 p, float e) {',
    '  vec2 h = vec2(e, 0.0);',
    '  vec3 g = vec3(map(p + h.xyy).x - map(p - h.xyy).x, map(p + h.yxy).x - map(p - h.yxy).x, map(p + h.yyx).x - map(p - h.yyx).x);',
    '  return g / max(length(g), 1e-6); }',
    // studio environment, all soft gradients (no hard strips that alias on the rim)
    'vec3 env(vec3 r) {',
    '  vec3 c = mix(vec3(0.004, 0.006, 0.016), vec3(0.030, 0.060, 0.170), smoothstep(-0.6, 0.9, r.y));',
    '  c += vec3(0.85, 0.92, 1.0) * smoothstep(0.15, 0.62, r.y) * (1.0 - smoothstep(0.70, 1.02, r.y)) * 1.6;',
    '  c += vec3(0.22, 0.42, 1.0) * smoothstep(0.1, 0.95, -r.x) * smoothstep(-0.5, 0.3, r.y) * 0.55;',
    '  c += vec3(0.55, 0.65, 0.95) * smoothstep(0.55, 1.0, r.x) * (1.0 - smoothstep(-0.2, 0.6, r.y)) * 0.25;',
    '  return c; }',
    'vec3 toLin(vec3 c) { return c * c; }',
    'void main() {',
    '  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;',
    '  float pix = 2.0 * uZoom / uRes.y;',
    '  vec3 ro = uRotT * vec3(0.0, 0.0, uCam);',
    '  vec3 rd = uRotT * normalize(vec3(uv * uZoom, -1.0));',
    '  float b = dot(ro, rd), c = dot(ro, ro) - 1.7 * 1.7, h = b * b - c;',
    '  if (h < 0.0) { gl_FragColor = vec4(0.0); return; }',
    '  float t = max(0.0, -b - sqrt(h)), tEnd = -b + sqrt(h);',
    // march, remembering the closest pass (in pixels) for analytic edge coverage
    '  float best = 1e9, tBest = t; bool found = false;',
    '  for (int i = 0; i < 120; i++) {',
    '    float d = map(ro + rd * t).x, pr = pix * t;',
    '    if (d / pr < best) { best = d / pr; tBest = t; }',
    '    if (d < pr * 0.15) { found = true; break; }',
    '    t += d * 0.85;',
    '    if (t > tEnd) break;',
    '  }',
    '  float cov = found ? 1.0 : 1.0 - smoothstep(0.0, 1.0, best);',
    '  if (cov <= 0.0) { gl_FragColor = vec4(0.0); return; }',
    '  vec3 p = ro + rd * tBest;',
    '  float id = map(p).y;',
    '  vec3 n = normalAt(p, max(0.0006, pix * tBest * 0.5));',
    // the logo gradient: bright top-left to deep bottom-right
    '  float g = clamp(dot(p.xy, normalize(vec2(1.0, -1.0))) * 0.55 + 0.5, 0.0, 1.0);',
    '  vec3 base = g < 0.5 ? mix(vec3(0.75, 0.86, 1.0), vec3(0.23, 0.51, 0.96), g * 2.0)',
    '                      : mix(vec3(0.23, 0.51, 0.96), vec3(0.11, 0.30, 0.85), (g - 0.5) * 2.0);',
    '  if (id > 2.5) base = vec3(0.93, 0.96, 1.0);',
    '  base = toLin(base);',
    '  vec3 V = -rd;',
    '  float nv = clamp(dot(n, V), 0.0, 1.0);',
    // glazed ceramic: tinted diffuse under a clear coat (Schlick fresnel, broad highlights)
    '  float F = 0.04 + 0.96 * pow(1.0 - nv, 5.0);',
    '  vec3 L1 = normalize(vec3(-0.45, 0.70, 0.55)), L2 = normalize(vec3(0.7, -0.2, 0.4));',
    '  float d1 = max(dot(n, L1), 0.0), d2 = max(dot(n, L2), 0.0);',
    '  vec3 H1 = normalize(L1 + V);',
    '  float s1 = pow(max(dot(n, H1), 0.0), 60.0) * (60.0 + 8.0) / 25.0;',
    '  float wrap = max(dot(n, L1) * 0.5 + 0.5, 0.0);',
    '  vec3 col = base * (0.10 + 0.95 * d1 + 0.18 * d2 + 0.12 * wrap);',
    '  vec3 R = reflect(rd, n);',
    '  col = mix(col, env(R) * mix(vec3(1.0), base * 1.6 + 0.25, 0.35), clamp(F * 0.9 + 0.12, 0.0, 1.0));',
    '  col += vec3(1.0, 0.98, 0.95) * s1 * 0.22 * (1.0 - F * 0.5);',
    // filmic tone map, then back to display gamma
    '  col = col / (col + 0.55) * 1.35;',
    '  col = sqrt(clamp(col, 0.0, 1.0));',
    '  float a = cov * uAlpha;',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
  ].join('\n');

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
      var R = 30, C = 2 * Math.PI * R, colors = ['#60a5fa', '#2563eb', '#93c5fd', '#475569', '#3471d3'];
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

  // ---------- Landing hero: the Signal Core, built from ringba art ----------

  // ---------- Ping/Post: live consoles replace the static dashboard screenshots ----------
  // Each console mirrors what its screenshot showed, with demo data that keeps moving.

  var PP_OFFERS = ['Medicare', 'Auto Ins.', 'Solar', 'Home Svc', 'Legal', 'Debt'];
  var PP_SOURCES = ['Google Ads', 'Meta', 'Bing', 'Native', 'Email', 'Affiliates'];
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

  // ---------- Landing hero: the vortex sculpture with its live chips ----------

  // ---------- Footer signature: a monumental wordmark whose "o" is the live vortex ----------

  function initSignature() {
    var footer = document.querySelector('footer.marketing-footer');
    var divider = footer && footer.querySelector('.footer-divider');
    if (!divider || footer.querySelector('.avx-sig')) return;
    var sig = el('div', 'avx-sig');
    sig.setAttribute('aria-hidden', 'true');
    var word = el('div', 'avx-sig-word');
    var av = el('span', 'avx-sig-txt', 'Av');
    av.dataset.t = 'Av';
    word.appendChild(av);
    var o = el('span', 'avx-sig-o');
    o.appendChild(vortexSvg('avx-vx-sig', 'avx-sig-mark'));
    word.appendChild(o);
    var rest = el('span', 'avx-sig-txt', 'rtyx');
    rest.dataset.t = 'rtyx';
    word.appendChild(rest);
    sig.appendChild(word);
    sig.appendChild(el('p', 'avx-sig-line', 'Every call, accounted for.'));
    divider.parentNode.insertBefore(sig, divider);
  }

  // ---------- Homepage feature sections: one small, live product screen each ----------

  // run(at) plays one cycle; at(ms, fn) schedules a beat inside it. The first cycle is
  // applied instantly (every beat at once, so it shows the cycle's end state) and the
  // screen is never empty; later cycles only play while in view and motion is on.
  function demoLoop(host, period, run) {
    var now = function (ms, f) { f(); };
    now.instant = true;
    run(now);
    if (reduced) return;
    var timers = [], next = null, on = false;
    function at(ms, f) { timers.push(setTimeout(f, ms)); }
    function cycle() {
      timers = [];
      if (motionPaused()) { next = setTimeout(cycle, 600); return; }
      run(at);
      next = setTimeout(cycle, period);
    }
    onVisible(host, function () { if (on) return; on = true; next = setTimeout(cycle, 300); },
      function () { on = false; clearTimeout(next); timers.forEach(clearTimeout); timers = []; }, 0.2);
  }

  function demoShell(path, foot) {
    return el('div', 'avx-console avx-demo',
      '<div class="avx-cs-bar"><i></i><i></i><i></i><span class="avx-cs-path">app.avortyx.com / <b>' + path + '</b></span>' +
      '<span class="avx-cs-live"><i class="avx-live-dot"></i>Live</span></div>' +
      '<div class="avx-cs-body"></div><div class="avx-cs-foot">' + foot + ' · demo data</div>');
  }

  var DEMO_BUYERS = ['Apex Insurance', 'Northwind Benefits', 'Meridian Health', 'Summit Direct', 'Harbor Home'];
  var DEMO_NAMES = ['Maria G.', 'Daniel R.', 'Aisha K.', 'Tom B.', 'Lena P.', 'Chris O.', 'Priya S.', 'Marcus L.', 'Elena V.', 'Sam W.'];
  var DEMO_STATES = ['TX', 'FL', 'CA', 'OH', 'AZ', 'GA', 'NC'];
  var demoPhone = function () { return '(' + Math.floor(rnd(201, 989)) + ') 555-01' + Math.floor(rnd(10, 99)); };
  var initials = function (n) { return n.split(' ').map(function (w) { return w[0]; }).join(''); };
  var clock = function (s) { return '00:' + String(s).padStart(2, '0'); };
  var pill = function (cls, text) { return '<span class="avx-live-pill avx-pill-' + cls + '">' + text + '</span>'; };

  // Ping/Post: one ping, five buyers bid, the best bid wins and the call is posted
  function demoPingPost(c) {
    var body = c.querySelector('.avx-cs-body');
    body.innerHTML =
      '<div class="avx-pp-ping"><span class="avx-pp-tag">Ping</span><b class="avx-pp-lead"></b><em class="avx-pp-ms"></em></div>' +
      '<div class="avx-pp-bids">' + DEMO_BUYERS.map(function (b) {
        return '<div class="avx-pp-bid"><span>' + b + '</span><b></b></div>';
      }).join('') + '</div>' +
      '<div class="avx-pp-post"><span class="avx-pp-tag">Post</span><span class="avx-pp-num"></span>' + pill('ok', 'Connected') + '</div>';
    var rows = body.querySelectorAll('.avx-pp-bid'), lead = body.querySelector('.avx-pp-lead'),
      ms = body.querySelector('.avx-pp-ms'), post = body.querySelector('.avx-pp-post'), num = body.querySelector('.avx-pp-num');
    demoLoop(c, 6600, function (at) {
      lead.textContent = pick(PP_OFFERS) + ' · caller in ' + pick(DEMO_STATES);
      ms.textContent = '';
      post.classList.remove('avx-on');
      num.textContent = 'Waiting for the winning bid';
      var bids = [];
      rows.forEach(function (r) {
        r.className = 'avx-pp-bid avx-wait';
        r.querySelector('b').innerHTML = '<i class="avx-pp-dots"><i></i><i></i><i></i></i>';
        var roll = Math.random();
        bids.push(roll < 0.16 ? 'cap' : roll < 0.28 ? 'geo' : Math.round(rnd(22, 64)));
      });
      if (bids.every(function (b) { return typeof b !== 'number'; })) bids[1] = Math.round(rnd(30, 60));
      var win = bids.reduce(function (w, b, i) { return typeof b === 'number' && (w < 0 || b > bids[w]) ? i : w; }, -1);
      [0, 1, 2, 3, 4].sort(function () { return Math.random() - 0.5; }).forEach(function (i, k) {
        at(400 + k * 260, function () {
          var b = bids[i];
          rows[i].className = 'avx-pp-bid ' + (typeof b === 'number' ? 'avx-bid' : 'avx-no');
          rows[i].querySelector('b').innerHTML = typeof b === 'number' ? '$' + b + '.00' : pill('cap', b === 'geo' ? 'Filtered · geo' : 'Cap reached');
        });
      });
      at(2000, function () {
        ms.textContent = Math.round(rnd(28, 64)) + ' ms';
        rows.forEach(function (r, i) { r.classList.add(i === win ? 'avx-win' : 'avx-lose'); });
      });
      at(2900, function () {
        num.innerHTML = '<b>+1 (888) 555-0' + Math.floor(rnd(100, 199)) + '</b> → ' + DEMO_BUYERS[win];
        post.classList.add('avx-on');
      });
    });
  }

  // Power Dialer: the next lead is dialed the moment the agent is free; machines are skipped
  function demoDialer(c) {
    var body = c.querySelector('.avx-cs-body');
    body.innerHTML =
      '<div class="avx-dl">' +
        '<div class="avx-dl-phone">' +
          '<div class="avx-dl-agent"><i class="avx-av">JM</i><div><b>Jordan M.</b><span class="avx-dl-status"></span></div></div>' +
          '<div class="avx-dl-call"><span class="avx-dl-who"></span><b class="avx-dl-time">00:00</b></div>' +
          '<div class="avx-dl-keys"><i class="fa-solid fa-microphone-slash" aria-hidden="true"></i><i class="fa-solid fa-pause" aria-hidden="true"></i>' +
            '<i class="fa-solid fa-right-left" aria-hidden="true"></i><i class="avx-dl-end fa-solid fa-phone-slash" aria-hidden="true"></i></div>' +
        '</div>' +
        '<div class="avx-dl-queue"><h6>Lead queue</h6><div class="avx-dl-rows"></div></div>' +
      '</div>' +
      '<div class="avx-demo-stats"><span>Dialed today <b class="avx-dl-n"></b></span><span>Connect rate <b>31%</b></span><span>Avg agent wait <b>4s</b></span></div>';
    var rowsEl = body.querySelector('.avx-dl-rows'), status = body.querySelector('.avx-dl-status'),
      who = body.querySelector('.avx-dl-who'), time = body.querySelector('.avx-dl-time'),
      phone = body.querySelector('.avx-dl-phone'), dialed = body.querySelector('.avx-dl-n');
    var queue = [], n = 0, dialedN = 412;
    function lead() { n++; return { name: DEMO_NAMES[n % DEMO_NAMES.length], phone: demoPhone() }; }
    function setStatus(text, cls) { status.textContent = text; phone.className = 'avx-dl-phone avx-' + cls; }
    function setRow(i, html) { rowsEl.children[i].querySelector('em').innerHTML = html; }
    demoLoop(c, 7800, function (at) {
      // drop the leads handled last cycle, top the queue back up to four
      queue = queue.filter(function (l) { return !l.done; });
      while (queue.length < 4) queue.push(lead());
      rowsEl.innerHTML = queue.map(function (l) {
        return '<div class="avx-dl-row"><b>' + l.name + '</b><span>' + l.phone + '</span><em>' + pill('bid', 'Queued') + '</em></div>';
      }).join('');
      dialed.textContent = fmtInt(dialedN);
      setStatus('Available', 'free');
      who.textContent = 'Waiting for the next lead';
      time.textContent = '00:00';
      var machine = Math.random() < 0.4, idx = machine ? 1 : 0, up = machine ? 2700 : 1500;
      at(300, function () { setRow(0, pill('ring', 'Dialing…')); setStatus('Dialing', 'dial'); who.textContent = 'Calling ' + queue[0].name; dialed.textContent = fmtInt(++dialedN); });
      if (machine) {
        at(1300, function () { setRow(0, pill('cap', 'Machine · skipped')); queue[0].done = true; });
        at(1500, function () { setRow(1, pill('ring', 'Dialing…')); who.textContent = 'Calling ' + queue[1].name; dialed.textContent = fmtInt(++dialedN); });
      }
      at(up, function () {
        setRow(idx, pill('ok', 'Human · live'));
        setStatus('On call', 'call');
        who.textContent = queue[idx].name + ' · ' + queue[idx].phone;
      });
      for (var s = 1; s <= 4; s++) (function (s) { at(up + s * 1000, function () { time.textContent = clock(s); }); })(s);
      at(up + 4300, function () {
        setRow(idx, pill('ok', pick(['Sale', 'Qualified', 'Callback set'])));
        queue[idx].done = true;
        setStatus('Wrap-up', 'wrap');
      });
    });
  }

  // Call Tracking: a call rides the flow (number -> IVR -> router), two buyers ring, first to answer wins
  function demoTracking(c) {
    var body = c.querySelector('.avx-cs-body');
    var buyers = [['Apex Insurance', 45], ['Northwind', 38], ['Meridian Health', 41]];
    body.innerHTML =
      '<div class="avx-ct">' +
        '<svg class="avx-ct-wires" aria-hidden="true"></svg>' +
        '<div class="avx-ct-node" data-n="num"><i class="fa-solid fa-hashtag" aria-hidden="true"></i><b>Tracking number</b><span class="avx-ct-sub">+1 (888) 555-0142</span></div>' +
        '<div class="avx-ct-node" data-n="ivr"><i class="fa-solid fa-list-ol" aria-hidden="true"></i><b>IVR menu</b><span class="avx-ct-sub"></span></div>' +
        '<div class="avx-ct-node" data-n="route"><i class="fa-solid fa-diagram-project" aria-hidden="true"></i><b>Router</b><span class="avx-ct-sub"></span></div>' +
        buyers.map(function (b, i) {
          return '<div class="avx-ct-node avx-ct-buyer" data-n="b' + i + '"><i class="fa-solid fa-building" aria-hidden="true"></i><b>' + b[0] + '</b><span class="avx-ct-sub">$' + b[1] + ' / call</span></div>';
        }).join('') +
        '<i class="avx-ct-dot"></i>' +
      '</div>' +
      '<div class="avx-ct-status"><span class="avx-ct-pill"></span><span class="avx-ct-line"></span></div>';
    var stage = body.querySelector('.avx-ct'), svg = stage.querySelector('svg'), dot = stage.querySelector('.avx-ct-dot');
    var node = function (k) { return stage.querySelector('[data-n="' + k + '"]'); };
    var P = {};
    function measure() {
      ['num', 'ivr', 'route', 'b0', 'b1', 'b2'].forEach(function (k) {
        var e = node(k);
        P[k] = { x: e.offsetLeft + e.offsetWidth / 2, y: e.offsetTop + e.offsetHeight / 2, top: e.offsetTop, bottom: e.offsetTop + e.offsetHeight };
      });
      svg.setAttribute('viewBox', '0 0 ' + stage.offsetWidth + ' ' + stage.offsetHeight);
      svg.innerHTML = ['num>ivr', 'ivr>route', 'route>b0', 'route>b1', 'route>b2'].map(function (w) {
        return '<path data-w="' + w + '" d="' + wire(w) + '"/>';
      }).join('');
    }
    function wire(w) {
      var a = P[w.split('>')[0]], b = P[w.split('>')[1]];
      if (w.indexOf('route>') < 0) return 'M' + a.x + ' ' + a.y + 'L' + b.x + ' ' + b.y;
      var y0 = a.bottom, y1 = b.top, my = (y0 + y1) / 2;
      return 'M' + a.x + ' ' + a.y + 'L' + a.x + ' ' + y0 + 'C' + a.x + ' ' + my + ' ' + b.x + ' ' + my + ' ' + b.x + ' ' + y1 + 'L' + b.x + ' ' + b.y;
    }
    function leg(at, w, dur) {
      if (at.instant || !dot.animate) return;
      dot.style.offsetPath = "path('" + wire(w) + "')";
      dot.animate([{ offsetDistance: '0%', opacity: 1 }, { offsetDistance: '100%', opacity: 1 }], { duration: dur, easing: 'cubic-bezier(.45,0,.25,1)' });
    }
    function wireOn(w, on) { var p = svg.querySelector('[data-w="' + w + '"]'); if (p) p.classList.toggle('avx-on', on); }
    function status(cls, text, line) { body.querySelector('.avx-ct-pill').innerHTML = pill(cls, text); body.querySelector('.avx-ct-line').innerHTML = line; }
    measure();
    window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    demoLoop(c, 6600, function (at) {
      stage.querySelectorAll('.avx-ct-node').forEach(function (e) { e.classList.remove('avx-on', 'avx-ring', 'avx-won', 'avx-lost'); });
      svg.querySelectorAll('path').forEach(function (p) { p.classList.remove('avx-on'); });
      node('ivr').querySelector('.avx-ct-sub').textContent = 'Press 1 for quotes';
      node('route').querySelector('.avx-ct-sub').textContent = 'Tier 1 · best EPC';
      var ring = [0, 1, 2].sort(function () { return Math.random() - 0.5; }).slice(0, 2), won = ring[0], lost = ring[1];
      var caller = demoPhone(), src = pick(CALL_SOURCES);
      status('ring', 'Incoming', caller + ' · ' + src);
      node('num').classList.add('avx-on');
      at(250, function () { wireOn('num>ivr', true); leg(at, 'num>ivr', 700); });
      at(950, function () { node('ivr').classList.add('avx-on'); node('ivr').querySelector('.avx-ct-sub').textContent = 'Caller pressed 1'; });
      at(1450, function () { wireOn('ivr>route', true); leg(at, 'ivr>route', 600); });
      at(2050, function () {
        node('route').classList.add('avx-on');
        node('route').querySelector('.avx-ct-sub').textContent = 'Ringing 2 buyers';
        ring.forEach(function (i) { node('b' + i).classList.add('avx-ring'); wireOn('route>b' + i, true); });
        status('bid', 'Ringing', 'Simultaneous ring · first to answer wins');
      });
      at(3100, function () {
        node('b' + lost).classList.remove('avx-ring'); node('b' + lost).classList.add('avx-lost'); wireOn('route>b' + lost, false);
        leg(at, 'route>b' + won, 750);
      });
      at(3850, function () {
        node('b' + won).classList.remove('avx-ring'); node('b' + won).classList.add('avx-won');
        status('ok', 'Connected', buyers[won][0] + ' answered · <b>+$' + buyers[won][1] + '.00</b>');
      });
    });
  }

  // Lead Automation: a web lead walks a sequence of SMS, wait, email and call until it connects
  function demoAutomation(c) {
    var body = c.querySelector('.avx-cs-body');
    var STEPS = [['comment-sms', 'SMS'], ['clock', 'Wait 5m'], ['envelope', 'Email'], ['phone-volume', 'Call'], ['circle-check', 'Live call']];
    body.innerHTML =
      '<div class="avx-la-lead"><i class="avx-av"></i><div><b class="avx-la-name"></b><span class="avx-la-what"></span></div><span class="avx-la-state"></span></div>' +
      '<div class="avx-la-track"><div class="avx-la-line"><b></b></div>' +
        STEPS.map(function (s) { return '<div class="avx-la-step"><i class="fa-solid fa-' + s[0] + '" aria-hidden="true"></i><span>' + s[1] + '</span><em></em></div>'; }).join('') +
      '</div>' +
      '<div class="avx-la-log"></div>';
    var steps = body.querySelectorAll('.avx-la-step'), fill = body.querySelector('.avx-la-line b'), log = body.querySelector('.avx-la-log'),
      state = body.querySelector('.avx-la-state'), n = 3;
    var mins = 0;
    function stamp() { mins += 1 + Math.floor(Math.random() * 4); var m = 42 + mins; return '09:' + String(m % 60).padStart(2, '0'); }
    function note(text) {
      var r = el('div', 'avx-la-row', '<time>' + stamp() + '</time><span>' + text + '</span>');
      log.insertBefore(r, log.firstChild);
      while (log.children.length > 3) log.removeChild(log.lastChild);
    }
    function step(i, cls, text) { steps[i].className = 'avx-la-step avx-' + cls; steps[i].querySelector('em').textContent = text; }
    function progress(i) { fill.style.transform = 'scaleX(' + (i / (STEPS.length - 1)).toFixed(3) + ')'; }
    demoLoop(c, 8400, function (at) {
      var name = DEMO_NAMES[n++ % DEMO_NAMES.length], offer = pick(['Solar quote', 'Auto insurance', 'Medicare plan', 'Home warranty']);
      body.querySelector('.avx-la-name').textContent = name;
      body.querySelector('.avx-la-what').textContent = offer + ' · web form';
      body.querySelector('.avx-la-lead .avx-av').textContent = initials(name);
      state.innerHTML = pill('ring', 'New lead');
      steps.forEach(function (s, i) { step(i, 'todo', ''); });
      progress(0);
      log.innerHTML = '';
      mins = 0;
      note('Lead received from web form');
      var retry = Math.random() < 0.45;
      at(300, function () { step(0, 'run', 'Sending'); state.innerHTML = pill('bid', 'In sequence'); });
      at(900, function () { step(0, 'done', 'Delivered'); note('SMS delivered · “Hi ' + name.split(' ')[0] + ', your quote is ready”'); progress(1); });
      at(1200, function () { step(1, 'run', '5:00'); });
      at(1700, function () { step(1, 'run', '2:30'); });
      at(2200, function () { step(1, 'done', 'Waited'); progress(2); });
      at(2500, function () { step(2, 'run', 'Sending'); });
      at(3100, function () { step(2, 'done', 'Opened'); note('Email opened'); progress(3); });
      at(3400, function () { step(3, 'run', 'Ringing'); });
      var t = 4400;
      if (retry) {
        at(4400, function () { step(3, 'run', 'No answer'); note('No answer · retry in 30 min'); });
        at(5200, function () { step(3, 'run', 'Retry…'); });
        t = 6000;
      }
      at(t, function () { step(3, 'done', 'Answered'); progress(4); });
      at(t + 400, function () { step(4, 'done', 'Connected'); state.innerHTML = pill('ok', 'Connected'); note('Connected to ' + pick(DEMO_BUYERS)); });
    });
  }

  // Agent Control Center: the agent qualifies a caller with a script, transfers, then dispositions
  function demoAgent(c) {
    var body = c.querySelector('.avx-cs-body');
    var Q = ['Valid driver’s license?', 'Vehicles to insure', 'Current insurer', 'ZIP code'];
    body.innerHTML =
      '<div class="avx-ag">' +
        '<div class="avx-ag-caller"><i class="avx-av"></i><b class="avx-ag-name"></b><span class="avx-ag-ph"></span>' +
          '<span class="avx-ag-src"></span><b class="avx-ag-time">00:00</b></div>' +
        '<div class="avx-ag-script"><h6>Script · Qualify the caller</h6>' +
          Q.map(function (q) { return '<div class="avx-ag-q"><span>' + q + '</span><b></b></div>'; }).join('') +
        '</div>' +
      '</div>' +
      '<div class="avx-ag-actions"><span class="avx-ag-xfer"></span><span class="avx-ag-dispo">' +
        ['Qualified', 'Callback', 'Not interested'].map(function (d) { return '<i>' + d + '</i>'; }).join('') + '</span></div>';
    var qs = body.querySelectorAll('.avx-ag-q'), xfer = body.querySelector('.avx-ag-xfer'), time = body.querySelector('.avx-ag-time'),
      chips = body.querySelectorAll('.avx-ag-dispo i'), n = 5;
    demoLoop(c, 8200, function (at) {
      var name = DEMO_NAMES[n++ % DEMO_NAMES.length];
      body.querySelector('.avx-ag-caller .avx-av').textContent = initials(name);
      body.querySelector('.avx-ag-name').textContent = name;
      body.querySelector('.avx-ag-ph').textContent = demoPhone();
      body.querySelector('.avx-ag-src').textContent = pick(CALL_SOURCES) + ' · Auto insurance';
      time.textContent = '00:00';
      qs.forEach(function (q) { q.className = 'avx-ag-q'; q.querySelector('b').textContent = ''; });
      xfer.className = 'avx-ag-xfer';
      xfer.innerHTML = '<i class="fa-solid fa-right-left" aria-hidden="true"></i>Transfer to buyer';
      chips.forEach(function (ch) { ch.className = ''; });
      var A = ['Yes', String(1 + Math.floor(Math.random() * 3)), pick(['State Farm', 'GEICO', 'Progressive', 'Allstate']), '787' + Math.floor(rnd(10, 99))];
      for (var s = 1; s <= 7; s++) (function (s) { at(s * 1000, function () { time.textContent = clock(s); }); })(s);
      qs.forEach(function (q, i) {
        at(800 + i * 800, function () { q.className = 'avx-ag-q avx-done'; q.querySelector('b').textContent = A[i]; });
      });
      var buyer = pick(DEMO_BUYERS);
      at(4100, function () { xfer.className = 'avx-ag-xfer avx-busy'; xfer.innerHTML = '<i class="fa-solid fa-right-left" aria-hidden="true"></i>Transferring to ' + buyer + '…'; });
      at(5300, function () { xfer.className = 'avx-ag-xfer avx-done'; xfer.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i>Transferred · ' + buyer; });
      at(6000, function () { chips[0].className = 'avx-on'; });
    });
  }

  var DEMOS = {
    pingpost: ['ping-post', 'Live auction', demoPingPost],
    dialer: ['dialer', 'Power dialer', demoDialer],
    tracking: ['call-flows', 'Inbound call flow', demoTracking],
    automation: ['automations', 'Lead sequence', demoAutomation],
    agent: ['agent', 'Agent console', demoAgent]
  };

  function initFeatureDemos() {
    document.querySelectorAll('[data-avx-demo]').forEach(function (host) {
      var d = DEMOS[host.getAttribute('data-avx-demo')];
      var steps = host.querySelector('.spotlight-flow-steps');
      if (!d || !steps) return;
      var c = demoShell(d[0], d[1]);
      // the step list stays the accessible description of the screen
      c.setAttribute('role', 'img');
      c.setAttribute('aria-label', Array.prototype.map.call(steps.querySelectorAll('.spotlight-flow-step'), function (s) {
        return s.textContent.replace(/\s+/g, ' ').trim();
      }).join('; '));
      steps.classList.add('avx-replaced');
      host.classList.add('avx-has-demo');
      host.appendChild(c);
      d[2](c);
    });
  }

  // ---------- "More ways to win the call": a small live preview on each card ----------

  var VOICE_SCRIPT = [
    ['Are you currently insured?', 'Yes, with GEICO.', 'Apex Insurance'],
    ['How many vehicles are on the policy?', 'Two cars.', 'Northwind Benefits'],
    ['What ZIP code are you calling from?', '78704.', 'Summit Direct'],
    ['Are you 65 or older?', 'I turn 66 next month.', 'Meridian Health']
  ];

  // the voice agent asks, the caller answers, the agent warm-transfers
  function miniVoice(m) {
    var ai = m.querySelector('.avx-mv-ai'), caller = m.querySelector('.avx-mv-caller'), tag = m.querySelector('.avx-mv-tag'), n = 0;
    ai.insertAdjacentHTML('beforeend', '<i class="avx-mv-wave"><i></i><i></i><i></i><i></i></i>');
    demoLoop(m, 6400, function (at) {
      var s = VOICE_SCRIPT[n++ % VOICE_SCRIPT.length];
      ai.querySelector('span').textContent = s[0];
      caller.querySelector('span').textContent = s[1];
      tag.innerHTML = '<i class="fa-solid fa-right-left" aria-hidden="true"></i>Warm transfer → ' + s[2];
      [ai, caller, tag].forEach(function (x) { x.classList.remove('avx-on', 'avx-talk'); });
      at(200, function () { ai.classList.add('avx-on', 'avx-talk'); });
      at(1800, function () { ai.classList.remove('avx-talk'); caller.classList.add('avx-on'); });
      at(3200, function () { tag.classList.add('avx-on'); });
    });
  }

  // revenue ticks up while the chart scrolls
  function miniAnalytics(m) {
    var chart = makeChart({ type: 'area', points: 24, min: 100, max: 400, start: 240, step: 40, bare: true });
    m.querySelector('.avx-ma-chart').appendChild(chart.svg);
    var b = m.querySelector('.avx-ma-kpi b'), em = m.querySelector('.avx-ma-kpi em'), pct = m.querySelector('.avx-ma-src span');
    var rev = 84210, up = 8.1;
    ticker(m, 2000, function () {
      rev += Math.floor(rnd(40, 220));
      up = Math.max(6, Math.min(11, up + rnd(-0.2, 0.25)));
      b.textContent = fmtMoney(rev);
      em.textContent = '▲ ' + up.toFixed(1) + '%';
      pct.textContent = Math.round(rnd(36, 41)) + '%';
      chart.update();
    });
  }

  var API_CALLS = [
    ['POST', '/v1/calls', '201', [['id', '"call_8f2k1x"'], ['buyer', '"Apex Insurance"'], ['payout', '45.00']]],
    ['GET', '/v1/buyers?cap=open', '200', [['count', '4'], ['top', '"Northwind"'], ['bid', '38.00']]],
    ['POST', '/v1/leads', '202', [['id', '"lead_31qz7a"'], ['sequence', '"solar-quote"'], ['status', '"queued"']]]
  ];

  // a request goes out and its JSON response arrives line by line
  function miniApi(m) {
    var req = m.querySelector('.avx-mapi-req'), code = m.querySelector('.avx-mapi-res code'), n = 0;
    demoLoop(m, 5600, function (at) {
      var c = API_CALLS[n++ % API_CALLS.length];
      var body = c[3].map(function (kv, i) {
        var v = kv[1].charAt(0) === '"' ? '<s>' + kv[1] + '</s>' : '<u>' + kv[1] + '</u>';
        return '  <i>"' + kv[0] + '"</i>: ' + v + (i < c[3].length - 1 ? ',' : '');
      });
      var lines = ['{'].concat(body, ['}']);
      req.innerHTML = '<b>' + c[0] + '</b> ' + c[1] + ' <em></em>';
      code.innerHTML = '';
      at(450, function () { req.querySelector('em').textContent = c[2] + ' · ' + Math.round(rnd(48, 120)) + ' ms'; });
      lines.forEach(function (l, i) {
        at(650 + i * 240, function () { code.insertAdjacentHTML('beforeend', (i ? '\n' : '') + l); });
      });
    });
  }

  var MINIS = { voice: miniVoice, analytics: miniAnalytics, api: miniApi };

  function initMiniPreviews() {
    document.querySelectorAll('[data-avx-mini]').forEach(function (m) {
      var f = MINIS[m.getAttribute('data-avx-mini')];
      if (!f) return;
      m.classList.add('avx-mini-live');
      f(m);
    });
  }

  // ---------- Product tour: one app window, four live views ----------

  var CALL_SOURCES = ['Google Ads', 'Meta', 'Bing', 'TikTok', 'Email', 'Affiliate', 'Organic'];
  var CALL_STATES = [['Connected', 'ok'], ['Connected', 'ok'], ['Converted', 'ok'], ['Ringing', 'ring'], ['In queue', 'bid'], ['Missed', 'cap']];

  function callLog(c) {
    var body = c.querySelector('.avx-cs-body');
    body.innerHTML = '<div class="avx-kpis avx-kpis-4">' +
      '<div class="avx-kpi" data-k="live"><span>Live calls</span><b>42</b><em class="avx-up">▲ 6</em></div>' +
      '<div class="avx-kpi" data-k="today"><span>Calls today</span><b>3,918</b><em class="avx-up">▲ 12.4%</em></div>' +
      '<div class="avx-kpi" data-k="conv"><span>Converted</span><b>27.8%</b><em class="avx-up">▲ 1.9%</em></div>' +
      '<div class="avx-kpi" data-k="rev"><span>Revenue today</span><b>$84,210</b><em class="avx-up">▲ 8.1%</em></div></div>' +
      '<table class="avx-cs-table avx-cs-log"><thead><tr><th>Time</th><th>Caller</th><th>Source</th><th>Buyer</th><th>Duration</th><th>Revenue</th><th>Status</th></tr></thead><tbody></tbody></table>';
    var tb = body.querySelector('tbody');
    var k = { live: 42, today: 3918, conv: 27.8, rev: 84210 };
    function row(fresh) {
      var st = pick(CALL_STATES), d = new Date();
      var dur = st[0] === 'Missed' || st[0] === 'Ringing' || st[0] === 'In queue' ? '—' : Math.floor(rnd(1, 9)) + ':' + String(Math.floor(rnd(0, 59))).padStart(2, '0');
      var tr = document.createElement('tr');
      if (fresh) tr.className = 'avx-live-new';
      tr.innerHTML = '<td>' + d.toLocaleTimeString('en-US', { hour12: false }) + '</td><td>(' + Math.floor(rnd(201, 989)) + ') ··' + Math.floor(rnd(10, 99)) +
        '</td><td>' + pick(CALL_SOURCES) + '</td><td>' + pick(LIVE_BUYERS) + '</td><td>' + dur + '</td><td>' +
        (st[1] === 'ok' ? '$' + rnd(24, 96).toFixed(2) : '—') + '</td><td><span class="avx-live-pill avx-pill-' + st[1] + '">' + st[0] + '</span></td>';
      return tr;
    }
    for (var i = 0; i < 7; i++) tb.appendChild(row(false));
    ticker(c, 1600, function () {
      tb.insertBefore(row(true), tb.firstChild);
      if (tb.children.length > 7) tb.removeChild(tb.lastChild);
      k.live = Math.max(28, Math.min(64, k.live + Math.round(rnd(-3, 3))));
      k.today += Math.floor(rnd(1, 5));
      k.conv = Math.max(22, Math.min(33, k.conv + rnd(-.3, .3)));
      k.rev += Math.floor(rnd(20, 140));
      body.querySelector('[data-k="live"] b').textContent = k.live;
      body.querySelector('[data-k="today"] b').textContent = fmtInt(k.today);
      body.querySelector('[data-k="conv"] b').textContent = k.conv.toFixed(1) + '%';
      body.querySelector('[data-k="rev"] b').textContent = '$' + fmtInt(k.rev);
    });
  }

  var TOUR = [
    ['calls', 'Live calls', 'calls', 'Every call with its source, buyer and revenue', callLog],
    ['pingpost', 'Ping/Post', 'ping-post', 'Bids, accept rate and the ping-to-post funnel', ppDashboard],
    ['sources', 'Sources', 'reports', 'Margin by traffic source', ppSources],
    ['usage', 'Usage', 'billing', 'Usage and cost, updated live', ppUsage]
  ];

  function initProductTour() {
    var tour = document.querySelector('[data-avx-tour]');
    if (!tour) return;
    var tabs = tour.querySelector('.avx-tour-tabs');
    var stage = tour.querySelector('.avx-tour-stage');
    var views = {}, current = null, auto = null, touched = false;
    TOUR.forEach(function (t, i) {
      var b = el('button', 'avx-tour-tab', '<span>' + t[1] + '</span><i></i>');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.dataset.tour = t[0];
      b.addEventListener('click', function () { touched = true; tour.classList.add('avx-tour-touched'); show(t[0]); });
      tabs.appendChild(b);
    });
    function show(key) {
      if (current === key) return;
      var t = TOUR.filter(function (x) { return x[0] === key; })[0];
      if (!views[key]) {
        var c = consoleShell(t[2], t[3]);
        c.querySelector('.avx-cs-path').innerHTML = 'app.avortyx.com / <b>' + t[2] + '</b>';
        t[4](c);
        views[key] = c;
        stage.appendChild(c);
      }
      Object.keys(views).forEach(function (k) { views[k].classList.toggle('avx-tour-on', k === key); });
      tabs.querySelectorAll('.avx-tour-tab').forEach(function (b) {
        var on = b.dataset.tour === key;
        b.classList.toggle('avx-on', on);
        b.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      current = key;
    }
    show('calls');
    // walk through the views on its own until the visitor picks one
    if (!reduced) {
      onVisible(tour, function () {
        if (auto || touched) return;
        auto = setInterval(function () {
          if (touched) { clearInterval(auto); return; }
          if (motionPaused()) return;
          var i = TOUR.map(function (x) { return x[0]; }).indexOf(current);
          show(TOUR[(i + 1) % TOUR.length][0]);
        }, 10000);
      }, function () { clearInterval(auto); auto = null; }, 0.3);
    }
  }

  // ---------- Product screenshots: framed as app windows ----------

  function initWindows() {
    document.querySelectorAll('main img.img-fluid.rounded.border, main img.img-fluid.rounded.shadow-sm').forEach(function (im) {
      if (im.closest('.modal, .avx-window') || im.classList.contains('avx-replaced')) return;
      var w = el('div', 'avx-window', '<div class="avx-window-bar"><i></i><i></i><i></i><span>app.avortyx.com</span></div>');
      // spacing utilities move to the frame so the layout stays put
      im.className.split(/\s+/).forEach(function (c) {
        if (/^m[tbsexy]?-(\d|auto)/.test(c)) { w.classList.add(c); im.classList.remove(c); }
      });
      im.parentNode.insertBefore(w, im);
      w.appendChild(im);
    });
  }

  // ---------- Hero: a live decision, one call at a time ----------
  // The card ships finished in the HTML (that is what shows without motion); this replays it:
  // the call rings in, the AI scores it, three buyers bid and the winner gets the call.

  var DECISIONS = [
    { num: '(312) 555-0142', meta: 'Google Ads · Medicare · Chicago, IL', quote: 'Hi, I’m looking to switch my Medicare plan before the deadline.',
      intent: .91, sent: ['Positive', 'pos'], tags: ['Plan switch', 'Deadline', 'Ready to enroll'],
      bids: [['Apex Insurance', 64], ['Meridian Health', 58], ['Northwind Benefits', 52]], why: 'Highest bid · intent above 0.80 · licensed in IL', ms: 84 },
    { num: '(720) 555-0187', meta: 'Meta · Home solar · Denver, CO', quote: 'We just closed on a house and want a quote for panels.',
      intent: .87, sent: ['Positive', 'pos'], tags: ['Homeowner', 'Quote request'],
      bids: [['Summit Solar', 48], ['Harbor Home', 41], ['Pinnacle Energy', 37]], why: 'Highest bid · homeowner verified · serves CO', ms: 79 },
    { num: '(305) 555-0119', meta: 'Bing · Auto insurance · Miami, FL', quote: 'My policy renews Friday and the price just went up again.',
      intent: .94, sent: ['Neutral', 'neutral'], tags: ['Renewal due', 'Price shopper'],
      bids: [['Pinnacle Auto', 39], ['Apex Insurance', 36], ['Harbor Mutual', 31]], why: 'Highest bid · renewal window · open capacity', ms: 88 },
    { num: '(617) 555-0164', meta: 'Organic · Legal · Boston, MA', quote: 'I was in an accident last week and need to talk to a lawyer.',
      intent: .89, sent: ['Urgent', 'urgent'], tags: ['Recent incident', 'Seeks counsel'],
      bids: [['Lakeside Legal', 112], ['Beacon Law', 104], ['Harbor Legal', 95]], why: 'Highest bid · practice area match · MA bar', ms: 91 }
  ];

  function initDecision() {
    var card = document.querySelector('[data-avx-decide]');
    if (!card || reduced) return;
    var q = function (k) { return card.querySelector('[data-dc="' + k + '"]'); };
    var steps = {};
    card.querySelectorAll('.avx-dc-step').forEach(function (s) { steps[s.dataset.step] = s; });
    var timers = [], idx = 0, callNo = 48213, running = false, waiting = false;
    function later(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function clear() { timers.forEach(clearTimeout); timers = []; }
    function stage(name) {
      Object.keys(steps).forEach(function (k) { steps[k].classList.remove('avx-dc-now'); });
      if (name) steps[name].classList.add('avx-dc-on', 'avx-dc-now');
    }
    function money(v) { return '$' + Math.round(v); }

    function play() {
      clear();
      var d = DECISIONS[idx % DECISIONS.length];
      idx++;
      callNo += Math.floor(rnd(3, 19));
      q('id').textContent = 'Call #' + fmtInt(callNo);
      q('ms').textContent = '—';
      Object.keys(steps).forEach(function (k) { steps[k].classList.remove('avx-dc-on'); });

      // 01: the call arrives and its first words stream in
      stage('call');
      q('num').textContent = d.num;
      q('meta').textContent = d.meta;
      var quote = q('quote'), words = ('“' + d.quote + '”').split(' '), n = 0;
      quote.textContent = '';
      quote.classList.add('avx-dc-typing');
      (function type() {
        if (n >= words.length) { quote.classList.remove('avx-dc-typing'); return; }
        quote.textContent += (n ? ' ' : '') + words[n++];
        later(70 + Math.random() * 60, type);
      })();

      // 02: intent counts up, then sentiment and the signals behind it
      var intent = q('intent'), bar = q('intent-bar'), tags = q('tags'), sent = q('sent');
      intent.textContent = '0.00';
      bar.style.setProperty('--v', 0);
      tags.innerHTML = '';
      sent.textContent = '…';
      sent.removeAttribute('data-tone');
      later(1500, function () {
        stage('score');
        bar.style.setProperty('--v', d.intent);
        var t0 = performance.now();
        (function count(now) {
          var p = Math.min((now - t0) / 900, 1);
          intent.textContent = (d.intent * (1 - Math.pow(1 - p, 3))).toFixed(2);
          if (p < 1) requestAnimationFrame(count);
        })(t0);
      });
      later(2300, function () { sent.textContent = d.sent[0]; sent.dataset.tone = d.sent[1]; });
      d.tags.forEach(function (t, i) {
        later(2550 + i * 180, function () { tags.appendChild(el('span', '', t)); });
      });

      // 04 waits for the auction
      q('winner').textContent = 'Waiting for bids';
      q('why').textContent = 'Ranks every eligible buyer in real time';
      q('pay').textContent = '—';

      // 03: three buyers bid; bars and amounts climb to their final bids
      var list = q('bids');
      list.innerHTML = '';
      var rows = d.bids.map(function (b) {
        var li = el('li', '', '<span></span><i></i><b>$0</b>');
        li.querySelector('span').textContent = b[0];
        list.appendChild(li);
        return li;
      });
      later(3300, function () {
        stage('bids');
        var top = d.bids[0][1], t0 = performance.now();
        rows.forEach(function (li, i) { li.querySelector('i').style.setProperty('--v', d.bids[i][1] / top); });
        (function bid(now) {
          var p = Math.min((now - t0) / 1100, 1), e = 1 - Math.pow(1 - p, 3);
          rows.forEach(function (li, i) { li.querySelector('b').textContent = money(d.bids[i][1] * e); });
          if (p < 1) requestAnimationFrame(bid);
        })(t0);
      });
      later(4600, function () { rows[0].classList.add('avx-dc-win'); });

      // 04: routed to the winner
      later(5100, function () {
        stage('route');
        q('winner').textContent = d.bids[0][0];
        q('why').textContent = d.why;
        q('pay').textContent = '$' + d.bids[0][1].toFixed(2);
        q('ms').textContent = d.ms + 'ms';
      });
      later(9200, next);
    }

    function next() {
      if (!running) return;
      if (motionPaused() || document.hidden) { waiting = true; return; }
      play();
    }

    // runs while on screen; pausing motion holds the current decision
    onVisible(card, function () {
      if (running) return;
      running = true;
      play();
    }, function () { running = false; clear(); stage(null); }, 0.25);
    setInterval(function () { if (waiting && running && !motionPaused() && !document.hidden) { waiting = false; play(); } }, 600);
  }

  // ---------- AI at work: Ask Avortyx, a live transcript and a voice agent ----------

  var ASK = {
    margin: {
      q: 'Which traffic source had the best margin last week?',
      status: 'Reading 1,284 calls across 6 sources',
      a: 'Google Ads led last week with a 31.4% margin on 512 calls, ahead of Bing at 27.9% and Meta at 24.1%. TikTok trailed at 9.8%: 41% of its calls ended in under 30 seconds.',
      chart: { unit: '%', rows: [['Google Ads', 31.4], ['Bing', 27.9], ['Meta', 24.1], ['Affiliate', 18.6], ['TikTok', 9.8]] }
    },
    drop: {
      q: 'Why did connect rate dip yesterday afternoon?',
      status: 'Comparing hourly connect rate with buyer caps',
      a: 'Connect rate fell from 71% to 57% between 2pm and 4pm. Meridian Health and Northwind Benefits both hit their daily caps at 1:52pm, so Medicare calls fell through to a smaller pool. Raising Meridian’s cap by 150 calls would have covered the gap.',
      chart: { unit: '%', hours: true, flag: [4, 5], rows: [['10a', 72], ['11a', 70], ['12p', 73], ['1p', 71], ['2p', 59], ['3p', 57], ['4p', 66], ['5p', 72]] }
    },
    buyer: {
      q: 'Which buyer should get more Medicare calls?',
      status: 'Ranking Medicare buyers by conversion, RPC and open cap',
      a: 'Apex Insurance. It converts Medicare calls at 34% with $61 revenue per call and still has 220 calls of daily cap open. Meridian Health converts higher, at 37%, but is capped out by early afternoon.',
      table: [['Buyer', 'Conv.', 'RPC', 'Cap left'], ['Apex Insurance', '34%', '$61', '220'], ['Meridian Health', '37%', '$66', '0'], ['Northwind Benefits', '26%', '$48', '140']]
    },
    today: {
      q: 'Summarize today’s calls',
      status: 'Summarizing 3,918 calls since midnight',
      a: '3,918 calls so far, 27.8% converted, $84,210 in revenue. Google Ads drove 38% of volume. Three spam bursts were blocked before routing. Worth a look: after-hours calls are up 22% and no buyer is open past 9pm ET.',
      kpis: [['Calls', '3,918'], ['Converted', '27.8%'], ['Revenue', '$84,210'], ['Spam blocked', '3 bursts']]
    }
  };
  var ASK_FALLBACK = 'This demo answers a few sample questions; try one of the suggestions. In your workspace, Ask Avortyx answers from your own calls, sources and buyers.';

  function askMatch(text) {
    var t = text.toLowerCase();
    if (/margin|source|channel|roi|profit/.test(t)) return 'margin';
    if (/dip|drop|connect|fell|down/.test(t)) return 'drop';
    if (/buyer|medicare|who should|allocate/.test(t)) return 'buyer';
    if (/summar|today|overview|how are we/.test(t)) return 'today';
    return null;
  }

  function askVisual(d) {
    if (d.chart) {
      var max = Math.max.apply(null, d.chart.rows.map(function (r) { return r[1]; }));
      var html = '<div class="avx-ask-chart' + (d.chart.hours ? ' avx-ask-cols' : '') + '">';
      d.chart.rows.forEach(function (r, i) {
        var flag = d.chart.flag && d.chart.flag.indexOf(i) !== -1 ? ' avx-flag' : '';
        html += '<div class="avx-ask-bar' + flag + '" style="--v:' + (r[1] / max).toFixed(3) + ';--i:' + i + '"><span>' + r[0] + '</span><i></i><b>' + r[1] + d.chart.unit + '</b></div>';
      });
      return html + '</div>';
    }
    if (d.table) {
      var t = '<table class="avx-ask-table"><thead><tr>' + d.table[0].map(function (h) { return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>';
      d.table.slice(1).forEach(function (r, i) { t += '<tr' + (i === 0 ? ' class="avx-ask-pick"' : '') + '>' + r.map(function (c) { return '<td>' + c + '</td>'; }).join('') + '</tr>'; });
      return t + '</tbody></table>';
    }
    return '<div class="avx-ask-kpis">' + d.kpis.map(function (k) { return '<div><span>' + k[0] + '</span><b>' + k[1] + '</b></div>'; }).join('') + '</div>';
  }

  function initAsk(panel) {
    var log = panel.querySelector('.avx-ask-log'), form = panel.querySelector('.avx-ask-form');
    var input = form.querySelector('input'), busy = false, touched = false, demoTimer = null;
    // keep the newest words in view; batched to one layout read per frame, since the answer
    // streams in word by word while the visitor may be scrolling the page
    var stick = 0;
    function scrollEnd() {
      if (stick) return;
      stick = requestAnimationFrame(function () { stick = 0; log.scrollTop = log.scrollHeight; });
    }
    function ask(text, key) {
      if (busy || !text.trim()) return;
      busy = true;
      panel.classList.add('avx-ask-busy');
      // keep the log to the latest exchange
      log.querySelectorAll('.avx-ask-q, .avx-ask-a').forEach(function (n) { n.parentNode.removeChild(n); });
      var hello = log.querySelector('.avx-ask-hello');
      if (hello) hello.parentNode.removeChild(hello);
      var qn = el('p', 'avx-ask-q');
      qn.textContent = text;
      log.appendChild(qn);
      var d = key ? ASK[key] : null;
      var an = el('div', 'avx-ask-a', '<span class="avx-ask-av" aria-hidden="true"></span><div class="avx-ask-msg"><p class="avx-ask-status"><i></i><i></i><i></i> <span></span></p><p class="avx-ask-text"></p></div>');
      an.querySelector('.avx-ask-status span').textContent = d ? d.status : 'Thinking';
      log.appendChild(an);
      scrollEnd();
      var words = (d ? d.a : ASK_FALLBACK).split(' '), n = 0, out = an.querySelector('.avx-ask-text');
      setTimeout(function () {
        var st = an.querySelector('.avx-ask-status');
        st.parentNode.removeChild(st);
        (function stream() {
          if (n < words.length) {
            out.textContent += (n ? ' ' : '') + words[n++];
            scrollEnd();
            setTimeout(stream, reduced ? 0 : 26 + Math.random() * 30);
            return;
          }
          if (d) {
            var v = el('div', 'avx-ask-vis', askVisual(d));
            an.querySelector('.avx-ask-msg').appendChild(v);
            requestAnimationFrame(function () { v.classList.add('avx-on'); });
          }
          busy = false;
          panel.classList.remove('avx-ask-busy');
          scrollEnd();
        })();
      }, reduced ? 0 : 900);
    }
    panel.querySelectorAll('.avx-ask-chips button').forEach(function (b) {
      b.addEventListener('click', function () { touched = true; clearTimeout(demoTimer); ask(ASK[b.dataset.q].q, b.dataset.q); });
    });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      touched = true;
      clearTimeout(demoTimer);
      var text = input.value;
      input.value = '';
      ask(text, askMatch(text));
    });
    input.addEventListener('focus', function () { touched = true; clearTimeout(demoTimer); });
    // the first time it is seen, it types and asks a question by itself
    return function autoplay() {
      if (touched || reduced || panel.dataset.played) return;
      panel.dataset.played = '1';
      var text = ASK.margin.q, i = 0;
      demoTimer = setTimeout(function typeQ() {
        if (touched) return;
        input.value = text.slice(0, ++i);
        if (i < text.length) { demoTimer = setTimeout(typeQ, 28); return; }
        demoTimer = setTimeout(function () { if (!touched) { input.value = ''; ask(text, 'margin'); } }, 350);
      }, 700);
    };
  }

  var LISTEN = [
    ['Agent', 'Thanks for calling Apex Insurance, this is Dana. How can I help?', .62],
    ['Caller', 'Hi, I got a renewal notice and my premium went up almost forty dollars a month.', .32, ['Renewal', 'Price increase']],
    ['Agent', 'I can help with that. What’s the ZIP code on the policy?', .5],
    ['Caller', 'It’s 94110. I have two cars, a 2019 Civic and a 2021 RAV4.', .52, ['Multi-vehicle']],
    ['Agent', 'With both cars and a clean record, I can bundle them and bring that down.', .66, ['Bundle offer']],
    ['Caller', 'Okay, that would be great. What would the monthly be?', .76],
    ['Agent', 'About $184 a month, which is $62 less than your renewal.', .84, ['Quote given']],
    ['Caller', 'That works. Let’s go ahead and switch.', .93, ['Converted']]
  ];
  var LISTEN_SUM = 'Renewal premium rose about $40/mo. Agent bundled two vehicles and quoted $184/mo, $62 under renewal. Caller agreed to switch. Outcome: converted.';
  var LISTEN_MARK = /(\bpremium\b|\brenewal\b|\bbundle\b|\bswitch\b|\$184|\$62)/gi;

  function initListen(panel) {
    var lines = panel.querySelector('[data-ls="lines"]'), spark = panel.querySelector('[data-ls="spark"]');
    var topics = panel.querySelector('[data-ls="topics"]'), sum = panel.querySelector('[data-ls="sum"]'), clock = panel.querySelector('[data-ls="clock"]');
    var timers = [], on = false, secs = 0, clockTimer = null;
    function later(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function stop() { timers.forEach(clearTimeout); timers = []; clearInterval(clockTimer); on = false; }
    function drawSpark(vals) {
      var w = 200, step = w / (LISTEN.length - 1);
      spark.setAttribute('d', vals.map(function (v, i) { return (i ? 'L' : 'M') + (i * step).toFixed(1) + ' ' + (44 - v * 40).toFixed(1); }).join(' '));
    }
    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function run() {
      stop();
      on = true;
      lines.innerHTML = '';
      topics.innerHTML = '';
      sum.textContent = 'Builds as the call goes on…';
      sum.classList.remove('avx-on');
      secs = 0;
      clock.textContent = '0:00';
      clockTimer = setInterval(function () { if (!motionPaused()) { secs++; clock.textContent = Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0'); } }, 1000);
      var vals = [], t = 400;
      LISTEN.forEach(function (ln) {
        later(t, function () {
          var li = el('li', 'avx-ls-' + ln[0].toLowerCase(), '<b>' + ln[0] + '</b><p></p>');
          lines.appendChild(li);
          var p = li.querySelector('p'), words = ln[1].split(' '), n = 0;
          (function word() {
            if (n >= words.length) { p.innerHTML = esc(ln[1]).replace(LISTEN_MARK, '<mark>$1</mark>'); return; }
            p.textContent += (n ? ' ' : '') + words[n++];
            timers.push(setTimeout(word, 90));
          })();
          lines.scrollTop = lines.scrollHeight;
          vals.push(ln[2]);
          drawSpark(vals);
          (ln[3] || []).forEach(function (tp, i) { later(500 + i * 200, function () { topics.appendChild(el('span', '', tp)); }); });
        });
        t += 700 + ln[1].split(' ').length * 90;
      });
      later(t + 300, function () { sum.textContent = LISTEN_SUM; sum.classList.add('avx-on'); clearInterval(clockTimer); });
      later(t + 7000, function () { if (on) run(); });
    }
    return { start: function () { if (!on && !reduced) run(); else if (reduced && !lines.children.length) { LISTEN.forEach(function (ln) { lines.appendChild(el('li', 'avx-ls-' + ln[0].toLowerCase(), '<b>' + ln[0] + '</b><p>' + esc(ln[1]).replace(LISTEN_MARK, '<mark>$1</mark>') + '</p>')); }); drawSpark(LISTEN.map(function (l) { return l[2]; })); sum.textContent = LISTEN_SUM; } }, stop: stop };
  }

  var VOICE = [
    ['Agent', 'Hi, this is Ava with the Medicare help line. This call may be recorded. Is now a good time?', 0],
    ['Caller', 'Yes, that’s fine.'],
    ['Agent', 'Great. Are you sixty-five or older, and what’s your ZIP code?', 1],
    ['Caller', 'I’m sixty-seven. ZIP is six oh six one four.'],
    ['Agent', 'Thanks. Do you have a Medicare Advantage plan today?'],
    ['Caller', 'I have original Medicare, but I want better drug coverage.', 2],
    ['Agent', 'Got it. I’m connecting you now with a licensed agent at Apex Insurance who can compare plans with you.', 3]
  ];
  var VOICE_STATE = ['Greeting · consent captured', 'Qualifying caller', 'Intent 0.93 · eligible', 'Transferring to Apex Insurance'];

  function initVoice(panel) {
    var play = panel.querySelector('[data-vc="play"]'), lines = panel.querySelector('[data-vc="lines"]');
    var state = panel.querySelector('[data-vc="state"]'), steps = panel.querySelectorAll('[data-vc="steps"] li');
    var synth = window.speechSynthesis, playing = false, timer = null, token = 0;
    function voices() {
      var all = synth ? synth.getVoices().filter(function (v) { return /^en/i.test(v.lang); }) : [];
      var female = all.filter(function (v) { return /female|samantha|ava|allison|aria|jenny|zira|susan|karen|moira|google us english/i.test(v.name); })[0];
      var other = all.filter(function (v) { return v !== female && /male|daniel|alex|fred|guy|david|mark|google uk english male/i.test(v.name); })[0];
      return { Agent: female || all[0], Caller: other || all[1] || all[0] };
    }
    function setPlaying(on) {
      playing = on;
      panel.classList.toggle('avx-voice-on', on);
      play.querySelector('i').className = 'fa-solid ' + (on ? 'fa-stop' : 'fa-play');
      play.querySelector('span').textContent = on ? 'Stop' : 'Play sample call';
    }
    function stop() {
      token++;
      clearTimeout(timer);
      if (synth) synth.cancel();
      setPlaying(false);
      if (state.dataset.done !== '1') state.textContent = 'Ready · press play to hear a sample call';
    }
    function start() {
      stop();
      var my = token, v = voices();
      lines.innerHTML = '';
      steps.forEach(function (s) { s.classList.remove('avx-on', 'avx-done'); });
      state.dataset.done = '';
      setPlaying(true);
      var i = 0;
      (function say() {
        if (my !== token) return;
        if (i >= VOICE.length) { setPlaying(false); state.dataset.done = '1'; state.textContent = 'Transferred · qualified call delivered to Apex Insurance'; return; }
        var ln = VOICE[i++];
        if (ln[2] !== undefined) {
          steps.forEach(function (s, k) { s.classList.toggle('avx-done', k < ln[2]); s.classList.toggle('avx-on', k === ln[2]); });
          state.textContent = VOICE_STATE[ln[2]];
        }
        var li = el('li', 'avx-ls-' + ln[0].toLowerCase(), '<b>' + ln[0] + '</b><p></p>');
        li.querySelector('p').textContent = ln[1];
        lines.appendChild(li);
        lines.scrollTop = lines.scrollHeight;
        panel.dataset.speaker = ln[0].toLowerCase();
        var fallback = 600 + ln[1].split(' ').length * 330;
        if (synth && v[ln[0]]) {
          var u = new SpeechSynthesisUtterance(ln[1]);
          u.voice = v[ln[0]];
          u.rate = 1.04;
          u.pitch = ln[0] === 'Agent' ? 1.08 : .92;
          var done = false;
          var next = function () { if (done) return; done = true; clearTimeout(timer); timer = setTimeout(say, 260); };
          u.onend = next;
          u.onerror = next;
          synth.speak(u);
          timer = setTimeout(next, fallback + 4000); // some browsers never fire onend
        } else {
          timer = setTimeout(say, fallback);
        }
      })();
    }
    if (synth) synth.getVoices(); // starts loading the voice list
    play.addEventListener('click', function () { if (playing) stop(); else start(); });
    return { stop: stop };
  }

  function initAiAtWork() {
    var sec = document.querySelector('[data-avx-ai]');
    if (!sec) return;
    var tabs = Array.prototype.slice.call(sec.querySelectorAll('.avx-ai-tabs [role="tab"]'));
    var panels = {};
    sec.querySelectorAll('.avx-ai-panel').forEach(function (p) { panels[p.dataset.panel] = p; });
    var askAuto = initAsk(panels.ask), listen = initListen(panels.listen), voice = initVoice(panels.voice);
    var current = 'ask', visible = false;
    function activate() {
      if (!visible) return;
      if (current === 'ask') askAuto();
      if (current === 'listen') listen.start();
    }
    function show(key, focus) {
      current = key;
      tabs.forEach(function (t) {
        var on = t.dataset.ai === key;
        t.classList.toggle('avx-on', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (on && focus) t.focus();
      });
      Object.keys(panels).forEach(function (k) { panels[k].hidden = k !== key; panels[k].classList.toggle('avx-on', k === key); });
      if (key !== 'listen') listen.stop();
      if (key !== 'voice') voice.stop();
      activate();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener('click', function () { show(t.dataset.ai); });
      t.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        show(tabs[(i + d + tabs.length) % tabs.length].dataset.ai, true);
      });
    });
    onVisible(sec, function () { visible = true; activate(); }, function () { visible = false; listen.stop(); voice.stop(); }, 0.3);
  }

  // ---------- More Capabilities: a small live view inside each bento card ----------

  var BENTO = {
    transcriptions: function (v) {
      v.className += ' avx-viz-tr';
      var foot = el('div', 'avx-viz-tr-foot', '<span>Sentiment</span><i></i><span data-s>—</span>');
      var i = 0;
      function line() {
        var ln = LISTEN[i % LISTEN.length];
        if (i % LISTEN.length === 0) v.querySelectorAll('p').forEach(function (p) { p.parentNode.removeChild(p); });
        var p = el('p', 'avx-ls-' + ln[0].toLowerCase(), '<b>' + ln[0] + '</b><span></span>');
        p.querySelector('span').textContent = ln[1];
        v.insertBefore(p, foot);
        var ps = v.querySelectorAll('p');
        if (ps.length > 6) ps[0].parentNode.removeChild(ps[0]);
        foot.style.setProperty('--s', ln[2]);
        foot.querySelector('[data-s]').textContent = ln[2] >= .7 ? 'Positive' : ln[2] >= .45 ? 'Neutral' : 'Negative';
        i++;
      }
      v.appendChild(foot);
      for (var k = 0; k < 3; k++) line();
      return [2200, line];
    },
    spam_tag_mitigation: function (v) {
      v.className += ' avx-viz-sp';
      v.innerHTML = '<div class="avx-sp-bad"><small>Incoming call</small><b>Scam Likely</b><span>(888) 555-0142</span></div>' +
        '<div class="avx-sp-good"><small>Incoming call</small><b>Apex Insurance ✓</b><span>(888) 555-0142</span></div>';
      return [2600, function () { v.classList.toggle('avx-flip'); }];
    },
    dynamic_number_insertion: function (v) {
      v.className += ' avx-viz-dn';
      var N = [['Google Ads', '(888) 555-0142'], ['Meta', '(888) 555-0177'], ['Bing', '(888) 555-0119'], ['Organic', '(888) 555-0164']], i = 0;
      v.innerHTML = '<b></b><span></span>';
      function show() { var n = N[i++ % N.length]; v.querySelector('b').textContent = n[1]; v.querySelector('span').textContent = 'visitor from ' + n[0]; }
      show();
      return [2000, function () { v.classList.add('avx-swap'); setTimeout(function () { show(); v.classList.remove('avx-swap'); }, 260); }];
    },
    custom_webhook: function (v) {
      v.className += ' avx-viz-wh';
      var id = 48213;
      function draw() {
        id += Math.floor(rnd(1, 9));
        v.innerHTML = '{ <em>"event"</em>: <u>"call.completed"</u>,\n  <em>"call_id"</em>: ' + id + ',\n  <em>"buyer"</em>: <u>"' + pick(LIVE_BUYERS) + '"</u>,\n  <em>"revenue"</em>: ' + rnd(24, 96).toFixed(2) + ' }' +
          '<span class="avx-wh-ok">200 OK · ' + Math.floor(rnd(28, 70)) + 'ms</span>';
      }
      draw();
      return [2400, draw];
    },
    formulas: function (v) {
      v.className += ' avx-viz-ex';
      v.innerHTML = '<code><i>if</i>(intent &gt; 0.8, bid * 1.2, bid)</code><span>intent <b data-i>0.91</b> → bid <b data-b>$76.80</b></span>';
      return [2400, function () {
        var it = rnd(.55, .97), bid = 64;
        v.querySelector('[data-i]').textContent = it.toFixed(2);
        v.querySelector('[data-b]').textContent = '$' + (it > .8 ? bid * 1.2 : bid).toFixed(2);
      }];
    },
    call_recordings: function (v) {
      v.className += ' avx-viz-rc';
      var bars = [];
      for (var k = 0; k < 34; k++) { var b = el('i'); b.style.setProperty('--h', Math.round(20 + Math.abs(Math.sin(k * .7) * 55 + Math.sin(k * 1.9) * 20))); v.appendChild(b); bars.push(b); }
      var at = 0;
      return [120, function () { bars[at % bars.length].classList.add('avx-on'); at++; if (at % bars.length === 0) bars.forEach(function (b) { b.classList.remove('avx-on'); }); }];
    },
    data_export: function (v) {
      v.className += ' avx-viz-de';
      v.innerHTML = '<div><span>calls_this_week.csv</span><span data-p>0%</span></div><i></i>';
      var p = 0;
      return [300, function () { p = p >= 100 ? 0 : Math.min(100, p + rnd(4, 11)); v.style.setProperty('--p', p); v.querySelector('[data-p]').textContent = Math.round(p) + '%'; }];
    },
    compliance: function (v) {
      v.className += ' avx-viz-sc';
      var C = ['TCPA consent', 'DNC scrub', 'State hours', 'PII redacted'], i = 0;
      v.innerHTML = C.map(function (c) { return '<p><span>' + c + '</span><b>✓</b></p>'; }).join('');
      var rows = v.querySelectorAll('p');
      return [500, function () { if (i % (C.length + 2) === 0) rows.forEach(function (r) { r.classList.remove('avx-on'); }); else if (rows[(i % (C.length + 2)) - 1]) rows[(i % (C.length + 2)) - 1].classList.add('avx-on'); i++; }];
    }
  };

  function initBento() {
    var grid = document.querySelector('[data-avx-bento]');
    if (!grid) return;
    grid.querySelectorAll('.avx-cap').forEach(function (card) {
      var href = card.getAttribute('href') || '';
      var key = /security-compliance/.test(href) ? 'compliance' : (href.match(/features\/([a-z_]+)\.html/) || [])[1];
      if (!BENTO[key]) return;
      var v = el('div', 'avx-cap-viz');
      v.setAttribute('aria-hidden', 'true');
      card.insertBefore(v, card.firstChild);
      var tick = BENTO[key](v);
      ticker(card, tick[0], tick[1]);
    });
  }

  // "How it decides": the links between the steps carry a pulse once the flow is on screen
  function initHowFlow() {
    var flow = document.querySelector('[data-avx-how]');
    if (!flow) return;
    onVisible(flow, function () { flow.classList.add('avx-on'); }, null, 0.35);
  }

  // ---------- Command palette: ⌘K / Ctrl+K jumps to any page or feature ----------

  var PALETTE = [
    ['Home', '/', 'Page', 'fa-house'], ['All features', '/features.html', 'Page', 'fa-grip'], ['Pricing', '/pricing.html', 'Page', 'fa-tag'],
    ['Integrations', '/features/integrations.html', 'Page', 'fa-plug'], ['Request a demo', '/p/request_demo.html', 'Page', 'fa-calendar-check'],
    ['Contact', '/p/contact.html', 'Page', 'fa-envelope'], ['Sign up free', '/sign_up.html', 'Page', 'fa-user-plus'], ['Sign in', '/users/sign_in.html', 'Page', 'fa-right-to-bracket'],
    ['Careers', '/careers.html', 'Page', 'fa-briefcase'], ['Brand assets', '/brand_assets.html', 'Page', 'fa-palette'],
    ['Privacy policy', '/privacy_policy.html', 'Page', 'fa-file-shield'], ['Terms of service', '/terms_of_service.html', 'Page', 'fa-file-contract'],
    ['AI at work: Ask Avortyx, live transcript, voice agent', '/#ai-at-work', 'Home', 'fa-wand-magic-sparkles'], ['How the AI decides', '/#how-it-decides', 'Home', 'fa-diagram-project'],
    ['Product tour', '/#product-tour', 'Home', 'fa-display'], ['Trust and compliance', '/#trust', 'Home', 'fa-shield-halved'],
    ['Ping/Post and real-time bidding', '/features/ping_post.html', 'Feature', 'fa-gavel'], ['Ping/Post integration guide', '/features/ping_post_integration.html', 'Feature', 'fa-book'],
    ['Call tracking', '/features/call_tracking.html', 'Feature', 'fa-phone'], ['Inbound call routing', '/features/inbound_call_routing.html', 'Feature', 'fa-route'],
    ['Agent control center and power dialer', '/features/agent_controls.html', 'Feature', 'fa-headset'], ['Lead automation', '/features/lead_automation.html', 'Feature', 'fa-bolt'],
    ['AI call transcriptions', '/features/transcriptions.html', 'Feature', 'fa-closed-captioning'], ['AI voice agents', '/features/voice_agents.html', 'Feature', 'fa-robot'],
    ['AI SMS bots', '/features/ai_sms_bots.html', 'Feature', 'fa-comment-sms'], ['Call recordings', '/features/call_recordings.html', 'Feature', 'fa-microphone-lines'],
    ['Buyer management', '/features/buyer_management.html', 'Feature', 'fa-users'], ['Simultaneously dial buyers', '/features/simul_dial.html', 'Feature', 'fa-phone-volume'],
    ['Hold queue and callback', '/features/hold_queue.html', 'Feature', 'fa-hourglass-half'], ['Dynamic number insertion', '/features/dynamic_number_insertion.html', 'Feature', 'fa-hashtag'],
    ['Formulas', '/features/formulas.html', 'Feature', 'fa-square-root-variable'], ['Custom webhooks', '/features/custom_webhook.html', 'Feature', 'fa-link'],
    ['REST API', '/features/api.html', 'Feature', 'fa-code'], ['API IP whitelist', '/features/api_whitelist.html', 'Feature', 'fa-network-wired'],
    ['Data exports', '/features/data_export.html', 'Feature', 'fa-file-export'], ['Multiple telephone providers', '/features/multiple_telephone_providers.html', 'Feature', 'fa-tower-cell'],
    ['SIP support', '/features/sip_support.html', 'Feature', 'fa-server'], ['Spam tag mitigation', '/features/spam_tag_mitigation.html', 'Compliance', 'fa-shield-halved'],
    ['Verified identity and caller ID', '/features/verified_identity.html', 'Compliance', 'fa-id-card'], ['Consent and opt-out', '/features/consent_opt_out.html', 'Compliance', 'fa-file-signature'],
    ['Suppression lists and DNC', '/features/suppression_lists.html', 'Compliance', 'fa-ban'], ['State rules', '/features/state_rules.html', 'Compliance', 'fa-map-location-dot'],
    ['PII redaction', '/features/pii_redaction.html', 'Compliance', 'fa-user-shield'],
    ['Google Ads', '/features/adwords.html', 'Integration', 'fa-plug'], ['Salesforce', '/features/salesforce.html', 'Integration', 'fa-plug'],
    ['Zoho CRM', '/features/zoho_crm.html', 'Integration', 'fa-plug'], ['Zapier', '/features/zapier.html', 'Integration', 'fa-plug'], ['Slack', '/features/slack.html', 'Integration', 'fa-plug'],
    ['ElevenLabs voice agents', '/features/voice_agents/elevenlabs.html', 'Integration', 'fa-plug'], ['AWS S3', '/features/aws_s3.html', 'Integration', 'fa-plug'],
    ['Typeform', '/features/typeform.html', 'Integration', 'fa-plug'], ['MailChimp', '/features/mailchimp.html', 'Integration', 'fa-plug'],
    ['Mailgun', '/features/mailgun.html', 'Integration', 'fa-plug'], ['SendGrid', '/features/sendgrid.html', 'Integration', 'fa-plug'],
    ['Infusionsoft', '/features/infusionsoft.html', 'Integration', 'fa-plug'], ['Twilio', '/features/twilio.html', 'Integration', 'fa-plug'],
    ['Telnyx', '/features/telnyx.html', 'Integration', 'fa-plug'], ['Plivo', '/features/plivo.html', 'Integration', 'fa-plug'],
    ['Cake', '/features/cake.html', 'Integration', 'fa-plug'], ['HasOffers', '/features/hasoffers.html', 'Integration', 'fa-plug'],
    ['Voluum', '/features/voluum.html', 'Integration', 'fa-plug'], ['LinkTrust', '/features/linktrust.html', 'Integration', 'fa-plug']
  ];

  // ---------- Navbar: the floating bar firms up once the page scrolls ----------

  function initNavScroll() {
    var nav = document.querySelector('.marketing-navbar');
    if (!nav) return;
    var ticking = false;
    function update() {
      nav.classList.toggle('avx-nav-scrolled', (window.scrollY || document.documentElement.scrollTop) > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  function initPalette() {
    var isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
    var box = null, input, list, items = [], sel = 0, last = null;

    // a search button in the navbar, before Sign In
    var nav = document.querySelector('.marketing-navbar .navbar-nav');
    if (nav && !nav.querySelector('.avx-k-btn')) {
      var li = el('li', 'nav-item avx-k-item', '<button type="button" class="avx-k-btn" aria-label="Search pages and features"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i><span>Search</span><kbd>' + (isMac ? '⌘' : 'Ctrl') + ' K</kbd></button>');
      var signIn = Array.prototype.filter.call(nav.children, function (n) { return /sign_in/.test(n.innerHTML); })[0];
      nav.insertBefore(li, signIn || null);
      li.querySelector('button').addEventListener('click', function () { open(); });
    }

    function build() {
      box = el('div', 'avx-k',
        '<div class="avx-k-panel" role="dialog" aria-modal="true" aria-label="Search">' +
        '<div class="avx-k-head"><i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' +
        '<input type="text" placeholder="Search pages, features and integrations" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="true" aria-controls="avx-k-list" aria-autocomplete="list"><kbd>Esc</kbd></div>' +
        '<ul class="avx-k-list" id="avx-k-list" role="listbox"></ul>' +
        '<div class="avx-k-foot"><span><kbd>↑</kbd><kbd>↓</kbd> to move</span><span><kbd>↵</kbd> to open</span></div></div>');
      input = box.querySelector('input');
      list = box.querySelector('.avx-k-list');
      box.addEventListener('mousedown', function (e) { if (e.target === box) close(); });
      input.addEventListener('input', render);
      input.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          sel = (sel + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % Math.max(items.length, 1);
          mark();
        } else if (e.key === 'Enter' && items[sel]) {
          e.preventDefault();
          go(items[sel]);
        }
      });
      list.addEventListener('click', function (e) {
        var li = e.target.closest('li[data-i]');
        if (li) go(items[+li.dataset.i]);
      });
      list.addEventListener('mousemove', function (e) {
        var li = e.target.closest('li[data-i]');
        if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; mark(); }
      });
      document.body.appendChild(box);
    }
    // ranks by where the query matches: start of the title, start of a word, anywhere, then loose letters in order
    function score(item, q) {
      var t = item[0].toLowerCase(), g = item[2].toLowerCase();
      if (!q) return 1;
      if (t.indexOf(q) === 0) return 100;
      if (new RegExp('\\b' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(t)) return 80;
      if (t.indexOf(q) > -1) return 60;
      if (g.indexOf(q) === 0) return 40;
      var i = 0;
      for (var k = 0; k < t.length && i < q.length; k++) if (t[k] === q[i]) i++;
      return i === q.length ? 20 : 0;
    }
    function render() {
      var q = input.value.trim().toLowerCase();
      items = PALETTE.map(function (p) { return [p, score(p, q)]; }).filter(function (x) { return x[1] > 0; })
        .sort(function (a, b) { return b[1] - a[1]; }).map(function (x) { return x[0]; }).slice(0, q ? 30 : 16);
      sel = 0;
      list.innerHTML = items.length ? '' : '<li class="avx-k-empty">No matches. Try “routing”, “AI” or “Twilio”.</li>';
      items.forEach(function (it, i) {
        var li = el('li', '', '<i class="fa-solid ' + it[3] + '" aria-hidden="true"></i><span></span><em>' + it[2] + '</em>');
        li.querySelector('span').textContent = it[0];
        li.dataset.i = i;
        li.id = 'avx-k-' + i;
        li.setAttribute('role', 'option');
        list.appendChild(li);
      });
      mark();
    }
    function mark() {
      list.querySelectorAll('li[data-i]').forEach(function (li) {
        var on = +li.dataset.i === sel;
        li.classList.toggle('avx-on', on);
        li.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on) { input.setAttribute('aria-activedescendant', li.id); li.scrollIntoView({ block: 'nearest' }); }
      });
    }
    function go(it) {
      close();
      var url = new URL(it[1], location.href);
      if (samePage(url) && url.hash) {
        var t = document.getElementById(url.hash.slice(1));
        if (t) { jumpTo(t); history.replaceState(null, '', url.hash); return; }
      }
      location.href = it[1];
    }
    function open() {
      if (!box) build();
      last = document.activeElement;
      input.value = '';
      render();
      box.classList.add('avx-k-on');
      document.documentElement.style.overflow = 'hidden';
      setTimeout(function () { input.focus(); }, 0);
    }
    function close() {
      if (!box || !box.classList.contains('avx-k-on')) return;
      box.classList.remove('avx-k-on');
      document.documentElement.style.overflow = '';
      if (last && last.focus) last.focus({ preventScroll: true });
    }
    document.addEventListener('keydown', function (e) {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        if (box && box.classList.contains('avx-k-on')) close(); else open();
      } else if (e.key === 'Escape' && box && box.classList.contains('avx-k-on')) {
        e.stopImmediatePropagation();
        close();
      }
    }, true);
  }

  // ---------- Screenshot zoom: enlarge in place, in the same dark app window ----------
  // The links point at the original light captures on the CDN; opening those in a tab
  // would drop the dark rendering and the app.avortyx.com frame, so they open here instead.

  function initZoom() {
    var box = null, last = null, prevOverflow = '';
    function close() {
      if (!box || !box.classList.contains('avx-zoom-on')) return;
      box.classList.remove('avx-zoom-on');
      document.documentElement.style.overflow = prevOverflow;
      if (last) last.focus({ preventScroll: true });
    }
    function build() {
      box = el('div', 'avx-zoom',
        '<div class="avx-zoom-inner"><div class="avx-window avx-zoom-window">' +
        '<div class="avx-window-bar"><i></i><i></i><i></i><span>app.avortyx.com</span>' +
        '<button type="button" class="avx-zoom-close" aria-label="Close">&times;</button></div>' +
        '<img alt="" decoding="async"></div><p class="avx-zoom-cap"></p></div>');
      box.setAttribute('role', 'dialog');
      box.setAttribute('aria-modal', 'true');
      box.setAttribute('aria-label', 'Enlarged screenshot');
      box.tabIndex = -1;
      box.addEventListener('click', function (e) {
        if (e.target.closest('.avx-zoom-close') || !e.target.closest('.avx-zoom-window')) close();
      });
    }
    function open(a) {
      var im = a.querySelector('img');
      if (!box) build();
      // inside a feature pop-up, live in it so its focus trap treats the zoom view as its own
      (a.closest('.modal') || document.body).appendChild(box);
      last = a;
      var big = box.querySelector('img');
      big.src = a.getAttribute('href') || (im && im.src) || '';
      big.alt = (im && im.alt) || '';
      box.querySelector('.avx-zoom-cap').textContent = big.alt;
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      box.scrollTop = 0;
      box.classList.add('avx-zoom-on');
      box.focus({ preventScroll: true });
    }
    function onClick(e) {
      var a = e.target.closest && e.target.closest('a.zoomable-marketing-image');
      if (!a || a.classList.contains('avx-replaced')) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      if (e.type === 'click') open(a);
    }
    // capture phase, so the site's own link handling never sees these clicks
    document.addEventListener('click', onClick, true);
    document.addEventListener('auxclick', onClick, true);
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape' || !box || !box.classList.contains('avx-zoom-on')) return;
      e.stopImmediatePropagation(); // leave a feature pop-up underneath open
      close();
    }, true);
  }

  // ---------- Feature pop-ups: "Back to …" closes the pop-up and lands on the parent section ----------
  // A feature opened from the page it belongs to shows inside a modal; its back link points at
  // that same page, so the browser would only change the hash and leave the modal open.

  function samePage(url) {
    function norm(p) { return p.replace(/\/index\.html$/, '/').replace(/\.html$/, '').replace(/\/$/, '') || '/'; }
    return url.origin === location.origin && norm(url.pathname) === norm(location.pathname);
  }

  function initBackLinks() {
    // the close button on a feature page goes back to the page that opened it; opened from
    // elsewhere (or in a new tab) it follows its href to the Features page
    document.addEventListener('click', function (e) {
      var back = e.target.closest && e.target.closest('[data-avx-back]');
      var fromSite = document.referrer && document.referrer.indexOf(location.origin + '/') === 0;
      if (!back || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || !fromSite) return;
      e.preventDefault();
      history.back();
    });
    document.addEventListener('click', function (e) {
      var a = e.target.closest && e.target.closest('.modal a.mktg-subpage-back');
      if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var url = new URL(a.getAttribute('href'), location.href);
      if (!samePage(url)) return; // another page: a normal navigation is right
      // the site script would load /features/… links into the modal itself: handle this one first
      e.preventDefault();
      e.stopImmediatePropagation();
      var modal = a.closest('.modal');
      var target = url.hash ? document.getElementById(decodeURIComponent(url.hash.slice(1))) : null;
      var done = false;
      function land() {
        if (done) return;
        done = true;
        history.replaceState(null, '', url.pathname + url.hash);
        if (target) jumpTo(target);
        else window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      }
      modal.addEventListener('hidden.bs.modal', land, { once: true });
      var close = modal.querySelector('[data-bs-dismiss="modal"]');
      if (close) close.click();
      setTimeout(land, 600); // in case the modal library doesn't announce the close
    }, true);
  }

  // ---------- Buttons: primary calls to action lean towards the cursor ----------

  // ---------- Page heroes: ringba portal rings with a counter-rotating shine ----------

  // ---------- CTA band: neon trading waves flowing across ----------

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
      // the font stylesheet loads without blocking: wait for it to land, then for its fonts
      var fonts = new Promise(function (res) {
        var t0 = Date.now();
        (function wait() {
          var css = Array.prototype.some.call(document.styleSheets, function (s) {
            return s.href && s.href.indexOf('fonts.googleapis') > -1;
          });
          if (css || Date.now() - t0 > 600) document.fonts.ready.then(res, res);
          else setTimeout(wait, 30);
        })();
      });
      Promise.race([fonts, new Promise(function (r) { setTimeout(r, 800); })]).then(show, show);
    } else {
      show();
    }
  }

  // start-up runs in short slices (same order), yielding between them so a tap or click
  // is never stuck behind one long block of set-up work
  // ---------- Anchors: land on the target once the sections around it have drawn ----------
  // Off-screen home sections are skipped by content-visibility until they come close, so a jump
  // to #trust is first made against estimated heights. Re-align on the target a few times while
  // the real heights arrive; the visitor scrolling by hand ends it at once.

  function settleOn(target) {
    var tries = 0, handScrolled = false;
    function stop() { handScrolled = true; }
    ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (ev) { window.addEventListener(ev, stop, { once: true, passive: true }); });
    var pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    (function fix() {
      if (handScrolled) return;
      if (Math.abs(target.getBoundingClientRect().top - pad) > 2) target.scrollIntoView({ block: 'start', behavior: 'instant' });
      if (++tries < 8) setTimeout(fix, 120);
    })();
  }

  // smooth-scroll to a section, then correct for sections that drew on the way
  function jumpTo(target) {
    target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    var done = false;
    function settle() { if (done) return; done = true; settleOn(target); }
    if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true });
    setTimeout(settle, reduced ? 50 : 1200);
  }

  function initAnchors() {
    function current() {
      var id = decodeURIComponent(location.hash.slice(1));
      var t = id && document.getElementById(id);
      if (t) settleOn(t);
    }
    window.addEventListener('hashchange', current);
    window.addEventListener('load', current);
    if (document.readyState === 'complete') current();
  }

  function init() {
    // calm set: product UI, data and gentle reveals; no game-like decoration
    var steps = [initMotionToggle, initProgress, initRingbaHero, initDecision, initLeadFlow, initPlatformFlow,
      initBottomWaves, initPingPostDemos, initProductTour, initAiAtWork, initHowFlow, initBento, initFeatureDemos, initMiniPreviews,
      initBackLinks, initZoom, initNavScroll, initPalette, initWindows, initSignature, initAuthRing, initIntegrationsHub, initIntegrationsBackdrop,
      initPricingHorizon, initIntegrationWaves, initFlowSequences, initTables, initCounters,
      initOffscreenPause, initScrollHints, initAnchors];
    if (!reduced) steps.push(initReveal);
    // apply a saved pause to scenes built after the toggle
    steps.push(function () { setPaused(motionPaused()); });
    var i = 0;
    function slice() {
      var t0 = performance.now();
      while (i < steps.length && performance.now() - t0 < 10) {
        try { steps[i](); } catch (e) { if (window.console) console.error(e); }
        i++;
      }
      if (i < steps.length) setTimeout(slice, 0);
      else reveal();
    }
    slice();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
