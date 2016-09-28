console.log('Blueprint');
var Muryoma = Muryoma || {};
Muryoma.Blueprint = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);    
    this.stats = properties.stats;
    this.inputEnabled = true;
    this.events.onInputOver.add(this.inputOver, this);
    this.events.onInputOut.add(this.inputOut, this);
    this.events.onInputDown.add(this.onInputDown, this);
};

Muryoma.Blueprint.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.Blueprint.prototype.constructor = Muryoma.Blueprint;

Muryoma.Blueprint.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};

Muryoma.Blueprint.prototype.inputOver = function() {
    "use strict";
    console.log('BP inputOver');
};

Muryoma.Blueprint.prototype.inputOut = function() {
    "use strict";
    console.log('BP inputOut');
};

Muryoma.Blueprint.prototype.onInputDown = function() {
    "use strict";
    console.log('onInputDown');
};
