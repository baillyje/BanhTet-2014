Interface = new Class({

	"parent" : null,
	"global" : null,
	"score" : 0,
	"nbLife" : 3,
	"life1" : null,
	"life2" : null,
	"life3" : null,
	"lifeSheet" : null,

	initialize : function(pParent, pGlobal) {
	
		this.parent = pParent;
		this.global = pGlobal;
		
		this["livesSheet"] = new createjs.SpriteSheet({
				// image to use
				images: [global.livesImg],
				// width, height & registration point of each sprite
				frames: {width: 97, height: 40, regX: 0, regY: 0},
				animations: {
					normal: [0, 0, "normal"]
				}
			}); 
			
			this["lives"] = new createjs.BitmapAnimation(this["livesSheet"]);
			this["lives"].gotoAndPlay("normal");
			this["lives"].currentFrame = 0;
			this["lives"].x = this.global.stage.canvas.width-358;
			this["lives"].y = this.global.rayon/2;
			this.parent.addChild(this["lives"]); 
		
		
		for(var r = 1; r < 4; r++)
		{
			//this["life"+r] = new createjs.Shape();
			//this["life"+r].graphics.beginFill("red").drawCircle(0, 0, this.global.rayon/2);
			this["lifeSheet"] = new createjs.SpriteSheet({
				// image to use
				images: [global.circleImg],
				// width, height & registration point of each sprite
				frames: {width: 87, height: 2*global.rayon, regX: 0, regY: global.rayon},
				animations: {
					normal: [0, 0, "normal"]
				}
			}); 
			
			this["life"+r] = new createjs.BitmapAnimation(this["lifeSheet"]);
			this["life"+r].gotoAndPlay("normal");
			this["life"+r].currentFrame = 0;
			this["life"+r].x = this.global.stage.canvas.width-(r*87);
			this["life"+r].y = (2.5*this.global.rayon)/2;
			this.parent.addChild(this["life"+r]); 
		}
	},
	
	looseLife : function() {
	
		//var truc = this.nbLife+"";
	
		switch(this.global.nbLife+1)
		{
			case 3 : 
				this.parent.removeChild(this["life3"]);
				break;
			case 2 : 
				this.parent.removeChild(this["life2"]);
				break;
			case 1 : 
				this.parent.removeChild(this["life1"]);
				break;
		}
		
		//console.log(this);
		
		//this.nbLife -= 1;
	},
	
	addScore : function(score) {
		
	}
	
})