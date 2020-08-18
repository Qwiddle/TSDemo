import 'phaser';
import { PreloadScene } from './scenes/preload-scene';
import { MainScene } from './scenes/main-scene';
import { Player } from '../shared/entities/player';
import { Client } from './client';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'content',
	width: 800,
	height: 600,
	resolution: 1,
	backgroundColor: "#EDEEC9",
	disableContextMenu: true,
	scene: [
		PreloadScene, MainScene
	]
};

export class Game extends Phaser.Game {
	private entities: [];
	private player: Player;
	private isFocused: boolean;
	private initialized: boolean;
	public client: Client;

	constructor(config: Phaser.Types.Core.GameConfig) {
		super(config);

		this.initialize();
	}

	initialize() {
		//establish network connection
		this.client = new Client();
	}
}

window.addEventListener("load", () => {
	const game = new Game(config);
	game.client.connect();
})
