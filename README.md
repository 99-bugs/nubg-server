# NUBG Server

Not a Universal Battle Ground Server

## Short Story

Currently only supporting joining of a player and getting game state published. All via MQTT.

### Joining the Game

Publish a JSON in following format to the topic `test/nubg/join`:

```json
{
	"name": "Rambo"
}
```

This will spawn your tank in a random location.

Joining multiple times has no effect.

### Game State

Game state is published to the following topic: `test/nubg/devgame/gamestate` in JSON:

```json
{
  "name": "default game",
  "tanks": [
    {
      "id": "4df2b4bc081830342d994b3a600cd446915627d6",
      "name": "My Little Tank",
      "location": {
        "x": 0,
        "y": 0
      },
      "direction": 0,
      "health": 100
    },
    {
      "id": "130a743b982665b0d0e527e7f9fff3d1131fe6f5",
      "name": "Tha DUKE",
      "location": {
        "x": 0,
        "y": 0
      },
      "direction": 0,
      "health": 100
    }
  ],
  "timestamp": 1531401855470
}
```

### Updating Tank State

#### JWT Token
At the moment, Tokens must be calculate manually. This can be done on the [https://jwt.io/](https://jwt.io/) website. 

The `payload data` is an object containing the `tank_id` and the `game_id`.
The `tank_id` is the SHA1 hash of the `name` value that you used when `joining` a game. If you use an unknown `tank_id` or an `tank_id` without joining first, the updates will be ignored. The `game_id` can be anything for now (no multiple games supported at the moment).

The `secret` needs to be: `484074319837639265922729358538`

For example, if you joined the tank with name `Rambo`, the token payload needs to be: 

```json
{
  "tank_id": "9e213fd7cd66401b4bc6280aa914ef55b356d948",
  "game_id": "devgame"
}
```

The resulting token looks like this:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YW5rX2lkIjoiOWUyMTNmZDdjZDY2NDAxYjRiYzYyODBhYTkxNGVmNTViMzU2ZDk0OCIsImdhbWVfaWQiOiJkZXZnYW1lIn0.to7EPeG7owHxJTJD0x1dMy1xav8Xsy77ZwAHZROeYWw
```

#### Update commands

Updates should be published to the `test/nubg/devgame/update`. The payload should be a JSON object containing a `token` and the `actions`. At the moment, only the following actions are supported:

* **drive**: distance in pixels to move forward
* **turn**: angle in degrees to rotated (negative values turn left, positive values turn right)

An example where the tank named `Rambo` wants to drive forward 10 pixels and turn 30 degrees to the right:

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YW5rX2lkIjoiOWUyMTNmZDdjZDY2NDAxYjRiYzYyODBhYTkxNGVmNTViMzU2ZDk0OCIsImdhbWVfaWQiOiJkZXZnYW1lIn0.to7EPeG7owHxJTJD0x1dMy1xav8Xsy77ZwAHZROeYWw",
	"drive": 10,
	"turn": 30
}
```

## Setup

Install modules

```shell
npm install
```

## Run it

Execute

```shell
npm start
```