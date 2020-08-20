import { Player } from '../../../shared/entities/player';
import g from '../../../shared/global';

export class PlayerSprite extends Phaser.GameObjects.Sprite {
	public scene: Phaser.Scene;
	public player: Player;
	public entity: Phaser.GameObjects.Sprite;
	public key: string;
	public offset: number;
	public dirFrame: any;
	
	constructor(config) {
		super(config.scene, config.pos.x, config.pos.y, config.key);
	
		this.scene = config.scene;
		this.player = config.player;
		this.key = config.key;

		this.scene.add.existing(this);
		this.setOrigin(0.5);

		this.offset = this.height / 2;
		this.y -= this.offset;

		this.addAnimations();
	}

	update(): void {
		this.depth = (this.y + this.height) + 64;

		if(!this.player.moving) {
			if(this.player.dir == g.direction.right ||
			this.player.dir == g.direction.staticRight ||
			this.player.dir == g.direction.up ||
			this.player.dir == g.direction.staticUp) {
				this.flipX = false;
			} else if(this.player.dir == g.direction.left ||
			this.player.dir == g.direction.staticLeft ||
			this.player.dir == g.direction.down ||
			this.player.dir == g.direction.staticDown) {
				this.flipX = true;
			}

			this.setFrame(this.dirFrame[this.player.dir]);
		}
	}

	interpolate(): void {
		if(!this.player.moving) {
			if(this.up()) {
				this.flipX = false;
				this.play('walkUp');
			} else if(this.down()) {
				this.flipX = true;
				this.play('walkDown');
			} else if(this.left()) {
				this.flipX = true;
				this.play('walkLeft');
			} else if(this.right()) {
				this.flipX = false;
				this.play('walkRight');
			}

			this.scene.tweens.add({
				targets: this,
				x: this.player.targetPos.x,
				y: this.player.targetPos.y,
				duration: this.player.walkTime,
				ease: 'Power0',
				onComplete: () => {
					this.player.moving = false;
					this.player.positionUpdated = true;
				}
			})
		}
	}

	addAnimations(): void {
		const animations = {
			walkUp: {
				key: 'walkUp',
				frames: this.scene.anims.generateFrameNumbers(this.key, {start: 6, end: 9}),
				duration: 400
			},
			walkDown: {
				key: 'walkDown',
				frames: this.scene.anims.generateFrameNumbers(this.key, {start: 2, end: 5}),
				duration: 400
			},
			walkLeft: {
				key: 'walkLeft',
				frames: this.scene.anims.generateFrameNumbers(this.key, {start: 6, end: 9}),
				duration: 400
			},
			walkRight: {
				key: 'walkRight',
				frames: this.scene.anims.generateFrameNumbers(this.key, {start: 2, end: 5}),
				duration: 400
			}
		};

		this.scene.anims.create(animations.walkUp);
		this.scene.anims.create(animations.walkDown);
		this.scene.anims.create(animations.walkLeft);
		this.scene.anims.create(animations.walkRight);

		this.initDirectionFrames();
	}

	initDirectionFrames(): void {
		this.dirFrame = new Array(9);
		this.dirFrame[g.direction.left] = 1;
		this.dirFrame[g.direction.staticLeft] = 1;
		this.dirFrame[g.direction.right] = 0;
		this.dirFrame[g.direction.staticRight] = 0;
		this.dirFrame[g.direction.up] = 1;
		this.dirFrame[g.direction.staticUp] = 1;
		this.dirFrame[g.direction.down] = 0;
		this.dirFrame[g.direction.staticDown] = 0;
		this.dirFrame[g.direction.none] = 0;
	}

	left(): boolean {
		return this.player.targetPos.x < this.x && this.player.targetPos.y < this.y;
	}

	right(): boolean {
		return this.player.targetPos.x > this.x && this.player.targetPos.y > this.y;
	}

	up(): boolean {
		return this.player.targetPos.x > this.x && this.player.targetPos.y < this.y;
	}

	down(): boolean { 
		return this.player.targetPos.x < this.x && this.player.targetPos.y > this.y;
	}

	removeFromScene(): void {
		this.destroy();
	}
}