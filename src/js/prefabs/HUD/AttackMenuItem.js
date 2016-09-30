var Muryoma = Muryoma || {};

Muryoma.AttackMenuItem = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.MenuItem.call(this, game_state, name, position, properties);
};

Muryoma.AttackMenuItem.prototype = Object.create(Muryoma.MenuItem.prototype);
Muryoma.AttackMenuItem.prototype.constructor = Muryoma.AttackMenuItem;

Muryoma.AttackMenuItem.prototype.select = function () {
    "use strict";
    // disable actions menu
    this.game_state.prefabs.actions_menu.disable();
    // enable enemy units menu so the player can choose the target
    this.game_state.prefabs.enemy_units_menu.enable();
};