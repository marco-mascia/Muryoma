var Muryoma = Muryoma || {};

Muryoma.Blueprint = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);    
    //this.anchor.setTo(0.5);    
    this.stats = properties.stats;
    /*    
    this.attacked_animation = this.game_state.game.add.tween(this);
    this.attacked_animation.to({tint: 0xFF0000}, 200);
    this.attacked_animation.onComplete.add(this.restore_tint, this);
    */
};

Muryoma.Blueprint.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.Blueprint.prototype.constructor = Muryoma.Blueprint;

Muryoma.Blueprint.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};
