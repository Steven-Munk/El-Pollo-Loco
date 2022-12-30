class World {

    ctx;
    canvas;
    keyboard;

    character = new Character();
    noRecentHit = true
    camera_x = 0;
    pepeLooksRight = true;

    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    coinAmount = 0;

    newThrow = true;
    allThrownBottles = [];
    bottleAmmo = 0;

    level = level1;
    allObjects = new AllObjects();

    drawTheGame;
    gameInterval;
    gameGoesOn = true;

    sound;
    gameMusic = new Audio('audio/Game_music.mp3');
    gameSounds = [
        new Audio('audio/lose.mp3'),
        new Audio('audio/win.mp3'),
        new Audio('audio/Pepe_throw.mp3'),
        new Audio('audio/splash.mp3')
    ];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.runGame();
        this.playGameMusic();
    }


    /**
     * function plays game music, if music is turned on
     */
    playGameMusic() {
        setTimeout(() => {
            this.gameMusic.play();
            setInterval(() => {
                if (!this.gameGoesOn) {
                    this.gameMusic.pause();
                }
            }, 1000 / 60);
        }, 100);
    }


    /**
     * Repeat clear and draw all elements
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawMovableObjects();
        this.drawStaticObjects();
        this.ctx.translate(-this.camera_x, 0);

        //Draw() wird immer wieder aufgerufen
        let self = this;
        this.drawTheGame = requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Function deletes everything from canvas
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    /**
     * Function draws all movable object onto canvas
     */
    drawMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.allThrownBottles);
        this.addToMap(this.character);
    }


    /**
     * Function draws all static object onto canvas
     */
    drawStaticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);
    }


    /**
     * function draws multiple objects onto canvas
     * @param {Array} objects 
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


    /**
     * function draws object onto canvas
     * @param {Object} mo 
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        // mo.drawHitbox(this.ctx); //only for develop useage
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * function mirrors the context on canvas
     * @param {Object} mo 
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * function mirrors the context back to normal on canvas
     * @param {Object} mo 
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    /**
     * Function defines world to the variable "world" in different objects
     */
    setWorld() {
        this.character.world = this;
        this.level.enemies[0].world = this;
        this.allObjects.world = this;
        setInterval(() => {
            this.allThrownBottles.forEach((bottle) => {
                bottle.world = this;
            })
        }, 100 / 60);
    }


    /**
     * Function runs the game with 60 refreshes per second
     */
    runGame() {
        this.gameInterval = setInterval(() => this.updateGame60Times(), 1000 / 60);
    }


    /**
     * function lists all the functions which has to be updated every 60 seconds
     */
    updateGame60Times() {
        // this.checkCollisions();
        // this.checkCollections();
        this.checkBottleThrow();
        this.checkGameOver();
        this.setSound();
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
      * function throws a bottle if SPACE is hit
      */
    checkBottleThrow() {

        this.throwBottle();

        this.deleteBottleIfMissed();


    }


    /**
     * function throws one bottle at space pressed
     */
    throwBottle() {
        if (this.keyboard.SPACE && this.bottleAmmo > 0 && this.newThrow) {
            this.newThrow = false;
            this.addThrownBottle();
        }
        if (!this.keyboard.SPACE) {
            this.newThrow = true;
        }
    }


    /**
     * funciton adds a thrown bottle to canvas and updates bottle ammo
     */
    addThrownBottle() {
        this.playGameSound(2);
        let newBottle = new ThrownBottle(this.character.x + 60, this.character.y + 100)
        this.allThrownBottles.push(newBottle);
        this.bottleAmmo--;
        this.bottleBar.updateStatusBar(this.bottleBar.IMAGES_BOTTLE_BAR, this.bottleAmmo);
    }


    /**
     * function deletes a bottle form array if missed
     */
    deleteBottleIfMissed() {
        this.allThrownBottles.forEach(bottle => {
            if (bottle.y > 480 && bottle.bottleHit) {
                let bottleIndex = this.allThrownBottles.indexOf(bottle);
                this.allThrownBottles.splice(bottleIndex, 1);
            }
        })
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * function checks if either pepe or boss died
     */
    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => this.lostTheGame(), 250); //timeout for pepe death animation
        } else if (this.level.enemies[0].died) {
            this.wonTheGame();
        }
    }


    /**
     * function renders win screen after victory
     */
    wonTheGame() {
        this.stopTheGame();
        this.displayEndscreen();
        this.showWin();
    }


    /**
     * function renders lost screen after defeat
     */
    lostTheGame() {
        this.stopTheGame();
        this.displayEndscreen();
        this.showLose();
    }


    /**
     * function stops the game
     */
    stopTheGame() {
        cancelAnimationFrame(this.drawTheGame);
        clearInterval(this.gameInterval);
        this.clearInput();
    }


    /**
     * function clears all input from player
     */
    clearInput() {
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        keyboard.UP = false;
        keyboard.SPACE = false;
    }


    /**
     * function displays the endscreen and changes 'gameGoesOn' to false
     */
    displayEndscreen() {
        this.gameGoesOn = false;
        document.getElementById('settings').classList.add("d-none");
        document.getElementById('controllBtns').classList.add("d-none");
        document.getElementById('grayscreen').classList.remove("d-none");
        document.getElementById('gameOverImg').classList.remove("d-none");
        document.getElementById('endscreenBtn').classList.remove("d-none");
        setTimeout(() => {
            document.getElementById('gameOverImg').classList.add("d-none");
            document.getElementById('endscreenBtn').style = "opacity: 1";
        }, 1500);
    }


    /**
     * function shows the win for player
     */
    showWin() {
        this.playGameSound(1);
        setTimeout(() => {
            document.getElementById('win').classList.remove("d-none");
        }, 1500);
    }


    /**
     * function shows the lose for player
     */
    showLose() {
        this.playGameSound(0);
        setTimeout(() => {
            document.getElementById('lose').classList.remove("d-none");
        }, 1500);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    setSound() {
        if (this.sound) {
            this.gameSounds.forEach(sound => {
                sound.volume = 0.2;
            });
            this.gameMusic.volume = 0.05;
        } else {
            this.gameSounds.forEach(sound => {
                sound.volume = 0;
            });
            this.gameMusic.volume = 0;
        }
    }


    /**
     * function plays sound from sound array
     * @param {number} number 
     */
    playGameSound(number) {
        if (this.sound) {
            let gameSound = this.gameSounds[number];
            gameSound.play();
        }
    }
}