class Cloud extends MoveableObject{

    IMAGES_CLOUDS = [
        'img/5_background/layers/4_clouds/1.png',
        'img/5_background/layers/4_clouds/2.png'
    ]


    constructor() {
        super();
        
        let zeroOrOne = Math.round(Math.random());
        let image = this.IMAGES_CLOUDS[zeroOrOne];
        this.loadImage(image);

        this.y = 15 + Math.random() * 10;
        this.x = 200 + Math.random() * 3000; 
        this.width = 400;
        this.height = 250;
        this.speed = 0.1 + Math.random() * 0.3; 
        
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
    }
}