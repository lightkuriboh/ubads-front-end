class Explosion extends Phaser.GameObjects.Sprite {

    constructor(context, x, y, animation) {
        super(context, x, y);

        this.setDepth(1);

        this.anims.play(animation, true);

        this.on('animationcomplete', function () {
            this.destroy();
        }.bind(this));
    }
}