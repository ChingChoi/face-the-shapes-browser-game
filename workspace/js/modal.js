/* 
 * Author: Team 17 (Chris Centenera, Evan Chen, Ching Choi, John Park, Ian Park)
 * Description: JavaScript file that focuses on modal related events.
 */
 
/**
 * Fade in the modal.
 */
function modalFadeIn() {
	$('#modalBox').fadeIn(200);
}

/**
 * Face out the modal.
 */
function modalFadeOut() {
	$('#modalBox').fadeOut(200);
}

/** 
 * Will display the modal. 
 */
function displayModal() {
	document.getElementById('modalBox').style.display = 'block';
    /* modalFadeIn();
	var timer = setTimeout(function() {document.getElementById('modalBox').style.display = 'block';}, 200); */
}

/** 
 * Will hide the modal. 
 */
function hideModal() {
	document.getElementById('modalBox').style.display = 'none';
	/* modalFadeOut();
	var timer = setTimeout(function() {document.getElementById('modalBox').style.display = 'none';}, 200); */
}

/** 
 * When the user clicks anywhere outside of the modal, this will close it. 
 */
window.onclick = function(event) {
    if (event.target == document.getElementById('modalBox')) {
        hideModal();
    }
}
/**
 * Will display when the user has a matching fold-out.
 */
function modalCorrect() {
	var msgList = ['Well done.', 
				'You did it!', 
				'Amazing!', 
				'Good Job!']
	var msg = msgList[Math.floor(Math.random() * msgList.length)];
	$('.modalContent').html('');
	var additionalInfo = '';
	var levelSelectButton = '<li><button class="buttonDesign" onclick="lockLevelButtons(); screenChange(\'levelSelect\'); lockLevelButtons(); hideModal();">Levels</button></li>';
	var nextLevelButton = '<li><button class="buttonDesign" onclick="$(\'#level'+ (currentLevel + 1) + '\').click(); screenChange(\'mode3D\');hideModal();">Next</button></li>'
	
	if(timeModeFlag){
		var levelSelectButton = ''
		if(level >= numLevels){
			clearInterval(timer);
			var nextLevelButton = '<li><button class="buttonDesign" onclick="endGame();hideModal();">Done!</button></li>'
		} else {
			var nextLevelButton = '<li><button class="buttonDesign" onclick="levelLoad(2,4,' + (level + 1) + '); screenChange(\'mode3D\');hideModal();">Next</button></li>'
		}
	}
	
	if(scoreModeFlag){
		var additionalInfo = '<p style="color: green; text-align: center; font-size: 50px;"> +30 seconds <br> +' + scoreBase + ' points!</p>';
		var levelSelectButton = ''
		var nextLevelButton = '<li><button class="buttonDesign" onclick="levelLoad(' 
								+ Math.floor(level/3) % 10//Minimum foldout type
								+ ',' 
								+ Math.floor((level)/2 + 1) % 10 //maximum foldout type
								+ ',' 
								+ Math.floor((level)/3 + 1)
								+ '); screenChange(\'mode3D\');hideModal();">Next</button></li>'
	}
	$('.modalContent').append('<h1>' + msg + '</h1>' 
								+ 	additionalInfo
								+ 	'<div class="bottomNav">'
								+ 		'<ul>' 
								+ 			levelSelectButton
								+ 			nextLevelButton
								+		'</ul>'
								+ 	'</div>');
	/**Insert function for completion of all levels*/
	displayModal();
}

/**
 * Will display when the user has a mismatch fold-out.
 */
function modalIncorrect() {
	var msgList = ['Incorrect!',
					'Try Again.', 
					'Don\'t Give Up!',
					'Wrong.'];
	var msg = msgList[Math.floor(Math.random() * msgList.length)];
	$('.modalContent').html('');
	var additionalInfo = '';
	var retryLevelButton = '<li><button class="buttonDesign " onclick="screenChange(\'mode3D\');hideModal();">retry</button></li>';
	var answerButton = '<li><button class="buttonDesign " onclick="screenChange(\'answerScreen\');showAnswer();hideModal();">answer</button></li>'
	
	// Is it currently on time attack mode?
	if(timeModeFlag){
		var additionalInfo = '<p style="color: red; text-align: center; font-size: 50px;"> +20 sec </p>';
		var answerButton = ''
	}
	
	// is It currently on score attack mode?
	if(scoreModeFlag){
		var additionalInfo = '<p style="color: red; text-align: center; font-size: 50px;"> -25 points!</p>';
		var answerButton = ''
	}
	$('.modalContent').append('<h1>' + msg + '</h1>' 
								+ 	additionalInfo
								+ 	'<div class="bottomNav">'
								+ 		'<ul>' 
								+ 			retryLevelButton
								+ 			answerButton
								+		'</ul>'
								+ 	'</div>');
	displayModal();
}
/**
 * Will display when the user presses the back button in game.
 */
function modalOption() {
	$('.modalContent').html('');
	$('.modalContent').append('<h1>Mini Menu</h1>' 
							+ 	'<div>'
							+ 		'<ol>' 
							+			'<li><button class="buttonDesign menuBSize" onclick="screenChange(\'mainMenu\'); hideModal(); clearTimer();">Main Menu</button></li>'
							+ 			'<li><button class="buttonDesign menuBSize" onclick="screenChange(\'levelSelect\');lockLevelButtons(); hideModal(); clearTimer();">Level Select</button></li>'
							+ 			'<li><button class="buttonDesign menuBSize" onclick="hideModal();">Cancel</button></li>'
							+		'</ol>'
							+ 	'</div>');
	
	displayModal();
}

/**
 * Set the difficulty for the game mode
 */
function compDiffSelect(mode){
	difficultyNum = 0;
	$('.modalContent').html('');
	$('.modalContent').append('<h1>Select Difficulty</h1>'
							+	'<ol>' 
							+		'<li><button id="modalStd" class="testDeadBtn menuBSize" onclick="setDifficulty(\'0\');compDiffSelectButtonChange();">Standard</button></li>'
							+		'<li><button id="modalAdv" class="buttonDesign menuBSize" onclick="setDifficulty(\'1\');compDiffSelectButtonChange();">Advance</button></li>'
							+	'</ol>'
							+	'<ol>' 							
							+		'<li><button class="buttonDesign menuBSize" onclick="screenChange(\'mode3D\'); selectMode(\'' + mode + '\');hideModal();">Start!</button></li>'
							+		'<li><button class="buttonDesign menuBSize" onclick="hideModal();">Cancel</button></li>'
							+	'</ol>');
	displayModal();
}

/**
 * Changes the game mode displayed on the button
 */
function compDiffSelectButtonChange(){
	if(difficultyNum == 0){
		$('#modalStd').replaceWith('<button id="modalStd" class="testDeadBtn menuBSize" onclick="setDifficulty(\'0\');compDiffSelectButtonChange();">Standard</button>');
		$('#modalAdv').replaceWith('<button id="modalAdv" class="buttonDesign menuBSize" onclick="setDifficulty(\'1\');compDiffSelectButtonChange();">Advance</button>');
	} else {
		$('#modalStd').replaceWith('<button id="modalStd" class="buttonDesign menuBSize" onclick="setDifficulty(\'0\');compDiffSelectButtonChange();">Standard</button>');
		$('#modalAdv').replaceWith('<button id="modalAdv" class="testDeadBtn menuBSize" onclick="setDifficulty(\'1\');compDiffSelectButtonChange();">Advance</button>');
	}
}

/**
 * The modal that appears when you unlock an achievement and displays the achievement.
 */
function achievementModal(achivementNum) {
	$('.modalContent').html('');
	var achivementName;
	var achievementImage;
	var achivementText;
	switch(achivementNum){
		case 1:
			var achievementName = '<h1>The First Step</h1>';
			var achievementImage = '<li><img src="./workspace/image/Quas.png" alt="achievement1" width="25%" height="25%"></li>';
			var achievementText = '<li><p>Solve your first cube</p></li>';
			break;
		case 2:
			var achievementName = '<h1>Scoring Big</h1>';
			var achievementImage = '<li><img src="./workspace/image/Wex.png" alt="achievement1" width="25%" height="25%"></li>';
			var achievementText = '<li><p>Score over 1000pts!</p></li>';
			break;
		case 3:
			var achievementName = '<h1>Speedy the<br>Speedster</h1>';
			var achievementImage = '<li><img src="./workspace/image/Exort.png" alt="achievement1" width="25%" height="25%"></li>';
			var achievementText = '<li><p>Solve a cube in under 30 seconds!</p></li>';
			break;
	}
	$('.modalContent').append(achievementName
							+	'<ol>' 
							+		achievementImage
							+		achievementText
							+		'<li><button class="buttonDesign menuBSize" onclick="hideModal();">Okay</button></li>'
							+	'</ol>');
	displayModal();
	
}

/**
 * Ask the user if they want to reset their progress by deleting the cookie.
 */
function resetCookieModal() {
	$('.modalContent').html('');
	$('.modalContent').append('<h1>Reset Progress?</h1>'
							+	'<ol>' 
							+		'<li><button class="buttonDesign menuBSize" onclick="resetCookies(); hideModal();">Continue</button></li>'
							+		'<li><button class="buttonDesign menuBSize" onclick="hideModal();">Cancel</button></li>'
							+	'</ol>');
	displayModal();
}