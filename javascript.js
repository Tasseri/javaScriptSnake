var game = {
    players: [
        {
            player: {
                xcoord: 200,
                ycoord: 100
            }
        }],
    apple: {
        xcoord: 100,
        ycoord: 80
    },
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
        }],
    momentumKey: 0,
    gameover: 0,
    border: {w : 10, h: 5}
};

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
printGameState(game);

function printGameState(game) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.height, canvas.width);
    ctx.fillStyle = "green";
    ctx.fillRect(game.apple.xcoord, game.apple.ycoord, 1, 1);

    ctx.fillStyle = "red";
    for (var i = 0; i < game.players.length; i++) {
        ctx.fillRect(game.players[i].player.xcoord, game.players[i].player.ycoord, 1, 1);
    }

    for (var y = 0; y <= canvas.height - 1; y++) {
        ctx.fillRect(0, y, game.border.w, game.border.h);
        ctx.fillRect(canvas.width - game.border.w, y, game.border.w, game.border.h);
    }
    for (var x = 5; x <= canvas.width - 1; x++) {
        ctx.fillRect(x, 0, game.border.w, game.border.h);
        ctx.fillRect(x, canvas.height - game.border.h, game.border.w, game.border.h);
    }
}
function registerListeners(game) {
    var key;
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
    var newplayer = {player: {xcoord: 0, ycoord: 0}};
    newplayer.player.xcoord = game.momentum[game.momentumKey].x;
    newplayer.player.ycoord = game.momentum[game.momentumKey].y;
    newplayer.player.xcoord += game.players[game.players.length - 1].player.xcoord;
    newplayer.player.ycoord += game.players[game.players.length - 1].player.ycoord;
    game.players.push(newplayer);
    var head = game.players.length - 1;

    if (game.players[head].player.xcoord === canvas.width - game.border.w || game.players[head].player.xcoord === game.border.w) {
        game.gameover = 1;
    } else if (game.players[head].player.ycoord === canvas.height - game.border.h || game.players[head].player.ycoord === game.border.h) {
        game.gameover = 1;
    }
    if (head - 2 > 0) {
        for (var i = 0; i < game.players.length - 2; i++) {
            if (JSON.stringify(game.players[game.players.length - 1]) === JSON.stringify(game.players[i])) {
                game.gameover = 1;
            }
            // if (game.players[head].player.xcoord === game.players[i].player.xcoord && game.players[head].player.ycoord === game.players[i].player.ycoord) {
            //     game.gameover = 1;
            // }
        }
    }
    if (!(game.players[head].player.xcoord === game.apple.xcoord && game.players[head].player.ycoord === game.apple.ycoord)) {
        game.players.shift();

    }
    else {
        game.apple.xcoord = getRandomIntInclusive(game.border.w + 1, ctx.canvas.width - 1 - game.border.w);
        game.apple.ycoord = getRandomIntInclusive(game.border.h + 1, ctx.canvas.height - 1 - game.border.h);
    }
}

// end game grafix ("Game over")

gameLoop(game);
registerListeners(game);
function gameLoop(game) {
    updateGameState(game);
    printGameState(game);
    if (!game.gameover) {
        setTimeout(gameLoop.bind(null, game), 50);
    }
    else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}