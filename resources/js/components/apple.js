export default class Apple{
    constructor(game){
        this.takenPositions = [];
        this.position = this.generatePositions(game);
        this.eaten = false;

        
    }

    generatePositions(game){
        let spaceIsOccupied = true;
        let position = {
            x: 0,
            y: 0,
        }
        while (spaceIsOccupied){
            spaceIsOccupied = false;
            position = {
                x: Math.floor(Math.random() * game.tileCount),
                y: Math.floor(Math.random() * game.tileCount),
            }

            let occupiedSpaces = [...game.snake, ...game.snake.snakeParts];
            occupiedSpaces.forEach(part => {
                if(part.position.x == position.x && part.position.y == position.y){
                    spaceIsOccupied = true;
                }
            });
        }
        return position;
    }

    drawApple(ctx, game){
        ctx.fillStyle = "red";
        game.apples.forEach(apple => {
            ctx.fillRect(apple.position.x * game.tileCount, apple.position.y * game.tileCount, game.tileSize, game.tileSize);

        });
    }
    
    checkAppleCollision(game){
        game.apples.forEach(apple => {
            if(apple.position.x == game.snake.position.x && apple.position.y == game.snake.position.y){
                apple.eaten = true;
                game.snake.tailLength++;
                game.score += game.pointsPrApple;
                game.playGulp();
                game.speedIncrease();
            }
        });
    }

    removeEatenApples(game){
        game.apples = game.apples.filter(apple => !apple.eaten);
    }

    addApples(game){
        if(game.apples.length <= 0) {
            for(let i = 0; i < game.applesPrScreen; i++){
                game.apples.push(new Apple(game));
            }
        }
    }
}