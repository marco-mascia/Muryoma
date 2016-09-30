    /* SimpleStat */
    /* ---------------------------------------------------------------------------------------- */
    
    var Muryoma = Muryoma || {};
    Muryoma.SimpleStat = function (game_state) {
        "use strict";
        var properties = {group: 'hud', width: width, height: height, texture: bmd};

        Muryoma.Prefab.call(this, game_state, name, position, properties);       
        this.inputEnabled = true; 
                  
    };

    Muryoma.SimpleStat.prototype = Object.create(Muryoma.Prefab.prototype);
    Muryoma.SimpleStat.prototype.constructor = Muryoma.SimpleStat;
    Muryoma.SimpleStat.prototype.update = function(){};

    /* ---------------------------------------------------------------------------------------- */