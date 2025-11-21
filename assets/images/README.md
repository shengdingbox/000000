# Images Asset Folder

This folder contains all image assets for the HTML5 Canvas Shooter game.

## Asset Structure

- `player/` - Player ship sprites and animations
- `enemies/` - Enemy ship sprites and animations  
- `projectiles/` - Bullet and projectile sprites
- `effects/` - Explosion and visual effect sprites
- `ui/` - User interface elements and icons
- `backgrounds/` - Background images and parallax layers

## Supported Formats

- PNG (recommended for transparency)
- JPG (for backgrounds without transparency)
- SVG (for scalable UI elements)

## Loading Assets

Assets are loaded through the `AssetLoader` class in `src/game.js`. To add new images:

1. Place the image file in the appropriate subfolder
2. Add loading code in the asset loading section:
   ```javascript
   this.assetLoader.loadImage('assetName', 'path/to/image.png');
   ```
3. Access the loaded asset:
   ```javascript
   const image = this.assetLoader.getImage('assetName');
   ```

## Naming Conventions

- Use lowercase with hyphens for file names: `player-ship.png`
- Use descriptive names that indicate the asset type
- Include frame numbers for sprite sheets: `explosion-01.png`, `explosion-02.png`

## Optimization Tips

- Use appropriate image sizes (avoid unnecessarily large textures)
- Consider using sprite sheets for related animations
- Optimize PNG files for web use
- Use webp format when supported for better compression