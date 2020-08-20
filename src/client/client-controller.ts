import g from '../shared/global';
import { InputHandler } from './input-handler';
import { Client } from './client';
import { Game } from './game';


export class ClientController {
	public client: Client;
	public game: Game;
	public inputHandler: InputHandler;
	public staticKeys: {};
	public kineticKeys: {};
	public rotateMs: number = 50;

	constructor(game) {
		this.client = game.client;
		this.game = game;
		this.inputHandler = new InputHandler();

		this.initKeys();
	}

	initKeys(): void {
		this.kineticKeys = {
			37: g.direction.left,
			38: g.direction.up,
			39: g.direction.right,
			40: g.direction.down,
			//17: g.key.attack
		};

		this.staticKeys = {
			37: g.direction.staticLeft,
			38: g.direction.staticUp,
			39: g.direction.staticRight,
			40: g.direction.staticDown,
		};
	}

	addKeyListeners(): void {
		this.inputHandler.addListeners();
	}

	getKineticKeyboardInput(): number {
		for (const key in this.kineticKeys) {
			if (this.inputHandler.keys[key]) {
				return this.kineticKeys[key];
			}
		}

		return g.direction.none;        
	}

	getStaticKeyboardInput(initialKey): number {
		for (const key in this.staticKeys) {
			if (this.inputHandler.keys[key]) {
				return this.staticKeys[key];
			}
		}

		return initialKey;
	}

	getKeyboardInput(initialKey): number {
		return Date.now() < (this.inputHandler.keyTimer + this.rotateMs) ? 
			this.getStaticKeyboardInput(initialKey) : this.getKineticKeyboardInput();
	}
}