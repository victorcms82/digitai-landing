const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const splashDir = path.join(__dirname, '..', 'public', 'splash');

// iOS splash screen sizes
const sizes = [
  { width: 640, height: 1136, name: 'splash-640x1136.png' },    // iPhone SE
  { width: 750, height: 1334, name: 'splash-750x1334.png' },    // iPhone 8
  { width: 1125, height: 2436, name: 'splash-1125x2436.png' },  // iPhone X/XS
  { width: 1170, height: 2532, name: 'splash-1170x2532.png' },  // iPhone 12/13/14
  { width: 1284, height: 2778, name: 'splash-1284x2778.png' },  // iPhone 12/13/14 Pro Max
];

// Create splash directory if it doesn't exist
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// SVG template for splash screen
const createSplashSvg = (width, height) => {
  const iconSize = Math.min(width, height) * 0.25;
  const centerX = width / 2;
  const centerY = height / 2 - 50;
  const textY = centerY + iconSize / 2 + 60;

  return `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#020617"/>
      <stop offset="50%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#020617"/>
    </linearGradient>
    <linearGradient id="icon" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e40af"/>
      <stop offset="100%" style="stop-color:#0891b2"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Icon background -->
  <rect x="${centerX - iconSize/2}" y="${centerY - iconSize/2}"
        width="${iconSize}" height="${iconSize}"
        rx="${iconSize * 0.2}" fill="url(#icon)"/>

  <!-- Letter D -->
  <text x="${centerX - iconSize * 0.08}" y="${centerY + iconSize * 0.12}"
        font-family="Arial, sans-serif"
        font-size="${iconSize * 0.55}"
        font-weight="bold"
        fill="white">D</text>

  <!-- AI dots -->
  <circle cx="${centerX + iconSize * 0.22}" cy="${centerY - iconSize * 0.15}" r="${iconSize * 0.055}" fill="#22d3ee"/>
  <circle cx="${centerX + iconSize * 0.30}" cy="${centerY}" r="${iconSize * 0.04}" fill="#22d3ee"/>
  <circle cx="${centerX + iconSize * 0.22}" cy="${centerY + iconSize * 0.15}" r="${iconSize * 0.03}" fill="#22d3ee"/>

  <!-- Brand name -->
  <text x="${centerX}" y="${textY}"
        font-family="Arial, sans-serif"
        font-size="${iconSize * 0.25}"
        font-weight="bold"
        fill="white"
        text-anchor="middle">Digit<tspan fill="#3b82f6">AI</tspan></text>

  <!-- Tagline -->
  <text x="${centerX}" y="${textY + iconSize * 0.15}"
        font-family="Arial, sans-serif"
        font-size="${iconSize * 0.1}"
        fill="#64748b"
        text-anchor="middle">Agentes de IA para WhatsApp</text>
</svg>
`;
};

async function generateSplashScreens() {
  for (const size of sizes) {
    const svg = createSplashSvg(size.width, size.height);
    const outputPath = path.join(splashDir, size.name);

    await sharp(Buffer.from(svg))
      .png()
      .toFile(outputPath);

    console.log(`Generated: ${size.name}`);
  }
  console.log('All splash screens generated!');
}

generateSplashScreens().catch(console.error);
