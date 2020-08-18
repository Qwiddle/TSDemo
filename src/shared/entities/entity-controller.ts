export class EntityController {
	static setPosition(entity, x, y): void {
		entity.pos.x = x;
		entity.pos.y = y;
	}

	static updateTargetPosition(entity): void {
		entity.targetPos.x = (entity.pos.x - entity.pos.y) * 32;
		entity.targetPos.y = (entity.pos.x + entity.pos.y) * 16;
	}

	static positionEquals(posA, posB): boolean {
		return posA.x === posB.x && posA.y === posB.y;
	}
}