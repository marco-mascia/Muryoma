    /* House */

    /* ---------------------------------------------------------------------------------------- */
    MasterDelete = function(game){  


        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,64);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,64);
        bmd.ctx.fillStyle = '#FF0000';
        bmd.ctx.fill();                     
        
        Phaser.Sprite.call(this, game, 960, 704, bmd);
        this.width = 64; 
        this.height = 64; 
        this.alpha = 0.5;   
        this.inputEnabled = true;                            
        
        var style = { font: "14px Arial", fill: "#ffffff" };  
        this.label = this.game.add.text(0, 0, "Delete", style);
        this.addChild(this.label);        
    }

    MasterDelete.prototype = Object.create(Phaser.Sprite.prototype);    
    MasterDelete.prototype.constructor = MasterDelete;
    MasterDelete.prototype.update = function(){
        var mp = game.physics.arcade.collide(this, buildings, this.collisionHandler, this.processHandler);         
    };   

    MasterDelete.prototype.collisionHandler = function(sprite1, sprite2){
        console.log('delete collision!');
        sprite2.destroy();
    };

    /* ---------------------------------------------------------------------------------------- */