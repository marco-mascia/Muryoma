    /* House */

    /* ---------------------------------------------------------------------------------------- */
    MasterHouse = function(game){  


        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,64);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,64);
        bmd.ctx.fillStyle = '#BE6263';
        bmd.ctx.fill();                     
        
        //Phaser.Sprite.call(this, game, 0, 704, bmd);
        Phaser.Sprite.call(this, game, 0, 0, bmd);
        this.width = 64; 
        this.height = 64; 
        //this.alpha = 0.5;   
        this.inputEnabled = true;
        //this.input.enableDrag();
        this.input.useHandCursor = true;
        //this.input.enableSnap(32, 32, true, true); 
        //this.input.snapOnRelease = true;      
        this.originalPosition = this.position.clone();     
        //this.events.onDragStop.add(this.onDragStop, this);
        
        //requirements
        this.cost = 10;

        //labels
        var style = { font: "12px Arial", fill: "#ffffff" };  
        this.label = this.game.add.text(0, 0, "House", style);        
        this.addChild(this.label);        
        this.addChild(this.game.add.text(0, 24, "Cost: " + this.cost, style));
    }

    MasterHouse.prototype = Object.create(Phaser.Sprite.prototype);    
    MasterHouse.prototype.constructor = MasterHouse;
    MasterHouse.prototype.update = function(){};  

    MasterHouse.prototype.onDragStop = function(sprite, pointer) { 
        /*
        console.log('onDragStop');

        //collision variables                   
        var cResources = game.physics.arcade.collide(this, resources, this.collisionHandler);         
        var cMines = game.physics.arcade.collide(this, mines, this.collisionHandler);         
        var cBuildings = game.physics.arcade.collide(this, buildings, this.collisionHandler);       

        //cannot build over mining points, mines or other buildings
        if(!cResources && !cMines && !cBuildings && stones >= this.cost){            
            var newBuildingPosition = {x: sprite.world.x, y: sprite.world.y};        
            new House(building_index, game, newBuildingPosition, this.cost);
            stones -= this.cost;
        }

        sprite.x = this.originalPosition.x;
        sprite.y = this.originalPosition.y;   
        */      
    }

    MasterHouse.prototype.createBuilding = function(marker){               
        var newBuildingPosition = {x: marker.x, y: marker.y};     
        new House(building_index, game, newBuildingPosition, this.cost);
        stones -= this.cost;
    }

    /* ---------------------------------------------------------------------------------------- */