
Tcha.App = new new Class({
	initialize: function(options){
	},
	
	start: function() {
		this.grid = new Tcha.Grid($('gameCanvas'));
		// this.player = new Tcha.Player(this.grid);
		
		
		console.warn('TODO Il faut implementer la classe mere Tuile pour PLAYER, Mud, Wall, FLOOR, etc...');
		this.grid.loadLvL('[["Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Player","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Mud","Wall"],["Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall","Wall"]]');
	
	}

	
})();