import { PlayerSprite } from '../sprites/player-sprite';

export class MainScene extends Phaser.Scene {
	public playerGroup: Phaser.GameObjects.Group;
	public player: PlayerSprite;
	
	constructor() {
		super({
			key: 'main'
		});
	}

	preload(): void {

	}

	create(): void {
		console.log('main scene loaded');
		this.playerGroup = this.add.group();

		this.player = new PlayerSprite({
			pos: 0,
			dir: 0,
			scene: this,
			key: 'player'
		});
	}

	update(): void {

	}
}