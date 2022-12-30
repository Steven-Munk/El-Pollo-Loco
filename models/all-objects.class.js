class AllObjects {

    x;
    y;
    img;
    width;
    height;
    imageCache = {};
    currentImage = 0;
    world;

    
    constructor() {
        setInterval(() => {
            this.checkCollections();
        }, 1000 / 30);
    }


    /**
     * function checks if pepe collects anything
     */
    checkCollections() {
            this.checkBottleCollection();
            this.checkCoinCollection();
    }


    /**
     * function checks if pepe collects a bottle
     */
    checkBottleCollection() {
        world.level.bottles.forEach((bottle) => {
            if (world.character.isColliding(bottle)) {
                this.collectBottle(bottle);
            }
        })
    }


    /**
     * function lets pepe collect touched bottle
     * @param {Object} bottle 
     */
    collectBottle(bottle) {
        let collectedBottle = world.level.bottles.indexOf(bottle);
        world.level.bottles.splice(collectedBottle, 1);
        world.bottleAmmo++;
        world.bottleBar.updateStatusBar(world.bottleBar.IMAGES_BOTTLE_BAR, world.bottleAmmo);
    }


    /**
    * function checks if pepe collects a coin
    */
    checkCoinCollection() {
        world.level.coins.forEach((coin) => {
            if (world.character.isColliding(coin)) {
                this.collectCoin(coin);
            }
        })
    }


    /**
     * function lets pepe collect touched coin
     * @param {Object} coin
     */
    collectCoin(coin) {
        let collectedCoin = world.level.coins.indexOf(coin);
        world.level.coins.splice(collectedCoin, 1);
        world.coinAmount++;
        world.coinBar.updateStatusBar(world.coinBar.IMAGES_COIN_BAR, world.coinAmount);
    }


    /**
     * Loads the image in parameter
     * @param {img/path} path 
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementById('image') <img id="image"></img>
        this.img.src = path;
    }


    /**
     * Loads all images from Array
     * @param {Array} arr 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image;
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * function draws object in parameter
     * @param {Object} ctx 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * function draws a hitbox around object (for develop use only!)
     * @param {Object} ctx 
     */
    drawHitbox(ctx) {
        if (this.isInteractiveObject()) {
            this.drawNormalHitbox(ctx);
            this.drawCorrectHitbox(ctx);
        }
    }


    /**
     * @returns all objects, that can be interacted with
     */
    isInteractiveObject() {
        return this instanceof Chicken ||
            this instanceof LilChicken ||
            this instanceof Endboss ||
            this instanceof Coin ||
            this instanceof CollectBottle ||
            this instanceof ThrownBottle ||
            this instanceof Character
    }


    /**
     * function draws hitbox for all moveable objects but pepe
     */
    drawNormalHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }


    /**
     * function draws hitbox for pepe
     */
    drawCorrectHitbox(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'red';
        ctx.rect(this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.right - this.offset.left,
            this.height - this.offset.bottom - this.offset.top);
        ctx.stroke();
    }
}