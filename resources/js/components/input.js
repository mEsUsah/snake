export default class InputHandler{
    constructor(game, GAMESTATE){
        this.game = game;
        document.body.addEventListener('keydown', event => {
            if(game.gameState == GAMESTATE.RUNNING){
                if(game.changedDirection) return;
    
                if(event.keyCode == 38){
                    if(game.snake.velocity.y == 1) return // prevent to go backwards
                    game.snake.velocity.y = -1;
                    game.snake.velocity.x = 0;
                }
                //down
                if(event.keyCode == 40){
                    if(game.snake.velocity.y == -1) return // prevent to go backwards
                    game.snake.velocity.y = 1;
                    game.snake.velocity.x = 0;
                }
            
                //left
                if(event.keyCode == 37){
                    if(game.snake.velocity.x == 1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = -1;
                }
                //right
                if(event.keyCode == 39){
                    if(game.snake.velocity.x == -1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = 1;
                }
                game.changedDirection = true;

            } else if (game.gameState == GAMESTATE.GAMEOVER){
                if(event.keyCode == 32){
                    game.start();
                }
            } else if (game.gameState == GAMESTATE.MENU){
                if(event.keyCode == 32){
                    game.start();
                }
            }
        });
    }
}