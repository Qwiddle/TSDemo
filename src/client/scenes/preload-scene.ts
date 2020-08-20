export class PreloadScene extends Phaser.Scene {
	cursors: any;

	constructor() {
    super({
			key: 'preload'
		});
	}
	
	preload(): void {
		this.load.image('player', '/assets/sprites/playersprite.png');
		this.load.image('tile', '/assets/sprites/tile.png');
		this.load.spritesheet('chicken', '/assets/sprites/chicken.png', { frameWidth: 32, frameHeight: 32 });
	}

	create(): void {
		console.log('preloader complete.');

		this.scene.start('main');
	}

	update(): void {
	
	}
}