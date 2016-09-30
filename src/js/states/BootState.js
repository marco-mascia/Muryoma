//var Muryoma = Muryoma || {};

BootState = function () {
    "use strict";
    Phaser.State.call(this);
};

BootState.prototype = Object.create(Phaser.State.prototype);
BootState.prototype.constructor = BootState;

BootState.prototype.init = function (level_file, next_state) {
    "use strict";
    this.level_file = level_file;
    this.next_state = next_state;
};

BootState.prototype.preload = function () {
    "use strict";
    this.load.text("level1", this.level_file);
};

BootState.prototype.create = function () {
    "use strict";
    var level_text, level_data;
    level_text = this.game.cache.getText("level1");
    level_data = JSON.parse(level_text);    
    this.game.state.start("LoadingState", true, false, level_data, this.next_state);
};