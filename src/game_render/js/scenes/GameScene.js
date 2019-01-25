class GameScene extends Phaser.Scene {

    constructor() {
        super('GameScene');
    }

    init(data) {
        console.log('init', data);
    }

    create() {
        // TODO: Draw Map from map_data
        let map_data = this.cache.text.get('map_data').split('\n');

        for (let i = 0; i < map_data.length; i++)
            for (let j = 0; j < map_data[i].length; j++) {
                let x = j * BLOCK_SIZE + BLOCK_SIZE / 2;
                let y = i * BLOCK_SIZE + BLOCK_SIZE / 2;
                switch (map_data[i][j]) {
                    case '#':
                        this.add.image(x, y, 'wall');
                        break;
                    case '.':
                        this.add.image(x, y, 'grass');
                        break;
                    case 'o':
                        this.add.image(x, y, 'grass');
                        this.add.image(x, y, 'mine');
                        break;
                }
            }

        // TODO: create and add character
        delete this.bomberman_1;
        this.bomberman_1 = new Character(this,
            BLOCK_SIZE * 1.5,
            BLOCK_SIZE * 1.5,
            'bomberman_1');
        delete this.bomberman_2;
        this.bomberman_2 = new Character(this,
            MAP_WIDTH - BLOCK_SIZE * 1.5,
            MAP_HEIGHT - BLOCK_SIZE * 1.5,
            'bomberman_2');
        delete this.monster_1;
        this.monster_1 = new Character(this,
            BLOCK_SIZE * 1.5,
            MAP_HEIGHT - BLOCK_SIZE * 1.5,
            'monster_1');
        delete this.monster_2;
        this.monster_2 = new Character(this,
            MAP_WIDTH - BLOCK_SIZE * 1.5,
            BLOCK_SIZE * 1.5,
            'monster_2');

        this.add.existing(this.bomberman_1);
        this.add.existing(this.bomberman_2);
        this.add.existing(this.monster_1);
        this.add.existing(this.monster_2);

        this.add.existing(new Brick(this, 88, 72, 'brick'));
        this.add.existing(new Bomb(this, 88, 88, 'bomb_animation'));
        this.add.existing(new Explosion(this, 56, 40, 'explosion_center'));
    }

    update(time, delta) {
        // console.log(time, delta);
    }
}