var Muryoma = Muryoma || {};

Muryoma.ManageState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": Muryoma.TilePrefab.prototype.constructor,
        "rectangle": Muryoma.Prefab.prototype.constructor,        
        "blueprint": Muryoma.Blueprint.prototype.constructor
    };
    
    this.TEXT_STYLE = {font: "14px Arial", fill: "#FFFFFF"};
};

Muryoma.ManageState.prototype = Object.create(Phaser.State.prototype);
Muryoma.ManageState.prototype.constructor = Muryoma.ManageState;

Muryoma.ManageState.prototype.init = function (level_data) {
    //console.log('----------------');
    //console.log('ManageState init');
    
    "use strict";
    this.level_data = level_data;    
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
};

Muryoma.ManageState.prototype.create = function () {
    //console.log('----------------');
    //console.log('ManageState create');   

    "use strict";
    var group_name, prefab_name, player_unit_name, enemy_unit_name;
    
    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {        
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    
    // create prefabs
    this.prefabs = {};
    for (prefab_name in this.level_data.prefabs) {        
        if (this.level_data.prefabs.hasOwnProperty(prefab_name)) {
            // create prefab
            this.create_prefab(prefab_name, this.level_data.prefabs[prefab_name]);
        }
    };
    
    this.init_hud();    
    // create units array with player and enemy units
    this.units = [];
    //this.units = this.units.concat(this.groups.player_units.children);
    //this.units = this.units.concat(this.groups.enemy_units.children);
    this.units = this.units.concat(this.groups.blueprints.children);        
    //this.next_turn();

};

Muryoma.ManageState.prototype.create_prefab = function (prefab_name, prefab_data) {
    "use strict";
    /*
    console.log('----------------');
    console.log('ManageState create');
    console.log('prefab_name ', prefab_name);
    console.log('prefab_data ', prefab_data);
    */
    
    var prefab;
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(prefab_data.type)) {
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
};

Muryoma.ManageState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health, build_area;

    // show player actions
    //this.show_player_actions({x: 106, y: 210});
    
    // show player units
    //this.show_units("player_units", {x: 202, y: 210}, Muryoma.PlayerMenuItem.prototype.constructor);
    
    // show enemy units
    //this.show_units("enemy_units", {x: 10, y: 210}, Muryoma.EnemyMenuItem.prototype.constructor);

    // show enemy units
    this.show_blueprints("blueprints", {x: 10, y: 660}, Muryoma.BlueprintMenuItem.prototype.constructor);
    /*
    build_area = new Muryoma.Prefab(this, 'build_area', {x: 0, y: 0}, {"group": "hud", "width": 300, "height": 300, "tint": 0xEACADD});
    build_area.events.onInputDown.add(function(){
        console.log('...');
    }, this);
    */
};

Muryoma.ManageState.prototype.show_blueprints = function (group_name, position, menu_item_constructor) {    
    "use strict";    

    //console.log('---------------------');
    //console.log('group_name ', group_name);
    //console.log('this.groups ', this.groups);
    var bp_index, menu_items, bp_menu_item, bp_menu;
    
    bp_index = 0;
    menu_items = []; 

    for (var key in this.level_data.bp) {
        var item = this.level_data.bp[key];
        bp_menu_item = new menu_item_constructor(this, key + "_menu_item", {x: position.x + bp_index * 100, y: position.y}, {group: "hud", text: key, texture: item.properties.texture});
        bp_index += 1;
        menu_items.push(bp_menu_item);
    }  

    bp_menu = new Muryoma.BlueprintMenu(this, group_name + "_menu", position, {group: "blueprints", menu_items: menu_items});    
    
};


Muryoma.ManageState.prototype.show_units = function (group_name, position, menu_item_constructor) {
    /*
    "use strict";
    var unit_index, menu_items, unit_menu_item, units_menu;

    // create units menu items
    unit_index = 0;
    menu_items = [];
    this.groups[group_name].forEach(function (unit) {
        unit_menu_item = new menu_item_constructor(this, unit.name + "_menu_item", {x: position.x, y: position.y + unit_index * 20}, {group: "hud", text: unit.name, style: Object.create(this.TEXT_STYLE)});
        unit_index += 1;
        menu_items.push(unit_menu_item);
    }, this);
    // create units menu
    units_menu = new Muryoma.Menu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items});      
    */
};

Muryoma.ManageState.prototype.show_player_actions = function (position) {
    /*
    "use strict";
    var actions, actions_menu_items, action_index, actions_menu;
    // available actions
    actions = [{text: "Attack", item_constructor: Muryoma.AttackMenuItem.prototype.constructor}];
    actions_menu_items = [];
    action_index = 0;
    // create a menu item for each action
    actions.forEach(function (action) {
        actions_menu_items.push(new action.item_constructor(this, action.text + "_menu_item", {x: position.x, y: position.y + action_index * 20}, {group: "hud", text: action.text, style: Object.create(this.TEXT_STYLE)}));
        action_index += 1;
    }, this);
    actions_menu = new Muryoma.Menu(this, "actions_menu", position, {group: "hud", menu_items: actions_menu_items});
    */
};

Muryoma.ManageState.prototype.next_turn = function () {
    /*
    "use strict";
    // takes the next unit
    this.current_unit = this.units.shift();
    // if the unit is alive, it acts, otherwise goes to the next turn
    if (this.current_unit.alive) {
        this.current_unit.act();
        this.units.push(this.current_unit);
    } else {
        this.next_turn();
    }
    */
};

Muryoma.ManageState.prototype.render = function(){
    /*
    game.debug.cameraInfo(game.camera, 32, 32);                                   
    for (var group in this.groups){                
         game.debug.body(group);
    } 
    */  
}





