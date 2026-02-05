const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const iconsDir = path.join(__dirname, '..', 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// SVG template for the icon
const createSvg = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#0891b2"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <text x="${size * 0.35}" y="${size * 0.62}"
        font-family="Arial, sans-serif"
        font-size="${size * 0.55}"
        font-weight="bold"
        fill="white">D</text>
  <circle cx="${size * 0.72}" cy="${size * 0.35}" r="${size * 0.055}" fill="#22d3ee"/>
  <circle cx="${size * 0.8}" cy="${size * 0.5}" r="${size * 0.04}" fill="#22d3ee"/>
  <circle cx="${size * 0.72}" cy="${size * 0.65}" r="${size * 0.03}" fill="#22d3ee"/>
</svg>
`;

async function generateIcons() {
  for (const size of sizes) {
    const svg = createSvg(size);
    const outputPath = path.join(iconsDir, `icon-${size}.png`);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Generated: ${outputPath}`);
  }
  console.log('Done!');
}

generateIcons().catch(console.error);
