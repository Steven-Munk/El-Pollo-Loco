class Coin extends AllObjects {

    offset = {
        top: 25,
        bottom: 25,
        left: 25,
        right: 25
    };

    constructor() {
        super().loadImage('img/8_coin/coin_2.png');

        this.y = 30 + Math.random() * 100;
        this.x = 400 + Math.random() * 2600;
        this.width = 80;
        this.height = 80;
    }
}