const logger = require("./logger");

function pressAnyKeyAndContinue() {
	process.stdin.setRawMode(true);
	return new Promise((resolve) =>
		process.stdin.once("data", () => {
			process.stdin.setRawMode(false);
			resolve();
		})
	);
}

exports.pressAnyKeyAndExit = async function (errorCode = 0) {
	logger.info("Press any key to exit");
	await pressAnyKeyAndContinue();
	process.exit(errorCode);
};
