let canvas;
let world;
let keyboard = new Keyboard();

let playBtnInterval;
let playBtnBig = true;

let sound = true;

let settingsClosed = true;

let gameDidntStart = true;



/**
 * FIRST FUNCTION
 */
function init() {
    checkTurnedMobile();
    initStartscreen();
    bindTouchEvents();
}


// STARTSCREEN ///////////////////////////////////////////////////////////

/**
 * function makes sure the user is in landscape mode
 */
function checkTurnedMobile() {
    setInterval(() => {
        if (screen.width < screen.height) {
            document.getElementById('turnDevice').classList.remove('d-none');
        }
        else {
            document.getElementById('turnDevice').classList.add('d-none');
        }
    }, 30);
}


/**
 * function renders the start screen
 */
function initStartscreen() {
    playBtnInterval = setInterval(() => animatePlayBtn(), 1000);
}


/**
 * function describes the two diffrent states of the btn
 */
function animatePlayBtn() {
    if (playBtnBig) {
        document.getElementById('playBtn').style = 'transform: scale(0.9)';
        playBtnBig = false;
    } else {
        document.getElementById('playBtn').style = 'transform: scale(1)';
        playBtnBig = true;
    }
}

/////////////////////////////////////////////////////////// STARTSCREEN //

// SETTINGS /////////////////////////////////////////////////////////////

/**
 * function renders settings onclick
 */
function renderSettings() {
    displaySettingCards();
    displayVolume();
}


/**
 * function displays Settings and Misson card
 */
function displaySettingCards() {
    if (settingsClosed) {
        document.getElementById('settings').classList.remove('d-none');
        document.getElementById('missionBoard').classList.remove('d-none');
        settingsClosed = false;
    } else {
        document.getElementById('settings').classList.add('d-none');
        document.getElementById('missionBoard').classList.add('d-none');
        settingsClosed = true;
    }
}


/**
 * function displays correct volume setting
 */
function displayVolume() {
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


/**
 * function mutes the sound
 */
function muteVolume() {
    if (!gameDidntStart) {
        world.sound = false;
    }
    sound = false;
}


/**
 * function unmutes the sound
 */
function addVolume() {
    if (!gameDidntStart) {
        world.sound = true;
    }
    sound = true;
}

///////////////////////////////////////////////////////////// SETTINGS //

// START_GAME ///////////////////////////////////////////////////////////

/**
 * function inits the game from start screen
 */
function initGameFromStart() {
    clearInterval(playBtnInterval);
    hideStartscreen();
    displayCanvas();
    initGame();
}


/**
 * function hides the startscreen and the settings if open
 */
function hideStartscreen() {
    document.getElementById('startScreen').classList.add("d-none");
    document.getElementById('settings').classList.add('d-none');
    document.getElementById('missionBoard').classList.add('d-none');
    settingsClosed = true;
}


/**
 * function displays the canvas, where the game is played on
 */
function displayCanvas() {
    document.getElementById('canvas').classList.remove("d-none");
    document.getElementById('controllBtns').classList.remove("d-none");
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

/////////////////////////////////////////////////////////// START_GAME //

// RESTART_GAME /////////////////////////////////////////////////////////

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
    document.getElementById('canvas').classList.add("d-none");
    document.getElementById('startScreen').classList.remove("d-none");
    animatePlayBtn();
}


/**
 * function resets the endscreen
 */
function resetEndscreen() {
    document.getElementById('grayscreen').classList.add("d-none");
    document.getElementById('endscreenBtn').classList.add("d-none");
    document.getElementById('endscreenBtn').style = "opacity: 0";
    document.getElementById('win').classList.add("d-none");
    document.getElementById('lose').classList.add("d-none");
    settingsClosed = true;
    gameDidntStart = true;
}

///////////////////////////////////////////////////////// RESTART_GAME //

// BIND_CONTROLLS ///////////////////////////////////////////////////////

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

/////////////////////////////////////////////////////// BIND_CONTROLLS //