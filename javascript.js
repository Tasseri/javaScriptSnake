var game = {
    player: {
        xcoord: 100,
        ycoord: 100,
        momentum: [{
            x: 0,
            y: -1
        },
            {
                x: 1,
                y: 0
            },
            {
                x: 0,
                y: 1
            },
            {
                x: -1,
                y: 0
            }]
    },
    apple: {
        xcoord: 100,
        ycoord: 10
    },
    momentumKey: 0,
    gameover: 0
};
var key;

// initilize game (grafix and start positions)

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
printGameState(game);

function printGameState(game) {
    ctx.fillStyle = "green";
    ctx.fillRect(game.apple.xcoord, game.apple.ycoord, 5, 2);

    ctx.fillStyle = "red";
    ctx.fillRect(game.player.xcoord, game.player.ycoord, 5, 5);

 //   ctx.fillStyle = "black";
//    ctx.fillRect(game.player.xcoord - game.player.momentum[game.momentumKey].x, game.player.ycoord - game.player.momentum[game.momentumKey].y, 5, 5);

    for (var y = 0; y <= canvas.height - 1; y++) {
        ctx.fillRect(0, y, 10, 5);
        ctx.fillRect(canvas.width - 1, y, 10, 5);
    }
    for (var x = 5; x <= canvas.width - 1; x++) {
        ctx.fillRect(x, 0, 10, 5);
        ctx.fillRect(x, canvas.height - 1, 10, 5);
    }
}
function initialize(game) {
    // g
    math.random()
}
function getUserInput() {

}
function registerListeners(game) {
    // var key;
    // key =
    $("#game").keydown(function (e) {
        key = e.keyCode;
        if (key === 37) {
            if (game.momentumKey === 0) {
                game.momentumKey = 3;
            } else {
                game.momentumKey--;
            }
        } else if (key === 39) {
            if (game.momentumKey === 3) {
                game.momentumKey = 0;
            } else {
                game.momentumKey++;
            }
        }
    });
}

function updateGameState(game) {
    game.player.xcoord += game.player.momentum[game.momentumKey].x;
    game.player.ycoord += game.player.momentum[game.momentumKey].y;

    if (game.player.xcoord === canvas.width - 1 || game.player.xcoord === 0) {
        game.gameover = 1;
    } else if (game.player.ycoord === canvas.height - 1 || game.player.ycoord === 0) {
        game.gameover = 1;
    }
}
// do {
//     setTimeout(
//      modifyGameState(game)
//      ,1000);
//
// //    updateGameState(game);
// //    printGameState(game);
// } while (!game.gameover);

// end game grafix ("Game over")

gameLoop(game);
registerListeners(game);
function gameLoop(game) {
    updateGameState(game);
    printGameState(game);
    if (!game.gameover) {
        setTimeout(gameLoop.bind(null,game), 500);
    }
}