/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(document).ready(function(){
    theScreen = $('#gamescreen');
});

/**
 * 
 * @returns {undefined}
 */
function getMenuScreen(){
    //Change all html in gamescreen to none
    clearScreen();
    theScreen.append('<h1 class="title">Face The Shapes</h1>'+
            '<button id="classicMode" class="menuButton" onclick="get3DScreen()">Classic Mode</button>'+
            '<button id="scoreMode" class="menuButton">Score Mode</button>'+
            '<button id="timeMode" class="menuButton">Time Mode</button>'+
            '<button id="backtomain" class="menuButton" onclick="mainMenu()">Back</button>');
}
/**
 * mainMenu clears the screen then reconstructs the main menu by appending
 *          the original menu html to the screen.
 * @returns {undefined}
 */
function mainMenu(){
    clearScreen();
    theScreen.append('<h1 class="title">Face The Shapes</h1>\n\
            <img class="center" src="img/cube.png" width="120" height="120">\n\
            <button id="play" class="menuButton" onclick="getMenuScreen()">Play</button>');
}
/**
 * get3DScreen moves the user to the 3D model page
 * @returns {undefined}
 */
function get3DScreen() {
    clearScreen();
    theScreen.append('<div id="cubeContainer">' + 
        '<p>pitch = <span id="pitch">0</span>deg<br/>' +
           'yawn = <span id="yawn">0</span>deg</p>' +
          '<button onclick="unfold()"><span id="folding">Unfold</span></button>' +
        '<!-- Actual 3d cube faces contained using div -->' +
        '<div id="cube">' +
            '<div class="front"><img src="img/arrows/images.png" alt="arrow"></div>'+
            '<div class="back"><img src="img/arrows/images.png" alt="arrow"></div>'+
            '<div class="right"><img src="img/arrows/images.png" alt="arrow"></div>'+
            '<div class="left"><img src="img/arrows/images.png" alt="arrow"></div>'+
            '<div class="top"><img src="img/arrows/images.png" alt="arrow"></div>'+
            '<div class="bottom"><img src="img/arrows/images.png" alt="arrow"></div>'+
        '</div>'+
        '</div>')
    theScreen.append('<button id="mode2d" class="toprightbutton" onclick="get2DScreen()">2D</button>');
    theScreen.append('<button id="backtomain" class="menuButton" onclick="mainMenu()">Back</button>');
}

function get2DScreen(){
    clearScreen();
    theScreen.append('<button id="mode3d" class="toprightbutton" onclick="get3DScreen()">3D</button>');
    foldoutT();
    theScreen.append('<button id="backtomain" class="menuButton" onclick="mainMenu()">Back</button>');
}
/**
 * clearScreen clears the game screen of all html elements
 * @returns {undefined}
 */
function clearScreen(){
    theScreen.html('');
}

document.onmousedown    = mouseDown;
document.onmouseup      = mouseUp;
document.onmousemove    = mouseMove;

var mouseDownID         = -1;
var x                   = 0;
var y                   = 0;
var startX              = 0;
var startY              = 0;
var yawn                = 0;
var pitch               = 0;
var addYawn             = 0;
var addPitch            = 0;
var stopYawn            = 0;
var stopPitch           = 0;
var unfolded            = 0;
var front_rX            = 0;
var front_rY            = 0;
var front_rZ            = 0;
var back_rX             = 0;
var back_rY             = 0;
var back_rZ             = 0;
var right_rX            = 0;
var right_rY            = 0;
var right_rZ            = 0;
var left_rX             = 0;
var left_rY             = 0;
var left_rZ             = 0;
var top_rX              = 0;
var top_rY              = 0;
var top_rZ              = 0;
var bottom_rX           = 0;
var bottom_rY           = 0;
var bottom_rZ           = 0;
var unfolded            = false;
var alignBreak          = 0;
var unfoldingBegin;
var foldingBegin;
var translate           = 0;

/* Translate current X and Y position when mouse clicked into starting x and
   y rotation point for pitch and yawn. Also calls the function rotate.*/
function mouseDown(e) {
    if (mouseDownID == -1) {
        startX      = e.clientX - innerWidth/2;
        startY      = e.clientY - innerHeight/2;
        mouseDownID = setInterval(rotate, 10);
    }
}

/* Clear the interval of function rotate upon mouse release. Also update the
   x and y rotation point.*/
function mouseUp(e) {

    if (mouseDownID != -1) {
        clearInterval(mouseDownID);
        mouseDownID = -1;
        startX      = e.clientX - innerWidth/2;
        startY      = e.clientY - innerHeight/2;
    }
}

/* Translate current X and Y position into rotating point all the time as 
   the mouse move.*/
function mouseMove(e) {
    
    x           = startX - (e.clientX - innerWidth/2);
    y           = startY - (e.clientY - innerHeight/2);

    addYawn     = x / innerWidth * 180;
    addPitch    = y / innerHeight * 180;

    startX      = e.clientX - innerWidth/2;
    startY      = e.clientY - innerHeight/2;
}

/* Rotating the cube based on mouse X and Y position changes as the mouse is
   pressed down and moves.*/
function rotate() {
    // Only add the addYawn to yawn if the mouse has moved while pressed
    if (stopYawn != addYawn) {
        yawn        += addYawn;
        stopYawn     = addYawn;
    }

    // Only add the addPitch to pitch if the mouse has moved while pressed
    if (stopPitch != addPitch) {
        pitch       += addPitch;
        stopPitch    = addPitch;
    }
    
    // Check to see if the cube is folded or not, and rotate accordingly
    if (unfolded === false) {
    
        front_rX    = 0     + pitch;
        front_rY    = 0     - yawn;
        back_rX     = 180   + pitch;
        back_rY     = 0     + yawn;
        right_rX    = 0     + pitch;
        right_rY    = 90    - yawn;
        left_rX     = 0     + pitch;
        left_rY     = -90   - yawn;
        top_rX      = 90    + pitch;
        top_rZ      = 0     + yawn;
        bottom_rX   = -90   + pitch;
        bottom_rZ   = 0     - yawn;

        applyRotation();

    } else if (unfolded === true) {

        front_rX    = 0     + pitch;
        front_rY    = 0     - yawn;
        back_rX     = 180   + pitch     - alignBreak * 2;
        back_rY     = 0     - yawn;
        right_rX    = 0     + pitch;
        right_rY    = 90    - yawn      - alignBreak;
        left_rX     = 0     + pitch;
        left_rY     = -90   - yawn      + alignBreak;
        top_rX      = 90    + pitch     - alignBreak;
        top_rZ      = 0;
        top_rY      = 0     - yawn;
        bottom_rX   = -90   + pitch     + alignBreak;
        bottom_rZ   = 0;
        bottom_rY   = 0     - yawn;

        applyRotation();
    }
}

/* Applying the rotation to the cube according to the global variables */
function applyRotation() {

    document.querySelector('#cube .front').style.transform  = 'rotateX( '
        + front_rX +'deg ) rotateY( '+ front_rY +'deg ) rotateZ( '+ front_rZ 
        +'deg ) translateZ( 50px )';
    document.querySelector('#cube .back').style.transform   = 'rotateX( '
        + back_rX +'deg ) rotateY( '+ back_rY +'deg ) rotateZ( '+ back_rZ 
        +'deg ) translateZ( 50px ) translateY( ' + (translate * 2) + 'px )';
    document.querySelector('#cube .right').style.transform  = 'rotateX( '
        + right_rX +'deg ) rotateY( '+ right_rY +'deg ) rotateZ( '+ right_rZ 
        +'deg ) translateZ( 50px ) translateX( ' + translate + 'px ) ';
    document.querySelector('#cube .left').style.transform   = 'rotateX( '
        + left_rX +'deg ) rotateY( '+ left_rY +'deg ) rotateZ( '+ left_rZ 
        +'deg ) translateZ( 50px ) translateX( -' + translate + 'px ) ';
    document.querySelector('#cube .top').style.transform    = 'rotateX( '
        + top_rX +'deg ) rotateY( '+ top_rY +'deg ) rotateZ( '+ top_rZ 
        +'deg ) translateZ( 50px ) translateY(-' + translate + 'px)';
    document.querySelector('#cube .bottom').style.transform = 'rotateX( '
        + bottom_rX +'deg ) rotateY( '+ bottom_rY +'deg ) rotateZ( '
        + bottom_rZ +'deg ) translateZ( 50px ) translateY('+translate+'px)';
    document.getElementById('pitch').innerHTML  = (pitch*100+.5|0) / 100;
    document.getElementById('yawn').innerHTML   = (yawn*100+.5|0) / 100;
}

function unfold() {

    if (unfolded === false) {
        unfoldingBegin = setInterval('unfolding();', 2);
    } else if (unfolded === true) {
        foldingBegin = setInterval('folding();', 2);
    }
}

function unfolding() {
    if (Math.floor(pitch) != 0 || Math.floor(yawn) != 0) {
        pitch   = 0;
        yawn    = 0;                
    } else if (unfolded === false) {
        
        if (alignBreak < 90) {
                alignBreak++;

            if (translate < 20) {
                translate = 22;
            } else {
                translate += 2;
            }

            front_rX    = 0     + pitch;
            front_rY    = 0     - yawn;
            back_rX     = 180   + pitch     - alignBreak * 2;
            back_rY     = 0     - yawn;
            right_rX    = 0     + pitch;
            right_rY    = 90    - yawn      - alignBreak;
            left_rX     = 0     + pitch;
            left_rY     = -90   - yawn      + alignBreak;
            top_rX      = 90    + pitch     - alignBreak;
            top_rZ      = 0;
            top_rY      = 0     - yawn;
            bottom_rX   = -90   + pitch     + alignBreak;
            bottom_rZ   = 0;
            bottom_rY   = 0     - yawn;

            applyRotation();
        } else {
            unfolded = true;
            clearInterval(unfoldingBegin);
            document.getElementById("folding").innerHTML = "fold";
        }
    }
}

function folding() {

    if (Math.floor(pitch) != 0 || Math.floor(yawn) != 0) {
        pitch   = 0;
        yawn    = 0;                
    } else if (unfolded === true) {
        
        if (alignBreak > 0) {
            alignBreak--;

            if (translate > 180) {
                translate = 178;
            } else {
                translate -= 2;
            }

            front_rX    = 0     + pitch;
            front_rY    = 0     - yawn;
            back_rX     = 180   + pitch     - alignBreak * 2;
            back_rY     = 0     - yawn;
            right_rX    = 0     + pitch;
            right_rY    = 90    - yawn      - alignBreak;
            left_rX     = 0     + pitch;
            left_rY     = -90   - yawn      + alignBreak;
            top_rX      = 90    + pitch     - alignBreak;
            top_rZ      = 0;
            top_rY      = 0     - yawn;
            bottom_rX   = -90   + pitch     + alignBreak;
            bottom_rZ   = 0;
            bottom_rY   = 0     - yawn;

            applyRotation();

        } else {
            unfolded = false;
            clearInterval(foldingBegin);
            document.getElementById("folding").innerHTML = "unfold";
        }
    }
}