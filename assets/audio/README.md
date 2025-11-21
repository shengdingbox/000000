# Audio Asset Folder

This folder contains all audio assets for the HTML5 Canvas Shooter game.

## Asset Structure

- `sfx/` - Sound effects (laser shots, explosions, etc.)
- `music/` - Background music tracks
- `voice/` - Voice lines and narration

## Supported Formats

- MP3 (widely supported, good compression)
- OGG (open source, good fallback)
- WAV (uncompressed, high quality but larger files)
- M4A (Apple format, good compression)

## Loading Assets

Audio assets are loaded through the `AssetLoader` class in `src/game.js`. To add new audio:

1. Place the audio file in the appropriate subfolder
2. Add loading code in the asset loading section:
   ```javascript
   this.assetLoader.loadAudio('soundName', 'path/to/audio.mp3');
   ```
3. Play the loaded audio:
   ```javascript
   const audio = this.assetLoader.getAudio('soundName');
   if (audio) {
       audio.play();
   }
   ```

## Audio Settings

The game supports the following audio configurations:

- Volume control for master, music, and SFX
- Mute/unmute functionality
- Audio playback rate control for effects
- Loop support for background music

## Naming Conventions

- Use lowercase with hyphens: `laser-shot.mp3`
- Include version numbers for variations: `explosion-01.mp3`, `explosion-02.mp3`
- Use descriptive names that indicate the sound type

## Optimization Tips

- Use compressed formats (MP3, OGG) for smaller file sizes
- Keep audio clips short for sound effects
- Consider audio quality vs file size trade-offs
- Test audio across different browsers for compatibility
- Use appropriate sample rates (44.1kHz is standard)

## Browser Audio Limitations

- Modern browsers require user interaction before playing audio
- Some browsers limit concurrent audio playback
- Mobile devices may have different audio behavior
- Always provide fallbacks and error handling