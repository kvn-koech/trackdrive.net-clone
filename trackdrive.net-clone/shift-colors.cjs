const fs = require('fs');
const path = require('path');

// RGB to HSL
function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return [h * 360, s, l];
}

// HSL to RGB
function hslToRgb(h, s, l) {
  h /= 360;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    let p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

function processColor(r, g, b, a = null) {
  let [h, s, l] = rgbToHsl(r, g, b);
  
  // Check if hue is in the yellowish-green to green range (50 to 160)
  // Also check if it has some saturation (so we don't unnecessarily shift pure grays, though it doesn't matter much)
  if (h >= 50 && h <= 165 && s > 0.02) {
    // Shift hue to Blue (215)
    h = 215;
    // Optionally boost saturation slightly for blue since blues look better when more saturated
    s = Math.min(1, s * 1.1);
  }

  let [nr, ng, nb] = hslToRgb(h, s, l);
  return { r: nr, g: ng, b: nb, a };
}

function hexToRgb(hex) {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  let num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace Hex
  content = content.replace(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g, (match, hex) => {
    if (hex.toLowerCase() === 'fff' || hex.toLowerCase() === 'ffffff' || hex.toLowerCase() === '000' || hex.toLowerCase() === '000000') return match;
    let [r, g, b] = hexToRgb(hex);
    let newColor = processColor(r, g, b);
    return rgbToHex(newColor.r, newColor.g, newColor.b);
  });

  // Replace rgb() and rgba()
  content = content.replace(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?\s*\)/g, (match, r, g, b, a) => {
    let newColor = processColor(parseInt(r), parseInt(g), parseInt(b), a);
    if (a !== undefined) {
      return `rgba(${newColor.r}, ${newColor.g}, ${newColor.b}, ${newColor.a})`;
    }
    return `rgb(${newColor.r}, ${newColor.g}, ${newColor.b})`;
  });

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

const files = [
  'src/App.css',
  'src/index.css',
  'src/pages.css',
  'src/animations.css',
  'src/pages/Home.jsx',
  'src/pages/About.jsx',
  'src/pages/Platform.jsx',
  'src/pages/Pricing.jsx',
  'src/pages/Solutions.jsx',
  'src/pages/Integrations.jsx',
  'src/pages/FormPage.jsx',
  'src/pages/Legal.jsx',
  'src/components/Scene3D.jsx'
];

files.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    replaceColorsInFile(fullPath);
  }
});
