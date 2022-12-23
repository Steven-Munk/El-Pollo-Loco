class CollectBottle extends AllObjects {

    offset = {
        top: 10,
        bottom: 10,
        left: 30,
        right: 30
    };

    constructor() {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');

        this.y = 30 + Math.random() * 100;
        this.x = 400 + Math.random() * 2600;
        this.width = 80;
        this.height = 80;
    }
}