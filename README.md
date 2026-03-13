# Interactive Birthday Card

A small HTML/CSS/JS project demonstrating an advanced interactive 3D birthday card with realistic folding and pop-up elements.

## Features

- Floating sealed envelope on the homepage
- Envelope opens with animation when clicked
- A realistic folded 3D birthday card slides out (A4 portrait, two panels)
- Card can be rotated 360° on X and Y axes via drag
- Card can be opened/closed like a real physical card (hinge animation, 0°-180°)
- Inside features a 3D pop-up birthday cake with layers, decorations, and golden borders
- Pop-up cake expands/collapses with card opening/closing
- Smooth animations using GSAP and CSS 3D transforms
- Responsive design suitable for GitHub Pages hosting

## Files

- `index.html` - markup for envelope, card structure, and pop-up elements
- `style.css` - styles, 3D transforms, animations, and layout
- `script.js` - interactivity, drag controls for rotation and hinge, animation flow

## How It Works

- **Envelope:** Click to open flap and reveal card.
- **Card Slide-Out:** Card slides upward out of envelope.
- **Auto-Unfold:** Card slowly unfolds to show inside.
- **Rotation:** Drag on card (outside areas) to rotate on X/Y axes.
- **Hinge Control:** Drag vertically on inside panel to open/close at any angle (0°-180°).
- **Pop-Up Cake:** Expands outward when card opens, collapses when closes.
- **Reset:** Double-click card to reset rotations.

## Deployment

1. Push the repository to GitHub.
2. In repository settings, enable **GitHub Pages** and set the source to `main` branch (or whichever branch you're using).
3. Navigate to the provided URL; the 3D animations and interactions should work smoothly in modern browsers.

Enjoy customizing the design, cake decorations, or messages! 🎂