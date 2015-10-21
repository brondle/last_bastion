hit = 0;
enemiesRemaining=0;
worldEnded=false;
var thisPos = new Array();
var curPos = new Array();
topScore = false;


window.onload = function() {
	checkVars();
	var kin = new Kinetic_2d("primary");
	var context = kin.getContext();
	var worldX = document.getElementByID("primary");
	var worldXContext = worldX.getContext("2d");
	var img = new Image();
		intervalId1 = 0;
		intervalId2 = 0;
		img.src = "earth.jpg"
		worldXContext.drawImage(img, 0, 0);
		kin.getCanvas().mouseup = function() {
			kin.drawStage();
		};
		kin.setDrawStage(function() {
			var mousePos = kin.getMousePos();
			if (mousePos !== null) {
				mousePos.y;
				curPos[0] = mousePos.x;
				curPos[1] = mousePos.y;s
			} else {
				curPos[0] = 0;
				curPos[1] = 0;
			}
		});
};

function checkVars(){
	if(sessionStorage.score==0 || sessionStorage.score==undefined) {
		sessionStorage.score=0;
	}
	score = sessionStorage.score;
	document.getElementById("score").innerHTML

	if(localStorage.topScore>=sessionStorage.score && localStorage.topScore!=0) {
		document.getElementById("topscore").innerHTML = localStorage.topScore;
	} else {
		if (localStorage.topScore == undefined || localStorage.topScore == 0) {
			localStorage.topScore =0;
			document.getElementById("topscore").innerHTML = 0;
		}
		if (sessionStorage.enemies == undefined ||sessionStorage.enemies == 0) {
			sessionStorage.enemies = 5;
		}

		enemiesRemaining = sessionStorage.enemies;
		document.getElementById("enemiesRemaining").innerHTML = enemiesRemaining;
	}
}

function start(){
	intervalId1 = setInterval(function() {
		var asteroidX = new Asteroid();

		do{
			intervalId2= setInterval(function(){
				asteroidX.fallDown();
			},20)
		}while(this.alive == true);
	}, 500);

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

	this.world = document.getElementById("theCanvas");
	this.worldContext = this.world.getContext("2d");
	this.worldContext.strokeStyle = "#FF0000";
	this.x = Math.floor(Math.random()*999);
	this.y = 0
	this.alive = true;
	this.update = false;
	this.id = intervalId2;
	if (this.x > 500) {
		this.direction = "right";
	} else {
		this.direction = "left";
	}
}

Asteroid.prototype.fallDown = function() {
	if (worldEnded == false) {
		if (this.alive==true) {
			this.worldContext.beginPath();
			if(((thisPos[0]-this.x)< 10 && (thisPos[0] - this.x) > -10 && (thisPos[1] - this.y) < 10 && (thisPos[1] -this.y) >-10) && thisPos[0]!=0 && thisPos[1]!=0)
		{
			this.alive = false;
			this.worldContext.strokeStyle = "#FFFF00";
			this.worldContext.arc(this.x, this.y, 10, 0, Math.PI*2, true);
			this.worldContext.stroke();
			if (this.y>250) {
				if(this.update == false) {
					this.worldContext.strokeStyle = "#FF0000";
					statUp = "</br> Asteroid #" + intervalId2 + "has entered the atmosphere!";
					setStatusUpdate(statUp);
					this.update = true;
				}
			}

			if(this.y>500){
				this.worldContext.fillStyle="#FF0000";
				this.worldContext.arc(this.x, this.y, 100, 0, Math.PI*2, true);
				this.worldContext.stroke();
				this.worldContext.fill();
				this.intervalid = intervalId2;
				this.alive = false;
				worldEnded = true;
			}
		}
		this.worldContext.closePath();
		}
	}

	else if(worldEnded == true) {

		var worldX = document.getElementById("primary");
		var worldXcontext = worldX.getContext("2d");
		var img = new Image();
		img.src = "nuke.jpg";
		worldXContext.drawImage(img, -300, -300);

		if(topScore==true) {
			alert("You got the top score!");
			topScore = false;
		}

		window.clearInterval(this.intervalId);
		window.clearInterval(intervalId1);
		statUp = "THE WORLD HAS BEEN DESTROYED.";
		setStatusUpdate(statUp);
	}
}

function checkForTopScore() {
	if (localStorage.topScore <= hit) {
		localStorage.topScore = hit;
		document.getElementById("topscore").innerHTML = hit;
		topScore = true;
	}
	if (enemiesRemaining==0) {
		sessionStorage.enemies = sessionStorage.enemies * 2;
		sessionStorage.hit = hit;
		alert("GOOD JOB! NEXT WAVE:" + sessionStorage.enemies);
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
			sU= document.getElementByID("status");
			sU.setAttribute("style", "color:black;");
		} else {
			sU = document.getElementById("status");
			sU.setAttribute("style", "color:white;");
		}
	}, 100);
}

function resetAll() {
	sessionStorage.hit = 0;
	sessionStorage.enemies = 0;
	localStorage.topScore = 0;
	location.reload(true);
}
