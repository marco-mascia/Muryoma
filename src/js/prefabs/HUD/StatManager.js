var Muryoma = Muryoma || {};

Muryoma.StatManager = function (game_state, name, position, properties) {
    "use strict";
    Muryoma.Prefab.call(this, game_state, name, position, properties);    
    //this.visible = false; 
  	var data = [];

    var defX = position.x + 20;
    var defY = position.y + 20;

    this.mydata = game.add.text(defX, defY, '', Object.create(game_state.TEXT_STYLE));
    this.mydata.parseList(data);
    this.mydata.fixedToCamera = true;

    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
    this.counter = 0;
    //this.population = 0; //total population
    this.supplySpace = 0; //space needed for the population
    this.unemployed = 0; //total of not working population
    this.workers = 0;
    this.foodProdRate = 0;
    this.gold = 30; 
    this.ore = 60;

    this.fixedToCamera = true; 
};

function updateCounter() {
    this.counter++;    
}

Muryoma.StatManager.prototype = Object.create(Muryoma.TextPrefab.prototype);
Muryoma.StatManager.prototype.constructor = Muryoma.StatManager;

Muryoma.StatManager.prototype.update = function () {
    "use strict";   
    var data = [
        [ 'Time', this.counter , '', '' ],                
        [ 'Unemployed', this.unemployed, 'Workers', this.workers ],        
        [ 'Supply', this.supplySpace, 'Food', this.foodProdRate ],
        [ 'Gold', this.gold, 'Steel', this.ore, '', '' ]               
    ];
   this.mydata.parseList(data);
};

