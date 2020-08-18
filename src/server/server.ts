import * as express from 'express';
import * as path from 'path';

class GameServer {
	private io: any;
	private dirty: boolean = false;
	private sockets: object;
	private players: object;
	private lastUpdateTime: number;
	private shouldUpdate: boolean = false;
	private events: any;

	constructor() {
		this.events = {
			'init': (packet, socket) => this.onInit(packet, socket),
		}

		this.start();
		this.lastUpdateTime = Date.now();
	}

	public start(): void {
		const app = express();
		let http = require("http").Server(app);
		this.io = require("socket.io")(http);
		
		app.use(express.static('./dist/'));
		app.set("port", process.env.PORT || 8078);

		http.listen(process.env.PORT || 8078, () => {
			console.log("listening on *:8078");
		});

		app.get("/", (req: any, res: any) => {
			res.sendFile(path.resolve("./dist/index.html"));
		});

		this.io.on("connection", (socket: any) => {
			this.onConnection(socket);
		});	
	}

	private onConnection(socket): void {
		console.log("new connection: " + socket.id);
		
		socket.on('message', data => {
			let packet = JSON.parse(data);

			if(this.events.hasOwnProperty(packet.event)) {
				packet.id = socket.id;
				this.events[packet.event](packet, socket);
			}

			console.log(packet);
		});
	}

	private onInit(packet, socket): void {
		console.log('init check from ' + socket.request.connection.remoteAddress);
	}
}

const gameServer = new GameServer();
