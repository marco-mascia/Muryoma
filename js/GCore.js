
    /*

    Threat: random (grows as population grows)

    Population:
    Food:
    Rocks:
    Housing:

    1. assign peasant to:
        - build    (build structure)
        - work     (generate resources)
        - barracks (turn to soldier)
        
    Peasant{
        consume
            food: 1,
            rest: 1     
        generate 
            work: 1
    }

    Soldier{
        consume
            food: 1,
            rest: 1     
        generate
            fight: 1
    }

    House{
        building:
            rock: 2
            work: 2
        generate
            rest: 5
            peasant: 1
    }

    Barracks{
        building:
            rock: 3
            work: 3
        consume:
            work: 2
            peasant: 1
        generate:
            soldier: 1
    }

    Field{
        building:
            work: 2
        consume
            work: 2
        generate
            food: 3
    }

    Mine{
        consume
            work: 2
        generate
            rock: 1
    }


    cool underdark colors: 
    #b6ef13
    #d7d4d0;
    #787978;
    #9a7b6e;
    #2b3037;

    .Notes
    for fog of war look for "mask" example under sprites


    */
    var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'Muryoma', { preload: preload, create: create, update: update, render: render });

    var SHORT_TIME = 3000;
    var MEDIUM_TIME = SHORT_TIME * 2;
    var LONG_TIME = MEDIUM_TIME * 2;

    /* colors */
    var DANGER_COLOR = "#cc0000";
    var NORMAL_COLOR = "#FFF";

    var WORLD_HEIGHT = 1600;
    var WORLD_WIDTH = 1600;
    var NR_MINING_POINTS = 5;

    var map;    
    var layer;        
    var showDebug = false;   
    var resources;  
  
    var stones = 30;
    var foodProdRate = 0;
    var foodBalance = '';
    var buildings; 
    var mines;

    var building_index = 0;

    /* styles */
    var style = { font: "18px Arial", fill: NORMAL_COLOR, align: "left"};
    var styleSmall = { font: "14px Arial", fill: NORMAL_COLOR, align: "left"};
    var dangerStyle = { font: "18px Arial", fill: DANGER_COLOR, align: "left" };
    
    /* work */
    var population = 0; //total population
    var supplySpace = 0; //space needed for the population
    var unemployed = 0;
    var peasants = 0;
    var miners = 0;
    var soldiers = 0;

    /* interface */
    var menu;
    var menuBg;
    var labelsGroup;
    var food_label, population_label, peasants_label, miners_label, supply_space_label;

    var bld_house, bld_field;
    var selected_building = ""; 
    var build_bounds;
    var cursors;
    var marker;
    var markerGroup;
    var currentBuilding = null;


    function preload(){                     
        //buildings
        game.load.image('house', 'assets/sprites/hut.gif'); 
        game.load.image('field', 'assets/sprites/field.png'); 
    
        //map tiles
        game.load.image('ground_1x1', 'assets/tiles/ground_1x1.png');        
        game.load.spritesheet('walls_1x2', 'assets/tiles/walls_1x2.png', 32, 64);               
    }    
    
    function create(){        
        // Resize our game world to be a WORLD_HEIGHT, WORLD_WIDTH square
        game.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

        game.input.mouse.capture = true;

        /* set stage */    
        game.stage.backgroundColor = '#787978';
        var data = '';        
        for (var y = 0; y < 50; y++){
            for (var x = 0; x < 50; x++){
                data += game.rnd.between(0, 4).toString();
                if (x < 49){
                    data += ',';
                }
            }
            if (y < 49){
                data += "\n";
            }
        } 
             

        game.cache.addTilemap('dynamicMap', null, data, Phaser.Tilemap.CSV);

        //  Create our map (the 32x32 is the tile size)        
        map = game.add.tilemap('dynamicMap', 32, 32);

        //  'tiles' = cache image key, 32x32 = tile size
        map.addTilesetImage('ground_1x1', 'ground_1x1', 32, 32);

        //  0 is important
        layer = map.createLayer(0);    

        /* Mining points */
        resources = game.add.physicsGroup(Phaser.Physics.ARCADE);
        var i, x, y;
        for(i = 0; i < NR_MINING_POINTS; i++) {            
            x = randStep(0, WORLD_WIDTH - 96, 32);    
            y = randStep(0, WORLD_HEIGHT - 192 , 32);   
            resources.add(new MiningPoint(i, game, x, y));                   
        }  
        resources.setAll('body.collideWorldBounds', true);  
        resources.setAll('body.immovable', true);

        /* get random number at definite step, used for grid coordinates at step of 32px*/        
        function randStep(min, max, step) {
            return min + (step * Math.floor(Math.random()*(max-min)/step) );
        }

        /* buildings */
        buildings = game.add.physicsGroup(Phaser.Physics.ARCADE);
        mines = game.add.physicsGroup(Phaser.Physics.ARCADE);       

        population_label = game.add.text(5, 0, "Population: " + population, style);        
        peasants_label = game.add.text(5, 20, "Peasants: " + peasants, style);
        miners_label = game.add.text(5, 40, "Miners: " + miners, style);
        supply_space_label = game.add.text(5, 60, "Shelter: " + supplySpace, style);
        food_label = game.add.text(5, 80, "Food: " + foodBalance, style);
        stones_label = game.add.text(5, 100, "Stones: " + stones, style);

        
        /* UI */ 
        /* create menu group */
        /*
        menu = game.add.physicsGroup(Phaser.Physics.ARCADE);
        menu.fixedToCamera = true;

        // create a new bitmap data object
        var bgMenu = game.add.bitmapData(1024,64);
        // draw to the canvas context like normal
        bgMenu.ctx.beginPath();
        bgMenu.ctx.rect(0,0,1024,64);    
        bgMenu.ctx.fillStyle = '#cccccc;';        
        bgMenu.ctx.fill();      
        menu.add(game.add.sprite(0, 704, bgMenu));
        */

        labelsGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        labelsGroup.fixedToCamera = true;
        labelsGroup.add(population_label);
        labelsGroup.add(food_label);
        labelsGroup.add(stones_label);
        labelsGroup.add(peasants_label);
        labelsGroup.add(miners_label);
        labelsGroup.add(supply_space_label);        

        /* construction bounds */
        build_bounds = new Phaser.Rectangle(0, 0, 800, 530);          
        var graphics = game.add.graphics(build_bounds.x, build_bounds.y);
        //graphics.beginFill(0x000077); //debug
        graphics.drawRect(0, 0, build_bounds.width, build_bounds.height);

        cursors = game.input.keyboard.createCursorKeys();
        //centering camera 
        game.camera.x = game.width/2; 
        game.camera.y = game.height/2; 

        /* timer */
        //  Create our Timer
        timer = game.time.create(false);
        //  Set a TimerEvent to occur after 2 seconds
        timer.loop(MEDIUM_TIME, updateEconomy, this);
        //  Start the timer running - this is important!
        //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();
        

        //menu.addAt(new MasterDelete(game), 0);     
        /*
        menu.add(new MasterHouse(game)); 
        menu.add(new MasterField(game));
        menu.add(new MasterMine(game)); 
        menu.add(new MasterDelete(game));    
        */

        //test menu
        
        //game.input.addMoveCallback(updateMarker, this);
        //test build area
        createMenu();         
        createBuildArea();
        markerGroup = game.add.physicsGroup(Phaser.Physics.ARCADE);
        marker = new Marker(game)
        markerGroup.add(marker);         
    }       

    function updateEconomy(){
        console.log('updateEconomy');        
        population = miners + peasants + unemployed;
        foodBalance = foodProdRate - population;         
        food_label.setText("Food " + foodBalance);       
    }    

    function update(){          
        population_label.setText("Population: " + population);              
        stones_label.setText("Stones: " + stones);
        peasants_label.setText("Peasants: " + peasants);
        miners_label.setText("Miners: " + miners);   
        supply_space_label.setText("Shelter: " + supplySpace); 

        //menu.update();   
        //menu.getChildAt(4).update(); //delete event update.

        resources.update();  

        /* UI control */
        if (cursors.up.isDown){
            game.camera.y -= 32;
        } else if (cursors.down.isDown){
            game.camera.y += 32;
        };

        if (cursors.left.isDown){
            game.camera.x -= 32;
        } else if (cursors.right.isDown){
            game.camera.x += 32;
        };

        /* UI control by mouse */
        //can't stop movement 
        /*
        if (this.game.input.activePointer.isDown) { 
            if (this.game.origDragPoint) {      
            // move the camera by the amount the mouse has moved since last update      
            this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;     
            this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y; 
            }   // set new drag origin to current position  
            this.game.origDragPoint = this.game.input.activePointer.position.clone();
        }else{
            this.game.origDragPoint = null;
        }
        */  
        //updateMarker(); 

    } 

	function render(){
        //game.debug.cameraInfo(game.camera, 32, 32);        
        /*
        if (showDebug){                        
            walls.forEach(debug, this);        
        } 
        */       
    }

    function debug(item){
        game.debug.bodyInfo(item, 32, 32);
        game.debug.body(item); 
    }

    function createBuildArea(){
        var bArea = game.add.group(); 
        var bmd = game.add.bitmapData(1024,704);        
        bmd.ctx.beginPath();
        bmd.ctx.rect(0,0,1024,704); 
        var sprite = bArea.create(0, 64, bmd);
        bArea.fixedToCamera = true;
        sprite.inputEnabled = true;
        sprite.input.enableSnap(32, 32, false, true);
        bArea.onChildInputDown.add(buildAreaClick, this);     
    }

    function buildAreaClick(){
        //console.log('buildAreaClick');       
        if(currentBuilding){                                    
            currentBuilding.createBuilding.call(this, marker);
        }
    }

    function createMenu(){
        var menu = game.add.group();
        var menuBackground = game.make.graphics();
        menuBackground.beginFill(0x000000, 1);
        menuBackground.drawRect(0, 0, 1024, 64);
        menuBackground.endFill();
        menu.add(menuBackground);

        var mHouse = new MasterHouse(game);        
        menu.add(mHouse);

        var mField = new MasterField(game);        
        menu.add(mField);

        var mMine = new MasterMine(game);        
        menu.add(mMine);

        menu.fixedToCamera = true;

        // Building marker
        //marker = game.add.graphics();
        menu.onChildInputDown.add(pickElement, this);
    }

    function pickElement(sprite, pointer) {
        console.log("pickElement");        
        currentBuilding = sprite;
      
        //marker.lineStyle(2, 0x000000, 1);
        //marker.drawRect(0, 0, currentBuilding.height, currentBuilding.width);     
    }

    function updateMarker(){        
        marker.x = layer.getTileX(game.input.activePointer.worldX) * 32;
        marker.y = layer.getTileY(game.input.activePointer.worldY) * 32;     
    }