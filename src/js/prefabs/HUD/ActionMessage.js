var Muryoma = Muryoma || {};

Muryoma.ActionMessage = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    // create message text
    this.message_text = new Muryoma.TextPrefab(this.game_state, this.name + "_message", position, {group: "hud", text: properties.message, style: Object.create(this.game_state.TEXT_STYLE)});
    this.message_text.anchor.setTo(0.5);
    
    // start timer to destroy the message
    this.kill_timer = this.game_state.game.time.create();
    this.kill_timer.add(Phaser.Timer.SECOND * properties.duration, this.kill, this);
    this.kill_timer.start();
};

Muryoma.ActionMessage.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.ActionMessage.prototype.constructor = Muryoma.ActionMessage;

Muryoma.ActionMessage.prototype.kill = function () {
    "use strict";
    Phaser.Sprite.prototype.kill.call(this);
    // when the message is destroyed, call next turn
    this.message_text.kill();
    this.game_state.next_turn();
};