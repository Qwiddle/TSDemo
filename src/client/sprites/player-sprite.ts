import { Player } from '../../shared/entities/player';

export class PlayerSprite extends Phaser.GameObjects.Sprite {
	public scene: Phaser.Scene;
	public player: Player;
	public entity: Phaser.GameObjects.Sprite;
	
	constructor(config) {
		super(config.scene, config.x, config.y, config.key);
	
		this.scene = config.scene;
		this.player = config.player;

		this.scene.add.existing(this);
		this.setOrigin(0);
	}

	update(): void {

	}

	removeFromScene(): void {
		this.destroy();
	}
}