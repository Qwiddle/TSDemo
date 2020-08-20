export class MapRenderer {
	tileWidth: number = 64;
	tileHeight: number = 32;
	mapWidth: number;
	mapHeight: number;
	scene: Phaser.Scene;
	map: any;

	constructor(scene, map) {
		this.scene = scene;
		this.load(map);
	}

	load(map): void {
		this.map = map;
		//this.mapWidth = this.map.width;
		//this.mapHeight = this.map.height;

		this.mapWidth = 25;
		this.mapHeight = 25;
	}

	drawTile(x, y, id): void {
		const tileWidthHalf = this.tileWidth / 2;
		const tileHeightHalf = this.tileHeight / 2;

		const iCoord = (x - y) * tileWidthHalf;
		const jCoord = (x + y) * tileHeightHalf;

		const tileSprite = this.scene.add.image(iCoord, jCoord, 'tile');
		tileSprite.setOrigin(0.5);
		tileSprite.depth = 0;
	}

	drawMap() {
		let tileCount = 0;

		for(let i = 0; i < this.mapHeight; i++) {
			for(let j = 0; j < this.mapWidth; j++) {
				this.drawTile(i, j, 1);
			}
		}
	}
}