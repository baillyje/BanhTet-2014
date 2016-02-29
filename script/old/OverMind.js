OverMind = new Class({

	"parent" : null,
	"global" : null,
	"container" : null, 
	"mechantWay" : null, 
	"mechantSpeed" : null, 
	"time" : 0,
	"haveJustGetDown" : false,
	"timeShoot" : 100,
	

	initialize : function(pParent, pGlobal) 
	{
		this.parent = pParent;
		this.global = pGlobal;
		
		this.mechantWay = global.mechantWay; 
		this.mechantSpeed = global.mechantSpeed; 
		
		// initialisation du container
		this.container = new createjs.Container();
		this.global.stage.addChild(this.container);
		
		// ajout des méchants
		for(var i = 0; i < 11; i++)
		{
			for(var j = 0; j < 5; j++)
			{
				this.global.mechant[i][j] = new Mechant(this.container, this.global);
				
				switch(j)
				{
					case 0 :
						this.global.mechant[i][j].add(0, i, j);
						break;
					case 1 :
					case 2 :
						this.global.mechant[i][j].add(1, i, j);
						break;
					case 3 : 
					case 4 :
						this.global.mechant[i][j].add(2, i, j);
						break;
					default : 
						break;
				}
			}
		}
		
			
		var self = this;	
		this.container.onTick = function(elapsedTime) {
		
			var delta = 40;
		
			self.time += elapsedTime;
			
			self.timeShoot -= elapsedTime;
			
			if(self.time > 1000/self.global.frequency)
			{
				if(self.timeShoot <= 0)
				{
					self.timeShoot = 1000+Math.random()*4000; // mettre une durée speudo aléatoire
					
					var mechantAlive = new Array();
					
					for(var ii = 0; ii < 11; ii++)
					{
						var found = false;
						for(var jj = 0; jj < 5 && found == false; jj++)
						{
							if(self.global.mechant[ii][jj].dead == false)
							{
								found = true;
								mechantAlive.push(ii);
							}
						}
					}
					
					var temp = Math.floor((Math.random()-0.00000000001)*mechantAlive.length)
					var selectFireCollumIndex = mechantAlive[temp];
					//console.log("temp - "+temp+ "// selectFireCollumIndex - "+selectFireCollumIndex );
					var haveShot = false;
					for(var jjj = 4; jjj >= 0 && haveShot == false; jjj--)
					{
						if(self.global.mechant[selectFireCollumIndex][jjj].dead == false)
						{
							haveShot = true;
							self.global.mechant[selectFireCollumIndex][jjj].fire();
						}
					}
				}
				
				
				self.time = 0;
				
				var lastCollumAlive = self.findLastCollumAlive();
				var firstCollumAlive = self.findFirstCollumAlive();
				
				var lastPt = self.container.localToGlobal(self.global.mechant[lastCollumAlive.abs][lastCollumAlive.ord].shape.x, self.global.mechant[lastCollumAlive.abs][lastCollumAlive.ord].shape.y);
				var fisrtPt = self.container.localToGlobal(self.global.mechant[firstCollumAlive.abs][firstCollumAlive.ord].shape.x, self.global.mechant[firstCollumAlive.abs][firstCollumAlive.ord].shape.y);
				
				//console.log(lastPt.x + " // " + self.global.mechant[lastCollumAlive.abs][lastCollumAlive.ord].shape.x);
				
				if(lastPt.x+delta >= (self.global.stage.canvas.width - self.global.tailleMechant/2) && !self.haveJustGetDown)
				{
					var lastLignAlive = self.findLastLignAlive();
					var downPt = self.container.localToGlobal(self.global.mechant[lastLignAlive.abs][lastLignAlive.ord].shape.x, self.global.mechant[lastLignAlive.abs][lastLignAlive.ord].shape.y);
				
					self.global.mechantWay = -1;
					this.y += delta;
					
					self.global.frequency += 0.25;
					
					self.haveJustGetDown = true;
				
					if(downPt.y+delta >= (self.global.stage.canvas.height - self.global.rayon*2))
					{
						self.global.gameOver();
					}
					
					
				}
				else if(fisrtPt.x-delta <= (self.global.tailleMechant/2) && !self.haveJustGetDown)
				{
					var lastLignAlive = self.findLastLignAlive();
					var downPt = self.container.localToGlobal(self.global.mechant[lastLignAlive.abs][lastLignAlive.ord].shape.x, self.global.mechant[lastLignAlive.abs][lastLignAlive.ord].shape.y);
					
					
					self.global.mechantWay = 1;
					this.y += delta;
					
					self.global.frequency += 0.25;
					
					self.haveJustGetDown = true;
					
					
					if(downPt.y+delta >= (self.global.stage.canvas.height - self.global.rayon*2))
					{
						self.global.gameOver();
					}
				}
				else
				{
					self.container.x += self.global.mechantWay * 10//;delta;
					self.haveJustGetDown = false;
				}
				
				for(var iiii = 0; iiii < 11; iiii++)
				{
					for(var jjjj = 0; jjjj < 5; jjjj++)
					{
						if(self.global.mechant[iiii][jjjj].dead == false)
						{
							self.global.mechant[iiii][jjjj].toogle();
						}
					}
				}
				
				
			}
			
		}
	},
	
	findLastCollumAlive : function() {
		
			//console.log("last -- ");
			for(var m = 10; m >= 0; m--)
			{
				//console.log("last -- " + m);
				for(var mm = 4; mm >= 0; mm--)
				{
					//console.log("last -- " + this.global.mechant[m][mm].dead);
					
					if(this.global.mechant[m][mm].dead == false)
						return {"abs" : m, "ord" : mm};
				}
			}
			//return {"abs" : 10, "ord" : 0};
			
	},
		
	findFirstCollumAlive : function() {
		
			for(var m = 0; m < 11; m++)
			{
				for(var mm = 4; mm >= 0; mm--)
				{
					//console.log("first -- " + global.mechant[m][mm].dead);
					
					if(global.mechant[m][mm].dead == false)
						return {"abs" : m, "ord" : mm};
				}
			}
			
			//return {"abs" : 0, "ord" : 0};
	},
	
	findLastLignAlive : function() {
		
		for(var mm = 4; mm >=0 ; mm--)
			{
				for(var m = 0; m < 11; m++)
				{
					//console.log("first -- " + global.mechant[m][mm].dead);
					
					if(global.mechant[m][mm].dead == false)
						return {"abs" : m, "ord" : mm};
				}
			}
			
			//return {"abs" : 0, "ord" : 0};
	}
	
})