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
	
}
