const fastify = require("fastify");
const fastifyIO = require("fastify-socket.io");
const logger = require("./util/logger");
const { onCurrentSongChange, getCurrentSong } = require("./rx/current-song");

const server = fastify();

server.register(fastifyIO);
server.register(require("@fastify/view"), {
	engine: {
		pug: require("pug"),
	},
});

server.get("/song", (request, reply) => {
	reply.view("src/templates/current-song.pug");
});

server.ready().then(function () {
	onCurrentSongChange().subscribe((currentSong) => {
		logger.debug(JSON.stringify(currentSong));
		server.io.of("/current-song").emit("song", currentSong);
	});

	server.io.of("/current-song").on("connection", (socket) => {
		logger.debug("Client connected");
		socket.emit("song", getCurrentSong());
	});
});

server.listen(8000);
