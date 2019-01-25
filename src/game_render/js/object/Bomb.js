class Bomb extends Phaser.GameObjects.Sprite {

    constructor(context, x, y, animation) {
        super(context, x, y);

        this.setDepth(1);

        this.anims.play(animation, true);
    }
}