import g from '../global';

export class Entity {
	public name: string;
	public pos: any;
	public targetPos: any;
	public dir: number;
	public walkTime: number;

	constructor() {
		this.name = ""; 
		this.pos = {x: 0, y: 0},
		this.targetPos = {x: 0, y: 0};
		this.dir = g.direction.down;
		this.walkTime = 400;
	}
}