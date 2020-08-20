import { PlayerSprite } from '../render/sprites/player-sprite';
import { MapRenderer } from '../render/map/map-renderer';
import { Player } from '../../shared/entities/player';

export class MainScene extends Phaser.Scene {
	public playerGroup: Phaser.GameObjects.Group;
	public playerSprite: PlayerSprite;
	public map: MapRenderer
	public player: Player;
	
	constructor() {
		super({
			key: 'main'
		});

		this.map = new MapRenderer(this, {});
	}

	preload(): void {

	}

	create(): void {
		console.log('main scene loaded');
		this.playerGroup = this.add.group();
		this.player = new Player();

		this.playerSprite = new PlayerSprite({
			pos: {
				x: 0,
				y: 0
			},
			dir: 0,
			scene: this,
			key: 'chicken',
			player: this.player 
		});

		this.map.drawMap();

		this.cameras.main.fadeIn(450);
		this.cameras.main.startFollow(this.playerSprite);

		this.playerGroup.add(this.playerSprite);
		this.playerGroup.setDepth(1);
	}

	update(): void {
		this.playerGroup.children.entries.forEach((sprite) => {
			sprite.update();
		});
	}
}