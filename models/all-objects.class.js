class AllObjects {

    x;
    y;
    img;
    width;
    height;
    imageCache = {};
    currentImage = 0;
    world;


















































































































    

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