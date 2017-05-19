var express = require('express');
var Router = express.Router;

var players = {};
var router = new Router();

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCookie(length) {
	if (typeof length !== "number" || length <= 0) {
		length = 10;
	}
	var from = "abcdefghijklmnopqrstwxyzABCDEFGHIJKLMNOPQRSTWXYZ0123456789";
	var res = "";
	for (var i = 0; i < length; i++) {
		res += from[getRandomInt(0, from.length)];
	}
	return res;
}

router.post("/login", function(req, res) {
	if (!req.body.login || players[req.body.login]) {
		return res.end('no');
	}
	if (Object.keys(players).findIndex(function(one){return players[one]===req.body.login;}) === -1) {
		var rand = getRandomCookie();
		res.cookie('access', rand);
		players[rand] = {
			login: req.body.login,
			position:[0,0]
		};
		res.end('ok');
	}
});

router.post("/move", function(req,res) {
	if (!req.cookies.access || !players[req.cookies.access]) {
		return res.status(400).end('no');
	}

	players[req.cookies.access].position[0] = req.body.x || 0;
	players[req.cookies.access].position[1] = req.body.y || 0;
	res.end('ok');
});

router.get("/all", function(req,res) {
	var _p = Object.keys(players).map(function(one) {
		return {
			login: players[one].login,
			position: players[one].position
		};
	});

	res.json(_p);
});

module.exports = router;