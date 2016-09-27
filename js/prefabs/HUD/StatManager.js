var Muryoma = Muryoma || {};

Muryoma.StatManager = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);    
    this.visible = false; 
  	var data = [];

    this.mydata = game.add.text(position.x, position.y, '', Object.create(game_state.TEXT_STYLE));
    this.mydata.parseList(data);

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    this.counter = 0;

};

function updateCounter() {
    this.counter++;    
}

Muryoma.StatManager.prototype = Object.create(Muryoma.TextPrefab.prototype);
Muryoma.StatManager.prototype.constructor = Muryoma.StatManager;

Muryoma.StatManager.prototype.update = function () {
    "use strict";        
    var data = [
        [ 'Population', '10', 'LOL', '' ],
        [ 'Population', '10', 'ASD', '' ],
        [ 'Population', '10', 'LOL', '' ],
        [ 'Time', this.counter , 'ASD', '' ]        
    ];
   this.mydata.parseList(data);
};

