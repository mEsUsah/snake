export default class Apple{
    constructor(game){
        this.position = {
            x: Math.floor(Math.random() * game.tileCount),
            y: Math.floor(Math.random() * game.tileCount),
        }
        this.eaten = false;
    }

    drawApple(ctx, game){
        ctx.fillStyle = "red";
        game.apples.forEach(apple => {
            ctx.fillRect(apple.position.x * game.tileCount, apple.position.y * game.tileCount, game.tileSize, game.tileSize);

        });
    }
    
    checkAppleCollision(game){
        game.apples.forEach(apple => {
            if(apple.position.x == game.headX && apple.position.y == game.headY){
                apple.eaten = true;
                game.tailLength++;
                game.score++;
                game.soundGulp.play();
            }
        });
    }

    removeEatenApples(game){
        game.apples = game.apples.filter(apple => !apple.eaten);
    }

    addApples(game){
        if(game.apples.length <= 0) {
            game.apples.push(new Apple(game));
        }
    }
}