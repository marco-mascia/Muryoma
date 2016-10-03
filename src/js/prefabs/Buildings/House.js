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
    Muryoma.House = function(game_state, name, position, properties){        
        "use strict";       
        /*
        console.log('Muryoma.House -> name ', name);
        console.log('Muryoma.House -> position ', position);
        console.log('Muryoma.House -> properties ', properties);
        */
        Muryoma.Building.call(this, game_state, name, position, properties); 
        this.SPACE_PROVIDED = 3;
        this.space = this.SPACE_PROVIDED;
        this.inhabitants = 0;          
        
        game.time.events.loop(game_state.MEDIUM_TIME, this.updateBuilding, this);                           
            
    };

    Muryoma.House.prototype = Object.create(Muryoma.Building.prototype);    
    Muryoma.House.prototype.constructor = Muryoma.House;

    Muryoma.House.prototype.update = function(){};
    Muryoma.House.prototype.updateBuilding = function(){
        //console.log('updateHouse');        
        if(this.space > 0){            
            if(this.manager.population<=this.manager.supplySpace){
                //create people
                this.manager.unemployed++;            
            }
            this.space--;
            this.inhabitants++; 
            this.manager.supplySpace++;
            this.label_units.setText("Inhabitants: " + this.inhabitants);  
        } 
    };    
    Muryoma.House.prototype.destroy = function(){
        //console.log('house destroy');
        supplySpace -= this.SPACE_PROVIDED;
        stones += this.cost/2;
        Phaser.Sprite.prototype.destroy.call(this /*, args...*/);
    };   

    /* ---------------------------------------------------------------------------------------- */
