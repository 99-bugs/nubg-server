var Point = require('./point');

class Tank {
    constructor(name, driver) {
        this.name = name;
        this.driver = driver;
        this.location = new Point();
        this.hp = 100;
        this.model = "Chaffee"
    }
}

module.exports = Tank;