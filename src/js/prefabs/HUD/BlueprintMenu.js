var Muryoma = Muryoma || {};

Muryoma.BlueprintMenu = function (game_state, name, position, properties) {
    "use strict";
    /*
    console.log('---------------------');
    console.log('game_state ', game_state);
    console.log('name ', name);
    console.log('position ', position);
    */
    
    var live_index, life;
    Muryoma.Prefab.call(this, game_state, name, position, properties);    
    this.blueprintMenu_items = properties.menu_items;    
    this.current_blueprint = null;   
    this.colorDisabled();    
    this.fixedToCamera = true; 
};

Muryoma.BlueprintMenu.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.BlueprintMenu.prototype.constructor = Muryoma.BlueprintMenu;

Muryoma.BlueprintMenu.prototype.update = function (item_index) {
    "use strict";    
};

Muryoma.BlueprintMenu.prototype.setCurrentBlueprint = function (blueprint) {
    "use strict";    
    console.log('setCurrentBlueprint ', blueprint);
    
    this.current_blueprint = blueprint;
    var childArray = this.game_state.groups.hud.children;    
    var marker = childArray.filter(function(a){ return a.name == 'marker'; })[0];
    marker.setDimensions(blueprint);
    this.colorDisabled();
    blueprint.tint = 0xFFFFFF;
};

Muryoma.BlueprintMenu.prototype.colorDisabled = function(){
    "use strict";    
    for (var i = this.blueprintMenu_items.length - 1; i >= 0; i--) {
        this.blueprintMenu_items[i].tint = 0x75757;
    }
};