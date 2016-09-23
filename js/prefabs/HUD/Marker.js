    /* Marker */
    /* ---------------------------------------------------------------------------------------- */
    

    var Muryoma = Muryoma || {};

    Muryoma.Marker = function (game_state, layer) {
        "use strict";

        var name = 'marker';    
        var position = {x: 0, y: 0};
        var height = 64;
        var width = 64;
        
        // create a new bitmap data object
        var bmd = game.add.bitmapData(width,height);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,width,height);
        //debug
        //bmd.ctx.fillStyle = '#EACADD';      
        //bmd.ctx.fill();

        var properties = {group: 'hud', width: width, height: height, texture: bmd};

        Muryoma.Prefab.call(this, game_state, name, position, properties);    
        //this.width = 64; 
        //this.height = 64;                 
        this.inputEnabled = true; 
        this.input.boundsRect = layer;
        this.input.enableSnap(32, 32, true, true);
        this.enableBody = true;      
        game.physics.arcade.enable(this);
    };

    Muryoma.Marker.prototype = Object.create(Muryoma.Prefab.prototype);
    Muryoma.Marker.prototype.constructor = Muryoma.Marker;
    Muryoma.Marker.prototype.update = function(){   
        var cResources = game.physics.arcade.collide(this, 'hud', this.collisionHandler);         

        this.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        this.y = layer.getTileY(game.input.activePointer.worldY) * 32; 
        //game.physics.arcade.collide(this, menu, this.colllisionHandler, this.processHandler);
    };


    Muryoma.Marker.prototype.collisionHandler = function(sprite1, sprite2){         
        console.log('collision ', sprite1)
    }

    Muryoma.Marker.prototype.setDimensions = function(blueprint){  
        //console.log('setDimensions ', height + " " + width + " " + texture);          
        this.texture = blueprint.texture;
        this.alpha = 0.5;
    }
    /*
    Marker = function(game){        

        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,64);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,64);
        bmd.ctx.fillStyle = '#652951';
        bmd.ctx.fill();       

        Phaser.Sprite.call(this, game, 200, 200, bmd);

        this.width = 64; 
        this.height = 64;                 
        this.inputEnabled = true;
        this.alive = true; 
                   
    }

    Marker.prototype = Object.create(Phaser.Sprite.prototype);    
    Marker.prototype.constructor = Marker;
    Marker.prototype.update = function(){
        this.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        this.y = layer.getTileY(game.input.activePointer.worldY) * 32;  
        game.physics.arcade.collide(this, menu, this.colllisionHandler, this.processHandler);         
    }; 
    */   
    

    /* ---------------------------------------------------------------------------------------- */
