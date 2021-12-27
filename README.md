![banner](img/trashschedule_banner.svg)
# Node Red Trash Schedule

[![NPM](https://img.shields.io/npm/v/node-red-contrib-trashschedule)](https://www.npmjs.com/package/node-red-contrib-trashschedule)
[![NPM_downloads](https://img.shields.io/npm/dm/node-red-contrib-trashschedule)](https://www.npmjs.com/package/node-red-contrib-trashschedule)
[![issues](https://img.shields.io/github/issues/mariuslang/node-red-contrib-trashschedule)](https://github.com/MariusLang/node-red-contrib-trashschedule/issues)
[![Node.js CI](https://github.com/MariusLang/node-red-contrib-trashschedule/actions/workflows/test.yml/badge.svg)](https://github.com/MariusLang/node-red-contrib-trashschedule/actions/workflows/test.yml)

[![NPM](https://nodei.co/npm/node-red-contrib-trashschedule.png?compact=true)](https://nodei.co/npm/node-red-contrib-trashschedule/)

The **node-red-contrib-trashschedule** Node is the ultimative Node to manage your Trashschedule events.

Please make sure that you've picked the right timezone into your system settings!

## Installation
```
npm install node-red-contrib-trashschedule
```

## Node Description
### Settings
Add your trashschedule events into the list.

![list_example](img/list_example.PNG)

|field|required input                 |
|-----|-------------------------------|
|1    |event day (1-31)               |
|2    |event month (1-12)             |
|3    |event year (yyyy example: 2021)|
|4    |event name                     |

Select the hour until the trashschedule event will be displayed.

![skip_example](img/skip_example.PNG)

The last field "Name" gives the possibility to change the name which will be displayed for this node into your flow.

### Input
You can use the input to trigger events manually. The keywords are listed below.
|msg.payload             |output                               |
|------------------------|-------------------------------------|
|```checkTrashschedule```|return next trashschedule event      |
|```checkNextThree```    |return next three trashschedule event|
|```all```               |return all trashschedule event       |

### Output
Every hour the node returns the next trashschedule event (output 1) and next three trashschedule events (output 2).
It returns the trashschedule events as an object. If there isn't a trashschedule event available you will receive the payload "Trashschedule events outdated".
The next three trashschedule events are packed into an array.

|key  |value                 |
|-----|----------------------|
|name |event's name          |
|day  |event's day           |
|month|event's month         |
|year |event's year          |

## Example Flow
![flow_example](img/flow_example.PNG)

You can import this example into your Node Red flow.
```
[{"id":"fec0be7818a3b438","type":"trashschedule","z":"7035994dcde5f3c9","name":"Trash Schedule","trashschedule":[{"name":"Restmüll","day":"3","month":"9","year":"2022"},{"name":"Papiertonne","day":"4","month":"3","year":"2022"},{"name":"Biotonne","day":"5","month":"8","year":"2023"},{"name":"Gelbe Tonne","day":"2","month":"2","year":"2022"}],"skipHour":12,"x":450,"y":260,"wires":[["b8e1b4ecca4d94b4"],["2514c3ce60ebc8ec"],["867c0090bf72aa2a"]]},{"id":"9ed74172ad019d57","type":"inject","z":"7035994dcde5f3c9","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"checkTrashschedule","payloadType":"str","x":230,"y":220,"wires":[["fec0be7818a3b438"]]},{"id":"2514c3ce60ebc8ec","type":"debug","z":"7035994dcde5f3c9","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":260,"wires":[]},{"id":"867c0090bf72aa2a","type":"debug","z":"7035994dcde5f3c9","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":300,"wires":[]},{"id":"b8e1b4ecca4d94b4","type":"debug","z":"7035994dcde5f3c9","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":670,"y":220,"wires":[]},{"id":"8b9bbfffbf7eec36","type":"inject","z":"7035994dcde5f3c9","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"checkNextThree","payloadType":"str","x":240,"y":260,"wires":[["fec0be7818a3b438"]]},{"id":"fa3b06b5a4cdbf50","type":"inject","z":"7035994dcde5f3c9","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"all","payloadType":"str","x":270,"y":300,"wires":[["fec0be7818a3b438"]]}]
```
