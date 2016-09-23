var Muryoma = Muryoma || {};

Muryoma.Building = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);   
    this.inputEnabled = true;  
    this.enableBody = true;      
    
    //this.events.onInputOver.add(this.inputOver, this);
    //this.events.onInputOut.add(this.inputOut, this);
    //this.events.onInputDown.add(this.onInputDown, this);
};

Muryoma.Building.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.Building.prototype.constructor = Muryoma.Building;

Muryoma.Building.prototype.inputOver = function() {
    "use strict";
    console.log('Building inputOver');
};

Muryoma.Building.prototype.inputOut = function() {
    "use strict";
    console.log('Building inputOut');
};

Muryoma.Building.prototype.onInputDown = function() {
    "use strict";
    console.log('Building onInputDown');
};
