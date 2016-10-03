    /* Mine */

    /* ---------------------------------------------------------------------------------------- */    
    Muryoma.Mine = function(game_state, name, position, properties, ore){        
        "use strict";             
        Muryoma.Building.call(this, game_state, name, position, properties); 

        this.WORK_PROVIDED = 3;
        this.generated_work = this.WORK_PROVIDED;
        this.workers = 0;  
        this.ore = ore;         
        game.time.events.loop(game_state.MEDIUM_TIME, this.updateBuilding, this);              
    };

    Muryoma.Mine.prototype = Object.create(Muryoma.Building.prototype);    
    Muryoma.Mine.prototype.constructor = Muryoma.Mine;

    Muryoma.Mine.prototype.update = function(){};
    Muryoma.Mine.prototype.updateBuilding = function(){
        if(this.generated_work > 0 && this.manager.unemployed > 0){
            this.manager.unemployed--;
            this.manager.workers++;
            this.workers++;
            this.label_units.setText("Miners: " + this.workers);              
            this.generated_work--;
        }   
        
        if(this.workers > 0 && this.ore > 0){
            this.manager.ore += this.workers;
        }else{            
            console.log("mine exausted");
        }       
    };  

    Muryoma.Mine.prototype.destroy = function(){
        //console.log('Mine destroy');
        //supplySpace -= this.SPACE_PROVIDED;
        //stones += this.cost/2;
        //Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    };   

    /* ---------------------------------------------------------------------------------------- */
