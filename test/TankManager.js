let assert = require('assert');
let TankManager = require('../lib/TankManager');
let Tank = require('../lib/Tank');


describe('TankManager', () => {
  it('should start without any tanks',  () => {
    let tm = new TankManager();
    assert.equal(Object.keys(tm.tanks).length, 0);
  });

  it('should have one tank after a spawn', () => {
    let tm = new TankManager();
    let tank = { name: 'John' };
    tm.spawn(tank);
    assert.equal(Object.keys(tm.tanks).length, 1);
  });

  it('should not add the same tank twice', () => {
    let tm = new TankManager();
    let tank = { name: 'John' };
    tm.spawn(tank);
    tm.spawn(tank);
    assert.equal(Object.keys(tm.tanks).length, 1);
  });

  it('should be able to return a single tank instance', () => {
    let tm = new TankManager();
    let tank = { name: 'John' };
    tm.spawn(tank);
    assert.equal(tm.getTank(tank.id), tank);
  })

  describe('Tank commands', () => {
    // it('must contain an existing tank id', () => {

    // });

    it('should update a tanks position', () => {
      let tm = new TankManager();
      let tank = new Tank('John');
      let location = Object.assign({}, tank.location);
      
      tm.spawn(tank);

      let commands = {
        drive: 100
      }
      tm.commandTank(tank.id, commands);
      assert.notDeepEqual(location, tank.location);
    });

    it('should update a tanks direction', () => {
      let tm = new TankManager();
      let tank = new Tank('John');
      let direction = tank.direction;
      
      tm.spawn(tank);

      let commands = {
        turn: 5
      }
      tm.commandTank(tank.id, commands);
      assert.notEqual(direction, tank.direction);
    });

    it('should update multiple tanks', () => {
      let tm = new TankManager();
      let tanks = [new Tank('John'), new Tank('Doe')];
      let id0 = tanks[0].id;
      let id1 = tanks[1].id;

      for(let tank of tanks) {
        tm.spawn(tank);
      }

      let commands = {};

      for(let tank of tanks) {
        commands[tank.id] = {
          drive: 100,
          turn: 5
        };
      }

      tm.commandAll(commands);
      assert.notDeepEqual({x:0, y:0}, tanks[0].location);
      assert.notDeepEqual({x:0, y:0}, tanks[1].location);
      assert.notEqual(0, tanks[0].direction);
      assert.notEqual(0, tanks[1].direction);
    });
  });
});
