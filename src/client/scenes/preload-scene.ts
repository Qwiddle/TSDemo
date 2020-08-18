export class PreloadScene extends Phaser.Scene {
	cursors: any;

	constructor() {
    super({
			key: 'preload'
		});
	}
	
	preload(): void {
		this.load.image('player', '/assets/sprites/playersprite.png');
	}

	create(): void {
		console.log('preloader complete.');

		this.scene.start('main');
	}

	update(): void {
	
	}
}