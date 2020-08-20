export class InputHandler {
	public keys = [];
	public keyTimer: number = 0;
	public keyDelay: number = 20;

	constructor() {

	}

	addListeners(): void {
		addEventListener("keydown", (key) => {
			if (!this.keys[key.keyCode]) {
				if(key.keyCode == 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40 || key.keyCode == 17) {
					this.keyTimer = Date.now() + this.keyDelay;
					this.keys[key.keyCode] = true;

					console.log(key.keyCode);
				}
			}
		});

		addEventListener("keyup", (key) => {
			if (this.keys[key.keyCode]) {
				if(key.keyCode == 37 || key.keyCode == 38 || key.keyCode == 39 || key.keyCode == 40 || key.keyCode == 17) {
					this.keyTimer = Date.now() + this.keyDelay;
					this.keys[key.keyCode] = false;
				}
			}
		});
	}
}