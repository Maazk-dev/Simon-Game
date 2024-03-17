// alert("hello");/
// $("h1").text("hello");

var buttonColours = ["red", "green", "blue", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
var clickNum = 0;
$(document).keypress(function(){
    if(!started){
        started = true;
        nextSequence(0);
    }
});

$(".btn").click(function (){
    if(started === true){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        clickAnimation(userChosenColour);
        clickNum ++;
        checkAnswer(clickNum);
    }
});

function nextSequence(){
    level++;
    clickNum = 0;
    userClickedPattern = [];
    $("#level-title").text("Level " + level);

    var randomNum = Math.round((Math.random() * 10) % 3);
    var randomChosenColour = buttonColours[randomNum];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeToggle(100).fadeToggle(100);
    playSound(randomChosenColour);
}

function checkAnswer(index){
    if(gamePattern[index-1] === userClickedPattern[index-1]){
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {nextSequence();}, 500);
        }
    }else{
        started = false;
        level = 0;
        gamePattern = [];
        $("#level-title").text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").toggleClass("game-over");
        setTimeout(() => {$("body").toggleClass("game-over");}, 100);
    }
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
function clickAnimation(buttonColour){
    $("#" + buttonColour).toggleClass("pressed");
    setTimeout(() => { $("#" + buttonColour).toggleClass("pressed");}, 100);
    
    playSound(buttonColour);
}

