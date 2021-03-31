import Game from './components/game';

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let game = new Game(canvas.width, canvas.height);

//gameloop
function gameLoop(){
    game.update();
    //if(game.isGameOver(ctx)) return;
    game.draw(ctx);

    setTimeout(gameLoop, 1000/ game.speed);
}
gameLoop();



