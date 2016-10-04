    /* Field */

    /*
    Field{
        building:
            work: 2
        consume
            work: 2
        generate
            food: 3
    }
    */

    /* ---------------------------------------------------------------------------------------- */
    Field = function(index, game, position, cost){  

        // create a new bitmap data object
        var bmd = game.add.bitmapData(64,96);

        // draw to the canvas context like normal
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,64,96);
        bmd.ctx.fillStyle = '#3B8686';
        bmd.ctx.fill();                                
             
        Phaser.Sprite.call(this, game, position.x, position.y, bmd);          
        this.health = 10;                
        this.alive = true;                 
        this.speed = 0;
        this.WORK_PROVIDED = 3;
        this.generated_work = this.WORK_PROVIDED;
        this.workers = 0;
        this.inputEnabled = true;
        this.input.enableDrag();
        this.input.enableSnap(32, 32, false, true); 
        this.cost = cost;           

        buildings.add(this);
        this.body.collideWorldBounds = true; 
        building_index++;        
        game.time.events.loop(MEDIUM_TIME, this.updateBuilding, this);
        
        var style = { font: "10px Arial", fill: "#ffffff" };  
        this.label = this.game.add.text(0, 0, "Field", style);
        this.addChild(this.label); 
        this.label_workers = this.game.add.text(0, 10, "Peasants: " + this.workers, style);
        this.addChild(this.label_workers);        
    }

    Field.prototype = Object.create(Phaser.Sprite.prototype);    
    Field.prototype.constructor = Field;
    Field.prototype.update = function(){};
    Field.prototype.updateBuilding = function(){
        //console.log('updateField');        
        if(this.generated_work > 0 && unemployed > 0){
            unemployed--;
            peasants++;
            this.workers++;
            this.label_workers.setText("Peasants: " + this.workers);  
            this.generated_work--;
            //foodProdRate++;
            foodProdRate +=2; 

        }       
        /*
        console.log('----------------------------')
        console.log('food generated ', this.workers);
        console.log('total food: ', food);
        */

    }; 

    Field.prototype.destroy = function(){
        //console.log('field destroy');        
        stones += this.cost/2;
        unemployed += this.WORK_PROVIDED;
        peasants -= this.WORK_PROVIDED;  
        foodProdRate -= this.WORK_PROVIDED*2;
        Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    }  

    /* ---------------------------------------------------------------------------------------- */