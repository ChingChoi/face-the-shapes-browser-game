var count = 0;
function tutturu(){
    var audio = new Audio('./workspace/audio/tuturu-century-fox.mp3');
    count++;
	if (count == 10) {
		audio.play();
		count = 0;
	}
	
}

setInterval(removeNavBar, 10) 

function removeNavBar() {
	/*window.scrollTo(0, 1);*/
}


function screenChange(current, next) {
	document.getElementById(next).style.display = "block";
	document.getElementById(current).style.display = "none";
}
/*
window.addEventListener("orientationchange", function() {
	if (window.innerWidth > window.innerHeight) {
		$('body').css('transform', 'rotate(90deg)');
	}
}, false);
*/