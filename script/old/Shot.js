Shot = new Class({

	"parent" : null,
	"shape" : null, 
	"fireSpeed" : null,

	initialize : function(pParent, pGlobal) 
	{
		this.parent = pParent;
		this.global = pGlobal;
		
		this.fireSpeed = this.global.fireSpeed; 
	},
	
	fire  : function(pType, pAbs, pOrd) {
			
		//this.shape = new createjs.Shape();
		
		//global.shot.inAction = false;
			
		//this.shape.graphics.beginFill("green").drawEllipse(-this.global.rayon, -this.global.rayon, this.global.rayon/4, this.global.rayon/2);
		
		
		//
		
		this.shotSprite = new createjs.SpriteSheet({
				// image to use
				images: [this.global.shotImg],
				// width, height & registration point of each sprite
				frames: {width: 10, height: 20, regX: 25, regY: 0},
				animations: {
					normal: [0,0, "normal"]
				}
			}); 
			
			this.shape = new createjs.BitmapAnimation(this.shotSprite);
			this.shape.gotoAndPlay("normal");
			this.shape.currentFrame = 0;
		
		
		this.shape.x = this.global.circle.x+(65);
		this.shape.y = this.global.stage.canvas.height - 5*this.global.rayon/4;
		this.global.stage.addChild(this.shape);
		
		var self = this;
		
		this.shape.onTick = function(elapsedTime){
			this.y -= elapsedTime*self.fireSpeed;
			
			if(this.y < -self.global.rayon/4) { 
				self.shotOff(global);
				/*this.y = -rayon;
				this.x = -rayon;
				this.inAction = false;*/
			}
		}

		this.global.evalSound("sShot");
		
	},
	
	shotOff : function() {
	
		this.global.shotInAction = false;
		this.shape.x = -30;
		this.shape.y = -30;
		this.global.stage.removeChild(this.shape);
	
	}
	
})