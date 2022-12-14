let canvas;
let world;
let keyboard = new Keyboard();

let playBtnI;
let playBtnBig = true;

let sound = true;

/**
 * Initialization 
 */
function initGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.sound = sound;
}


/**
 * function displays correct volume setting
 */
function showVolume() {
    if (sound) {
        document.getElementById('soundBtn').src='img/own_graphics/unmute.png';
    } else {
        document.getElementById('soundBtn').src='img/own_graphics/mute.png';
    }
}


/**
 * function sets the volume and changes volume icon
 */
function turnVolume() {
    if (sound) {
        document.getElementById('soundBtn').src='img/own_graphics/mute.png';
        sound = false;
    } else {
        document.getElementById('soundBtn').src='img/own_graphics/unmute.png';
        sound = true;
    }
}


/**
 * Keyboard Press
 */
window.addEventListener('keydown', (e) => {
    if (world.gameGoesOn) {
        if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
    }
})


/**
 * Keyboard Lift
 */
window.addEventListener('keyup', (e) => {
    if (world.gameGoesOn) {
        if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 37) {
            keyboard.LEFT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
    }
})


/**
 * function binds control images to actual controls on mobile devices
 */
function bindTouchEvents() {
    document.getElementById('left').addEventListener("touchstart", () => {
        keyboard.LEFT = true;
    })
    document.getElementById('left').addEventListener("touchend", () => {
        keyboard.LEFT = false;
    })

    document.getElementById('right').addEventListener("touchstart", () => {
        keyboard.RIGHT = true;
    })
    document.getElementById('right').addEventListener("touchend", () => {
        keyboard.RIGHT = false;
    })

    document.getElementById('up').addEventListener("touchstart", () => {
        keyboard.UP = true;
    })
    document.getElementById('up').addEventListener("touchend", () => {
        keyboard.UP = false;
    })

    document.getElementById('throw').addEventListener("touchstart", () => {
        keyboard.SPACE = true;
    })
    document.getElementById('throw').addEventListener("touchend", () => {
        keyboard.SPACE = false;
    })
}


/**
 * function animates play btn
 */
function animatePlayBtn() {
    playBtnI = setInterval(() => bounceTheBtn(), 1000);
}


/**
 * function describes the two diffrent states of the btn
 */
function bounceTheBtn() {
    if (playBtnBig) {
        document.getElementById('playBtn').style = 'transform: scale(0.9)';
        playBtnBig = false;
    } else {
        document.getElementById('playBtn').style = 'transform: scale(1)';
        playBtnBig = true;
    }
}


/**
 * function starts the game from start screen
 */
function startGame() {
    clearInterval(playBtnI);
    document.getElementById('startScreen').classList.add("d-none");
    document.getElementById('canvas').style = 'display: block';
    document.getElementById('controllBtns').classList.remove("d-none");
    initGame();
}


/**
 * function restarts the geame after it finished
 */
function restartGame() {
    resetEndscreen();
    initGame();
    document.getElementById('controllBtns').classList.remove("d-none");
}


/**
 * function takes player to start menu after the game
 */
function goToStartMenu() {
    resetEndscreen();
    animatePlayBtn();
    document.getElementById('startScreen').classList.remove("d-none");
    document.getElementById('canvas').style = 'display: none';
}


/**
 * function resets the endscreen
 */
function resetEndscreen() {
    document.getElementById('endscreenBtn').classList.add("d-none");
    document.getElementById('win').style = 'display: none';
    document.getElementById('lose').style = 'display: none';
    document.getElementById('grayscreen').classList.add("d-none");
    document.getElementById('gameOverImg').classList.remove("d-none");
    document.getElementById('endscreenBtn').style = "opacity: 0";
}