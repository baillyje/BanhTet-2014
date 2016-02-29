Mechant = new Class({

	"parent" : null,
	"shape" : null, 
	"mechantWay" : null, 
	"tailleMechant" : null, 
	"mechantSpeed" : null, 
	"fireSpeed" : null,
	"dead" : false,
	"state" : "a",
	

	initialize : function(pParent, pGlobal) 
	{
		this.parent = pParent;
		this.global = pGlobal;
		
		this.mechantWay = global.mechantWay; 
		this.mechantSpeed = global.mechantSpeed; 
		this.fireSpeed = global.mechantFireSpeed; 
		this.tailleMechant = global.tailleMechant; 
	},
	
	add  : function(pType, pAbs, pOrd) {
			
		
		this.dead = false;
		var sType, x = 0;
		
		switch(pType)
		{	
			case 0 :
				sType = "1";
				break;
			case 1 :
				sType = "2";
				break;
			case 2 :
				sType = "3";
				break;
			default :
				sType = "1";
		}
			
		/*
			this.shape = new createjs.Shape();
			this.shape.graphics.beginFill(sType).drawCircle(0, 0, this.tailleMechant);
			this.shape.x = (pAbs)*2*this.global.rayon+(this.global.stage.canvas.width/2-(11*this.global.rayon));
			this.shape.y = (pOrd)*2*this.global.rayon+3*this.global.rayon;
		*/

		this.shapeSprite = new createjs.SpriteSheet({
			// image to use
			images: [this.global["mechant"+sType+"aImg"], this.global["mechant"+sType+"bImg"], this.global.mechantPaffImg],
			// width, height & registration point of each sprite
			frames: {width: this.tailleMechant, height: this.tailleMechant, regX: this.tailleMechant/2, regY: this.tailleMechant/2},
			animations: {
				a: [0, 0, "a"],
				b: [1, 1, "b"],
				paff : [2, 2, "paff"]
			}
		}); 
		
		this.shape = new createjs.BitmapAnimation(this.shapeSprite);
		this.shape.gotoAndPlay("a");
		this.shape.currentFrame = 0;
		this.shape.x = (pAbs)*2*this.global.rayon+(this.global.stage.canvas.width/2-(11*this.global.rayon));
		this.shape.y = (pOrd)*2*this.global.rayon+3*this.global.rayon+25;
		
		
		
			this.parent.addChild(this.shape);
			
			var self = this;
			
			
			
			this.shape.onTick = function(elapsedTime) {
			
			
			/*
				this.shape.x += this.mechantWay*elapsedTime*this.mechantSpeed;
				
				var lastCollumAlive = findLastCollumAlive();
				//console.log(lastCollumAlive);
				var firstCollumAlive = findFirstCollumAlive();
				if(global.mechant[lastCollumAlive.abs][lastCollumAlive.ord].x >= (global.stage.canvas.width-global.tailleMechant/2))
				{
					global.mechantWay = -1;
					this.y += 2*global.tailleMechant;
				}
				else if(global.mechant[firstCollumAlive.abs][firstCollumAlive.ord].x <= (global.tailleMechant/2))
				{
					global.mechantWay = 1;
					this.y += 2*global.tailleMechant;
				}
			*/
			
				if(self && self.global && self.global.shot && self.global.shot.shape)
				{
					var pt = self.global.shot.shape.localToLocal(100,0,this);
					//if(x++ == 100) { console.log(pt.x + " / " + shot.x);  }

					if (this.hitTest(pt.x-(6*global.rayon), pt.y)) 
					{ 
						self.global.evalSound("sMechantBoom");
						
						self.global.shot.shotOff();
						self.dead = true;
						
						self.shape.gotoAndPlay('paff');
						setTimeout(function(){ self.parent.removeChild(self.shape); }, 300)
						
						self.global.frequency += 0.01;
						
						self.global.totalKilled++;
						
						if(self.global.totalKilled >= 11*5)
						{
							self.global.win();
						}
						
					}	
				}
				
			
			}
			
		
	},
	
	fire : function() {
	
		
	
		//var mechantShot = new createjs.Shape();
		//mechantShot.graphics.beginFill("white").drawCircle(0, 0, this.tailleMechant/8);
		
		this.mechantShotSprite = new createjs.SpriteSheet({
			// image to use
			images: [this.global.shotMechantImg],
			// width, height & registration point of each sprite
			frames: {width: 10, height: 18, regX: 5, regY: 13},
			animations: {
				normal: [0, 0, "normal"]
			}
		}); 
		
		var mechantShot = new createjs.BitmapAnimation(this.mechantShotSprite);
		mechantShot.gotoAndPlay("normal");
		
		mechantShot.x = this.parent.localToGlobal(this.shape.x, this.shape.y).x;
		mechantShot.y = this.parent.localToGlobal(this.shape.x, this.shape.y).y;
		this.global.stage.addChild(mechantShot);
		
		//console.log(mechantShot.x)
		
		//console.log(this.global.circle.x);
		
		var self = this;
		//console.log("boom");
		mechantShot.onTick = function(elapsedTime) {
			mechantShot.y += elapsedTime*self.fireSpeed;
			
			//console.log(mechantShot.y + ">=" + (self.global.circle.y ) + "&&" + mechantShot.y +"<=" +(self.global.circle.y + 2*self.global.rayon) + " >> " + (mechantShot.y >= (self.global.circle.y ) && mechantShot.y <= (self.global.circle.y + 2*self.global.rayon)))
			
			if (mechantShot.x >= (self.global.circle.x ) && mechantShot.x <= (self.global.circle.x + 87) && mechantShot.y >= (self.global.circle.y - self.global.rayon/2) && mechantShot.y <= (self.global.circle.y + self.global.rayon)) 
			{ 
				self.global.stage.removeChild(mechantShot);
				
				//setTimeout(function(){ createjs.Ticker.setPaused(false);}, 3000)
				self.global.looseLife();
				//console.log("pouf");
			}
			//console.log(mechantShot.y + " // " + pt.y)
			
			if(mechantShot.y > self.global.stage.canvas.height + 10 )
			{
				self.global.stage.removeChild(mechantShot);
			}
			
		}
		
	},
	
	toogle : function() {
	
		if(this.state == "a")
		{
			this.state = "b";
			this.shape.gotoAndPlay("b");
		}
		else
		{
			this.state = "a";
			this.shape.gotoAndPlay("a");
		}
	}
	
})