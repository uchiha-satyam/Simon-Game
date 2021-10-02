var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var randomColor;
var counter = -1;
var level=0;
var ongoing = false;
$(".start-btn").click(function () {
	if(ongoing == false)
	{
		ongoing = true;
		setTimeout(nextSequence, 1000);
	}
});
$(document).keypress(function () {
	if(ongoing == false)
	{
		ongoing = true;
		setTimeout(nextSequence, 1000);
	}
});
function nextSequence()
{
	level++;
	$("h1").text("Level " + level);
	var random = Math.floor(Math.random() * 4);
	randomColor = buttonColors[random];
	gamePattern.push(randomColor);
	$("#"+randomColor).fadeOut(100).fadeIn(200);
	playSound(randomColor);
}
$(".btn").click(function(){
	counter++;
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);
	$("#"+userChosenColor).addClass("pressed");
	setTimeout(function () {
		$("#"+userChosenColor).removeClass("pressed");
	}, 100);
	if((userChosenColor != gamePattern[counter]))
	{
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
			$("h1").text("Game over, press any key to restart !");
		}, 200);
		startOver();
	}
	else if(counter == gamePattern.length - 1)
	{
		counter = -1;
		userClickedPattern = [];
		playSound(userChosenColor);
		setTimeout(nextSequence, 1000);
	}
	else
	{
		playSound(userChosenColor);
	}
});
function playSound(name)
{
	var audio = new Audio("sounds/"+name+".mp3");
	audio.play();
}
function startOver()
{
	gamePattern = [];
	userClickedPattern = [];
	counter = -1;
	level = 0;
	ongoing = false;
}