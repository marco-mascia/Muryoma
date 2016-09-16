var Muryoma = Muryoma || {};

Muryoma.ShowStat = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.TextPrefab.call(this, game_state, name, position, properties);
    
    this.prefab = this.game_state.prefabs[properties.prefab];
    this.stat = properties.stat;
};

Muryoma.ShowStat.prototype = Object.create(Muryoma.TextPrefab.prototype);
Muryoma.ShowStat.prototype.constructor = Muryoma.ShowStat;

Muryoma.ShowStat.prototype.update = function () {
    "use strict";
    this.text = this.prefab.stats[this.stat];
};