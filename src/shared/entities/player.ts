import { Entity } from "./entity";

export class Player extends Entity {
	moving: boolean = false;
	positionUpdated: boolean = false;
	
	constructor() {
		super();
		
		this.walkTime = 400;
	}
}