    /* Mine */

    /* ---------------------------------------------------------------------------------------- */
    MasterMine = function(game){                       
        

        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,64);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,64);
        bmd.ctx.fillStyle = '#0B486B';        
        bmd.ctx.fill();  

        Phaser.Sprite.call(this, game, 128, 0, bmd); 
        //Phaser.Sprite.call(this, game, 128, 704, bmd); 
        this.width = 64;
        this.height = 64;
        this.alpha = 0.5;                
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.useHandCursor = true;
        this.input.enableSnap(32, 32, true, true); 
        this.input.snapOnRelease = true;      
        this.originalPosition = this.position.clone();     
        //this.events.onDragStop.add(this.onDragStop, this);     
        //this.events.onDragStart.add(this.onDragStart, this); 

        //requirements
        this.cost = 10;
        this.workers = 3;

        //labels
        var style = { font: "12px Arial", fill: "#ffffff" };  
        this.label = this.game.add.text(0, 0, "Mine", style);
        this.addChild(this.label);           
        this.addChild(this.game.add.text(0, 24, "Cost: " + this.cost, style));
    };

    MasterMine.prototype = Object.create(Phaser.Sprite.prototype);    
    MasterMine.prototype.constructor = MasterMine;
    MasterMine.prototype.update = function(){};     

    MasterMine.prototype.onDragStart = function(sprite, pointer) {                    
        this.width = 96;
        this.height = 96;
    };

    MasterMine.prototype.onDragStop = function(sprite, pointer) {                            
        var newBuildingPosition = {x: sprite.x, y: sprite.y}; 

        var mp = game.physics.arcade.collide(this, resources, this.collisionWithMiningPointsHandler, this.processHandler);         
        var otherMines = game.physics.arcade.collide(this, mines, this.collisionWithMinesHandler);         
       
        //can build over mining points but not over other mines        
        if(mp && !otherMines && stones >= this.cost){
            var newBuildingPosition = {x: sprite.world.x, y: sprite.world.y};               
            new Mine(building_index, game, newBuildingPosition, this.cost, 100);  
            stones -= this.cost;
        }        
        sprite.x = this.originalPosition.x;
        sprite.y = this.originalPosition.y;   
        this.width = 64;
        this.height = 64;         
    };

    MasterMine.prototype.createBuilding = function(marker){               
        var newBuildingPosition = {x: marker.x, y: marker.y};     
        new Mine(building_index, game, newBuildingPosition, this.cost, 100);         
    }

    MasterMine.prototype.collisionWithMiningPointsHandler = function(sprite1, sprite2){     
    }

    MasterMine.prototype.processHandler = function(sprite1, sprite2){   
        if(sprite1.world.x == sprite2.position.x && sprite1.world.y == sprite2.position.y){
            return true;            
        }
        return false                
    }

    MasterMine.prototype.collisionWithMinesHandler = function(sprite1, sprite2){       
        if(JSON.stringify(sprite1.position) === JSON.stringify(sprite2.position)){ 
            return true;            
        }
        return false;
    }

    /* ---------------------------------------------------------------------------------------- */
