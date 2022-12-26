class Enemy extends MoveableObject {

    zeroOrOne = Math.round(Math.random());
    enemy;
    chickenAlive = true;

    offset = {
        top: 5,
        bottom: 5,
        left: 0,
        right: 0
    };


    IMAGES_WALKING = {
        'chickenBig': [
            'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
        ],
        'chickenSmall': [
            'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
            'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
            'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
        ]
    };


    IMAGE_DEAD = {
        'chickenBig': 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'chickenSmall': 'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    };


    constructor() {
        super();

        this.choseEnemy();
        this.loadImage(this.IMAGES_WALKING[this.enemy][0]);
        this.loadImages(this.IMAGES_WALKING[this.enemy]);

        this.y = 355 + Math.random() * 10;
        this.x = 700 + Math.random() * 3000;
        this.speed = 0.2 + Math.random() * 0.6;

        this.animate();
    }


    /**
     * function choses randomly if big chicken or small chicken is loaded
     */
    choseEnemy() {
        if (this.zeroOrOne === 0) {
            this.renderChickenBig();
        } else {
            this.renderChickenSmall();
        }
    }


    /**
     * function renders big chicken
     */
    renderChickenBig() {
        this.enemy = 'chickenBig';
        this.width = 75;
        this.height = 90;
        this.offset['left'] = 5;
        this.offset['right'] = 5;
    }


    /**
     * function renders small chicken
     */
    renderChickenSmall() {
        this.enemy = 'chickenSmall';
        this.width = 65;
        this.height = 70;
        this.offset['left'] = 1;
        this.offset['right'] = 1;
    }


    /**
     * function animates and moves the chicken
     */
    animate() {
        this.moveChicken();
        this.animateChicken();
    }


    /**
     * function moves the chicken
     */
    moveChicken() {
        setInterval(() => {
            if (this.chickenAlive) {
                this.moveLeft();
            }
        }, 1000 / 60);
    }


    /**
     * function animates the chicken
     */
    animateChicken() {
        setInterval(() => {
            if (this.chickenAlive) {
                this.playAnimation(this.IMAGES_WALKING[this.enemy]);
            } else {
                this.loadImage(this.IMAGE_DEAD[this.enemy]);
            }
        }, 1000 / 10)
    }
}