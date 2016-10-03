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
    Muryoma.Field = function(game_state, name, position, properties){        
        "use strict";             
        Muryoma.Building.call(this, game_state, name, position, properties); 

        this.WORK_PROVIDED = 3;
        this.generated_work = this.WORK_PROVIDED;
        this.workers = 0;        
        game.time.events.loop(game_state.MEDIUM_TIME, this.updateBuilding, this);              
    };

    Muryoma.Field.prototype = Object.create(Muryoma.Building.prototype);    
    Muryoma.Field.prototype.constructor = Muryoma.Field;

    Muryoma.Field.prototype.update = function(){};
    Muryoma.Field.prototype.updateBuilding = function(){
        if(this.generated_work > 0 && this.manager.unemployed > 0){
            this.manager.unemployed--;
            this.manager.workers++;
            this.workers++;
            this.label_units.setText("Peasants: " + this.workers);  
            this.generated_work--;            
            this.manager.foodProdRate +=2; 
        }       
    };  

    Muryoma.Field.prototype.destroy = function(){
        //console.log('Field destroy');
        //supplySpace -= this.SPACE_PROVIDED;
        //stones += this.cost/2;
        //Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    };   

    /* ---------------------------------------------------------------------------------------- */
