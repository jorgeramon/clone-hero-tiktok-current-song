const logger = require("./src/util/logger");
const { pressAnyKeyAndExit } = require("./src/util/std-in");

process.on("uncaughtException", async (err) => {
	logger.error(err.stack);
	await pressAnyKeyAndExit();
});

require("./src/socket");
