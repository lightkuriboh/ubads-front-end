class LoadingScene extends Phaser.Scene {

    constructor () {
        super('LoadingScene');
    }

    preload() {
        this.load.image('mine', 'assets/map/mine.png');
        this.load.image('grass', 'assets/map/grass.png');
        this.load.image('wall', 'assets/map/wall.png');
        this.load.text('map_data', 'assets/map/map_data.txt');

        this.load.spritesheet('bomberman_1',
            'assets/character/bomberman_1.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bomberman_1_dead',
            'assets/character/bomberman_1_dead.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('monster_1',
            'assets/character/monster_1.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bomberman_2',
            'assets/character/bomberman_2.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('bomberman_2_dead',
            'assets/character/bomberman_2_dead.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('monster_2',
            'assets/character/monster_2.png',
            {frameWidth: 16, frameHeight: 16});

        this.load.spritesheet('bomb',
            'assets/object/bomb.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('brick',
            'assets/object/brick.png',
            {frameWidth: 16, frameHeight: 16});
        this.load.spritesheet('explosion',
            'assets/object/explosion.png',
            {frameWidth: 16, frameHeight: 16});
    }

    create() {
        console.log(this);
        this.createAnimationForBomberman('bomberman_1');
        this.createAnimationForBomberman('bomberman_2');
        this.createAnimationForMonster('monster_1');
        this.createAnimationForMonster('monster_2');

        this.createAnimationForBomb();

        this.createAnimationForExplosion();

        // this.scene.start('GameScene', {lol: 'ok'});
    }

    createAnimationForBomberman(name) {
        ['_up', '_right', '_down', '_left'].forEach(function (element, index) {
            this.anims.create({
                key: name + element,
                frames: this.anims.generateFrameNumbers(name, {frames: [index, index + 4, index + 8]}),
                frameRate: 5,
                repeat: -1
            });
        }.bind(this));

        this.anims.create({
            key: name + '_stand',
            frames: [{key: name, frame: 2}],
            frameRate: 5
        });

        this.anims.create({
            key: name + '_dead',
            frames: this.anims.generateFrameNumbers(name + '_dead', {frames: [0, 1, 2]}),
            frameRate: 5,
        });
    }

    createAnimationForMonster(name) {
        ['_left', '_right', '_up', '_down'].forEach(function (element, index) {
            this.anims.create({
                key: name + element,
                frames: this.anims.generateFrameNumbers(name, {frames: (index < 2) ? [index, index + 2, index + 4] : [0, 1, 2]}),
                frameRate: 5,
                repeat: -1
            });
        }.bind(this));

        this.anims.create({
            key: name + '_stand',
            frames: [{key: name, frame: 2}],
            frameRate: 5
        });

        this.anims.create({
            key: name + '_dead',
            frames: this.anims.generateFrameNumbers(name, {frames: [0, 1, 6]}),
            frameRate: 5
        });
    }

    createAnimationForBomb() {
        this.anims.create({
            key: 'bomb_animation',
            frames: this.anims.generateFrameNumbers('bomb', {frames: [0, 1, 2]}),
            frameRate: 5,
            repeat: -1
        });
    }

    createAnimationForExplosion() {
        ['_center', '_horizontal', '_left', '_right', '_vertical', '_down', '_up'].forEach(function (element, index) {
            this.anims.create({
                key: 'explosion' + element,
                frames: this.anims.generateFrameNumbers('explosion', {frames: [index, index + 7, index + 14]}),
                frameRate: 15
            });
        }.bind(this));
    }
}