var Muryoma = Muryoma || {};

Muryoma.MenuItem = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.TextPrefab.call(this, game_state, name, position, properties);
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