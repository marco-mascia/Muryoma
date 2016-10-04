    /* House */

    /*
    House{
        building:
            rock: 2
            work: 2 
        generate
            rest: 5
            peasant: 1
    }
    */

    /* ---------------------------------------------------------------------------------------- */
    
    House = function(index, game, position, cost){        

        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,64);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,64);
        bmd.ctx.fillStyle = '#BE6263';
        bmd.ctx.fill();       

        Phaser.Sprite.call(this, game, position.x, position.y, bmd);
        this.width = 64; 
        this.height = 64;                 
        this.health = 10;                
        this.alive = true;                 
        this.speed = 0;    
        this.SPACE_PROVIDED = 3;
        this.space = this.SPACE_PROVIDED;
        this.inhabitants = 0; 
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(32, 32, false, true);
        this.cost = cost;           
        
        buildings.add(this);
        this.body.collideWorldBounds = true; 
        building_index++;                     
        game.time.events.loop(MEDIUM_TIME, this.updateBuilding, this);     

        var style = { font: "10px Arial", fill: "#FFF" };  
        this.label = this.game.add.text(0, 0, "House", style);
        this.addChild(this.label);
        this.label_inhabitants = this.game.add.text(0, 10, "Inhabitants: " + this.inhabitants, style);
        this.addChild(this.label_inhabitants);  
            
    }

    House.prototype = Object.create(Phaser.Sprite.prototype);    
    House.prototype.constructor = House;
    House.prototype.update = function(){};
    House.prototype.updateBuilding = function(){
        //console.log('updateHouse');        
        if(this.space > 0){            
            if(population<=supplySpace){
                //create people
                unemployed++;            
            }
            this.space--;
            this.inhabitants++; 
            supplySpace++;
            this.label_inhabitants.setText("Inhabitants: " + this.inhabitants);  
        } 
    }     
    House.prototype.destroy = function(){
        //console.log('house destroy');
        supplySpace -= this.SPACE_PROVIDED;
        stones += this.cost/2;
        Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    }

    House.prototype.test = function(){
        console.log('house test');
    }
    

    /* ---------------------------------------------------------------------------------------- */
