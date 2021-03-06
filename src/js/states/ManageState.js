var Muryoma = Muryoma || {};

Muryoma.ManageState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "background": Muryoma.TilePrefab.prototype.constructor,
        "rectangle": Muryoma.Prefab.prototype.constructor,        
        "blueprint": Muryoma.Blueprint.prototype.constructor
    };

    this.buildings_classes = {
        'house': Muryoma.House.prototype.constructor,
        'field': Muryoma.Field.prototype.constructor,
        'mine': Muryoma.Mine.prototype.constructor,
    };
    
    this.TEXT_STYLE = {font: "14px Arial", fill: "#9a7b6e"};

    this.SHORT_TIME = 3000;
    this.MEDIUM_TIME = this.SHORT_TIME * 2;
    this.LONG_TIME = this.MEDIUM_TIME * 2;
    this.WORLD_HEIGHT = 1600;
    this.WORLD_WIDTH = 1600;    
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

    // Resize our game world to be a WORLD_HEIGHT, WORLD_WIDTH square
    game.world.setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);
    
    //centering camera 
    game.camera.x = game.width/2; 
    game.camera.y = game.height/2; 

    // create cursors
    this.cursors = game.input.keyboard.createCursorKeys();
};

Muryoma.ManageState.prototype.create = function () {
    //console.log('----------------');
    //console.log('ManageState create');   

    "use strict";
    var group_name, prefab_name, player_unit_name, enemy_unit_name, layer, buildings;
    
    this.show_background();
    

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
    }   
    this.add_resources();    
    this.init_hud();    

    // create units array with player and enemy units
    //this.units = [];
    //this.units = this.units.concat(this.groups.player_units.children);
    //this.units = this.units.concat(this.groups.enemy_units.children);
    //this.units = this.units.concat(this.groups.hud.children);        
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
        console.log('prefab_data.type ', prefab_data.type);
        prefab = new this.prefab_classes[prefab_data.type](this, prefab_name, prefab_data.position, prefab_data.properties);
    }
};

Muryoma.ManageState.prototype.init_hud = function () {
    "use strict";
    var unit_index, player_unit_health, build_area;
    /*
    var height = 584;
    var width = 1024;
    var bmd = game.add.bitmapData(width,height);       
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,height);    
    bmd.ctx.fillStyle = '#EACADD';        
    bmd.ctx.fill();
    */

   
    //create stats
    this.stat_manager = new Muryoma.StatManager(this, "stat_manager", {x: 264, y: 655}, {group: "hud", texture: "selection_frame"});
    build_area = new Muryoma.BuildArea(this, layer);      
     // show blueprints
    this.show_blueprints("hud", {x: 0, y: 655}, Muryoma.BlueprintMenuItem.prototype.constructor);    
};

Muryoma.ManageState.prototype.show_blueprints = function (group_name, position, menu_item_constructor) {    
    "use strict";    

    //console.log('---------------------');
    //console.log('group_name ', group_name);
    //console.log('this.groups ', this.groups);
    var bp_index, menu_items, bp_menu_item, bp_menu;
    
    bp_index = 0;
    menu_items = []; 

    bp_menu = new Muryoma.BlueprintMenu(this, group_name + "_menu", position, {group: "hud", menu_items: menu_items, texture: "selection_frame"});    
    
    var defX = position.x + 20;
    var defY = position.y + 20;

    for (var key in this.level_data.bp) {
        var item = this.level_data.bp[key]; 
        //console.log('item ', item);   
        bp_menu_item = new menu_item_constructor(this, key + "_menu_item", {x: defX + bp_index * 80, y: defY}, {group: "hud", text: key, texture: item.properties.texture, builder: item.properties.builder, needResource: item.properties.needResource});
        bp_index += 1;
        menu_items.push(bp_menu_item);
    }
    bp_menu.menu_items = menu_items;   

    game.world.bringToTop(this.groups.hud); 
};

Muryoma.ManageState.prototype.show_background = function() {
    
   var map;
   var data = '';  

    for (var y = 0; y < 50; y++){
        for (var x = 0; x < 50; x++){
            //data += this.game.rnd.between(0, 4).toString();
            //data += this.game.rnd.between(0, 6).toString();
            data += 0; //underdark
            if (x < 49){
                data += ',';
            }
        }
        if (y < 49){
            data += "\n";
        }
    }                  

    this.game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 32x32 is the tile size)        
    map = this.game.add.tilemap('dynamicMap', 32, 32);

    //  'tiles' = cache image key, 32x32 = tile size
    //map.addTilesetImage('ground_1x1', 'ground_1x1', 32, 32);
    //map.addTilesetImage('texture', 'texture', 32, 32);
    map.addTilesetImage('darkcave', 'darkcave', 32, 32);

    //  0 is important
    //layer = map.createLayer(0);  
    layer = map.createLayer(0, 1024, 655);  
    layer.resizeWorld();
};


Muryoma.ManageState.prototype.add_resources = function(){

    for (var key in this.level_data.resources) {
        var resource = this.level_data.resources[key];   
        var tempGroup = key;

        this.groups[tempGroup] = this.game.add.group();
        
        var i, x, y;
        for (i = resource.points - 1; i >= 0; i--) {            
            x = randStep(0, this.WORLD_WIDTH - 96, 32);    
            y = randStep(0, this.WORLD_HEIGHT - 192 , 32);   
            new Muryoma.Resource(this, key + "_" +i , {x: x, y: y}, {group: key, label: resource.label, texture: resource.texture});    
        }                      
    }  

    /* get random number at definite step, used for grid coordinates at step of 32px*/        
    function randStep(min, max, step) {
        return min + (step * Math.floor(Math.random()*(max-min)/step) );
    }

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
    //game.debug.cameraInfo(game.camera, 32, 32);    
};

Muryoma.ManageState.prototype.update = function(){        
    /* UI control */
    if (this.cursors.up.isDown){
        game.camera.y -= 32;
    } else if (this.cursors.down.isDown){
        game.camera.y += 32;
    }

    if (this.cursors.left.isDown){
        game.camera.x -= 32;
    } else if (this.cursors.right.isDown){
        game.camera.x += 32;
    }
};




