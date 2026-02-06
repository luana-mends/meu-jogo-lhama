const config = {
  type: Phaser.AUTO,
  width: 320,
  height: 180,
  zoom: 3,

  render: {
    pixelArt: true,
    antialias: false
  },

  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },

  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let lhama;
let cursors;

function preload () {
  this.load.spritesheet('lhama', 'assets/lhama.png', {
    frameWidth: 48,
    frameHeight: 48
  });
}

function create () {
  lhama = this.physics.add.sprite(160, 90, 'lhama');
  lhama.setCollideWorldBounds(true);

  this.anims.create({
    key: 'andar',
    frames: this.anims.generateFrameNumbers('lhama', {
      start: 0,
      end: 5
    }),
    frameRate: 8,
    repeat: -1
  });

  this.anims.create({
    key: 'parado',
    frames: [{ key: 'lhama', frame: 0 }],
    frameRate: 1
  });

  cursors = this.input.keyboard.createCursorKeys();
}

function update () {
  lhama.setVelocity(0);

  let andando = false;

  if (cursors.left.isDown) {
    lhama.setVelocityX(-100);
    lhama.setFlipX(true);
    andando = true;
  }
  else if (cursors.right.isDown) {
    lhama.setVelocityX(100);
    lhama.setFlipX(false);
    andando = true;
  }

  if (cursors.up.isDown) {
    lhama.setVelocityY(-100);
    andando = true;
  }
  else if (cursors.down.isDown) {
    lhama.setVelocityY(100);
    andando = true;
  }

  if (andando) {
    lhama.play('andar', true);
  } else {
    lhama.play('parado', true);
  }
}
