
const gameBoard = document.getElementById("gameBoard");
const boardWidth = gameBoard.offsetWidth;
const boardSizeSlider = document.querySelector('input');
const speedSlider = document.querySelector('#mySpeed');
let cell = document.querySelectorAll('.cell');
let scoreOutput = document.querySelector('#score');
let speedOutput = document.querySelector('#speedCounter');
let gridButton = document.querySelector('#gridButton');
let sfxButton = document.querySelector('#soundButton')
let eatFruitSound = new Audio ('sounds/fruit2.wav');
let gameOverSound = new Audio ('sounds/gameOver.wav')

//let apple and snake start in first div (cell)
let appleIndex = 0;
//cell with a value of 2 occupies the head, 1 the body, 0 the tail
let width = boardSizeSlider.value;
let currentSnake = [2,1,0];
let direction = 1;
let score = 0;
let speed = speedSlider.value;
let intervalTime = 0;
let interval = 0;
let showGridOnScreen = true;
let sfx = true;

function startGame(){
    drawBoard();
    firstFruit();
    changeBoardSize()
    appleIndex = firstFruit()
    currentSnake.forEach(idx => cell[idx].classList.remove('snake'));
    cell[appleIndex].classList.remove('fruit');
    clearInterval(interval);
    score = 0;
    scoreOutput.innerText = score;
    direction = 1;
    intervalTime = 1000 / speed;
    currentSnake = [2,1,0];
    currentSnake.forEach(idx => cell[idx].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes(){

    if(currentSnake[0] + width >= (width * width) && direction == +width){
        gameOver();
    }
    else if (currentSnake[0] % width == width -1 && direction == 1){
        gameOver();
    }
    else if (currentSnake[0] % width == 0 && direction == -1){
        gameOver();
        
    }
    else if (currentSnake[0] - width < 0 && direction == -width){
        gameOver();
        
    }
    else if(cell[currentSnake[0] + direction].classList.contains('snake')){
        gameOver();
    }

    currentSnake.unshift(currentSnake[0] + direction);
    let tail = currentSnake.pop();
    cell[tail].classList.remove('snake');
    cell[appleIndex].classList.add('fruit');
    

    if(cell[currentSnake[0]].classList.contains('fruit')){
        if(sfx){
            eatFruitSound.play();
        }
        cell[currentSnake[0]].classList.remove('fruit');
        cell[tail].classList.add('snake');
        currentSnake.push(tail);
        randomFruit();
        score++;
        scoreOutput.innerText = score;
        

    }
    cell[currentSnake[0]].classList.add('snake')

}

//assign up/down/left/right to arrow keys and WASD
function controls(event){
    if (event.keyCode === 32){
        startGame();
    }
    if (direction != -1 && event.keyCode === 39){
        direction = 1;//(right arrow) snake goes right by one cell
    }
    if (direction != +newWidth() && event.keyCode === 38 ){
        direction = -newWidth();//(up arrow) snake will appear to move up (go back (x) cells depending on grid size)
    }
    if (direction != 1 && event.keyCode === 37){
        direction = -1; //(left arrow) snake will move left by one cell
    }
    if (direction != -newWidth() && event.keyCode === 40 && direction != -newWidth()){
        direction = +newWidth(); //(down arrow) snake will move down (go forward (x) cells depending on grid size)
    };
}

document.addEventListener('keydown', controls);


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

function firstFruit(){
    return appleIndex = Math.floor(Math.random()* cell.length);
}



function randomFruit(){
    do{
        appleIndex = Math.floor(Math.random()* cell.length);
    }
    while(cell[appleIndex].classList.contains('snake'));
    console.log(cell.length);

}

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

function gridOn(){
    if (showGridOnScreen){
        for (i = 0; i<gridSize(); i++){
            cell[i].style.borderColor = "rgba(230, 230, 233, .2)";
        }
    }

}

function gameOver(){
    if(sfx){
        gameOverSound.play();
        }
    currentSnake.shift();
    clearInterval(interval);

}

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

console.log(gameBoard.offsetWidth)
console.log(cell)
drawBoard()
