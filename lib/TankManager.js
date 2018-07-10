class TankManager {
	constructor() {
		this.tanks = [];
	}

	spawn(tank){
		for (let existingTank of this.tanks) {
			if (existingTank.driver.nickname === tank.driver.nickname) {
					return;
			}
		}
		// Later we will need to take size of tank into account too
		// tank.move(Math.floor(Math.random() * (this.size.width-1)), Math.floor(Math.random() * (this.size.height-1)));
		this.tanks.push(tank);
	}
}

module.exports = TankManager;