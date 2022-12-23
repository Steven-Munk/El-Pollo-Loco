class MoveableObject extends AllObjects {

    speedY = 0;
    acceleration = 1.3;

    otherDirection;

    energy = 5;
    noRecentHit = true;

    

    /**
     * function repeatly goes through array (images of array)
     * @param {Array} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * function increases x of calling object
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * function decreases x of calling object
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * function gives calling object a positive speed in y
     */
    jump() {
        this.speedY = 22;
    }


    /**
     * Function applys gravity to object who calls function
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60);
    }


    /**
     * @returns true if object who calls function is above ground or a thrown bottle
     */
    isAboveGround() {
        if (this instanceof ThrownBottle) {
            return true;
        } else {
            return this.y < 135;
        }
    }


    /**
     * function decreases energy form object calling it
     */
    hit() {
        if (this.noRecentHit) {
            this.energy -= 0;
            this.noRecentHit = false;
            setTimeout(() => {
                this.noRecentHit = true;
            }, 1000)

        }
    }


    /**
     * @returns true if energy of calling object is 0
     */
    isDead() {
        return this.energy <= 0;
    }


    /**
     * @param {Object} mo 
     * @returns true if object, tht calls this function ist colliding with object in parameter
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
        this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
        this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
        this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }


    /**
     * @param {Object} mo 
     * @returns true if object that calls this function lands on top of object in parameter
     */
    jumpsOn(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x + mo.width &&
            this.y + this.height + 5 >= mo.y - 5 &&           // 20px vertical Hitbox on Head of enemy
            this.y + this.height - 5 <= mo.y + 5 &&           // 20px vertical Hitbox on Head of enemy
            this.speedY < 0;                                  // Character has to fall
    }
}