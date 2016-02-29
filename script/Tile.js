Tcha.Tile = new Class({
	
	Implements: [Options],
	
	options : {
		lon : 20,
		lar: 30,
		isDev: true,
		color: '#012345'
	},
	
	code: '',
	
	initialize: function(cell, options){
		this.setOptions(options);
		this.cell = cell;
		this.cell.state = this.code;
		this.display();
	},
	
	display: function(){
		// default display ?
		var color = this.getSemiRandomColor(this.options.color);
		//console.log('bli', this.cell.element, this.cell);
		this.cell.element.setStyle('background-color', 'rgb(' + color[0] + ', ' + color[1] + ', ' + color[2] + ')');
	},
	
	getSemiRandomColor: function(hex) {
		
		var color = new Color(hex);
		// var myMix = color.mix([Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)]);
		var i = 255 - Math.floor(Math.random()*25);
		var myMix = color.mix([i, i, i]);
		
		return myMix;	
	}, 
	
	destroy : function() {
		// ?
		// this.removeEvents();
	}
	
});

Tcha.Player = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#000000'

	},
	
	code: 'Player',
	
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});

Tcha.Floor = new Class({
	
	Extends: Tcha.Tile,
	
	options : {
		color : '#FFFFFF'
	},
	
	code: 'Floor',
		
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});

Tcha.Mud = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#0000FF'
	},
	
	code: 'Mud',
		
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});

Tcha.Rock = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#00FFFF'
	},
	
	code: 'Rock',	
	
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});

Tcha.Gem = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#00FF00'
	},
	
	code: 'Gem',
		
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});

Tcha.Door = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#FFFF00'
	},
	
	code: 'Door',
		
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
});

Tcha.Wall = new Class({
	
	Extends: Tcha.Tile,
	
	options : {

		color : '#FF0000'
	},
	
	code: 'Wall',
		
	initialize: function(cell, options){
		this.parent(cell);
		
	},
	
	// default display ?
	// display: function(){
	// }
	
});