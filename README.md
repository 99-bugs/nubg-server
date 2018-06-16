# NUBG Server

Not a Universal Battle Ground Server

## Short Story

Currently only supporting joining of a player and getting game state published. All via MQTT.

### Joining the Game

Publish a JSON in following format to the topic `test/nubg/join`:

```json
{
	"player": {
		"nickname": "BioBoost"
	},
	"tank": {
		"name": "Tiger of Hell"
	}
}
```

This will spawn your tank in a random location.

Joining multiple times has no effect.

### Game State

Game state is published to the following topic: `test/nubg/gamestate` in JSON:

```json
{
	"tanks": [{
		"name": "My Little Tank",
		"driver": {
			"nickname": "BioBoost"
		},
		"location": {
			"x": 686,
			"y": 103
		},
		"hp": 100,
		"model": "Chaffee"
	}],
	"size": {
		"width": 800,
		"height": 600
	}
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