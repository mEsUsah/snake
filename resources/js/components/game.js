import Apple from './apple';
import InputHandler from './input';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    NEWLEVEL: 3,
    GAMEOVER: 4,
}

class SnakePart{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

export default class Game{
    constructor(gameWidth, gameHeight){
        this.apple = new Apple(this);
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;

        this.tileCount = 20;
        this.tileSize = this.gameWidth / this.tileCount - 2;
        this.changedDirection = false;
        this.soundGulp = new Audio("resources/sounds/gulp.mp3");

        this.speed = 7;
        this.headY = 10;
        this.headX = 10;
        this.snakeParts = [];
        this.tailLength = 2;

        this.xVelocity=0;
        this.yVelocity=0;

        this.score = 0;
        
        this.apples = [new Apple(this)];

        this.gameState = GAMESTATE.RUNNING;

        //this.gamestate = GAMESTATE.MENU;

        new InputHandler(this);
    }

    update(){
        this.changedDirection = false;
        if (this.gameState == GAMESTATE.RUNNING){
            this.updateSnakePosition();
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
        this.drawSnake(ctx);

        this.drawScore(ctx);

        if(this.gameState == GAMESTATE.GAMEOVER){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
            
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 + 25);
        }
    }

    difficultyIncrease(){
        if(this.score > 10) this.speed = 8; 
        if(this.score > 20) this.speed = 9; 
        if(this.score > 30) this.speed = 10; 
        if(this.score > 40) this.speed = 11; 
        if(this.score > 50) this.speed = 12;
        if(this.score > 60) this.speed = 13;
    }
    
    isGameOver(){
        let gameOver = false;
        // check if game is started - dont game over before the snake starts to move
        if (this.xVelocity === 0 && this.yVelocity === 0) return;
        //walls
        if(this.headX < 0) gameOver = true;
        if(this.headX >= this.tileCount) gameOver = true;
        if(this.headY < 0) gameOver = true;
        if(this.headY >= this.tileCount) gameOver = true;
    
        //body
        this.snakeParts.forEach(part => {
            if(part.x === this.headX && part.y === this.headY){
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
        
    
    drawSnake(ctx){
        // draw the tail
        ctx.fillStyle = "green";
        for(let i= 0; i < this.snakeParts.length; i++){
            let part = this.snakeParts[i];
            ctx.fillRect(part.x * this.tileCount, part.y * this.tileCount, this.tileSize, this.tileSize);
        }
        
        if(this.gameState == GAMESTATE.RUNNING){
            // Move snake part 1:  add a new snakepart where the head is
            this.snakeParts.push(new SnakePart(this.headX, this.headY)); //put item at the end of he list, at the spot whre the head is.
            
            // Move snake part 2: remove the last section of the snakepart (tail), so the snake has the same length after adding a new part
            if(this.snakeParts.length > this.tailLength){
                this.snakeParts.shift(); //remove the furthest from the snake (first)  
            }
        }
        if(this.gameState == GAMESTATE.GAMEOVER){
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.arc(this.headX* this.tileCount + this.tileSize/2, this.headY * this.tileCount + this.tileSize/2, 15, 0, 2 * Math.PI);
            ctx.fill();
        }
    
        // Draw the snake head.
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.headX * this.tileCount, this.headY * this.tileCount, this.tileSize, this.tileSize);
    }
    
    updateSnakePosition(){
        this.headX = this.headX + this.xVelocity;
        this.headY = this.headY + this.yVelocity;
    }
}
