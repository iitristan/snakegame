var blockSize = 35;
var rows = 20;
var cols = 20;
var board;
var context;

var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

var pointX;
var pointY;

let scoreBoard = 0;
const textElement = document.getElementById('point-Number');

var gameOver = false;

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    pointSpawn();
    document.addEventListener("keyup", changeDirection);
    setInterval(update, 1000 / 10); //every 100 ml
}

function update() {

    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(pointX, pointY, blockSize, blockSize);

    if (snakeX == pointX && snakeY == pointY) {
        snakeBody.push([pointX, pointY])
        pointSpawn();
        console.log(scoreBoard);
        scoreBoard += 1;
        textElement.innerHTML = scoreBoard;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX > cols * blockSize - 1 || snakeY < 0 || snakeY > rows * blockSize - 1) {
        gameOver = true;
        alert("Ew! You lost! :(");
        window.location.reload(true);
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Oops! You lost!");
            window.location.reload(true);
        }
    }
}


function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

function pointSpawn() {
    pointX = Math.floor(Math.random() * cols) * blockSize;
    pointY = Math.floor(Math.random() * rows) * blockSize;
}