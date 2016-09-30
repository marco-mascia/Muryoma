var Muryoma = Muryoma || {};

Muryoma.Prefab = function (game_state, name, position, properties) {
    "use strict";
    Phaser.Sprite.call(this, game_state.game, position.x, position.y, properties.texture);
    
    this.game_state = game_state;
    
    this.name = name;
    
    this.game_state.groups[properties.group].add(this);
    this.frame = +properties.frame;
    
    if (properties.scale) {
        this.scale.setTo(properties.scale.x, properties.scale.y);
    }
    
    this.game_state.prefabs[name] = this;

    game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.body.moves = false;
};

Muryoma.Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Muryoma.Prefab.prototype.constructor = Muryoma.Prefab;

Muryoma.Prefab.prototype.render = function(){
    //"use strict";    
    //game.debug.body(this);    
};

