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
    this.manager = game_state.stat_manager;      
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
   
   var result = false;

   //check for required raw resources and construction cost.
   if(cbp.needResource){ 
        var result = [];
        for (var key in cbp.needResource){            
            result.push(this.getResource(key, cbp.needResource[key], marker));          
        }
        /*
        var type = cbp.needResource.type;
        game.physics.arcade.enable([marker, this.game_state.groups[type]]);
        //check if sprites are overlying (same position)
        var cBuildings = game.physics.arcade.collide(marker, this.game_state.groups[type], this.collisionWithMiningPointsHandler, this.processHandler);        
        result = cBuildings;
        */
    }
    console.log('result ', result);

    var res = result.reduce(function(previousValue, currentValue, currentIndex, array) {
        if(!currentValue){
            return currentValue
        };         
    });

    console.log('res ', res);


    return result; 
};


Muryoma.BuildArea.prototype.getResource = function(type, quantity, marker) {             
      //console.log('manager ', this.manager);
      
      var resArray =[];
      switch (type) {
          case 'raw':
            //console.log('Raw materials needed');    
            game.physics.arcade.enable([marker, this.game_state.groups[quantity]]);
            //check if sprites are overlying (same position)
            var cBuildings = game.physics.arcade.collide(marker, this.game_state.groups[quantity], this.collisionWithMiningPointsHandler, this.processHandler);                    
            return cBuildings;  
          break;

          default:           
            if(this.manager[type] > quantity){                
                return true;
            }
            return false;            
          break;
        }

      /*
      var rss = {
        'gold': function() {
          resource = 'Gold is needed';          
          console.log('quantity ', quantity);
          console.log('this.manager ', this.manager);
          console.log('this.manager[type] ', this.manager[type]);
          console.log('this.manager.type ', this.manager.type);
          
          if(manager.type > quantity){
            console.log('aye, ders enof');
          }

        },
        'ore': function() {
          resource = 'Ore is needed';
        },
        'raw': function() {
          resource = 'Raw material is needed';
        }        
      };
        
      // invoke it
      rss[type]();     
      */
      return result;
    }

Muryoma.BuildArea.prototype.processHandler = function(sprite1, sprite2){
    if(sprite1.world.x == sprite2.position.x && sprite1.world.y == sprite2.position.y){        
        return true;            
    }
    return false;              
};

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
    //console.log('checkResources ', checkResources);

    if(cbp && !cBuildings && checkResources){
        var x = layer.getTileX(game.input.activePointer.worldX) * 32;
        var y = layer.getTileY(game.input.activePointer.worldY) * 32; 

        //console.log('cpb ', cpb)
        var properties = {group:'buildings', texture: cbp.texture};   

        //console.log('BuildArea -> properties ', properties);         
        new this.game_state.buildings_classes[cbp.builder](this.game_state, cbp.key, {x:x, y:y}, properties);     
    }   
    
};





