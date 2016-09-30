var Muryoma = Muryoma || {};

Muryoma.PlayerMenuItem = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.MenuItem.call(this, game_state, name, position, properties);
    
    this.player_unit_health = new Muryoma.ShowStat(this.game_state, this.text + "_health", {x: 280, y: this.y}, {group: "hud", text: "", style: properties.style, prefab: this.text, stat: "health"});
};

Muryoma.PlayerMenuItem.prototype = Object.create(Muryoma.MenuItem.prototype);
Muryoma.PlayerMenuItem.prototype.constructor = Muryoma.PlayerMenuItem;

Muryoma.PlayerMenuItem.prototype.select = function () {
    "use strict";
};