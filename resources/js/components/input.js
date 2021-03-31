export default class InputHandler{
    constructor(game){
        this.game = game;
        document.body.addEventListener('keydown', event => {
            if(game.game)
            if(game.changedDirection) return;

            if(event.keyCode == 38){
                if(this.yVelocity == 1) return // prevent to go backwards
                game.yVelocity = -1;
                game.xVelocity = 0;
            }
            //down
            if(event.keyCode == 40){
                if(game.yVelocity == -1) return // prevent to go backwards
                game.yVelocity = 1;
                game.xVelocity = 0;
            }
        
            //left
            if(event.keyCode == 37){
                if(game.xVelocity == 1) return // prevent to go backwards
                game.yVelocity = 0;
                game.xVelocity = -1;
            }
            //right
            if(event.keyCode == 39){
                if(game.xVelocity == -1) return // prevent to go backwards
                game.yVelocity = 0;
                game.xVelocity = 1;
            }
            game.changedDirection = true;
        });
    }
}