// Game configuration and shared constants
const CONFIG = {
    SCREEN: {
        WIDTH: 800,
        HEIGHT: 600
    },
    ASSETS: {
        IMAGES_PATH: 'assets/images/',
        AUDIO_PATH: 'assets/audio/'
    },
    GAME_STATES: {
        LOADING: 'loading',
        START_SCREEN: 'start_screen',
        PLAYING: 'playing',
        PAUSED: 'paused',
        GAME_OVER: 'game_over'
    },
    FPS: 60,
    DEBUG: true
};

// Game state management
class GameState {
    constructor() {
        this.currentState = CONFIG.GAME_STATES.LOADING;
        this.previousState = null;
    }

    setState(newState) {
        this.previousState = this.currentState;
        this.currentState = newState;
        
        if (CONFIG.DEBUG) {
            console.log(`Game state changed: ${this.previousState} -> ${this.currentState}`);
        }
    }

    getState() {
        return this.currentState;
    }

    isLoading() {
        return this.currentState === CONFIG.GAME_STATES.LOADING;
    }

    isPlaying() {
        return this.currentState === CONFIG.GAME_STATES.PLAYING;
    }
}

// Input handling
class InputHandler {
    constructor() {
        this.keys = {};
        this.mouse = { x: 0, y: 0, clicked: false };
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            if (CONFIG.DEBUG) {
                console.log(`Key pressed: ${e.key}`);
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });

        // Mouse events
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        document.addEventListener('mousedown', (e) => {
            this.mouse.clicked = true;
        });

        document.addEventListener('mouseup', (e) => {
            this.mouse.clicked = false;
        });
    }

    isKeyPressed(key) {
        return this.keys[key] || false;
    }

    getMousePosition() {
        return { x: this.mouse.x, y: this.mouse.y };
    }

    isMouseClicked() {
        return this.mouse.clicked;
    }
}

// Asset loading system
class AssetLoader {
    constructor() {
        this.images = {};
        this.audio = {};
        this.loadedAssets = 0;
        this.totalAssets = 0;
        this.onProgress = null;
        this.onComplete = null;
    }

    loadImage(name, path) {
        this.totalAssets++;
        const img = new Image();
        img.onload = () => {
            this.loadedAssets++;
            this.updateProgress();
        };
        img.onerror = () => {
            console.error(`Failed to load image: ${path}`);
            this.loadedAssets++;
            this.updateProgress();
        };
        img.src = CONFIG.ASSETS.IMAGES_PATH + path;
        this.images[name] = img;
    }

    loadAudio(name, path) {
        this.totalAssets++;
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
            this.loadedAssets++;
            this.updateProgress();
        });
        audio.addEventListener('error', () => {
            console.error(`Failed to load audio: ${path}`);
            this.loadedAssets++;
            this.updateProgress();
        });
        audio.src = CONFIG.ASSETS.AUDIO_PATH + path;
        this.audio[name] = audio;
    }

    updateProgress() {
        if (this.onProgress) {
            const progress = Math.round((this.loadedAssets / this.totalAssets) * 100);
            this.onProgress(progress);
        }

        if (this.loadedAssets === this.totalAssets && this.onComplete) {
            this.onComplete();
        }
    }

    startLoading(onComplete, onProgress) {
        this.onComplete = onComplete;
        this.onProgress = onProgress;
        
        // Load placeholder assets (will be expanded later)
        // For now, we'll just complete loading immediately since we don't have actual assets
        setTimeout(() => {
            this.onComplete();
        }, 1000);
    }

    getImage(name) {
        return this.images[name] || null;
    }

    getAudio(name) {
        return this.audio[name] || null;
    }
}

// Main game class
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.gameState = new GameState();
        this.inputHandler = new InputHandler();
        this.assetLoader = new AssetLoader();
        
        // Performance tracking
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 0;
        this.fpsUpdateTime = 0;
        
        // UI elements
        this.loadingScreen = null;
        this.startScreen = null;
        this.startButton = null;
        
        this.init();
    }

    init() {
        // Get canvas and context
        this.canvas = document.getElementById('gameCanvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }

        this.ctx = this.canvas.getContext('2d');
        
        // Set canvas size
        this.resizeCanvas();
        
        // Get UI elements
        this.loadingScreen = document.getElementById('loadingScreen');
        this.startScreen = document.getElementById('startScreen');
        this.startButton = document.getElementById('startButton');
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Start asset loading
        this.loadAssets();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resizeCanvas());
        
        console.log('Game initialized successfully');
    }

    resizeCanvas() {
        // Maintain aspect ratio while fitting to screen
        const maxWidth = window.innerWidth * 0.9;
        const maxHeight = window.innerHeight * 0.9;
        const aspectRatio = CONFIG.SCREEN.WIDTH / CONFIG.SCREEN.HEIGHT;
        
        let width = CONFIG.SCREEN.WIDTH;
        let height = CONFIG.SCREEN.HEIGHT;
        
        if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
        }
        
        if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        
        if (CONFIG.DEBUG) {
            console.log(`Canvas resized to: ${width}x${height}`);
        }
    }

    setupEventListeners() {
        if (this.startButton) {
            this.startButton.addEventListener('click', () => {
                this.startGame();
            });
        }
    }

    loadAssets() {
        this.assetLoader.startLoading(
            () => {
                // Loading complete
                this.gameState.setState(CONFIG.GAME_STATES.START_SCREEN);
                this.showStartScreen();
            },
            (progress) => {
                // Update loading progress
                this.updateLoadingProgress(progress);
            }
        );
    }

    updateLoadingProgress(progress) {
        if (this.loadingScreen) {
            const progressElement = this.loadingScreen.querySelector('.loading-progress');
            if (progressElement) {
                progressElement.textContent = `${progress}%`;
            }
        }
    }

    showStartScreen() {
        if (this.loadingScreen) {
            this.loadingScreen.style.display = 'none';
        }
        if (this.startScreen) {
            this.startScreen.style.display = 'block';
        }
    }

    startGame() {
        if (this.startScreen) {
            this.startScreen.style.display = 'none';
        }
        
        this.gameState.setState(CONFIG.GAME_STATES.PLAYING);
        this.gameLoop();
        
        console.log('Game started!');
    }

    gameLoop() {
        if (!this.gameState.isPlaying()) {
            return;
        }

        // Calculate delta time and FPS
        const currentTime = performance.now();
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        // Update FPS counter
        this.frameCount++;
        if (currentTime - this.fpsUpdateTime >= 1000) {
            this.fps = this.frameCount;
            this.frameCount = 0;
            this.fpsUpdateTime = currentTime;
            
            if (CONFIG.DEBUG) {
                console.log(`FPS: ${this.fps}`);
            }
        }

        // Update game logic
        this.update(deltaTime);

        // Render game
        this.render();

        // Continue game loop
        requestAnimationFrame(() => this.gameLoop());
    }

    update(deltaTime) {
        // Game update logic will go here
        // For now, just handle basic input
        if (this.inputHandler.isKeyPressed('Escape')) {
            this.gameState.setState(CONFIG.GAME_STATES.PAUSED);
        }
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        this.drawBackground();

        // Draw game elements will go here
        this.drawGameElements();

        // Draw UI elements
        this.drawUI();
    }

    drawBackground() {
        // Create a simple animated starfield background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#000428');
        gradient.addColorStop(1, '#004e92');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw some simple stars
        this.ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 50; i++) {
            const x = (i * 73 + this.frameCount * 0.1) % this.canvas.width;
            const y = (i * 37) % this.canvas.height;
            const size = (i % 3) + 1;
            
            this.ctx.beginPath();
            this.ctx.arc(x, y, size / 2, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawGameElements() {
        // Game elements will be drawn here
        // For now, just draw a placeholder
        this.ctx.fillStyle = '#00ff88';
        this.ctx.font = '20px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Game Running', this.canvas.width / 2, this.canvas.height / 2);
    }

    drawUI() {
        // Draw FPS counter if debug mode is on
        if (CONFIG.DEBUG) {
            this.ctx.fillStyle = '#00ff88';
            this.ctx.font = '14px monospace';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(`FPS: ${this.fps}`, 10, 20);
            this.ctx.fillText(`State: ${this.gameState.getState()}`, 10, 40);
            this.ctx.fillText(`Canvas: ${this.canvas.width}x${this.canvas.height}`, 10, 60);
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing game...');
    
    // Check if all required elements exist
    const canvas = document.getElementById('gameCanvas');
    const loadingScreen = document.getElementById('loadingScreen');
    const startScreen = document.getElementById('startScreen');
    
    if (!canvas || !loadingScreen || !startScreen) {
        console.error('Required DOM elements not found!');
        return;
    }
    
    // Create and start the game
    const game = new Game();
    
    // Make game globally accessible for debugging
    window.game = game;
    
    console.log('Game initialization complete');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('Game error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});