alert('Main');
var Muryoma = Muryoma || {};
var game = new Phaser.Game(1024, 768, Phaser.CANVAS);
game.state.add("BootState", new Muryoma.BootState());
game.state.add("LoadingState", new Muryoma.LoadingState());
game.state.add("ManageState", new Muryoma.ManageState());
game.state.start("BootState", true, false, "assets/levels/manage.json", "ManageState");