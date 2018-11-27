class TankManager {
	constructor(game) {
		this.tanks = {};
		this.game = game
	}

	spawn(tank) {
		for (let existingTank in this.tanks) {
			if (existingTank.id === tank.id) {
					return;
			}
		}
		// Later we will need to take size of tank into account too
		// tank.move(Math.floor(Math.random() * (this.size.width-1)), Math.floor(Math.random() * (this.size.height-1)));
		this.tanks[tank.id] = tank;
		return tank;
	}

	getTank(id) {
		return this.tanks[id];
	}

	commandTank(id, commands) {
		let tank = this.getTank(id);
		tank.turn(commands.turn);
		tank.drive(commands.drive);
		this.checkGameBounds(this.game, tank)
	}

	commandAll(commands) {
		for (let id in commands) {
			this.commandTank(id, commands[id]);
		}
	}

	getState() {
		let state = [];
		for (let tankId in this.tanks) {
			let tank = this.tanks[tankId];
			state.push(tank.getState());
		}
		return state;
	}

	checkGameBounds(game, tank) {
		tank.location.x %= (game.size.width - game.size.border)
		tank.location.y %= (game.size.height - game.size.border)

		if (tank.location.x < game.size.border) {
			tank.location.x += game.size.width
		}
		if (tank.location.y < game.size.border) {
			tank.location.y += game.size.height
		}
	}
}

module.exports = TankManager;