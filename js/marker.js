    /* Marker */
    /* ---------------------------------------------------------------------------------------- */
    
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
        //this.input.enableDrag();
        //this.input.enableSnap(32, 32, false, true);
        //this.body.collideWorldBounds = true;             
    }

    Marker.prototype = Object.create(Phaser.Sprite.prototype);    
    Marker.prototype.constructor = Marker;
    Marker.prototype.update = function(){
        this.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        this.y = layer.getTileY(game.input.activePointer.worldY) * 32;  
        game.physics.arcade.collide(this, menu, this.colllisionHandler, this.processHandler);         
    };    
    

    /* ---------------------------------------------------------------------------------------- */

    /*
    Marker = function(game){                
        Phaser.Graphics.call(this, game, 200, 200);
        this.beginFill(0xFFFFFF, 1);
        this.drawRect(0, 0, 64, 64);
        this.endFill();                
        this.inputEnabled = true;
        this.alive = true;
        this.alpha = 0.5;                     
    }

    Marker.prototype = Object.create(Phaser.Graphics.prototype);    
    Marker.prototype.constructor = Marker;
    Marker.prototype.update = function(){
        //this.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        //this.y = layer.getTileY(game.input.activePointer.worldY) * 32;  
    };   
    */