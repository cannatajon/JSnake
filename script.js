
const gameBoard = document.getElementById("gameBoard");
const boardWidth = gameBoard.offsetWidth;
const boardSizeSlider = document.querySelector('input');
let cell = document.querySelectorAll('.cell');

//let apple and snake start in first div (cell)
let currentIndex = 0;
let appleIndex = 0;
//cell with a value of 2 occupies the head, 1 the body, 0 the tail
let width = boardSizeSlider.value;
let currentSnake = [2,1,0];
let direction = 1;
let score = 0;
let speed = 0;
let intervalTime = 0;
let interval = 0;

function startGame(){
    //boardSizeSlider.disabled = true;
    currentSnake.forEach(idx => cell[idx].classList.remove('snake'));
    cell[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    direction = 1;
    intervalTime = 80;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(idx => cell[idx].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
}

function moveOutcomes(){
    let tail = currentSnake.pop();
    cell[tail].classList.remove('snake');
    currentSnake.unshift(currentSnake[0] + direction);

    if(cell[currentSnake[0]].classList.contains('fruit')){
        cell[currentSnake[0]].classList.remove('fruit');
        cell[tail].classList.add('snake');
        currentSnake.push(tail);
        randomFruit();
        score++;
        clearInterval(interval);
        intervalTime = interval * speed;
        interval = setInterval(moveOutcomes, intervalTime)
    }
    cell[currentSnake[0]].classList.add('snake')

}

//assign up/down/left/right to arrow keys and WASD
function controls(event){
    if (event.keyCode === 39){
        direction = 1;//(right arrow) snake goes right by one cell
    }
    if (event.keyCode === 38){
        direction = -newWidth();//(up arrow) snake will appear to move up (go back (x) cells depending on grid size)
    }
    if (event.keyCode === 37){
        direction = -1; //(left arrow) snake will move left by one cell
    }
    if (event.keyCode === 40){
        direction = +newWidth(); //(down arrow) snake will move down (go forward (x) cells depending on grid size)
    };
}

document.addEventListener('keydown', controls);


function drawBoard(){
    for (i=0; i<gridSize();i++){
        gameBoard.innerHTML += "<div class = 'cell'></div>";
    }

    cell = document.querySelectorAll('.cell');
    for (i=0; i<gridSize();i++){
        cell[i].style.width = cellSize()+"px";
        cell[i].style.height = cellSize()+"px";
    }
}

boardSizeSlider.addEventListener('input', changeBoardSize)

function changeBoardSize(){
     gameBoard.innerHTML = "";
     rows = parseInt(boardSizeSlider.value);
     width = parseInt(boardSizeSlider.value);
     newWidth();
     gridSize();
     cellSize();
     console.log(rows);
     console.log(width);
     drawBoard();
}

function randomFruit(){
    do{
        appleIndex = Math.floor(Math.random()* cell.length)
    }while(cell[appleIndex].classList.contains('snake'));
    console.log(cell.length);

}

function showGrid(){

    cell = document.querySelectorAll('.cell');
    gridSize();
    for (i = 0; i<gridSize(); i++){
        cell[i].style.borderColor = "white";
    }
}

function killGrid(){

    cell = document.querySelectorAll('.cell');
    gridSize();
    for (i = 0; i<gridSize(); i++){
        cell[i].style.borderColor = "black";
    }
}

let gridSize = function getGridSize(){
    let rows = boardSizeSlider.value;
    return rows * rows;
}

let cellSize = function getCellSize(){
    let rows = boardSizeSlider.value;
    return boardWidth / rows - 2;
}

let newWidth = function getWidth(){
    return boardSizeSlider.value;
}




console.log(gameBoard.offsetWidth)
console.log(cell)


drawBoard();