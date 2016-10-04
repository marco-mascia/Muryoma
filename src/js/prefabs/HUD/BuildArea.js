var Muryoma = Muryoma || {};

Muryoma.BuildArea = function (game_state, layer) {
    "use strict";

    var name = 'build_area';    
    var position = {x: 0, y: 0};
    var height = 584;
    var width = 1024;

    // create a new bitmap data object
    var bmd = game.add.bitmapData(width,height);   
    
    this.marker = new Muryoma.Marker(game_state, layer);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,height);
    //debug
    //bmd.ctx.fillStyle = '#0B486B';        
    //bmd.ctx.fill();

    var properties = {group: 'hud', width: width, height: height, texture: bmd};

    Muryoma.Prefab.call(this, game_state, name, position, properties);    

    this.inputEnabled = true;
    this.input.enableSnap(32, 32, false, true);
    this.events.onInputOver.add(this.inputOver, this);
    this.events.onInputOut.add(this.inputOut, this);
    this.events.onInputDown.add(this.onInputDown, this); 
    this.fixedToCamera = true;  
};

Muryoma.BuildArea.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.BuildArea.prototype.constructor = Muryoma.BuildArea;

Muryoma.BuildArea.prototype.restore_tint = function () {
    "use strict";
    this.tint = 0xFFFFFF;
};

Muryoma.BuildArea.prototype.inputOver = function() {
    "use strict";
    /*
    console.log('BuildArea inputOver');    
    console.log('this.marker ', this.marker);
    console.log('hud group ', this.game_state.groups.hud.children);
    */
    this.marker.visible = true;      
};

Muryoma.BuildArea.prototype.inputOut = function() {
    "use strict";
    console.log('BuildArea inputOut');    
    this.marker.visible = false;  
};

Muryoma.BuildArea.prototype.checkResources = function(cbp, marker) {
   if(cbp.needResource){        
        var type = cbp.needResource.type;
        game.physics.arcade.enable([marker, this.game_state.groups[type]]);                 
        var cBuildings = game.physics.arcade.collide(marker, this.game_state.groups[type], function(sprite1, sprite2){ 
            return true;
        }); 
        return cBuildings;
    };
    return true; 
}

Muryoma.BuildArea.prototype.onInputDown = function() {
    "use strict";    
    var childArray = this.game_state.groups.hud.children;    
    var hud_menu = childArray.filter(function(a){ return a.name == 'hud_menu'; })[0];        
    var marker = childArray.filter(function(a){ return a.name == 'marker'; })[0];

    game.physics.arcade.enable([marker, this.game_state.groups.buildings]);    
    var cBuildings = game.physics.arcade.collide(marker, this.game_state.groups.buildings, function(sprite1, sprite2){                      
       return true;
    });  

    var cbp = hud_menu.current_blueprint;
    var checkResources = this.checkResources(cbp, marker);
    console.log('checkResources ', checkResources);

    if(cbp && !cBuildings && checkResources){
        var x = layer.getTileX(game.input.activePointer.worldX) * 32;
        var y = layer.getTileY(game.input.activePointer.worldY) * 32; 

        //console.log('cpb ', cpb)
        var properties = {group:'buildings', texture: cbp.texture};   

        //console.log('BuildArea -> properties ', properties);         
        new this.game_state.buildings_classes[cbp.builder](this.game_state, cbp.key, {x:x, y:y}, properties);     
    }   
    
};





