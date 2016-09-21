var Muryoma = Muryoma || {};

Muryoma.BlueprintMenuItem = function (game_state, name, position, properties) {
    "use strict";

    console.log('BlueprintMenuItem ---------------------');    
    console.log('name ', name);
    console.log('position ', position);
    console.log('properties ', properties);

    Muryoma.Prefab.call(this, game_state, name, position, properties);

    this.inputEnabled = true;
    //this.events.onInputOver.add(this.inputOver, this);
    //this.events.onInputOut.add(this.inputOut, this);
    this.events.onInputDown.add(this.onInputDown, this);
};

Muryoma.BlueprintMenuItem.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.BlueprintMenuItem.prototype.constructor = Muryoma.BlueprintMenuItem;

Muryoma.BlueprintMenuItem.prototype.select = function () {
    "use strict";
    console.log('BlueprintMenuItem selected');
    /*
    var enemy;
    // get enemy prefab
    enemy = this.game_state.prefabs[this.text];
    // attack selected enemy
    this.game_state.current_unit.attack(enemy);
    // disable menus
    this.game_state.prefabs.enemy_units_menu.disable();
    this.game_state.prefabs.player_units_menu.disable();
    */
};

Muryoma.BlueprintMenuItem.prototype.onInputDown = function (){
    console.log('BlueprintMenuItem clicked: ', this.name);     
    this.game_state.prefabs.blueprints_menu.setCurrentBlueprint(this);
};