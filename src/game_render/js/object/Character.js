class Character extends Phaser.GameObjects.Sprite {

    constructor (context, x, y, _name) {
        super(context, x, y);

        this.name = _name;
        this.oldX = x;
        this.oldY = y;

        this.setDepth(2);

        this.anims.play(this.name + '_up', true);
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
    }

    setNewXY(x, y) {
        if (x === this.oldX && y === this.oldY)
            this.anims.play(this.name + '_stand', true);
        if (x < this.oldX && y === this.oldY)
            this.anims.play(this.name + '_left', true);
        if (x > this.oldX && y === this.oldY)
            this.anims.play(this.name + '_right', true);
        if (x === this.oldX && y < this.oldY)
            this.anims.play(this.name + '_up', true);
        if (x === this.oldX && y > this.oldY)
            this.anims.play(this.name + '_down', true);

        this.oldX = this.x;
        this.oldY = this.y;

        this.setPosition(x, y);
    }
}