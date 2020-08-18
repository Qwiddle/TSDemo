export class Entity {
	public name: string;
	public pos: object;
	public targetPos: object;
	public dir: number;

	constructor() {
		this.name = ""; 
		this.pos = {x: 0, y: 0},
		this.targetPos = {x: 0, y: 0};
		this.dir = 0;
	}
}