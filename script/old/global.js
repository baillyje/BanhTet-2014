Global = new Class({

	"rayon" : 20, 
	"stage" : null, 
	"circle" : null, 
	"posX" : null, 
	"deltaX" : 6, 
	"mechant" : [], 
	"shot" : null, 
	"mechantWay" : 1, 
	"tailleMechant" : null, 
	"mechantSpeed" : 0/*1/25*/, 
	"fireSpeed" : 1/4,
	"mechantFireSpeed" : 1/8,
	"shotInAction" : false,
	"frequency" : 1.4,
	"totalKilled" : 0,
	"nbLife" : 3,
	"interface" : null,
	
	"mechant1aImg" : new Image(),
	"mechant1bImg" : new Image(),
	"mechant2aImg" : new Image(),
	"mechant2bImg" : new Image(),
	"mechant3aImg" : new Image(),
	"mechant3bImg" : new Image(),
	"mechantPaffImg" : new Image(),

	"circleImg" : new Image(),
	"circlePaff1Img" : new Image(),
	"circlePaff2Img" : new Image(),
	
	"shotMechantImg" : new Image(),
	"shotImg" : new Image(),
	
	"titleImg" : new Image(),
	"startImg" : new Image(),
	"livesImg" : new Image(),
	"winImg" : new Image(),
	"loseImg" : new Image(),
	"happyImg" : new Image(),
	"retryImg" : new Image(),
	
	initialize : function() {
	
		this.tailleMechant = 30; 
		
		this.mechant1aImg.src = "./graph/type1a.png";
		this.mechant1bImg.src = "./graph/type1b.png";
		this.mechant2aImg.src = "./graph/type2a.png";
		this.mechant2bImg.src = "./graph/type2b.png";
		this.mechant3aImg.src = "./graph/type3a.png";
		this.mechant3bImg.src = "./graph/type3b.png";
		this.mechantPaffImg.src = "./graph/paff.png";
		
		this.circleImg.src = "./graph/circle.png";
		this.circlePaff1Img.src = "./graph/circlePaff1.png";
		this.circlePaff2Img.src = "./graph/circlePaff2.png";
		
		this.shotMechantImg.src = "./graph/shotMechant.png";
		//this.loseImg.onload = function(){console.log("charged !!!")};
		//this.loseImg.onerror = function(err){console.log("err chargement : " + err)};
		this.shotImg.src = "./graph/shot.png";
		
		this.titleImg.src = "./graph/title.png";
		this.startImg.src = "./graph/start.png";
		this.livesImg.src = "./graph/lives.png";
		this.winImg.src = "./graph/success.png";
		this.loseImg.src = "./graph/lose.png";
		this.happyImg.src = "./graph/happy.png";
		this.retryImg.src = "./graph/retry.png";
	},
	
	newInit : function(self) {
	
		
		global.circle.gotoAndPlay("normal");
		self.posX = self.stage.canvas.width/3 ;
		self.circle.x = self.stage.canvas.width/3  ;
		
		if(self.shot)
		{
			self.shot.shotOff();
		}
		createjs.Ticker.setPaused(false);
	},
	
	win : function() {
	
		console.log("win")
		createjs.Ticker.setPaused(true);
	
		this.finishPage = new createjs.Container();
		this.stage.addChild(this.finishPage);
		
		this["winSheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.winImg],
			// width, height & registration point of each sprite
			frames: {width: 318, height: 100, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["win"] = new createjs.BitmapAnimation(this["winSheet"]);
		this["win"].gotoAndPlay("normal");
		this["win"].currentFrame = 0;
		this["win"].x = 380;
		this["win"].y = 150;
		this.finishPage.addChild(this["win"]);
		
		this["happySheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.happyImg],
			// width, height & registration point of each sprite
			frames: {width: 285, height: 300, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["happy"] = new createjs.BitmapAnimation(this["happySheet"]);
		this["happy"].gotoAndPlay("normal");
		this["happy"].currentFrame = 0;
		this["happy"].x = this.stage.canvas.width/2-335;
		this["happy"].y = 50;
		this.finishPage.addChild(this["happy"]);
		
		
		this["retrySheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.retryImg],
			// width, height & registration point of each sprite
			frames: {width: 131, height: 75, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["retry"] = new createjs.BitmapAnimation(this["retrySheet"]);
		this["retry"].gotoAndPlay("normal");
		this["retry"].currentFrame = 0;
		this["retry"].x = this.stage.canvas.width-185;
		this["retry"].y = this.stage.canvas.height-100;
		this.finishPage.addChild(this["retry"]);
		
		//var self = this;
		this["retry"].onClick = function() {
		
			document.location.href= "./retry.html";
			
		}
	
	},
	
	looseLife : function() {
		
		this.evalSound("sBoom");
		this.nbLife--;
		var self = this;
		
		this.circle.gotoAndPlay("paff");
		
		setTimeout(function() { // probleme sur la détermination du sprite de vie a retirer sinon (bug pendant la pause).
			self.interface.looseLife(); 
			createjs.Ticker.setPaused(true);  
		}, 10);
		
		if(this.nbLife <= 0)
		{
			this.gameOver();
		}
		else
		{
			setTimeout(function() { self.newInit(self);  }, 2000);
		}
		
		
		
	},
	
	gameOver : function() {
		
		this.finishPage = new createjs.Container();
		this.stage.addChild(this.finishPage);
		
		this["loseSheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.loseImg],
			// width, height & registration point of each sprite
			frames: {width: 400, height: 117, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["lose"] = new createjs.BitmapAnimation(this["loseSheet"]);
		this["lose"].gotoAndPlay("normal");
		this["lose"].currentFrame = 0;
		this["lose"].x = 380;
		this["lose"].y = 150;
		this.finishPage.addChild(this["lose"]);
		
		this["happySheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.happyImg],
			// width, height & registration point of each sprite
			frames: {width: 285, height: 300, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["happy"] = new createjs.BitmapAnimation(this["happySheet"]);
		this["happy"].gotoAndPlay("normal");
		this["happy"].currentFrame = 0;
		this["happy"].x = this.stage.canvas.width/2-335;
		this["happy"].y = 50;
		this.finishPage.addChild(this["happy"]);
		
		
		this["retrySheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.retryImg],
			// width, height & registration point of each sprite
			frames: {width: 131, height: 75, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["retry"] = new createjs.BitmapAnimation(this["retrySheet"]);
		this["retry"].gotoAndPlay("normal");
		this["retry"].currentFrame = 0;
		this["retry"].x = this.stage.canvas.width-185;
		this["retry"].y = this.stage.canvas.height-100;
		this.finishPage.addChild(this["retry"]);
		
		//var self = this;
		this["retry"].onClick = function() {
		
			document.location.href= "./retry.html";
			
		}
		
		
		console.log("lose");
		
		
		
	},
	
	evalSound : function(soundobj) {
		var thissound=document.getElementById(soundobj);
		thissound.play();
	},
	
	displayMainScreen : function() {
		
		this.titlePage = new createjs.Container();
		this.stage.addChild(this.titlePage);
		
		this["titleSheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.titleImg],
			// width, height & registration point of each sprite
			frames: {width: 700, height: 379, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["title"] = new createjs.BitmapAnimation(this["titleSheet"]);
		this["title"].gotoAndPlay("normal");
		this["title"].currentFrame = 0;
		this["title"].x = this.stage.canvas.width-750;
		this["title"].y = this.rayon;
		this.titlePage.addChild(this["title"]);
		
		this["startSheet"] = new createjs.SpriteSheet({
			// image to use
			images: [this.startImg],
			// width, height & registration point of each sprite
			frames: {width: 205, height: 100, regX: 0, regY: 0},
			animations: {
					normal: [0, 0, "normal"]
			}
		}); 
		
		this["start"] = new createjs.BitmapAnimation(this["startSheet"]);
		this["start"].gotoAndPlay("normal");
		this["start"].currentFrame = 0;
		this["start"].x = this.stage.canvas.width/2 - 100;
		this["start"].y = this.stage.canvas.height - 100 - this.rayon;
		this.titlePage.addChild(this["start"]);
	
		
		
		var self = this;
		this["start"].onClick = function() {
		
			self.hideMainScreen();
			self.initGame();
			
		}
		
	},

	hideMainScreen : function() {
		
		this.stage.removeChild(this.titlePage);
	},
	
	initGame : function() {
	
		var global = this;
	
		this.interface = new Interface(this.stage, this);
			
		this.posX = global.stage.canvas.width/4;//2 - global.rayon;
			
			//global.circle = new createjs.Shape();
			//global.circle.graphics.beginFill("red").drawCircle(0, 0, global.rayon);
		this.circleSprite = new createjs.SpriteSheet({
				// image to use
				images: [this.circleImg, this.circlePaff1Img, this.circlePaff2Img],
				// width, height & registration point of each sprite
				frames: {width: 87, height: 2*this.rayon, regX: 0, regY: this.rayon},
				animations: {
					normal: [0, 0, "normal"],
					paff: [1, 2, "paff"]
				}
			}); 
			
			this.circle = new createjs.BitmapAnimation(this.circleSprite);
			this.circle.gotoAndPlay("normal");
			this.circle.currentFrame = 0;
			
			
			this.circle.y = this.stage.canvas.height - this.rayon ;
			this.circle.x = this.posX;
			this.stage.addChild(this.circle);
			
			
			
			
			// Ticker will pass elapsedTime and paused params when it calls stage.update()
			// which will pass them to onTick() handlers for us in time based animation.
			
			
			
			this.circle.onTick = function(elapsedTime) {
				this.x = global.posX;
				if (this.x > global.stage.canvas.width - 87/2) 
				{ 
					this.x = global.stage.canvas.width - 87/2; 
					global.posX = global.stage.canvas.width - 87/2; 
				}
				if (this.x < -87/2) 
				{ 
					this.x = -87/2; 
					global.posX = -87/2; 
				}
			}
			
			
			
			global.overMind = new OverMind(global.stage, global);
			
			$('myBody').addEvent('keydown', function(event){
			
			
				console.log(event.key)
				if (event.key == 'left') { 
					console.log("bli left"); 
					global.posX -= global.deltaX; 
				} 
				if (event.key == 'right') {
					console.log("bli right"); 
					global.posX += global.deltaX; 
				} 
				if (event.key == 'space') {
					if(global.shotInAction == false)
					{
						console.log("bli space");
						global.shotInAction = true;
						global.shot = new Shot(global.stage, global);
						global.shot.fire();
					}
				}
			});
			
	}
})