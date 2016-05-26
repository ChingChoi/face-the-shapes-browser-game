
/**
 * Fade in the modal.
 */
function modalFadeIn() {
	$('#modalBox').fadeIn(400);
}

/**
 * Face out the modal.
 */
function modalFadeOut() {
	$('#modalBox').fadeOut(400);
}

/** 
 * Will display the modal. 
 */
function displayModal() {
    modalFadeIn();
	var timer = setTimeout(function() {document.getElementById('modalBox').style.display = 'block';}, 400);
}

/** 
 * Will hide the modal. 
 */
function hideModal() {
	modalFadeOut();
	var timer = setTimeout(function() {document.getElementById('modalBox').style.display = 'none';}, 400);
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
	var msgList = ['Well done. Here come the test results: "You are a horrible person." That\'s what it says. We weren\'t even testing for that.', 
				'You did it!', 
				'*Generic congratulatory Message*', 
				'Well Done.']
	var msg = msgList[Math.floor(Math.random() * msgList.length)];
	$('.modalContent').html('');
	var additionalInfo = '';
	var levelSelectButton = '<li><button class="buttonDesign menuBSize" onclick="screenChange(\'levelSelect\');hideModal();">Level List</button></li>';
	var nextLevelButton = '<li><button class="buttonDesign menuBSize" onclick="$(\'#level'+ currentlevel + '\').click(); screenChange(\'mode3D\');hideModal();">Next Level</button></li>'
	
	if(timeModeFlag){
		var levelSelectButton = ''
		var nextLevelButton = '<li><button class="buttonDesign menuBSize" onclick="levelLoad(2,4,' + (level + 1) + '); screenChange(\'mode3D\');hideModal();">Next Level</button></li>'
	}
	
	if(scoreModeFlag){
		var additionalInfo = '<p style="color: green;"> +30 seconds <br> +' + scoreBase + ' points!</p>';
		var levelSelectButton = ''
		var nextLevelButton = '<li><button class="buttonDesign menuBSize" onclick="levelLoad(' 
								+ Math.floor(level/3) % 10//Minimum foldout type
								+ ',' 
								+ Math.floor((level)/2 + 1) % 10 //maximum foldout type
								+ ',' 
								+ Math.floor((level)/3 + 1)
								+ '); screenChange(\'mode3D\');hideModal();">Next Level</button></li>'
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
	var msgList = ['You failed it!'];
	var msg = msgList[Math.floor(Math.random() * msgList.length)];
	$('.modalContent').html('');
	var additionalInfo = '';
	var retryLevelButton = '<li><button class="buttonDesign menuBSize" onclick="screenChange(\'mode3D\');hideModal();">retry</button></li>';
	var answerButton = '<li><button class="buttonDesign menuBSize" onclick="screenChange(\'answerScreen\');showAnswer();hideModal();">answer</button></li>'
	
	if(timeModeFlag){
		var additionalInfo = '<p style="color: red;"> +20 seconds!</p>';
		var answerButton = ''
	}
	
	if(scoreModeFlag){
		var additionalInfo = '<p style="color: red;"> -25 points!</p>';
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
							+			'<li><button class="buttonDesign menuBSize" onclick="screenChange(\'mainMenu\'); hideModal();">Main Menu</button></li>'
							+ 			'<li><button class="buttonDesign menuBSize" onclick="screenChange(\'levelSelect\'); hideModal();">Level Select</button></li>'
							+ 			'<li><button class="buttonDesign menuBSize" onclick="hideModal();">Cancel</button></li>'
							+		'</ol>'
							+ 	'</div>');
	
	displayModal();
}
/* Work In progress */
function modalArrow() {
	$('.modalContent').html('');
	$('.modalContent').append('<h1>Select Arrow</h1>' 
							+ 	'<div id="arrowBox">'
							+ 		'<table>' 
							+ 			'<tr>'
							+				'<td></td>'
							+				'<td><div id="modalArrow1" onclick=""><img src="./workspace/image/arrow3.png"></div></td>'
							+				'<td></td>'
							+			'</tr>'
							+ 			'<tr>'
							+				'<td><div id="modalArrow2" onclick=""><img src="./workspace/image/arrow3.png"></div></td>'
							+				'<td></td>'
							+				'<td><div id="modalArrow3" onclick=""><img src="./workspace/image/arrow3.png"></div></td>'
							+			'</tr>'
							+ 			'<tr>'
							+				'<td></td>'
							+				'<td><div id="modalArrow4" onclick=""><img src="./workspace/image/arrow3.png"></div></td>'
							+				'<td></td>'
							+			'</tr>'
							+		'</table>'
							+ 	'</div>');
	
	displayModal();
}

function compDiffSelect(mode){
	difficultyNum = 0;
	$('.modalContent').html('');
	$('.modalContent').append('<ul>' 
							+ '<li><button class="buttonDesign menuBSize setDifficulty" onclick="setDifficulty();">Standard</button></li>'
							+ '<li><button class="buttonDesign menuBSize" onclick="screenChange(\'mode3D\'); selectMode(\'' + mode + '\');hideModal();">Start!</button></li>'
							+ '</ul>');
	displayModal();
}