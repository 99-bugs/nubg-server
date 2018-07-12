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
		return tank;
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

	getState() {
		let state = [];
		for (let tankId in this.tanks) {
			let tank = this.tanks[tankId];
			state.push(tank.getState());
		}
		return state;
	}
}

module.exports = TankManager;