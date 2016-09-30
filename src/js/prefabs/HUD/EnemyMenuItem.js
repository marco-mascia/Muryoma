var Muryoma = Muryoma || {};

Muryoma.EnemyMenuItem = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.MenuItem.call(this, game_state, name, position, properties);
};

Muryoma.EnemyMenuItem.prototype = Object.create(Muryoma.MenuItem.prototype);
Muryoma.EnemyMenuItem.prototype.constructor = Muryoma.EnemyMenuItem;

Muryoma.EnemyMenuItem.prototype.select = function () {
    "use strict";
    var enemy;
    // get enemy prefab
    enemy = this.game_state.prefabs[this.text];
    // attack selected enemy
    this.game_state.current_unit.attack(enemy);
    // disable menus
    this.game_state.prefabs.enemy_units_menu.disable();
    this.game_state.prefabs.player_units_menu.disable();
};