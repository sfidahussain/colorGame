var modeButtons = document.querySelectorAll(".mode");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("rgb");
var messageDisplay = document.querySelector("#message");
var playAgainButton = document.querySelector("#playAgain");
var h1 = document.querySelector("h1");

var num = 6;
var colors = [];
var goalColor;

init();

playAgainButton.addEventListener("click", function(){
	reset();
});

function changeColor(color){
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
	h1.style.backgroundColor = color;
}

function pickColor(){
	return colors[Math.floor(Math.random() * colors.length)];
}

function randomColor(){
	var hue = "rgb(" + (Math.floor(Math.random() * 256)) + ", " + (Math.floor(Math.random() * 256)) + ", " + (Math.floor(Math.random() * 256)) + ")";
	return hue;
}

function generateRandomColors(num){
	var colors = [];
	for(var i = 0; i < num; i++)
	{
		colors.push(randomColor());
	}
	return colors;
}

function reset() {
	colors = generateRandomColors(num);
	// pick a new random color from array
	goalColor = pickColor();
	colorDisplay.textContent = goalColor.toUpperCase();
	playAgainButton.textContent = "New Colors"; 
	messageDisplay.textContent = "";
	console.log(colors);
	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.display = "";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = document.body.style.backgroundColor;
}

function init(){
	setupModeButtons();
	setupSquareButtons();
	reset();
}

function setupModeButtons(){
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");
			// turnary operator
			this.textContent === "Easy" ? num = 3: num = 6;
			reset();
		});
	}
}

function setupSquareButtons(){
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		// add event listeners for buttons
		squares[i].addEventListener("click", function(){
			if(this.style.backgroundColor == goalColor) {
				changeColor(goalColor);
				messageDisplay.textContent = "Correct!";
				playAgainButton.textContent = "Play Again?"; 
			}
			else {
				this.style.backgroundColor = "transparent";
				messageDisplay.textContent = "Try Again";
			}
		});	
	}
}