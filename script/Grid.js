Tcha.Grid = new Class({

	Implements: [Options],
	
	options : {
		lon : 20,
		lar: 30,
		isDev: true
	},
	
	initialize: function(parent, options) {

		this.setOptions(options);
		this.parent = parent;
		
		console.log(':D Grid');
		
		this.container = new Element('div#grid');
		
		this.grid = [];
		for(var lon = 0; lon < this.options.lon; lon++) {
			this.grid[lon] = [];
			for(var lar = 0; lar < this.options.lar; lar++) {
				this.grid[lon][lar] = new Tcha.Grid.Cell(this.container, {lon: lon, lar: lar});
				if(this.options.isDev)
					this.grid[lon][lar].element.set('text', (lon+1) + ' - ' + (lar+1));
			}
		}
		
		this.parent.adopt(this.container);
	},
	
	getCell: function(lon, lar) {
		return this.grid[lon][lar];
	},
	
	loadLvL: function(jsondata){
		var data = JSON.decode(jsondata);
		
		for(var lon = 0; lon < this.options.lon; lon++) {
			for(var lar = 0; lar < this.options.lar; lar++) {
				this.grid[lon][lar].importCell(data[lon][lar]);
			}
		}
		
	},
	
	exportCurrentLvL: function() {
		var result = [];
		
		for(var lon = 0; lon < this.options.lon; lon++) {
			result[lon] = [];
			for(var lar = 0; lar < this.options.lar; lar++) {
				result[lon][lar] = this.grid[lon][lar].exportCell();
			}
		}
		
		return JSON.encode(result);
	},

})

Tcha.Grid.Cell = new Class({

	Implements: [Options],
	
	options: {
		availableState: ['Floor', 'Mud', 'Rock', 'Gem', 'Door', 'Wall', 'Player'],
		lon: null,
		lar: null,
		isDev: true
	},
	
	state : null,
	
	initialize: function(parent, options) {
	
		this.setOptions(options);
		this.parent = parent;
		
		this.element = new Element('div.cell');
		this.parent.adopt(this.element);
		
		// this.element.setStyle('background-color', 'rgb(' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255) + ', ' + Math.floor(Math.random()*255) + ')');
		this.tile = new Tcha.Mud(this);
		this.state = 'Mud';
		this.tile.display();
		
		if(this.options.isDev) {
			this.element.addEvent('click', function(){
				var no_ok = true;
				for(var i = 0; i < this.options.availableState.length && no_ok; i++)
					if(this.state == this.options.availableState[i] && i+1 < this.options.availableState.length) {
						console.log('change', this.options.availableState[i], this.state, i)
						console.log('Boo', this.options.availableState[i+1], i);
						this.tile.destroy();
						this.tile = new Tcha[this.options.availableState[i+1]](this);
						console.log(this.tile);
						no_ok = false;
						
					}
					else if(this.state == this.options.availableState[i] && i+1 == this.options.availableState.length) {
						console.log('Boo', this.options.availableState[0], 0);
						this.tile.destroy();
						this.tile = new Tcha[this.options.availableState[0]](this);
						console.log(this.tile);
						no_ok = false;
					}
						
			}.bind(this));
		}
		
		return this;
	},
	
	exportCell: function() {
		return this.state;		
	},
	
	importCell: function(willBecome){
		if(this.tile != null)
			this.tile.destroy();
		
		//console.log(willBecome);
		this.tile = new Tcha[willBecome](this);	
	}
	
})



Tcha.Player = new Class({
	Implements: [Options],
	
	initialize: function(grid, options) {
	
		this.setOptions(options);
		this.grid = grid;
		
		$$('body')[0].addEvent('keydown', function(event){
			 // console.log(event.key)
			
			if (event.key == 'left') { 
				console.log("left"); 
				this.walk(false, -1); 
			} 
			if (event.key == 'right') {
				console.log("right"); 
				this.walk(false, 1); 
			} 
			if (event.key == 'up') {
				console.log("up"); 
				this.walk(true, -1); 
			} if (event.key == 'down') {
				console.log("down"); 
				this.walk(true, 1); 
			} 
			if (event.key == 'space') {
			}
		}.bind(this));
		
		return this;
	},
	
	walk: function(isVertical, distance) {
		var dest = {};
		if(isVertical){
			dest.lon = this.lon;
			dest.lar = this.lar + distance;
		}
		else {
			dest.lon = this.lon + distance;
			dest.lar = this.lar;
			
		}
			
		switch(this.grid.getCell(dest.lar, dest.lon).state)	{
			case 'WALL':
				break;
			default:
				this.grid.getCell(this.lar, this.lon).become.FLOOR(this.grid.getCell(this.lar, this.lon));
				this.lon = dest.lon;
				this.lar = dest.lar;
				this.grid.getCell(this.lar, this.lon).become.PLAYER(this.grid.getCell(this.lar, this.lon));
				break;
			
		}
		
			
	},
	
	
	teleport: function(lar, lon) {
		this.lon = lon;
		this.lar = lar;
		
		for(var i = 0; i < this.grid.options.lon; i++)
			for(var j = 0; j < this.grid.options.lar; j++) {
				var cell = this.grid.getCell(i, j)
				if(cell.state == 'PLAYER')
					cell.become.FLOOR(cell);
			}
		
		this.grid.getCell(lar, lon).become.PLAYER(this.grid.getCell(this.lar, this.lon));
	}
})