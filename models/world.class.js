class World {

    ctx;
    canvas;
    keyboard;

    character = new Character();
    noRecentHit = true
    camera_x = 0;

    healthBar = new HealthBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    coinAmount = 0;

    thrownBottle = new ThrownBottle();
    allThrownBottles = [];
    bottleAmmo = 0;

    level = level1;

    drawTheGame;
    gameInterval;
    gameGoesOn = true;

    sound = true
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


    playGameMusic() {
        setTimeout(() => {
            if (this.sound) {
                this.gameMusic.volume = 0.05;
                this.gameMusic.play();
                setInterval(() => {
                    if (!this.gameGoesOn) {
                        this.gameMusic.pause();
                    }
                }, 1000 / 60);
            }
        }, 100);
    }


    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawMovableObjects();
        this.drawStaticObjects();
        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        this.drawTheGame = requestAnimationFrame(function () {
            self.draw();
        });
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }


    drawMovableObjects() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.allThrownBottles);
        this.addToMap(this.character);
    }


    drawStaticObjects() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.ctx.translate(this.camera_x, 0);
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }


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


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }


    setWorld() {
        this.character.world = this;
        this.level.enemies[0].world = this;
    }


    runGame() {
        this.gameInterval = setInterval(() => this.updateGame60Times(), 1000 / 60);
    }


    updateGame60Times() {
        this.checkCollisions();
        this.checkCollections();
        this.throwOnSpace();
        this.checkGameOver();
    }


    checkCollisions() {
        this.checkChickenCollision();
        this.checkBossCollision();
        this.checkBottleCollision();
    }


    checkCollections() {
        this.checkBottleCollection();
        this.checkCoinCollection();
    }


    throwOnSpace() {
        if (this.keyboard.SPACE && this.bottleAmmo > 0) {
            keyboard.SPACE = false;
            this.playGameSound(2);
            let newBottle = new ThrownBottle(this.character.x + 60, this.character.y + 100)
            this.allThrownBottles.push(newBottle);
            this.bottleAmmo--;
            this.bottleBar.updateStatusBar(this.bottleBar.IMAGES_BOTTLE_BAR, this.bottleAmmo);
        }
    }


    checkChickenCollision() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.jumpsOn(enemy)) {
                this.killChicken(enemy);
                this.bounceJumpKill();
            }
            if (this.character.isColliding(enemy)) {
                this.pepeGetsHurt();
            }
        });
    }


    killChicken(enemy) {
        let hitEnemy = this.level.enemies.indexOf(enemy);
        this.level.enemies[hitEnemy].chickenAlive = false;
        setTimeout(() => this.deleteEnemy(hitEnemy), 250)
    }


    deleteEnemy(hitEnemy) {
        this.level.enemies.splice(hitEnemy, 1);
    }


    bounceJumpKill() {
        this.character.speedY = 12;
    }


    pepeGetsHurt() {
        this.character.hit();
        this.healthBar.updateStatusBar(this.healthBar.IMAGES_HEALTH_PEPE, this.character.energy);
    }


    checkBossCollision() {
        if (this.pepeHitsBoss() && this.noRecentHit) {
            this.knocksBackPepe();
            this.bossAttackAnimation();
        }
    }


    pepeHitsBoss() {
        return this.character.x >= this.level.enemies[0].x - 100;
    }


    knocksBackPepe() {
        this.character.speedY = 15;
        let i = setInterval(() => this.kockback(), 1000 / 60);
        setTimeout(() => clearInterval(i), 300);
    }


    kockback() {
        this.character.x -= 10;
        this.keyboard.RIGHT = false;
        this.keyboard.LEFT = false;
    }


    bossAttackAnimation() {
        this.level.enemies[0].bossAttacks();
        this.noRecentHit = false;
        setTimeout(() => {
            this.noRecentHit = true;
        }, 1500);
    }


    checkBottleCollision() {
        this.level.enemies.forEach((enemy) => {
            this.allThrownBottles.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.bottleHit(bottle, enemy);
                }
            })
        })
    }


    bottleHit(bottle, enemy) {
        bottle.bottleHitSomething = true;
        this.playGameSound(3);
        if (this.bottleHitBoss(bottle)) {
            this.level.enemies[0].bossGetsHit();
        } else {
            this.killChicken(enemy);
        }
        this.deleteAfterSplash(bottle);
    }


    bottleHitBoss(bottle) {
        return bottle.x >= this.level.enemies[0].x - 100;
    }


    deleteAfterSplash(bottle) {
        setTimeout(() => {
            let positionOfBottle = this.allThrownBottles.indexOf(bottle)
            this.allThrownBottles.splice(positionOfBottle, 1);
        }, 300);
    }


    checkBottleCollection() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        })
    }


    collectBottle(bottle) {
        let collectedBottle = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(collectedBottle, 1);
        this.bottleAmmo++;
        this.bottleBar.updateStatusBar(this.bottleBar.IMAGES_BOTTLE_BAR, this.bottleAmmo);
    }


    checkCoinCollection() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        })
    }


    collectCoin(coin) {
        let collectedCoin = this.level.coins.indexOf(coin);
        this.level.coins.splice(collectedCoin, 1);
        this.coinAmount++;
        this.coinBar.updateStatusBar(this.coinBar.IMAGES_COIN_BAR, this.coinAmount);
    }


    checkGameOver() {
        if (this.character.isDead()) {
            setTimeout(() => this.lostTheGame(), 250); //timeout for pepe death animation
        } else if (this.level.enemies[0].died) {
            this.wonTheGame();
        }
    }


    wonTheGame() {
        this.stopTheGame();
        this.showEndscreen();
        this.showWin();
    }


    lostTheGame() {
        this.stopTheGame();
        this.showEndscreen();
        this.showLose();
    }


    stopTheGame() {
        cancelAnimationFrame(this.drawTheGame);
        clearInterval(this.gameInterval);
        this.clearInput();
    }


    clearInput() {
        keyboard.RIGHT = false;
        keyboard.LEFT = false;
        keyboard.UP = false;
        keyboard.SPACE = false;
    }


    showEndscreen() {
        if (this.gameGoesOn) {
            this.gameGoesOn = false;
            document.getElementById('controllBtns').classList.add("d-none");
            document.getElementById('endscreenBtn').classList.remove("d-none");
            document.getElementById('grayscreen').classList.remove("d-none");
            setTimeout(() => {
                document.getElementById('gameOverImg').classList.add("d-none");
                document.getElementById('endscreenBtn').style = "opacity: 1";
            }, 1500);
        }
    }


    showWin() {
        this.playGameSound(1);
        setTimeout(() => {
            document.getElementById('win').style = 'display: block';
        }, 1500);
    }


    showLose() {
        this.playGameSound(0);
        setTimeout(() => {
            document.getElementById('lose').style = 'display: block';
        }, 1500);
    }


    playGameSound(number) {
        if (this.sound) {
            let gameSound = this.gameSounds[number];
            gameSound.volume = 0.2;
            gameSound.play();
        }
    }
}