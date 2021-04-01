export default function menu(ctx, game, GAMESTATE) {
    
    // ---------------------------------
    // Welcome Menu 
    // ---------------------------------

    if(game.gameState == GAMESTATE.MENU){
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.rect(0,0, game.gameWidth, game.gameHeight);
        ctx.fill();

        ctx.font = "20px Arial";
        ctx.fillStyle="white";
        ctx.textAlign = "center";
        ctx.fillText("Press SPACEBAR to continue", game.gameWidth/2, game.gameHeight/2);
        ctx.fillStyle="green";
        ctx.font = "50px Arial";
        ctx.fillText("SNAKE!", game.gameWidth/2, game.gameHeight/3);
        ctx.font = "20px Arial";
        ctx.fillText("A clone by Stanley Skarshaug", game.gameWidth/2, (game.gameHeight/3)*2);
    }

    // ---------------------------------
    // Settings Menu
    // ---------------------------------
    if(game.gameState == GAMESTATE.MENU_SETTINGS){
        ctx.rect(0,0, game.gameWidth, game.gameHeight);
        ctx.fillStyle = "rgba(0,0,0,1)";
        ctx.fill();

        ctx.font = "20px Arial";
        ctx.fillStyle="green";
        ctx.textAlign = "center";
        ctx.fillText("Difficulty:", game.gameWidth/2, game.gameHeight/4-10);
        ctx.font = "20px Arial";

        switch(game.menuSelect){
            case 1:
                ctx.fillStyle = "#39c339";
                ctx.fillRect(game.gameWidth/4-60, game.gameHeight/3-30, (game.gameWidth/4)*3+20,50);
                break;
            case 2:
                ctx.fillStyle = "#39c339";
                ctx.fillRect(game.gameWidth/4-60, (game.gameHeight/3)*2-30, (game.gameWidth/4)*3+20,50);
                break;
        }
        
        switch(game.difficulty){
            case 1:
                ctx.fillStyle = "green";
                ctx.fillRect(game.gameWidth/4-50, game.gameHeight/3-25,100,40);
                break;
            case 2:
                ctx.fillStyle = "green";
                ctx.fillRect(game.gameWidth/2-50, game.gameHeight/3-25,100,40);
                break;
            case 3:
                ctx.fillStyle = "green";
                ctx.fillRect((game.gameWidth/4)*3-50, game.gameHeight/3-25,100,40);
                break;
        }
        ctx.fillStyle="white";
        ctx.fillText("Easy", game.gameWidth/4, game.gameHeight/3);
        ctx.fillText("Medium", game.gameWidth/2, game.gameHeight/3);
        ctx.fillText("Hard", (game.gameWidth/4)*3, game.gameHeight/3);

        switch(game.fourDimensions){
            case 0:
                ctx.fillStyle = "green";
                ctx.fillRect(game.gameWidth/4-50, (game.gameHeight/3)*2-25,100,40);
                break;
            case 1:
                ctx.fillStyle = "green";
                ctx.fillRect((game.gameWidth/4)*3-50, (game.gameHeight/3)*2-25,100,40);
                break;
        }
        ctx.fillStyle="green";
        ctx.fillText("Game type:", game.gameWidth/2, (game.gameHeight/3)*2-40);
        ctx.font = "20px Arial";
        
        ctx.fillStyle="white";
        ctx.fillText("Normal", game.gameWidth/4, (game.gameHeight/3)*2);
        //ctx.fillText("Medium", game.gameWidth/2, game.gameHeight/3);
        ctx.fillText("4D", (game.gameWidth/4)*3, (game.gameHeight/3)*2);

        ctx.font = "15px Arial"
        ctx.fillText("Press SPACEBAR to start, ARROWS to change", game.gameWidth/2, (game.gameHeight/7)*6); 
    }

    // ---------------------------------
    // Game Over Screen
    // ---------------------------------
    if(game.gameState == GAMESTATE.GAMEOVER){
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0,game.gameWidth, game.gameWidth);
        
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", game.gameWidth / 2, game.gameHeight / 2 + 25);

        ctx.font = "20px Arial";
        ctx.fillText("Score: " + game.score, game.gameWidth/2, game.gameHeight/3);
        
        ctx.font = "15px Arial"
        ctx.fillText("[SPACEBAR] - retry", game.gameWidth/2, (game.gameHeight/3)*2); 
        ctx.fillText("[ESC] - main menu", game.gameWidth/2, (game.gameHeight/3)*2 + 40); 
    }


    // ---------------------------------
    // Pause Screen
    // ---------------------------------
    if(game.gameState == GAMESTATE.PAUSED){
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(0,0,game.gameWidth, game.gameWidth);

        ctx.font = "30px Arial";
        ctx.fillStyle="white";
        ctx.textAlign = "center";
        ctx.fillText("Paused", game.gameWidth/2, game.gameHeight/2);
    }

}