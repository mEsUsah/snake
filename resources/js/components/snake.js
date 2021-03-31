class SnakeTail{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

export default class Snake {
    constructor(game){
        
        this.head = {
            x: 10,
            y: 10,
        }
        this.velocity = {
            x: 0,
            y: 0,
        }

        this.snakeParts = [];
        this.tailLength = 2;
    }
    

    drawSnake(ctx, game, GAMESTATE){
        // draw the tail
        ctx.fillStyle = "green";
        for(let i= 0; i < this.snakeParts.length; i++){
            let part = this.snakeParts[i];
            ctx.fillRect(part.x * game.tileCount, part.y * game.tileCount, game.tileSize, game.tileSize);
        }

        if(game.gameState == GAMESTATE.RUNNING){
            // Move snake part 1:  add a new snakepart where the head is
            this.snakeParts.push(new SnakeTail(this.head.x, this.head.y)); //put item at the end of he list, at the spot whre the head is.
            
            // Move snake part 2: remove the last section of the snakepart (tail), so the snake has the same length after adding a new part
            if(this.snakeParts.length > this.tailLength){
                this.snakeParts.shift(); //remove the furthest from the snake (first) 
            } 
    
            if(this.gameState == GAMESTATE.GAMEOVER){
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(this.head.x * game.tileCount + game.tileSize / 2, this.head.y * game.tileCount + game.tileSize / 2, 15, 0, 2 * Math.PI);
                ctx.fill();
            }

        }
    
        // Draw the snake head.
        ctx.fillStyle = 'lightgreen';
        ctx.fillRect(this.head.x * game.tileCount, this.head.y * game.tileCount, game.tileSize, game.tileSize);
    }
        
    
    updateSnakePosition(){
        this.head.x = this.head.x + this.velocity.x;
        this.head.y = this.head.y + this.velocity.y;
    }
}