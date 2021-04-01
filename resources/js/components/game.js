import Apple from './apple';
import InputHandler from './input';
import Snake from './snake';

const GAMESTATE = {
    PAUSED: 0,
    RUNNING: 1,
    MENU: 2,
    MENU_SETTINGS:21,
    GAMEOVER: 4,
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

        //this.gamestate = GAMESTATE.MENU;

        new InputHandler(this, GAMESTATE);
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
            if(this.snake.reflexSaver == false){
                this.apple.checkAppleCollision(this);
                this.apple.removeEatenApples(this);
                this.apple.addApples(this);
                this.isGameOver();
            }
        }
    }

    draw(ctx){
        if(this.snake.reflexSaver == false){
            this.clearScreen(ctx);
            this.apple.drawApple(ctx, this);
            this.snake.drawSnake(ctx, this, GAMESTATE);
            this.drawScore(ctx);
        }


        if(this.gameState == GAMESTATE.GAMEOVER){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0,0,this.gameWidth, this.gameWidth);
            
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2 + 25);

            ctx.font = "20px Arial";
            ctx.fillText("Score: " + this.score, this.gameWidth/2, this.gameHeight/3);
            
            ctx.font = "15px Arial"
            ctx.fillText("[SPACEBAR] - retry", this.gameWidth/2, (this.gameHeight/3)*2); 
            ctx.fillText("[ESC] - main menu", this.gameWidth/2, (this.gameHeight/3)*2 + 40); 
        }
        if(this.gameState == GAMESTATE.MENU){
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle="white";
            ctx.textAlign = "center";
            ctx.fillText("Press SPACEBAR to continue", this.gameWidth/2, this.gameHeight/2);
            ctx.fillStyle="green";
            ctx.font = "50px Arial";
            ctx.fillText("SNAKE!", this.gameWidth/2, this.gameHeight/3);
            ctx.font = "20px Arial";
            ctx.fillText("A clone by Stanley Skarshaug", this.gameWidth/2, (this.gameHeight/3)*2);
        }
        if(this.gameState == GAMESTATE.MENU_SETTINGS){
            ctx.rect(0,0, this.gameWidth, this.gameHeight);
            ctx.fillStyle = "rgba(0,0,0,1)";
            ctx.fill();

            ctx.font = "20px Arial";
            ctx.fillStyle="green";
            ctx.textAlign = "center";
            ctx.fillText("Difficulty:", this.gameWidth/2, this.gameHeight/4-10);
            ctx.font = "20px Arial";

            switch(this.menuSelect){
                case 1:
                    ctx.fillStyle = "#39c339";
                    ctx.fillRect(this.gameWidth/4-60, this.gameHeight/3-30, (this.gameWidth/4)*3+20,50);
                    break;
                case 2:
                    ctx.fillStyle = "#39c339";
                    ctx.fillRect(this.gameWidth/4-60, (this.gameHeight/3)*2-30, (this.gameWidth/4)*3+20,50);
                    break;
            }
            
            switch(this.difficulty){
                case 1:
                    ctx.fillStyle = "green";
                    ctx.fillRect(this.gameWidth/4-50, this.gameHeight/3-25,100,40);
                    break;
                case 2:
                    ctx.fillStyle = "green";
                    ctx.fillRect(this.gameWidth/2-50, this.gameHeight/3-25,100,40);
                    break;
                case 3:
                    ctx.fillStyle = "green";
                    ctx.fillRect((this.gameWidth/4)*3-50, this.gameHeight/3-25,100,40);
                    break;
            }
            ctx.fillStyle="white";
            ctx.fillText("Easy", this.gameWidth/4, this.gameHeight/3);
            ctx.fillText("Medium", this.gameWidth/2, this.gameHeight/3);
            ctx.fillText("Hard", (this.gameWidth/4)*3, this.gameHeight/3);

            switch(this.fourDimensions){
                case 0:
                    ctx.fillStyle = "green";
                    ctx.fillRect(this.gameWidth/4-50, (this.gameHeight/3)*2-25,100,40);
                    break;
                case 1:
                    ctx.fillStyle = "green";
                    ctx.fillRect((this.gameWidth/4)*3-50, (this.gameHeight/3)*2-25,100,40);
                    break;
            }
            ctx.fillStyle="green";
            ctx.fillText("Game type:", this.gameWidth/2, (this.gameHeight/3)*2-40);
            ctx.font = "20px Arial";
            
            ctx.fillStyle="white";
            ctx.fillText("Normal", this.gameWidth/4, (this.gameHeight/3)*2);
            //ctx.fillText("Medium", this.gameWidth/2, this.gameHeight/3);
            ctx.fillText("4D", (this.gameWidth/4)*3, (this.gameHeight/3)*2);

            
            ctx.font = "15px Arial"
            ctx.fillText("Press SPACEBAR to start, ARROWS to change", this.gameWidth/2, (this.gameHeight/7)*6); 

        }
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
        //if(!this.fourDimensions){
            if(this.snake.position.x < 0) gameOver = true;
            if(this.snake.position.x >= this.tileCount) gameOver = true;
            if(this.snake.position.y < 0) gameOver = true;
            if(this.snake.position.y >= this.tileCount) gameOver = true;
        //}
    
        //body
        this.snake.snakeParts.forEach(part => {
            if(part.position.x === this.snake.position.x && part.position.y === this.snake.position.y){
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

    playGulp(){
        let soundGulp = new Audio("resources/sounds/blop.wav");
        soundGulp.play();
    }
}
