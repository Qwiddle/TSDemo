import io from 'socket.io-client';

export class Client {
	private config: any;
	public socket: any;

	constructor() {
		this.config = {
			address: 'localhost',
			port: '8078',
		}
	}

	connect(): void {
		this.socket = io(this.config.address + ":" + this.config.port);
		this.socket.on('connect', () => {
			this.send({
				event: 'init',
				init: true
			});
			console.log('connected');
		})
		
	}

	send(packet): void {
		this.socket.send(JSON.stringify(packet));
	}
}