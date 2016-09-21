var Muryoma = Muryoma || {};

Muryoma.MenuItem = function (game_state, name, position, properties) {
    "use strict";    
    Muryoma.TextPrefab.call(this, game_state, name, position, properties);
    
    this.inputEnabled = true;
    //this.events.onInputOver.add(this.inputOver, this);
    //this.events.onInputOut.add(this.inputOut, this);
    //this.events.onInputDown.add(this.onInputDown, this);    
};

Muryoma.MenuItem.prototype = Object.create(Muryoma.TextPrefab.prototype);
Muryoma.MenuItem.prototype.constructor = Muryoma.MenuItem;

Muryoma.MenuItem.prototype.selection_over = function () {
    "use strict";
    this.fill = "#FFFF00";
};

Muryoma.MenuItem.prototype.selection_out = function () {
    "use strict";
    this.fill = "#FFFFFF";
};
/*
Muryoma.MenuItem.prototype.inputOver = function() {
    "use strict";
    console.log('inputOver');
};

Muryoma.MenuItem.prototype.inputOut = function() {
    "use strict";
    console.log('inputOut');
  
};
*/
Muryoma.MenuItem.prototype.onInputDown = function() {
    "use strict";
    //console.log('onInputDown');
    //console.log('game_state ', this.parent);    
};
