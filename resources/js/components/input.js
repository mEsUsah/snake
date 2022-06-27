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
        
        // Touch events
        let canvas = document.getElementById("gameScreen");
        
        canvas.addEventListener('touchstart', e =>{
            this.touchY = e.changedTouches[0].pageY;
            this.touchX = e.changedTouches[0].pageX;
        });

        canvas.addEventListener('touchend', e =>{
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

            inputAction(this.swipeDirection);
        });

        // Keyboard events
        document.body.addEventListener('keydown', event => {

            if(event.code === 'Space'){
                this.swipeDirection = 'click';
            }

            if(event.code === 'ArrowDown'){
                this.swipeDirection = 'down';
            }

            if(event.code === 'ArrowUp'){
                this.swipeDirection = 'up';
            }

            if(event.code === 'ArrowLeft'){
                this.swipeDirection = 'left';
            }

            if(event.code === 'ArrowRight'){
                this.swipeDirection = 'right';
            }

            inputAction(this.swipeDirection);
        });

        // Handle input
        const inputAction = (action) => {
            // ---------------------------------
            // Gameplay
            // ---------------------------------
            if(game.gameState == GAMESTATE.RUNNING)
            {
                if(game.changedDirection) return;
                //up
                if(action == 'up'){
                    if(game.snake.velocity.y == 1) return // prevent to go backwards
                    game.snake.velocity.y = -1;
                    game.snake.velocity.x = 0;
                }
                //down
                if(action == 'down'){
                    if(game.snake.velocity.y == -1) return // prevent to go backwards
                    game.snake.velocity.y = 1;
                    game.snake.velocity.x = 0;
                }
            
                //left
                if(action == 'left'){
                    if(game.snake.velocity.x == 1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = -1;
                }
                //right
                if(action == 'right'){
                    if(game.snake.velocity.x == -1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = 1;
                }
                game.changedDirection = true;

                // esc
                if(action == 'click'){
                    game.gameState = GAMESTATE.PAUSED;
                }
            }

            // ---------------------------------
            // Pause Screen
            // ---------------------------------  
            else if (game.gameState == GAMESTATE.PAUSED){
                if(action == 'click'){
                    game.gameState = GAMESTATE.RUNNING;
                }
            }
            
            // ---------------------------------
            // Game Over Screen
            // ---------------------------------  
            else if (game.gameState == GAMESTATE.GAMEOVER){
                if(action == 'right'){
                    game.start();
                } else if(action == 'left'){
                    game.gameState = GAMESTATE.MENU;
                }
            }
            
            // ---------------------------------
            // Welcome Menu 
            // ---------------------------------    
            else if (game.gameState == GAMESTATE.MENU)
            {
                if(action == 'click'){
                    game.gameState = GAMESTATE.MENU_SETTINGS;
                    //game.start();
                }
            }

            // ---------------------------------
            // Settings Menu
            // ---------------------------------
            else if (game.gameState == GAMESTATE.MENU_SETTINGS)
            {
                if(game.menuSelect == 1 && action == 'right' && game.difficulty < 3){ //right
                    game.difficulty++
                } else if(game.menuSelect == 1 && action == 'left' && game.difficulty > 1){ //left
                    game.difficulty--;
                } else if(game.menuSelect == 1 && action == 'down'){ // down
                    game.menuSelect++;
                } else if(game.menuSelect == 2 && action == 'up'){ // up
                    game.menuSelect--;
                } else if(game.menuSelect == 2 && action == 'left' && game.fourDimensions <= 1){ //left
                    game.fourDimensions--;
                } else if(game.menuSelect == 2 && action == 'right' && game.fourDimensions <= 0){ //right
                    game.fourDimensions++;
    
                } else if(action == 'click'){
                    game.start();
                }
            }

        
        }
    }
}