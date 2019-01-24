let config = {
    type: Phaser.AUTO,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    parent: 'container',
    zoom: SCALE,
    scene: [LoadingScene, GameScene]
};

let game = new Phaser.Game(config);
let i = 0;

function test() {
    console.log('clicked');
    game.scene.stop('GameScene');
    game.scene.run('GameScene');
}