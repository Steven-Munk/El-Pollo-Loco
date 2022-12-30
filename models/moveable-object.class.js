class MoveableObject extends AllObjects {

    speedY = 0;
    acceleration = 1.3;
    otherDirection;

    energy = 5;
    noRecentHit = true;


    constructor() {
        super();
        setTimeout(() => {
            this.checkCollisions();
        }, 1000);
    }


    /**
     * function checks if anything collides (Pepe, Thrown Bottles, Enemies)
     */
    checkCollisions() {
        setInterval(() => {
            this.checkEnemyCollision();
            this.checkBossCollision();
            this.checkBottleCollision();
        }, 1000/ 60);

    }

    /**
  * function checks if pepe collides with any enemy
  */
    checkEnemyCollision() {
        world.level.enemies.forEach((enemy) => {
            if (world.character.jumpsOn(enemy)) {
                this.killChicken(enemy);
                this.bounceJumpKill();
            }
            if (world.character.isColliding(enemy)) {
                this.pepeGetsHurt();
            }
        });
    }


    /**
     * function kills chicken in parameter
     * @param {Cicken} enemy 
     */
    killChicken(enemy) {
        let hitEnemy = world.level.enemies.indexOf(enemy);
        world.level.enemies[hitEnemy].chickenAlive = false;
        setTimeout(() => this.deleteEnemy(hitEnemy), 250)
    }


    /**
     * function deletes hit enemy
     * @param {Object} hitEnemy 
     */
    deleteEnemy(hitEnemy) {
        world.level.enemies.splice(hitEnemy, 1);
    }


    /**
     * function lets pepe bounce up
     */
    bounceJumpKill() {
        world.character.speedY = 12;
    }


    /**
     * function hurts pepe
     */
    pepeGetsHurt() {
        world.character.hit();
        world.healthBar.updateStatusBar(world.healthBar.IMAGES_HEALTH_PEPE, world.character.energy);
    }


    /**
     * function checks if pepe collides with boss
     */
    checkBossCollision() {
        if (this.pepeHitsBoss() && world.noRecentHit) {
            this.knocksBackPepe();
            this.bossAttackAnimation();
        }
    }


    /**
     * @returns true if pepe hits boss
     */
    pepeHitsBoss() {
        return world.character.x >= world.level.enemies[0].x - 100;
    }


    /**
     * function animates the knockback of pepe
     */
    knocksBackPepe() {
        world.character.speedY = 15;
        let i = setInterval(() => this.kockback(), 1000 / 60);
        setTimeout(() => clearInterval(i), 300);
    }


    /**
     * function kocks back pepe
     */
    kockback() {
        world.character.x -= 10;
        world.keyboard.RIGHT = false;
        world.keyboard.LEFT = false;
    }


    /**
     * function play boss attack animation and prevents pepe from taking multiple hits
     */
    bossAttackAnimation() {
        world.level.enemies[0].bossAttacks();
        world.noRecentHit = false;
        setTimeout(() => {
            world.noRecentHit = true;
        }, 1500);
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * function check if any thrown bottle hitted something
     */
    checkBottleCollision() {
        world.level.enemies.forEach((enemy) => {
            world.allThrownBottles.forEach((bottle) => {
                if (bottle.isColliding(enemy)) {
                    this.bottleHit(bottle, enemy);
                }
            })
        })
    }



    /**
 * function check if any thrown bottle hitted something
 */
    checkBottleCollision() {
        world.allThrownBottles.forEach((bottle) => {
            world.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy) && !bottle.bottleHitSomething) {
                    this.bottleHit(bottle, enemy);
                }
            })
        })
    }


    /**
     * function checks if bottle hit normal chicken or boss and lets bottle splash
     * @param {Object} bottle 
     * @param {Object} enemy 
     */
    bottleHit(bottle, enemy) {
        bottle.bottleHitSomething = true;
        world.playGameSound(3);
        if (this.bottleHitBoss(bottle)) {
            world.level.enemies[0].bossGetsHit();
        } else {
            this.killChicken(enemy);
        }
        this.deleteAfterSplash(bottle);    
    }


    /**
     * @param {Object} bottle 
     * @returns true if bottle hitted boss
     */
    bottleHitBoss(bottle) {
        return bottle.x >= world.level.enemies[0].x - 100;
    }


    /**
     * function deletes bottle after splash animation
     * @param {Object} bottle 
     */
    deleteAfterSplash(bottle) {
        setTimeout(() => {
            let positionOfBottle = world.allThrownBottles.indexOf(bottle)
            world.allThrownBottles.splice(positionOfBottle, 1);
        }, 300);
    }


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
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.height - this.offset.bottom + 10 >= mo.y + mo.offset.top - 10 &&  //20px hitbox on enemy head
            this.y + this.height - this.offset.bottom - 10 <= mo.y + mo.offset.top + 10 &&  //20px hitbox on enemy head
            this.speedY < 0;                                  
    }
}