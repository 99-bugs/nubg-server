let assert = require('assert');
let TankManager = require('../lib/TankManager');


describe('TankManager', () => {
  it('should start without any tanks',  () => {
    let tm = new TankManager();
    assert.equal(tm.tanks.length, 0);
  });

  it('should have one tank after a spawn', () => {
    let tm = new TankManager();
    let tank = { name: 'John' };
    tm.spawn(tank);
    assert.equal(tm.tanks.length, 1);
  })
});
