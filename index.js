const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const GAMESTATE = {
    GAMEOVER: 0,
    RUNNING: 1,
    PAUSE: 2,
}

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let changedDirection = false;
const soundGulp = new Audio("gulp.mp3");

let speed = 7;
let headY = 10;
let headX = 10;
let snakeParts = [];
let tailLength = 2;

let xVelocity=0;
let yVelocity=0;

let score = 0;

let appleX = 5;
let appleY = 5;



//gameloop
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result) return;

    clearScreen();
    checkAppleCollition();
    drawApple();
    drawSnake();
    drawScore();
    difficultyIncrease();

    changedDirection = false;

    setTimeout(drawGame, 1000/ speed);
}

function difficultyIncrease(){
    if(score > 10) speed = 8; 
    if(score > 20) speed = 9; 
    if(score > 30) speed = 10; 
    if(score > 40) speed = 11; 
    if(score > 50) speed = 12;
    if(score > 60) speed = 13;
}

function isGameOver(){
    let gameOver = false;
    // check if game is started - dont game over before the snake starts to move
    if (xVelocity === 0 && yVelocity === 0) return;
    //walls
    if(headX < 0) gameOver = true;
    if(headX >= tileCount) gameOver = true;
    if(headY < 0) gameOver = true;
    if(headY >= tileCount) gameOver = true;

    //body
    snakeParts.forEach(part => {
        if(part.x === headX && part.y === headY){
            gameOver = true;
        } 
        
    })

    if(gameOver){
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2 + 25);
    }
    
    return gameOver;
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.width);
}

function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 20);
}

function drawSnake(){
    // draw all the snakeparts
    ctx.fillStyle = "green";
    for(let i=0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    
    // Move snake part 1:  add a new snakepart where the head is
    snakeParts.push(new SnakePart(headX, headY)); //put item at the end of he list, at the spot whre the head is.
    
    // Move snake part 2: remove the last section of the snakepart (tail), so the snake has the same length after adding a new part
    if(snakeParts.length > tailLength){
        snakeParts.shift(); //remove the furthest from the snake (first)  
    }

    // Draw the snake head.
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}



function drawApple(){
    ctx.fillStyle = "red";
    ctx.fillRect(appleX*tileCount, appleY* tileCount, tileSize, tileSize);
}

function checkAppleCollition(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
        soundGulp.play();
    }
}

function gameStart(){
    speed = 7;
    headY = 10;
    headX = 10;
    snakeParts = [];
    tailLength = 2;

    xVelocity=0;
    yVelocity=0;

    score = 0;

    appleX = 5;
    appleY = 5;
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){
    //spacebar - restart
    // if(gamestate = GAMESATATE.GAMEOVER){
    //     if(event.keyCode == 32){
    //         gameStart();
    //     }
    // }
    
    //check if direction is changed on the frame - stop from going back into the snake and game over.
    if(changedDirection) return;
    if(event.keyCode == 38){
        if(yVelocity == 1) return // prevent to go backwards
        yVelocity = -1;
        xVelocity = 0;
    }
    //down
    if(event.keyCode == 40){
        if(yVelocity == -1) return // prevent to go backwards
        yVelocity = 1;
        xVelocity = 0;
    }

    //left
    if(event.keyCode == 37){
        if(xVelocity == 1) return // prevent to go backwards
        yVelocity = 0;
        xVelocity = -1;
    }
    //right
    if(event.keyCode == 39){
        if(xVelocity == -1) return // prevent to go backwards
        yVelocity = 0;
        xVelocity = 1;
    }
    changedDirection = true;
}

drawGame();

