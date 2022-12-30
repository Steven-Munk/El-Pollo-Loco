let level1;


/**
 * function adds all Props and NPCs to world
 */
function initLevel() {
    level1 = new Level(
        addEnemies(),
        addClouds(),
        addBackground(),
        addCollectableBottles(),
        addCollectableCoins()
    );
}


/**
 * function adds all NPCs to world
 */
function addEnemies() {
    return [
        new Endboss(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy(),
        new Enemy()
    ]
}


/**
 * function adds all Clouds to world
 */
function addClouds() {
    return [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ]
}


/**
 * function adds all Backgrounds to world
 */
function addBackground() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5)
    ]
}


/**
 * function adds all collectable bottles to world
 */
function addCollectableBottles() {
    return [
        new CollectBottle(),
        new CollectBottle(),
        new CollectBottle(),
        new CollectBottle(),
        new CollectBottle()
    ]
}


/**
 * function adds all collectable coins to world
 */
function addCollectableCoins() {
    return [
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin(),
        new Coin()
    ]
}