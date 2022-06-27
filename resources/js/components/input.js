export default class InputHandler{
    constructor(game, GAMESTATE){
        this.touchX = '';
        this.touchY = '';
        this.touchThreshold = 30;
        this.swipeDirection = '';
        
        // Stop arrow keys from scrolling the page the game embedded into.
        window.addEventListener("keydown", function(e) {
            if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
                e.preventDefault();
            }
        }, false);
        
        // Game inputs
        this.game = game;

        window.addEventListener('touchstart', e =>{
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        });

        window.addEventListener('touchend', e =>{
            const swipeDistanceY = e.changedTouches[0].pageY - this.touchY;
            const swipeDistanceX = e.changedTouches[0].pageX - this.touchX;

            this.swipeDirection = 'click';
            
            // Vertical swipe
            if(Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)){
                if (swipeDistanceY < -this.touchThreshold ){
                    this.swipeDirection = 'up';
                } else if (swipeDistanceY > this.touchThreshold){
                    this.swipeDirection = 'down';
                }
            }

            // Horizontal swipe
            if(Math.abs(swipeDistanceY) < Math.abs(swipeDistanceX)){
                if (swipeDistanceX < -this.touchThreshold ){
                    this.swipeDirection = 'left';
                } else if (swipeDistanceX > this.touchThreshold){
                    this.swipeDirection = 'right';
                }
            }

            console.log(this.swipeDirection);
        });

        document.body.addEventListener('keydown', event => {
            
            // ---------------------------------
            // Gameplay
            // ---------------------------------
            if(game.gameState == GAMESTATE.RUNNING){
                if(game.changedDirection) return;
                //up
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

                // esc
                if(event.keyCode == 27){
                    game.gameState = GAMESTATE.PAUSED;
                }
            
            // ---------------------------------
            // Pause Screen
            // ---------------------------------  
            } else if (game.gameState == GAMESTATE.PAUSED){
                if(event.keyCode == 27){
                    game.gameState = GAMESTATE.RUNNING;
                } 

            // ---------------------------------
            // Game Over Screen
            // ---------------------------------  
            } else if (game.gameState == GAMESTATE.GAMEOVER){
                if(event.keyCode == 32){
                    game.start();
                } else if(event.keyCode == 27){
                    game.gameState = GAMESTATE.MENU;
                }

            // ---------------------------------
            // Welcome Menu 
            // ---------------------------------    
            } else if (game.gameState == GAMESTATE.MENU){
                if(event.keyCode == 32){
                    game.gameState = GAMESTATE.MENU_SETTINGS;
                    //game.start();
                }

            // ---------------------------------
            // Settings Menu
            // ---------------------------------
            } else if (game.gameState == GAMESTATE.MENU_SETTINGS){
                if(game.menuSelect == 1 && event.keyCode == 39 && game.difficulty < 3){ //right
                    game.difficulty++
                } else if(game.menuSelect == 1 && event.keyCode == 37 && game.difficulty > 1){ //left
                    game.difficulty--;
                } else if(game.menuSelect == 1 && event.keyCode == 40){ // down
                    game.menuSelect++;
                } else if(game.menuSelect == 2 && event.keyCode == 38){ // up
                    game.menuSelect--;
                } else if(game.menuSelect == 2 && event.keyCode == 37 && game.fourDimensions <= 1){ //left
                    game.fourDimensions--;
                } else if(game.menuSelect == 2 && event.keyCode == 39 && game.fourDimensions <= 0){ //right
                    game.fourDimensions++;

                } else if(event.keyCode == 32){
                    game.start();
                }
            }
        });
    }
}