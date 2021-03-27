![banner](img/trashschedule_banner.svg)
# Noder Red Trash Schedule

[![NPM](https://img.shields.io/npm/v/node-red-contrib-trashschedule)](https://www.npmjs.com/package/node-red-contrib-trashschedule)
[![NPM_downloads](https://img.shields.io/npm/dm/node-red-contrib-trashschedule)](https://www.npmjs.com/package/node-red-contrib-trashschedule)
[![issues](https://img.shields.io/github/issues/mariuslang/node-red-contrib-trashschedule)](https://github.com/MariusLang/node-red-contrib-trashschedule/issues)

[![NPM](https://nodei.co/npm/node-red-contrib-trashschedule.png?compact=true)](https://nodei.co/npm/node-red-contrib-trashschedule/)

The Node Red **Trashschedule** node is the ultimate node to create your own Trash Schedule.

## Installation
```
npm install node-red-contrib-trashschedule
```

## Node Description
### Input
You can use the input to trigger events manually. The keywords are listed below.
|msg.payload             |outout                               |
|------------------------|-------------------------------------|
|```checkTrashschedule```|return next trashschedule event      |
|```checkNextThree```    |return next three trashschedule event|

### Output
Every day at 00:01 o'clock the node returns the next trashschedule event.
It returns the trashschedule events as an object.
|key |value                 |
|----|----------------------|
|name|the name you've chosen|
|day |event's day           |
|month|event's month        |
|year|event's year          |

## Example Flow
![flow_example](img/flow_example.PNG)

You can import this example into your Node Red flow.
```
[{"id":"7c6bb6b3.1d4648","type":"trashschedule","z":"f250d57e.bf23e8","name":"Trash Schedule","trashschedule":[{"name":"Restmüll","day":4,"month":1,"year":2021},{"name":"Biotonne","day":11,"month":1,"year":2021},{"name":"Papier","day":13,"month":1,"year":2021},{"name":"Restmüll","day":18,"month":1,"year":2021},{"name":"Biotonne","day":25,"month":1,"year":2021},{"name":"Restmüll","day":1,"month":2,"year":2021},{"name":"Biotonne","day":8,"month":2,"year":2021},{"name":"Papiertonne","day":10,"month":2,"year":2021},{"name":"Restmüll","day":15,"month":2,"year":2021},{"name":"Biotonne","day":22,"month":2,"year":2021},{"name":"Restmüll","day":1,"month":3,"year":2021},{"name":"Biotonne","day":8,"month":3,"year":2021},{"name":"Papiertonne","day":10,"month":3,"year":2021},{"name":"Restmüll","day":15,"month":3,"year":2021},{"name":"Biotonne","day":22,"month":3,"year":2021},{"name":"Restmüll","day":27,"month":3,"year":2021},{"name":"Biotonne","day":6,"month":4,"year":2021},{"name":"Papier","day":8,"month":4,"year":2021},{"name":"Restmüll","day":12,"month":4,"year":2021},{"name":"Biotonne","day":19,"month":4,"year":2021},{"name":"Restmüll","day":26,"month":4,"year":2021},{"name":"Biotonne","day":3,"month":5,"year":2021},{"name":"Papier","day":5,"month":5,"year":2021},{"name":"Restmüll","day":10,"month":5,"year":2021},{"name":"Biotonne","day":17,"month":5,"year":2021},{"name":"Restmüll","day":25,"month":5,"year":2021},{"name":"Biotonne","day":31,"month":5,"year":2021},{"name":"Papier","day":2,"month":6,"year":2021},{"name":"Restmüll","day":7,"month":6,"year":2021},{"name":"Biotonne","day":14,"month":6,"year":2021},{"name":"Restmüll","day":21,"month":6,"year":2021},{"name":"Biotonne","day":28,"month":6,"year":2021},{"name":"Papier","day":30,"month":6,"year":2021},{"name":"Restmüll","day":5,"month":7,"year":2021},{"name":"Biotonne","day":12,"month":7,"year":2021},{"name":"Restmüll","day":19,"month":7,"year":2021},{"name":"Biotonne","day":26,"month":7,"year":2021},{"name":"Papier","day":28,"month":7,"year":2021},{"name":"Restmüll","day":2,"month":8,"year":2021},{"name":"Biotonne","day":9,"month":8,"year":2021},{"name":"Restmüll","day":16,"month":8,"year":2021},{"name":"Biotonne","day":23,"month":8,"year":2021},{"name":"Papier","day":25,"month":8,"year":2021},{"name":"Restmüll","day":30,"month":8,"year":2021},{"name":"Biotonne","day":6,"month":9,"year":2021},{"name":"Restmüll","day":13,"month":9,"year":2021},{"name":"Biotonne","day":20,"month":9,"year":2021},{"name":"Papier","day":22,"month":9,"year":2021},{"name":"Restmüll","day":27,"month":9,"year":2021},{"name":"Biotonne","day":4,"month":10,"year":2021},{"name":"Restmüll","day":11,"month":10,"year":2021},{"name":"Biotonne","day":18,"month":10,"year":2021},{"name":"Papier","day":20,"month":10,"year":2021},{"name":"Restmüll","day":25,"month":10,"year":2021},{"name":"Biotonne","day":2,"month":11,"year":2021},{"name":"Restmüll","day":8,"month":11,"year":2021},{"name":"Biotonne","day":15,"month":11,"year":2021},{"name":"Papier","day":17,"month":11,"year":2021},{"name":"Restmüll","day":22,"month":11,"year":2021},{"name":"Biotonne","day":29,"month":11,"year":2021},{"name":"Restmüll","day":6,"month":12,"year":2021},{"name":"Biotonne","day":13,"month":12,"year":2021},{"name":"Papiertonne","day":15,"month":12,"year":2021},{"name":"Restmüll","day":18,"month":12,"year":2021},{"name":"Biotonne","day":27,"month":12,"year":2021}],"skipHour":"10","x":480,"y":80,"wires":[["659846ef.d72b68"]]},{"id":"a3b15fe2.252e08","type":"inject","z":"f250d57e.bf23e8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"checkTrashschedule","payloadType":"str","x":270,"y":60,"wires":[["7c6bb6b3.1d4648"]]},{"id":"659846ef.d72b68","type":"debug","z":"f250d57e.bf23e8","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":650,"y":80,"wires":[]},{"id":"c79e0225.2138d8","type":"inject","z":"f250d57e.bf23e8","name":"","props":[{"p":"payload"}],"repeat":"","crontab":"","once":false,"onceDelay":0.1,"topic":"","payload":"checkNextThree","payloadType":"str","x":280,"y":100,"wires":[["7c6bb6b3.1d4648"]]}]
```
