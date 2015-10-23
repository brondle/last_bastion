hit = 0;
enemiesRemaining=0;
worldEnded=false;
var thisPos = new Array();
var curPos = new Array();
var asteroids = new Array();
topScore = false;

window.onload = function() {

	checkVars();
	var kin = new Kinetic_2d("primary");
	var context = kin.getContext();
	var message = "";
	var worldX = document.getElementById("primary");
	var worldXContext = worldX.getContext("2d");
	worldXContext.strokeStyle = "green";
	worldXContext.stroke;
		intervalId1 = 0;
		intervalId2 = 0;
		kin.getCanvas().mouseup = function() {
			kin.drawStage();
		};
		kin.setDrawStage(function() {
			var mousePos = kin.getMousePos();
			if (mousePos !== null) {
				curPos[0] = mousePos.x;
				curPos[1] = mousePos.y;
			} else {
				curPos[0] = 0;
				curPos[1] = 0;
			}
		});
};

function checkVars(){
	if(localStorage.beatLevel == "true") {
		var worldX = document.getElementById("primary");
		var ctx = worldX.getContext("2d");
		ctx.fillStyle = "white";
		ctx.font = "30px Courier";
		ctx.fillText(("WELL DONE! NEXT WAVE: " + sessionStorage.enemies), 350, 250);
		ctx.fill();
		localStorage.beatLevel = false;
	}
	if(sessionStorage.hit==0 || sessionStorage.hit==undefined) {
		sessionStorage.hit=0;
	}
	score = sessionStorage.hit;
	document.getElementById("score").innerHTML = score;

	if(localStorage.topScore>=sessionStorage.hit && localStorage.topScore!=0) {
		document.getElementById("topscore").innerHTML = localStorage.topScore;
	} else if (localStorage.topScore == undefined || localStorage.topScore == 0) {
			localStorage.topScore =0;
			document.getElementById("topscore").innerHTML = 0;
		}
		if(sessionStorage.enemies==undefined||sessionStorage.enemies==0) {
			sessionStorage.enemies = 5;
		}

		enemiesRemaining = sessionStorage.enemies;
		document.getElementById("enemiesRemaining").innerHTML = enemiesRemaining;
	}

function start(){
	var worldX = document.getElementById("primary");
	var ctx = worldX.getContext("2d");
	ctx.clearRect(0, 0, 1000, 500);
	drawLandscape();
	ctx.strokeStyle = "white";
	ctx.strokeRect(424, 406, 102, 102);
	ctx.beginPath();
	ctx.arc(475, 500, 75, 2*Math.PI, 0);
	ctx.stroke();
	ctx.closePath();
	var gun = new Gun();
	gun.draw();
	intervalId1 = setInterval(function() {
		var asteroidX = new Asteroid();
		asteroids.push(asteroidX);
			intervalId2= setInterval(function(){
				if (worldEnded == false) {
					asteroidX.fallDown();
					gun.draw();
				}
			},20)
	}, 750);

	btnStarter = document.getElementById("btx");
	btnStarter.setAttribute("value", "RESTART");
	btnStarter.setAttribute("onclick", "restart()");
}

function restart() {
	sessionStorage.hit = 0;
	sessionStorage.enemies = 0;
	location.reload(true);
}

function Asteroid() {

	this.world = document.getElementById("primary");
	this.worldContext = this.world.getContext("2d");
	this.worldContext.strokeStyle = "#FF0000";
	this.x = Math.floor(Math.random()*999);
	this.y = 0;
	this.alive = true;
	this.update = false;
	this.id = intervalId2;
	if (this.x > 500) {
		this.direction = "right";
	} else {
		this.direction = "left";
	}
}

Asteroid.prototype.trajectory = function(){

	if(this.x>998){
		this.direction ="right";
	}
	else if(this.x<2){
		this.direction = "left";
	}

	if(this.direction=="right"){
		this.y++;
		this.x--;
	}
	else{
		this.y++;
		this.x++;
	}

}


Asteroid.prototype.fallDown = function() {
	if (worldEnded == false) {
		if (this.alive==true) {
			this.worldContext.beginPath();
			if(((thisPos[0]-this.x)<10 &&(thisPos[0]-this.x)>-10&&(thisPos[1] - this.y)<10&& (thisPos[1]-this.y)>-10) && thisPos[0]!=0&&thisPos[1]!=0)
		{
			this.alive = false;
			this.worldContext.strokeStyle = "#FFFF00";
			this.worldContext.arc(this.x,this.y,10,0,Math.PI*2,true);
			this.worldContext.stroke();
			statUp ="<br> ASTEROID DESTROYED!";
			setStatusUpdate(statUp);
			//this.y = y;
			//this.x = x;
			hit++;
			enemiesRemaining--;
			document.getElementById("score").innerHTML = hit;
			document.getElementById("enemiesRemaining").innerHTML = enemiesRemaining;
			checkForTopScore();
			}			else
						{
							var lineColor = 0;
							this.worldContext.strokeStyle = 'hsl(' + lineColor++ + ',100%, 50%)';
							this.worldContext.moveTo(this.x,this.y);
							this.trajectory();
							this.worldContext.lineTo(this.x,this.y);
							this.worldContext.stroke();
							if(this.y>250){
								if(this.update==false){
								statUp ="</br> An asteroid has entered the atmosphere!";
								setStatusUpdate(statUp);
								this.update=true;
								}
							}

			if(this.y>500 || (inBuilding(this.worldContext, this.x, this.y) == true)){
				var context = this.worldContext;
				var x = this.x;
				var y = this.y;
				if(x >= 434 && x<=536) {
					var sU = "The base was destroyed!";
					setStatusUpdate(sU);
				}
				var radius = 100;
				this.alive = false;
				var color = 0;
				this.worldContext.closePath();
				worldEnded = true;
				function drawExplosion() {
					context.fillStyle = 'hsl(' + color++ + ',100%, 50%)';
					context.beginPath();
					context.arc(x, y, radius, 0, Math.PI*2, false);
					context.stroke;
					context.fill();
					radius += (radius * .5);

					setTimeout(function() {
					if (radius < 1000) {
						drawExplosion();
					} else {
						var worldX = document.getElementById("primary");
						endContext = worldX.getContext("2d");
						endContext.fillStyle = 'hsl(' + color++ + ',100%, 50%)';
						endContext.rect(0, 0, 1000, 500);
						endContext.fill();
						endContext.fillStyle = "black";
						endContext.font = "30px Arial";
						endContext.fillText("GAME OVER", 400, 250);
						this.intervalId = intervalId2;
					}
				}, 400);
				}
				drawExplosion();
			}
		}
		}
	}

	else if(worldEnded == true) {

		var worldX = document.getElementById("primary");
		var worldXcontext = worldX.getContext("2d");


		if(topScore==true) {
			statUp = ("You got the top score!");
			setStatusUpdate(statUp);
			topScore = false;
		}

		window.clearInterval(this.intervalId);
		window.clearInterval(intervalId1);
		statUp = "THE WORLD HAS BEEN DESTROYED.";
		setStatusUpdate(statUp);
	}
}

function inBuilding(context, x, y) {
	context.beginPath();
	context.arc(485, 500, 75, 2*Math.PI, 0);
	if (context.isPointInPath(x, y)) {
		context.closePath();
		return true;
	} else {
		context.closePath();
		context.rect(406, 434, 102, 102);
		if (context.isPointInPath(x, y)) {
			return true;
		} else {
			return false;
		}
	}
}

function checkForTopScore() {
	if(localStorage.topScore <= hit){
		localStorage.topScore = hit;
		document.getElementById("topscore").innerHTML = hit;
		topScore = true;
	}
	if(enemiesRemaining==0){
		localStorage.beatLevel = true;
		sessionStorage.enemies = sessionStorage.enemies * 2;
		sessionStorage.hit = hit;
		location.reload(true);
	}
}

function hitIt() {
	thisPos[0] = curPos[0];
	thisPos[1]= curPos[1];
	setTimeout("emptySights()", 500);
}

function emptySights() {
	thisPos[0] = 0;
	thisPos[1] = 0;
}

function setStatusUpdate(msg) {
	document.getElementById("status").innerHTML = msg;
	z=0;
	setInterval(function() {
		z++;
		if((z%2) ==0) {
			sU= document.getElementById("status");
			sU.setAttribute("style", "color:black;");
		} else {
			sU = document.getElementById("status");
			sU.setAttribute("style", "color:white;");
		}
	}, 100);
}

function Gun() {
	this.world = document.getElementById("primary");
	this.worldContext = this.world.getContext("2d");
	this.worldContext.strokeStyle = "white";
}

Gun.prototype.draw = function() {
	ctx = this.worldContext;
	ctx.save();
	ctx.clearRect(425, 407, 100, 100);
	var angle = Math.atan2(curPos[1] - 475, curPos[0] - 440);
	ctx.translate(472.5, 440);
	ctx.rotate(angle);
	ctx.strokeStyle = "white";
	ctx.strokeRect(0, 0, 30, 5);
	ctx.rotate(angle*(-1));
	ctx.translate(-472.5, -440);
	ctx.restore;
	drawBase();
}


function resetAll() {
	sessionStorage.hit = 0;
	sessionStorage.enemies = 0;
	// localStorage.topScore = 0;
	location.reload(true);
}

function drawBase() {
	world = document.getElementById("primary");
	ctx = world.getContext("2d");
	ctx.strokeStyle = "green";
	ctx.strokeRect(450, 440, 50, 50);
	ctx.fillStyle = "grey";
	ctx.fillRect(467.5, 433, 17.5, 17.5);
	ctx.strokeRect(445, 455, 60, 35);
	ctx.strokeRect(435, 470, 80, 20);
	ctx.strokeRect(430, 480, 90, 20);
}

function drawLandscape() {
	var canvas = document.getElementById("primary");
	var context = canvas.getContext("2d");
	context.strokeStyle = "white";
	var highPoints = new Array();
	// parameters - change to your liking
	var STEP_MAX = 2.0;
	var STEP_CHANGE = 1.0;
	var HEIGHT_MAX = canvas.height;

	// starting conditions
	var height = Math.random() * HEIGHT_MAX;
	var slope = (Math.random() * STEP_MAX) * 2 - STEP_MAX;

	// creating the landscape
	for (var x = 0; x < canvas.width; x++) {
			 // change height and slope
			 height += slope;
			 slope += (Math.random() * STEP_CHANGE) * 2 - STEP_CHANGE;

			 // clip height and slope to maximum
			 if (slope > STEP_MAX) { slope = STEP_MAX };
			 if (slope < -STEP_MAX) { slope = -STEP_MAX };

			 if (height > HEIGHT_MAX) {
					 height = HEIGHT_MAX;
					 slope *= -1;
			 }

			 if (height <= 250) {
				 height = 250;
				 slope *= -1;
			 }
			 if (height < 0) {
					 height = 0;
					 slope *= -1;
			 }

			highPoints.push(height);
			 // draw column
			context.beginPath();
			context.moveTo(x, height -1);
			context.lineTo(x, height);
			context.stroke();
			context.closePath();

	}
		//	draw	stars
	for(var x = 0; x <= canvas.width; x+=5) {
		height = (Math.random() * highPoints[x]);
		context.fillStyle = "white";
		context.fillRect(x, height, 1, 1);
	}

}
