/* 
 * Author: Team 17 (Chris Centenera, Evan Chen, Ching Choi, John Park, Ian Park)
 * Description: Contains all functions that are used for the competitive game modes.
 */

 
/** ~~~ Move to game.js ~~~
 * selectMode Pre renders certain pages and activates modes depending on selected mode.
 * @param {String} mode The mode selected.
 */
function selectMode(mode){
	clearInterval(timer);
	timeModeFlag = false;
	scoreModeFlag = false;
	switch(mode){
		case 'classic':
			$('#timerBox').css('display', 'none');
			$('#scoreBox').css('display', 'none');
			break;
		case 'time':
			difficultyNum = 0;
			$('#timerBox').css('display', 'initial');
			$('#scoreBox').css('display', 'none');
			startTimeMode();
			break;
		case 'score':
			difficultyNum = 0;
			$('#timerBox').css('display', 'initial');
			$('#scoreBox').css('display', 'initial');
			startScoreMode();
			break;
	}
}

/** ~~~ Move to game.js ~~~
 * startScoreMode Manages transition into score mode.
 * @return {undefined}
 */
function startScoreMode(){
	//Time remaining for game mode.
	time = 60;
	//User's score.
	score = 0;
	//Randomize levels **** NEEDS TO BE PUT INTO FUNCTION ****
	levels = [0,1,2,3,4,5,6,7,8,9];
	level = 0;
	randomizeOrder(levels);
	//flag set for screen rendering.
	scoreModeFlag = true;
	//Sets interval for when to update countdown timer.
	timer = setInterval(drawCountdownTimer, 1000, time);
	$('#timer').text(time);
	$('#score').text(score);
	//Move to level 1 **** NEEDS TO BE PUT INTO FUNCTION (CALL IT nextLevel());
	levelLoad(2,2,3);
}

/**
 * startTimeMode Manages transition into time mode.
 * @return {undefined}
 */
function startTimeMode(){
	//Total time elapsed.
	time = 0;
	//Updates time every 1 seconds and draws it to the 3D mode screen.
	timer = setInterval(drawTimer, 1000);
	//Sets timer flag to true for screen rendering.
	timeModeFlag = true;
	//List of all levels.
	levels = [0,1,2,3,4,5,6,7,8,9];
	//Starting level
	level = 0;
	randomizeOrder(levels);
	$('#timer').text(time);
	//Build foldout and apply generated faces to 3D cube.
	levelLoad(2,2,3);
}

/**
 * updateScore Updates the visual representation of the user's score on the 3D screen.
 * @param value The value to be added to the current score.
 * @return {undefined}
 */
function updateScore(value){
	score += value;
	$('#score p').text(score);
}

/**
 * randomizeOrder Randomizes the level order.
 * @return {undefined}
 */
function randomizeOrder(){
	for(var i = 0; i < levels.length; i++){
		var tempIndex = Math.floor(Math.random() * 10);
		var temp = levels[tempIndex];
		levels[tempIndex] = levels[i];
		levels[i] = temp;
	}
}

/**
 * drawTimer Updates the visual representation of the timer in Timed mode on 3D screen.
 * @return {undefined}
 */
function drawTimer(){
	time++;
	$('#timer').text(time);
}

/** ~~~ Move to game.js ~~~
 * drawCountdownTimer Updates the text for the timer on the 3D screen. 
 *					  Timer goes towards 0 and ends game when length <= 0.
 * @return {undefined}
 */
function drawCountdownTimer(){
	time--;
	$('#timer').text(time);
	if(time <= 0){
		endGame();
		clearTimer();
	}
}

/** 
 * clearTimer Clears interval timer so endGame doesn't activate if score mode is left.
 * @return {undefined}
 */
function clearTimer(){
	clearInterval(timer);
}

/**
 * endGame Ends all game timers and brings user to end game screen (Modified version of resultsScreen).
 * @return {undefined}
 */
function endGame(){
	//Change to resultsScreen from either screen.
	screenChange('resultScreen');
	screenChange('resultScreen');
	//May not be necessary.
	window.location.hash = '#mode3D';
	$('#resultScreen div.bottomNav').html('');
	$('#resultScreen div.bottomNav').append('<button class="buttonDesign floatRight" onclick="toLeaderboard();">Post!</button>');
	$('#resultScreen div.bottomNav').append('<button class="buttonDesign floatleft" onclick="screenChange(\'mainMenu\')">back</button>');
	$('#resultScreen div.messageBox').html('');
	
	//Change score message depending on mode
	if(scoreModeFlag){
		$('#resultScreen div.messageBox').append('<p>Your score: ' + score + '</p>');
	}
	if(timeModeFlag){
		$('#resultScreen div.messageBox').append('<p>Your time: ' + time + '</p>');
	}
	//Input field for name
	$('#resultScreen div.messageBox').append('<br><p>Enter Your Name:</p>' +
											'<input type="text" id="username" name="username"style="z-index: 999; position: relative"></input>');
	//Weird bug where input field is unclickable. Added this as temporary work around.
	$('#username').focus();
}