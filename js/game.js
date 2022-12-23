let canvas;
let world;
let keyboard = new Keyboard();

let playBtnI;
let playBtnBig = true;

let sound = true;
let settingsClosed = true;

let gameDidntStart = true;


/**
 * !FIRST FUNCTION!
 * function makes sure the user is in landscape mode
 */
function turnMobileCheck() {
    let e = setInterval(() => {
        if (screen.width < screen.height) {
            document.getElementById('turnDevice').classList.remove('d-none');
        }
        else {
            clearInterval(e);
            document.getElementById('turnDevice').classList.add('d-none');
            initStartscreen();
        }
    }, 10);
}


/**
 * function renders the start screen
 */
function initStartscreen() {
    animatePlayBtn();
    bindTouchEvents();
    showVolume();
}


/**
 * function starts the game from start screen
 */
function startGame() {
    clearInterval(playBtnI);

    document.getElementById('startScreen').classList.add("d-none");
    document.getElementById('canvas').style = 'display: block';

    document.getElementById('controllBtns').classList.remove("d-none");

    document.getElementById('settings').style = "display: none";
    settingsClosed = true;

    initGame();
}


/**
 * Initialization of the game
 */
function initGame() {
    initLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    world.sound = sound;
    gameDidntStart = false;
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

function u() {
    let z = Math.round(Math.random());
    console.log(z);
}

/**
 * function binds control images to actual controls on mobile devices
 */
function bindTouchEvents() {
    bindTouchRight();
    bindTouchLeft();
    bindTouchUp();
    bindTouchSpace();
}


/**
 * function binds Left image to left
 */
function bindTouchRight() {
    document.getElementById('right').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    })
    document.getElementById('right').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    })
}


/**
 * function binds Right image to right
 */
function bindTouchLeft() {
    document.getElementById('left').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    })
    document.getElementById('left').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    })
}


/**
 * function binds Up image to up
 */
function bindTouchUp() {
    document.getElementById('up').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.UP = true;
    })
    document.getElementById('up').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    })
}


/**
 * function binds Space image to space
 */
function bindTouchSpace() {
    document.getElementById('throw').addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.SPACE = true;
    })
    document.getElementById('throw').addEventListener("touchend", (e) => {
        e.preventDefault();
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

    settingsClosed = true;
    gameDidntStart = true;
}









































// function w() {
//     for (let i = 0; i < 70; i++) {
//         clearInterval(i);
//     }
// }

// function d() {
//     world.draw();
//     world.runGame();
// }








































//sieht soweit gut aus

function showSettings() {
    if (settingsClosed) {
        document.getElementById('settings').style = "display: flex";
        settingsClosed = false;
    } else {
        document.getElementById('settings').style = "display: none";
        settingsClosed = true;
    }

}


/**
 * function displays correct volume setting
 */
function showVolume() {
    if (sound) {
        document.getElementById('soundBtn').src = 'img/own_graphics/unmute.png';
    } else {
        document.getElementById('soundBtn').src = 'img/own_graphics/mute.png';
    }
}






/**
 * function sets the volume and changes volume icon
 */
function turnVolume() {
    if (sound) {
        document.getElementById('soundBtn').src = 'img/own_graphics/mute.png';
        muteVolume();
    } else {
        document.getElementById('soundBtn').src = 'img/own_graphics/unmute.png';
        addVolume();
    }
}




function muteVolume() {
    if (!gameDidntStart) {
        world.sound = false;
    }
    sound = false;
}


function addVolume() {
    if (!gameDidntStart) {
        world.sound = true;
    }
    sound = true;
}