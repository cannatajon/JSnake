
//initial variable declarations

const gameBoard = document.getElementById("gameBoard");
const boardWidth = gameBoard.offsetWidth;
const boardSizeSlider = document.querySelector('#myRange');
const speedSlider = document.querySelector('#mySpeed');
let cell = document.querySelectorAll('.cell');
let snakeOptions = document.querySelector('#snakeOptions');
let scoreOutput = document.querySelector('#score');
let speedOutput = document.querySelector('#speedCounter');
let gridButton = document.querySelector('#gridButton');
let sfxButton = document.querySelector('#soundButton');
let musicButton = document.querySelector('#musicButton');
let overlay = document.querySelector('#overlay');
let gotItBtn = document.querySelector('#gotIt');
let enterName = document.querySelector('#initials');
let snakeSelect = document.querySelectorAll('#snakeChoice');
let lostGameOutput = document.querySelector('#lostGameMessage');
let leaderBoard = document.querySelector('#leaderboard');
let snakeColor = 'snake';
let selectedSnake = document.querySelector('#selectedSnake');
let appleIndex = 0;
let width = boardSizeSlider.value;
let currentSnake = [2,1,0];
let direction = 1;
let score = 0;
let speed = speedSlider.value;
let intervalTime = 0;
let interval = 0;
let showGridOnScreen = false;
let sfx = true;
let music = true;
let gameActive = false;
let scoreBoard = [0,0,0,0,0];
let eatFruitSound = new Audio ('sounds/fruit2.wav');
let gameOverSound = new Audio ('sounds/gameOver.wav');
let backgroundMusic = new Audio ('sounds/background.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;
eatFruitSound.volume = 0.3;
backgroundMusic.mut



function startGame(){
    gameActive = true;
    hideOptions();
    drawBoard();
    changeBoardSize();
    initialize();
}

function initialize(){
    if (music){
        backgroundMusic.play();
    }
    appleIndex = firstFruit();
    currentSnake.forEach(idx => cell[idx].classList.remove(snakeColor));
    cell[appleIndex].classList.remove('fruit');
    score = 0;
    scoreOutput.innerText = score;
    direction = 1;
    intervalTime = 1000 / speed;
    currentSnake = [2,1,0];
    currentSnake.forEach(idx => cell[idx].classList.add(snakeColor));
    interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes(){

    //checks for end game states
    if( 
        (currentSnake[0] + width >= (width * width) && direction == +width) || //snake hits bottom of board
        (currentSnake[0] % width == width -1 && direction == 1) || //snake hits right side of board
        (currentSnake[0] % width == 0 && direction == -1) || //snake hits left side of board
        (currentSnake[0] - width < 0 && direction == -width) || //snake hits top of board
        (cell[currentSnake[0] + direction].classList.contains(snakeColor)) //snake hits istself
    ){
        gameOver();
        lostMessage();
    }


    //manipulates array depending on direction
    currentSnake.unshift(currentSnake[0] + direction);
    let tail = currentSnake.pop();
    cell[tail].classList.remove(snakeColor)

    //assigns fruit to random spot on board
    cell[appleIndex].classList.add('fruit');
    
    //reasigns fruit to new spot on board on colision with snake head
    if(cell[currentSnake[0]].classList.contains('fruit')){
        if(sfx){
            eatFruitSound.play();
        }
        //pushes new item to array of snake on collision with fruit
        cell[tail].classList.add(snakeColor);
        cell[currentSnake[0]].classList.remove('fruit');
        currentSnake.push(tail);
        randomFruit();
        score++;
        scoreOutput.innerText = score;
    }
    cell[currentSnake[0]].classList.add(snakeColor)

}

//assign arrow keys to control direction
function controls(event){

    if (event.keyCode === 32){
        event.preventDefault();
        startGame();
    }
    if (direction != -1 && event.keyCode === 39){
        event.preventDefault();
        direction = 1;//(right arrow) snake goes right by one cell
    }
    if (direction != +newWidth() && event.keyCode === 38 ){
        event.preventDefault();
        direction = -newWidth();//(up arrow) snake will appear to move up (go back (x) cells depending on grid size)
    }
    if (direction != 1 && event.keyCode === 37){
        event.preventDefault();
        direction = -1; //(left arrow) snake will move left by one cell
    }
    if (direction != -newWidth() && event.keyCode === 40){
        event.preventDefault();
        direction = +newWidth(); //(down arrow) snake will move down (go forward (x) cells depending on grid size)
    };

    //log player to leaderboard
    if(event.keyCode === 13){
        event.preventDefault();
        leaderInput();
        if(enterName.value){
            enterName.style.display = 'none'
        }
        enterName.value = '';
    }
}

document.addEventListener('keydown', controls);


//creates board dynamically based on user decided rows
function drawBoard(){

     gameBoard.innerHTML = "";
    for (i=0; i<gridSize();i++){
        gameBoard.innerHTML += `<div class = 'cell'></div>`;
    }

    cell = document.querySelectorAll('.cell');
    for (i=0; i<gridSize();i++){
        cell[i].style.width = cellSize()+"px";
        cell[i].style.height = cellSize()+"px";
    }
    firstFruit()
    gridOn();
    score = 0;
    scoreOutput.innerText = score;
    
}

boardSizeSlider.addEventListener('input', changeBoardSize);

//readjusts board if user changes board size (rows)
function changeBoardSize(){
     gameBoard.innerHTML = "";
     rows = parseInt(boardSizeSlider.value);
     width = parseInt(boardSizeSlider.value);
     drawBoard();
     document.querySelector('#rowCounter').innerText = boardSizeSlider.value;
     currentSnake = [2,1,0];
     appleIndex = 3;
     score = 0;
     return clearInterval(interval);
}

//randomizes initial index of fruit
function firstFruit(){
    return appleIndex = Math.floor(Math.random()* cell.length);
}


//changes index of fruit while an index of snake shares the same class of fruit
function randomFruit(){
    do{
        appleIndex = Math.floor(Math.random()* cell.length);
    }
    while(cell[appleIndex].classList.contains(snakeColor));

}

//visualizes grid on screen
function showGrid(){

    cell = document.querySelectorAll('.cell');
    gridSize();

    if (!showGridOnScreen){

        for (i = 0; i<gridSize(); i++){
            cell[i].style.borderColor = "rgba(230, 230, 233, .2)";
        }
        showGridOnScreen = true;
        gridButton.style.backgroundColor = "blue"
    } else{
        for (i = 0; i<gridSize(); i++){
            cell[i].style.borderColor = "rgba(230, 230, 233, 0)";
        }
        showGridOnScreen = false;
        gridButton.style.backgroundColor = "red"
    }
}

//keeps grid visualized on slide readjustment
function gridOn(){
    if (showGridOnScreen){
        for (i = 0; i<gridSize(); i++){
            cell[i].style.borderColor = "rgba(230, 230, 233, .2)";
        }
    }

}

//if snake dies, reassigns snake to original array
function gameOver(){
    gameActive = false;
    if(sfx){
        gameOverSound.play();
        }

    currentSnake.shift();
    gameActive = false;

    snakeSelect.forEach(elem => {
        elem.style.display = 'flex';
    })
    boardSizeSlider.style.display = 'block';
    speedSlider.style.display = 'block';
    enterName.value = "";
    enterName.style.display = "block";
    clearInterval(interval);

}

//checks for sound effects toggle, mutes/unmutes
function playSFX(){
    if (sfx){
        sfxButton.style.backgroundColor = "red";
        sfx = false;
    }
    else{
        sfxButton.style.backgroundColor = "blue";
        sfx = true;
    }
}

function playMusic(){
    if (backgroundMusic.paused){
        backgroundMusic.play();
        music = true;
        musicButton.style.backgroundColor = "blue";
    }else{
        backgroundMusic.pause();
        music = false;
        musicButton.style.backgroundColor = "red";
    }
}


let gridSize = function getGridSize(){
    let rows = boardSizeSlider.value;
    return rows * rows;
}

let cellSize = function getCellSize(){
    let rows = boardSizeSlider.value;
    return boardWidth / rows;
}

let newWidth = function getWidth(){
    return boardSizeSlider.value;
}

speedSlider.addEventListener('input', changeSpeed)

function changeSpeed(){
    speed = speedSlider.value
    speedOutput.innerHTML = speed;
}

snakeOptions.addEventListener('click', snakeChoice)
gotItBtn.addEventListener('click',()=>{overlay.style.display = 'none'});

function snakeChoice(e){
    if (e.target.id == 'red'){
        snakeColor = "red";
        selectedSnake.innerText = 'Hector';
    }else if (e.target.id == 'blue'){
        snakeColor = "blue"
        selectedSnake.innerText = 'Stacy';
    }else if (e.target.id == 'orange'){
        snakeColor = "orange"
        selectedSnake.innerText = 'Sam';
    }else if (e.target.id == 'yellow'){
        snakeColor = "yellow"
        selectedSnake.innerText = 'Becka';
    }else{
        snakeColor = 'snake'
        selectedSnake.innerText = 'Jared';
    }
}

//shows losing message on loss
function lostMessage(){
    lostGameOutput.style.display = 'flex';
}

//on game play, user options get hidden
function hideOptions(){
    if(gameActive){
        snakeSelect.forEach(elem => {
            elem.style.display = 'none';
        })
        boardSizeSlider.style.display = 'none';
        speedSlider.style.display = 'none';
    }
    lostGameOutput.style.display = 'none';
    overlay.style.display = 'none';
}

function leaderInput(){
    if(enterName.value){
        leaderBoard.innerHTML += `<div id='nameScore'><p>${enterName.value}</p> <span id='dots'></span> <p>${score}</p></div>`;
        }
    }

    




drawBoard();
