class Brick extends Phaser.GameObjects.Sprite {

    constructor(context, x, y, texture) {
        super(context, x, y, texture);

        this.setDepth(0);
    }
}