    /* MiningPoint */

    /*
    MiningPoint{
        consume
            work: 2
        generate
            rock: 1
    }
    */

    /* ---------------------------------------------------------------------------------------- */
    MiningPoint = function(index, game, x, y){

         // create a new bitmap data object
        var bmd = game.add.bitmapData(96,96);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,96,96);
        bmd.ctx.fillStyle = '#42342F';
        bmd.ctx.fill();

        Phaser.Sprite.call(this, game, x, y, bmd);                   
        this.width = 96; 
        this.height = 96;

        this.ore = (Math.floor(Math.random() * 6) + 1)*100;

        var style = {font: "10px Arial", fill: "#ffffff" };          
        this.label = this.game.add.text(0, 0, "Raw ore: " + this.ore, style);
        this.addChild(this.label);
    }

    MiningPoint.prototype = Object.create(Phaser.Sprite.prototype);    
    MiningPoint.prototype.constructor = MiningPoint;
    MiningPoint.prototype.update = function(){
        //prevent mining point overlap
        if (game.physics.arcade.collide(this, resources, this.collisionHandler, this.processHandler, this)){                     
            this.x = randStep(0, 704, 32);    
            this.y = randStep(0, 408, 32);   
        }        
    };
    MiningPoint.prototype.updateBuilding = function(){
        console.log('updateMiningPoint');                    
    } 

    /* get random number at definite step, used for grid coordinates at step of 32px*/        
    function randStep(min, max, step) {
        return min + (step * Math.floor(Math.random()*(max-min)/step) );
    }   

    /* ---------------------------------------------------------------------------------------- */
