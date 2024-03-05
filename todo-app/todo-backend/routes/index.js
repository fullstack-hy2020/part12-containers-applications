const express = require("express");
const redis = require("../redis");
const { getAsync } = require("../redis/index");
const router = express.Router();

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
	visits++;

	res.send({
		...configs,
		visits,
	});
});

router.get("/statistics", async (req, res) => {
	const amt = Number(await getAsync("added_todos"));
	res.send({ added_todos: amt });
});

module.exports = router;
