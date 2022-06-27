export default class InputHandler{
    constructor(game, GAMESTATE, INPUT){
        this.touchX = '';
        this.touchY = '';
        this.touchThreshold = 30;
        this.input = 0;
        
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

            this.input = INPUT.ENTER;
            
            // Vertical swipe
            if(Math.abs(swipeDistanceY) > Math.abs(swipeDistanceX)){
                if (swipeDistanceY < -this.touchThreshold ){
                    this.input = INPUT.UP;
                } else if (swipeDistanceY > this.touchThreshold){
                    this.input = INPUT.DOWN;
                }
            }

            // Horizontal swipe
            if(Math.abs(swipeDistanceY) < Math.abs(swipeDistanceX)){
                if (swipeDistanceX < -this.touchThreshold ){
                    this.input = INPUT.LEFT;
                } else if (swipeDistanceX > this.touchThreshold){
                    this.input = INPUT.RIGHT;
                }
            }

            inputAction(this.input);
        });

        // Keyboard events
        document.body.addEventListener('keydown', event => {

            if(event.code === 'Space'){
                this.input = INPUT.ENTER;
            }

            if(event.code === 'ArrowDown'){
                this.input = INPUT.DOWN;
            }

            if(event.code === 'ArrowUp'){
                this.input = INPUT.UP;
            }

            if(event.code === 'ArrowLeft'){
                this.input = INPUT.LEFT;
            }

            if(event.code === 'ArrowRight'){
                this.input = INPUT.RIGHT;
            }
            if(event.code === 'Pause'){
                this.input = INPUT.PAUSE;
            }

            inputAction(this.input);
        });

        // Handle input
        const inputAction = (action) => {
            console.log(action, INPUT.ENTER);
            // ---------------------------------
            // Gameplay
            // ---------------------------------
            if(game.gameState == GAMESTATE.RUNNING)
            {
                if(game.changedDirection) return;
                //up
                if(action == INPUT.UP){
                    if(game.snake.velocity.y == 1) return // prevent to go backwards
                    game.snake.velocity.y = -1;
                    game.snake.velocity.x = 0;
                }
                //down
                if(action == INPUT.DOWN){
                    if(game.snake.velocity.y == -1) return // prevent to go backwards
                    game.snake.velocity.y = 1;
                    game.snake.velocity.x = 0;
                }
            
                //left
                if(action == INPUT.LEFT){
                    if(game.snake.velocity.x == 1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = -1;
                }
                //right
                if(action == INPUT.RIGHT){
                    if(game.snake.velocity.x == -1) return // prevent to go backwards
                    game.snake.velocity.y = 0;
                    game.snake.velocity.x = 1;
                }
                game.changedDirection = true;

                // space
                if(action == INPUT.PAUSE){
                    game.gameState = GAMESTATE.PAUSED;
                }
            }

            // ---------------------------------
            // Pause Screen
            // ---------------------------------  
            else if (game.gameState == GAMESTATE.PAUSED){
                if(action == INPUT.PAUSE){
                    game.gameState = GAMESTATE.RUNNING;
                }
            }
            
            // ---------------------------------
            // Game Over Screen
            // ---------------------------------  
            else if (game.gameState == GAMESTATE.GAMEOVER){
                if(action == INPUT.RIGHT){
                    game.start();
                } else if(action == INPUT.LEFT){
                    game.gameState = GAMESTATE.MENU;
                }
            }
            
            // ---------------------------------
            // Welcome Menu 
            // ---------------------------------    
            else if (game.gameState == GAMESTATE.MENU)
            {
                if(action == INPUT.ENTER){
                    game.gameState = GAMESTATE.MENU_SETTINGS;
                    //game.start();
                }
            }

            // ---------------------------------
            // Settings Menu
            // ---------------------------------
            else if (game.gameState == GAMESTATE.MENU_SETTINGS)
            {
                if(game.menuSelect == 1 && action == INPUT.RIGHT && game.difficulty < 3){ //right
                    game.difficulty++
                } else if(game.menuSelect == 1 && action == INPUT.LEFT && game.difficulty > 1){ //left
                    game.difficulty--;
                } else if(game.menuSelect == 1 && action == INPUT.DOWN){ // down
                    game.menuSelect++;
                } else if(game.menuSelect == 2 && action == INPUT.UP){ // up
                    game.menuSelect--;
                } else if(game.menuSelect == 2 && action == INPUT.LEFT && game.fourDimensions <= 1){ //left
                    game.fourDimensions--;
                } else if(game.menuSelect == 2 && action == INPUT.RIGHT && game.fourDimensions <= 0){ //right
                    game.fourDimensions++;
    
                } else if(action == INPUT.ENTER){
                    game.start();
                }
            }

        
        }
    }
}