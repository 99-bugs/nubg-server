class TankManager {
	constructor() {
		this.tanks = {};
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
	}

	getTank(id) {
		return this.tanks[id];
	}

	commandTank(id, commands) {
		let tank = this.getTank(id);
		tank.turn(commands.turn);
		tank.drive(commands.drive);
	}

	commandAll(commands) {
		for (let id in commands) {
			this.commandTank(id, commands[id]);
		}
	}
}

module.exports = TankManager;