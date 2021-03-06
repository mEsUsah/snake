import Apple from './apple';
import InputHandler from './input';
import Snake from './snake';
import menu from './menu';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    MENU_SETTINGS:21,
    GAMEOVER: 4,
}

const INPUT = {
    UP: 1,
    DOWN: 2,
    LEFT: 3,
    RIGHT: 4,
    ENTER: 5,
    PAUSE: 6
}

export default class Game{
    constructor(gameWidth, gameHeight){
        this.snake = new Snake(this);
        this.apple = new Apple(this);
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.tileCount = 20;
        this.tileSize = this.gameWidth / this.tileCount - 2;
        this.changedDirection = false;
        
        this.fourDimensions = 0;
        this.speed = 0;

        this.menuSelect = 1;
        this.difficulty = 2;
        this.startSpeed = 7
        this.applesPrScreen = 2;

        this.apples = [];
        this.gameState = GAMESTATE.MENU;

        new InputHandler(this, GAMESTATE, INPUT);
    }

    start(){
        this.speed = this.startSpeed;
        this.score = 0;
        this.apples = [new Apple(this)];
        this.snake = new Snake(this);
        switch(this.difficulty){
            case 1: // easy
                this.speed = 3;
                this.applesPrScreen = 1;
                this.speedIncrement = 1;
                this.pointsPrApple = 1;
                break;
            case 2: // Normal
                this.speed = 6;
                this.applesPrScreen = 2;
                this.speedIncrement = 1.5;
                this.pointsPrApple = 2;
                break;
            case 3: // Hard
                this.speed = 8;
                this.applesPrScreen = 3;
                this.speedIncrement = 1.5;
                this.pointsPrApple = 3;
                break;
        }
        this.gameState = GAMESTATE.RUNNING;
    }

    update(){
        this.changedDirection = false;
        if (this.gameState == GAMESTATE.RUNNING){
            this.snake.updateSnakePosition(this);
            if(this.snake.reflexSaverWall == true || this.snake.reflexSaverTail == true) return;
            this.apple.checkAppleCollision(this);
            this.apple.removeEatenApples(this);
            this.apple.addApples(this);
            this.isGameOver();
        }
    }

    draw(ctx){
        if(this.snake.reflexSaverWall == true || this.snake.reflexSaverTail == true) return;
        this.clearScreen(ctx);
        this.apple.drawApple(ctx, this);
        this.snake.drawSnake(ctx, this, GAMESTATE);
        this.drawScore(ctx);
        menu(ctx, this, GAMESTATE);
        
    }

    speedIncrease(){
        if(this.score == this.difficulty*5) this.speed += this.speedIncrement; 
        if(this.score == this.difficulty*10) this.speed += this.speedIncrement; 
        if(this.score == this.difficulty*20) this.speed += this.speedIncrement; 
        if(this.score == this.difficulty*40) this.speed += this.speedIncrement; 
        if(this.score == this.difficulty*80) this.speed += this.speedIncrement;
        if(this.score == this.difficulty*160) this.speed += this.speedIncrement;
    }
    
    isGameOver(){
        let gameOver = false;
        // check if game is started - dont game over before the snake starts to move
        if (this.snake.velocity.x === 0 && this.snake.velocity.y === 0) return;
        //walls
            if(this.snake.position.x < 0) gameOver = true;
            if(this.snake.position.x >= this.tileCount) gameOver = true;
            if(this.snake.position.y < 0) gameOver = true;
            if(this.snake.position.y >= this.tileCount) gameOver = true;

    
        //body
        this.snake.snakeParts.forEach(part => {
            if(part.position.x === this.snake.position.x && part.position.y === this.snake.position.y){
                gameOver = true;
            } 
            
        })
        if(gameOver) this.gameState = GAMESTATE.GAMEOVER;
    }
    
    clearScreen(ctx){
        if(document.fullscreenElement){ // Add border if fullscreen
            ctx.fillStyle = "red";
            ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
            ctx.fillStyle = "black";
            ctx.fillRect(2,2,this.gameWidth-4, this.gameWidth-4);
        } else {
            ctx.fillStyle = "black";
            ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
        }
    }
    
    drawScore(ctx){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, 10, this.gameHeight - 10);
    }

    playGulp(){
        let soundGulp = new Audio("/resources/portfolio/snake/sounds/blop.wav");
        soundGulp.play();
    }
}
