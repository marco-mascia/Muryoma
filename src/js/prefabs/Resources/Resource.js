/* ---------------------------------------------------------------------------------------- */

Muryoma.Resource = function (game_state, name, position, properties) {   
    "use strict";  
    /*
    console.log('Resource ', name);
    console.log('position ', position);
    console.log('properties ', properties);
    */
    Muryoma.Prefab.call(this, game_state, name, position, properties);          

    var style = { font: "10px Arial", fill: "#FFF" };  
    this.label = this.game.add.text(0, 0, properties.label, style);
    this.addChild(this.label);
     
};

Muryoma.Resource.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.Resource.prototype.constructor = Muryoma.Resource;

/* ---------------------------------------------------------------------------------------- */
