class SnakeTail{
    constructor(x,y){
        this.position = {
            x: x,
            y: y,
        }
    }
}

export default class Snake {
    constructor(game){
        
        this.position = {
            x: 10,
            y: 10,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.snakeParts = [];
        this.tailLength = 2;
        this.reflexSaverWall = false;
        this.reflexSaverTail = false;
    }

    drawSnake(ctx, game, GAMESTATE){
        // draw the tail
        ctx.fillStyle = "green";
        for(let i= 0; i < this.snakeParts.length; i++){
            let part = this.snakeParts[i];
            ctx.fillRect(part.position.x * game.tileCount, part.position.y * game.tileCount, game.tileSize, game.tileSize);
        }

        if(game.gameState == GAMESTATE.RUNNING){
            // Add a new snakepart where the head position was last frame
            this.snakeParts.push(new SnakeTail(this.position.x, this.position.y)); //put item at the end of he list, at the spot whre the position is.
            
            // Remove the last section of the snakepart (tail), so the snake has the same length after adding a new part for new frame
            if(this.snakeParts.length > this.tailLength){
                this.snakeParts.shift();
            } 
    
        } else if(game.gameState == GAMESTATE.GAMEOVER){
            ctx.fillStyle = '#FF5000';
            ctx.beginPath();
            ctx.arc(this.position.x * game.tileCount + game.tileSize / 2, this.position.y * game.tileCount + game.tileSize / 2, 15, 0, 2 * Math.PI);
            ctx.fill();
        }
    
        // Move head to new positon
        ctx.fillStyle = '#39c339';
        ctx.fillRect(this.position.x * game.tileCount, this.position.y * game.tileCount, game.tileSize, game.tileSize);
    }
        
    updateSnakePosition(game){
        // Reflex save - Walls
        if(this.reflexSaverWall == false && game.fourDimensions == false){
            if(     this.position.x + this.velocity.x >= game.tileCount
                ||  this.position.y + this.velocity.y >= game.tileCount
                ||  this.position.x + this.velocity.x < 0
                ||  this.position.y + this.velocity.y < 0
            ) {
                this.reflexSaverWall = true;
                return;
            }
        } else {
            this.reflexSaverWall = false;
        }

        // Reflex save - Tail
        if(this.reflexSaverTail == false){
            this.snakeParts.forEach(part =>{
                if(part.position.x == this.position.x + this.velocity.x && part.position.y == this.position.y + this.velocity.y){
                    this.reflexSaverTail = true;
                    return;
                }
            });
            if(this.reflexSaverTail == true) return;
        } else {
            this.reflexSaverTail = false;
        }

        // Move to new position
        this.position.x = this.position.x + this.velocity.x;
        this.position.y = this.position.y + this.velocity.y;
            
        if(game.fourDimensions) {
            if(this.position.x < 0)                 this.position.x = 19;
            if(this.position.x >= game.tileCount)    this.position.x = 0;
            if(this.position.y < 0)                 this.position.y = 19;
            if(this.position.y >= game.tileCount)    this.position.y = 0;
        }
    }
}