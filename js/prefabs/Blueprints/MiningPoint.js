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

var Muryoma = Muryoma || {};

Muryoma.MiningPoint = function (game_state, position, properties) {
    console.log('MiningPoint');
    "use strict";  

    var name = 'mining_point';        
    var height = 96;
    var width = 96;

     // create a new bitmap data object
    var bmd = game.add.bitmapData(96,96);

    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,96,96);
    bmd.ctx.fillStyle = '#42342F';
    bmd.ctx.fill();

    var props = {group: 'resources', width: width, height: height, texture: bmd};

    Muryoma.Prefab.call(this, game_state, name, position, props);    
    
    /*    
    var collide = game.physics.arcade.collide(this, game_state.groups.resources, this.collisionHandler, this.processHandler, this);
    while (collide){                     
        this.x = randStep(0, 704, 32);    
        this.y = randStep(0, 408, 32);   
        collide = game.physics.arcade.collide(this, game_state.groups.resources, this.collisionHandler, this.processHandler, this);
    } 
    */   

    // get random number at definite step, used for grid coordinates at step of 32px
    function randStep(min, max, step) {
        return min + (step * Math.floor(Math.random()*(max-min)/step) );
    }   
};

Muryoma.MiningPoint.prototype = Object.create(Muryoma.Prefab.prototype);
Muryoma.MiningPoint.prototype.constructor = Muryoma.MiningPoint;

/*
Muryoma.MiningPoint.prototype.update = function(){
    //prevent mining point overlap
    if (game.physics.arcade.collide(this, resources, this.collisionHandler, this.processHandler, this)){                     
        this.x = randStep(0, 704, 32);    
        this.y = randStep(0, 408, 32);   
    }        
};
*/

/*
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

    // get random number at definite step, used for grid coordinates at step of 32px
    function randStep(min, max, step) {
        return min + (step * Math.floor(Math.random()*(max-min)/step) );
    }   
*/
    /* ---------------------------------------------------------------------------------------- */
