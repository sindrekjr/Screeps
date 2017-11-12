module.exports = {
    planRoads(room) {
        //return;
        if(room.find(FIND_CONSTRUCTION_SITES).length != 0){
            return -1;
        }
        var roadQueue = [];
        // SOURCE <-> CONTROLLER
        if(typeof room.controller != "undefined"){
            var sourcesInRoom = room.find(FIND_SOURCES);
            _.each(sourcesInRoom, function(source){
                queueRoads(source, room.controller, roadQueue);
            });
        }
        // SOURCE <-> STORAGE
        if(typeof room.storage != "undefined"){
            var sourcesInRoom = room.find(FIND_SOURCES);
            _.each(sourcesInRoom, function(source){
                queueRoads(source, room.storage, roadQueue);
            });
        }
        // SOURCE <-> SOURCE
        var sourcesInRoom = room.find(FIND_SOURCES);
        _.each(sourcesInRoom, function(source1){
            _.each(sourcesInRoom, function(source2){
                if(source1.id != source2.id){
                    queueRoads(source1, source2, roadQueue);
                }
            });
        });
        // SOURCE <-> SPAWN
        var spawnsInRoom = room.find(FIND_MY_SPAWNS);
        var sourcesInRoom = room.find(FIND_SOURCES);
        _.each(spawnsInRoom, function(spawn){
            _.each(sourcesInRoom, function(source) {
                queueRoads(source, spawn, roadQueue);
            });
        });
        // SPAWN <-> SPAWN
        var spawnsInRoom = room.find(FIND_MY_SPAWNS);
        _.each(spawnsInRoom, function(spawn1){
            _.each(spawnsInRoom, function(spawn2) {
                queueRoads(spawn1, spawn2, roadQueue);
            });
        });
        // SPAWN <-> CONTROLLER
        if(typeof room.controller != "undefined"){
            var spawnsInRoom = room.find(FIND_MY_SPAWNS);
            _.each(spawnsInRoom, function(spawn){
                queueRoads(spawn, room.controller, roadQueue);
            });
        }
        // TOWER <-> SOURCE
        var sourcesInRoom = room.find(FIND_SOURCES);
        var towersInRoom = room.find(FIND_MY_STRUCTURES, {filter: object => object.structureType == STRUCTURE_TOWER});
        _.each(sourcesInRoom, function(source){
            _.each(towersInRoom, function(tower){
                queueRoads(source, tower, roadQueue);
            });
        });
        // roadQueue now contains all tiles we want to have roads on ...
        buildRoads(room, roadQueue);
    }
}
 
// roadQueue.add(from, to);
function queueRoads(from, to, roadQueue){
    console.log(from + ' ' + to);
    var path = from.room.findPath(from.pos, to.pos, {ignoreRoads: true, ignoreCreeps: true, serialize: false});
    // //for(var p=0; p < path.length; ++p){
    _.each(path, function(roadSegment){
        roadQueue.push(roadSegment);
    });
}
 
function buildRoads(room, roadQueue){
    //roadQueue.forEach(function(roadSegment){
    //for(var rs=0; rs < roadQueue.length; ++rs){
    //  roadSegment=roadQueue[rs];
    for (let roadSegment of roadQueue){
        //var roadSegment=roadQueue[rs];
        var structures = room.lookForAt(LOOK_STRUCTURES, roadSegment.x, roadSegment.y);
        var roadOnTile = _.sum(structures, (s) => s.structureType == STRUCTURE_ROAD);
        if(roadOnTile == 0){
            var status = room.createConstructionSite(roadSegment.x, roadSegment.y, STRUCTURE_ROAD);
            if(status == OK){
                console.log('[ROADPLANNER] Building road @ ' + roadSegment.x + '/' + roadSegment.y + ' in room ' + room.name + '.');
                break;
            }
        }
    }
}