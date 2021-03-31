import Apple from './apple';
import InputHandler from './input';
import Snake from './snake';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    NEWLEVEL: 3,
    GAMEOVER: 4,
}



export default class Game{
    constructor(gameWidth, gameHeight){
        this.apple = new Apple(this);
        this.snake = new Snake(this);
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.tileCount = 20;
        this.tileSize = this.gameWidth / this.tileCount - 2;
        this.changedDirection = false;
        this.soundGulp = new Audio("resources/sounds/gulp.mp3");

        this.startSpeed = 7
        this.speed = 0;

        this.applesPrScreen = 2;
        this.apples = [];
        this.snake;

        this.gameState = GAMESTATE.MENU;

        //this.gamestate = GAMESTATE.MENU;

        new InputHandler(this, GAMESTATE);
    }

    start(){
        this.speed = this.startSpeed;
        this.score = 0;
        this.apples = [new Apple(this)];
        this.snake = new Snake(this);
        this.gameState = GAMESTATE.RUNNING;

    }

    update(){
        this.changedDirection = false;
        if (this.gameState == GAMESTATE.RUNNING){
            this.snake.updateSnakePosition();
            this.apple.checkAppleCollision(this);
            this.apple.removeEatenApples(this);
            this.apple.addApples(this);
            this.difficultyIncrease();
            this.isGameOver();
        }

    }

    draw(ctx){
        this.clearScreen(ctx);
        this.apple.drawApple(ctx, this);
        this.snake.drawSnake(ctx, this, GAMESTATE);

        this.drawScore(ctx);

        if(this.gameState == GAMESTATE.GAMEOVER){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
            
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 + 25);

            ctx.font = "20px Arial";
            ctx.fillText("Score: " + this.score, this.gameWidth/2, this.gameHeight/3);
            ctx.fillText("Press SPACEBAR to retry", this.gameWidth/2, (this.gameHeight/3)*2); 
        }
        if(this.gameState == GAMESTATE.MENU){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to start", this.gameWidth/2, this.gameHeight/2);
            ctx.fillStyle="#FF5000";
            ctx.font = "50px Arial";
            ctx.fillText("SNAKE!", this.gameWidth/2, this.gameHeight/3);
            ctx.font = "20px Arial";
            ctx.fillText("A clone by Stanley Skarshaug", this.gameWidth/2, (this.gameHeight/3)*2);
        }
    }

    difficultyIncrease(){
        if(this.score > 10) this.speed += 1; 
        if(this.score > 20) this.speed += 1; 
        if(this.score > 30) this.speed += 1; 
        if(this.score > 40) this.speed += 1; 
        if(this.score > 50) this.speed += 1;
        if(this.score > 60) this.speed += 1;
    }
    
    isGameOver(){
        let gameOver = false;
        // check if game is started - dont game over before the snake starts to move
        if (this.snake.velocity.x === 0 && this.snake.velocity.y === 0) return;
        //walls
        if(this.snake.head.x < 0) gameOver = true;
        if(this.snake.head.x >= this.tileCount) gameOver = true;
        if(this.snake.head.y < 0) gameOver = true;
        if(this.snake.head.y >= this.tileCount) gameOver = true;
    
        //body
        this.snake.snakeParts.forEach(part => {
            if(part.x === this.snake.head.x && part.y === this.snake.head.y){
                gameOver = true;
            } 
            
        })
        if(gameOver) this.gameState = GAMESTATE.GAMEOVER;
    }
    
    clearScreen(ctx){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
    }
    
    drawScore(ctx){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, 10, this.gameHeight - 10);
    }

    
        
    
    
    
    
}
