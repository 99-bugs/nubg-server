let assert = require('assert');
let should = require('chai').should()
let Tank = require('../lib/Tank');


describe('Tank', () => {
  it('has a name',  () => {
    let name = 'John';
    let tank = new Tank(name);
    assert.equal(tank.name, name);
  });
  
  it('has an id that depends on the name', () => {
    let tank = new Tank('John');
    assert.equal(tank.id, "5753a498f025464d72e088a9d5d6e872592d5f91");
  })

  it('has a default location of 0,0', () => {
    let tank = new Tank("John");
    assert.equal(tank.location.x, 0);
    assert.equal(tank.location.y, 0);
  });

  it('has an optional location on create', () => {
    let tank = new Tank("John", {location: {x: 100, y: 200}});
    assert.equal(tank.location.x, 100);
    assert.equal(tank.location.y, 200);
  })

  it('has a default direction of 0', () => {
    let tank = new Tank("John");
    assert.equal(tank.direction, 0);
  });

  it('has an optional direction on create', () => {
    let tank = new Tank("John", {direction: 180});
    assert.equal(tank.direction, 180);
  })

  it('has a default health power of 100', () => {
    let tank = new Tank("John");
    assert.equal(tank.hp, 100);
  });

  it('can drive 100 north', () => {
    let tank = new Tank("John", {location: {x: 1000, y: 1000}});
    tank.drive(100);
    assert.equal(tank.location.x, 1000);
    assert.equal(tank.location.y, 900);
  });

  it('can drive 100 east', () => {
    let tank = new Tank("John", {location: {x: 1000, y: 1000}, direction: 90});
    tank.drive(100);
    assert.equal(tank.location.x, 1100);
    assert.equal(tank.location.y, 1000);
  });

  it('can drive 100 north east', () => {
    let tank = new Tank("John", {location: {x: 1000, y: 1000}, direction: 45});
    tank.drive(100);
    tank.location.x.should.be.closeTo(1000 + 70.710, 0.001);
    tank.location.y.should.be.closeTo(1000 - 70.710, 0.001);
  });

  it('can turn counter clock wise', () => {
    let tank = new Tank("John", {direction: 0});
    tank.turn(-90);
    tank.direction.should.be.equal(-90);
  });

  it('can turn clock wise with overflow', () => {
    let tank = new Tank("John", {direction: 270});
    tank.turn(180);
    tank.direction.should.be.equal(90);
  });

  it('can turn counter clock wise with overflow', () => {
    let tank = new Tank("John", {direction: 90});
    tank.turn(-180);
    tank.direction.should.be.equal(-90);
  });

  it('can report its state', () => {
    let tank = new Tank("John", {
      location: {x: 1000, y: 2000}, 
      direction: 45
    });
    let state = tank.getState();
    state.name.should.be.equal('John');
    state.location.x.should.be.equal(1000);
    state.location.y.should.be.equal(2000);
    state.direction.should.be.equal(45);
    state.id.should.be.equal('5753a498f025464d72e088a9d5d6e872592d5f91');
  });

});
