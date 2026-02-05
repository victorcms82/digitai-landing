const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// SVG do icone DigitAI com cor verde/emerald
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#059669"/>
      <stop offset="100%" style="stop-color:#0891b2"/>
    </linearGradient>
    <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#34d399"/>
      <stop offset="100%" style="stop-color:#22d3d1"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="108" fill="url(#bgGrad)"/>
  <text x="130" y="380" font-family="Arial, sans-serif" font-size="340" font-weight="bold" fill="white">D</text>
  <circle cx="380" cy="140" r="32" fill="url(#dotGrad)"/>
  <circle cx="420" cy="220" r="22" fill="url(#dotGrad)" opacity="0.8"/>
  <circle cx="400" cy="300" r="16" fill="url(#dotGrad)" opacity="0.6"/>
</svg>
`;

async function generateIcons() {
  const iconsDir = path.join(__dirname, '../public/icons');
  const splashDir = path.join(__dirname, '../public/splash');

  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });
  if (!fs.existsSync(splashDir)) fs.mkdirSync(splashDir, { recursive: true });

  const sizes = [192, 512];
  for (const size of sizes) {
    const svg = createIconSVG(size);
    await sharp(Buffer.from(svg)).resize(size, size).png().toFile(path.join(iconsDir, `icon-${size}.png`));
    console.log(`Generated: icon-${size}.png`);
  }

  // Apple touch icon
  await sharp(Buffer.from(createIconSVG(180))).resize(180, 180).png().toFile(path.join(iconsDir, 'apple-touch-icon.png'));
  console.log('Generated: apple-touch-icon.png');

  // Splash screens
  const splashSizes = [
    { w: 640, h: 1136 }, { w: 750, h: 1334 }, { w: 1125, h: 2436 }, { w: 1170, h: 2532 }, { w: 1284, h: 2778 }
  ];

  for (const { w, h } of splashSizes) {
    const iconSize = Math.min(w, h) * 0.3;
    const iconBuffer = await sharp(Buffer.from(createIconSVG(iconSize))).resize(Math.round(iconSize), Math.round(iconSize)).png().toBuffer();
    await sharp({ create: { width: w, height: h, channels: 4, background: { r: 2, g: 6, b: 23, alpha: 1 } } })
      .composite([{ input: iconBuffer, gravity: 'center' }])
      .png()
      .toFile(path.join(splashDir, `splash-${w}x${h}.png`));
    console.log(`Generated: splash-${w}x${h}.png`);
  }

  console.log('All icons generated!');
}

generateIcons().catch(console.error);
