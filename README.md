# HTML5 Canvas Shooter

A space shooter game built with HTML5 Canvas and vanilla JavaScript.

## Project Structure

```
├── index.html              # Main HTML entry point
├── src/
│   ├── styles.css          # Game styling and UI
│   └── game.js             # Main game logic and engine
├── assets/
│   ├── images/             # Image assets (sprites, backgrounds)
│   └── audio/              # Audio assets (music, sound effects)
└── README.md               # This file
```

## Quick Start

1. Open `index.html` in a modern web browser
2. The game will load and display the start screen
3. Click "Start Game" to begin playing

## Game Features

### Core Engine
- **Game Loop**: Smooth 60 FPS gameplay using `requestAnimationFrame`
- **State Management**: Organized game states (loading, start screen, playing, paused, game over)
- **Input Handling**: Keyboard and mouse input system
- **Asset Loading**: Asynchronous asset loading with progress tracking
- **Responsive Design**: Adapts to different screen sizes while maintaining aspect ratio

### Technical Implementation
- **Canvas Rendering**: Hardware-accelerated 2D graphics
- **Performance Monitoring**: Real-time FPS counter and debug information
- **Error Handling**: Comprehensive error catching and logging
- **Modular Architecture**: Clean separation of concerns with ES6 classes

## Game Controls

- **Mouse**: Move cursor to aim
- **Click**: Fire weapons
- **Escape**: Pause game
- **Start Button**: Begin game from start screen

## Configuration

Game settings are managed through the `CONFIG` object in `src/game.js`:

```javascript
const CONFIG = {
    SCREEN: {
        WIDTH: 800,
        HEIGHT: 600
    },
    GAME_STATES: {
        LOADING: 'loading',
        START_SCREEN: 'start_screen',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'game_over'
    },
    FPS: 60,
    DEBUG: true  // Set to false for production
};
```

## Asset Management

### Images
- Place in `assets/images/`
- Supported formats: PNG, JPG, SVG
- Loaded via `AssetLoader.loadImage(name, path)`

### Audio
- Place in `assets/audio/`
- Supported formats: MP3, OGG, WAV, M4A
- Loaded via `AssetLoader.loadAudio(name, path)`

## Development

### Debug Mode
Enable debug mode by setting `CONFIG.DEBUG = true` to see:
- FPS counter
- Current game state
- Canvas dimensions
- Console logging

### Adding New Features
1. Extend appropriate classes (`Game`, `InputHandler`, `AssetLoader`)
2. Update `CONFIG` object if needed
3. Add new game states if required
4. Test across different browsers

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance Considerations

- Canvas automatically scales to fit screen while maintaining aspect ratio
- Asset loading is asynchronous to prevent blocking
- Game loop uses `requestAnimationFrame` for optimal performance
- Debug information can be disabled for production builds

## File Organization

### `src/game.js` - Main Game Engine
- `CONFIG`: Global configuration constants
- `GameState`: State management system
- `InputHandler`: User input processing
- `AssetLoader`: Asset loading and management
- `Game`: Main game class with loop and rendering

### `src/styles.css` - Styling
- Responsive layout
- Game container positioning
- UI element styling
- Loading and start screen designs

### `index.html` - Entry Point
- Semantic HTML structure
- Canvas element setup
- Script and stylesheet loading
- UI overlay elements

## Next Steps

This scaffold provides the foundation for developing a complete space shooter game. The following features can be added:

1. **Player Entity**: Ship movement and rendering
2. **Enemy System**: Enemy spawning and AI
3. **Collision Detection**: Hit detection and physics
4. **Weapon System**: Different weapon types and projectiles
5. **Score System**: Points, high scores, and persistence
6. **Level Progression**: Increasing difficulty and wave system
7. **Sound Effects**: Audio feedback for actions
8. **Particle Effects**: Explosions and visual effects
9. **Power-ups**: Temporary bonuses and upgrades
10. **Menu System**: Settings, controls, and credits

## License

This project is open source and available under the MIT License.