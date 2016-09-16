    /* Mine */

    /*
    Mine{
        consume
            work: 2
        generate
            rock: 1
    }
    */

    /* ---------------------------------------------------------------------------------------- */
    Mine = function(index, game, position, cost, ore){

        // create a new bitmap data object
        var bmd = game.add.bitmapData(96,96);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,96,96);
        bmd.ctx.fillStyle = '#0B486B';
        bmd.ctx.fill();
        
        Phaser.Sprite.call(this, game, position.x, position.y, bmd);               
        this.width = 96; 
        this.height = 96;                 
        this.health = 10;                
        this.alive = true;                 
        this.speed = 0;             
        this.ore = ore;   
        this.generated_stones = 3;
        this.generated_work = 3; 
        this.workers = 0;             
        this.inputEnabled = true;
        this.cost = cost;

        //this.input.enableDrag();
        this.input.enableSnap(32, 32, false, true);                 
        mines.add(this);
        this.body.collideWorldBounds = true; 
        building_index++;                     
        game.time.events.loop(MEDIUM_TIME, this.updateBuilding, this);  
        
        var style = { font: "10px Arial", fill: "#ffffff" };  
        this.label = this.game.add.text(0, 0, "Mine", style);
        this.addChild(this.label);
        this.label_workers = this.game.add.text(0, 10, "Miners: " + this.workers , style);
        this.addChild(this.label_workers);       
    }

    Mine.prototype = Object.create(Phaser.Sprite.prototype);    
    Mine.prototype.constructor = Mine;
    Mine.prototype.update = function(){};
    Mine.prototype.updateBuilding = function(){
        console.log('updateMine');          
        if(this.generated_work > 0 && unemployed > 0){
            unemployed--;
            miners++;
            this.workers++;
            this.label_workers.setText("Miners: " + this.workers);  
            this.generated_work--;            
        }
        if(miners > 0 && this.ore > 0){
            stones += this.workers;
        }else{            
            console.log("mine exausted");
        }       
    }    

    Mine.prototype.destroy = function(){
        console.log('mine destroy');
        stones += this.cost/2;
        Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    }
    /* ---------------------------------------------------------------------------------------- */
