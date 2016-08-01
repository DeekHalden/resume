
// Main characteristics of enemy
var Enemy = function(y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    var lines = [65, 148, 231, 231, 314, 314, 397, 397, 480]; //array of possible lines where enemies will respawn 
    this.y = lines[Math.floor(Math.random() * lines.length)]; //random y-line of enemies respawn 

    var min = 1; //variety of enemy speed
    var max = 100; //

    this.speed = Math.floor(Math.random(min, max) * 6 + 9) * 50; //random speed of each enemy
};

// Update the position of enemy, required method for game
// Parameter: dt, a time delta between ticks of game
Enemy.prototype.update = function(dt) {
    if (this.x <= 1000) {
        this.x += this.speed * dt;
    } else {
        this.x = -100;
    }
};
//It draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Player = function() {

    this.sprite = 'images/char-horn-girl.png';
    this.x = 909 / 2.25; //Starting position of player
    this.y = 641;

    this.dx = 15; //length of horizontal step 
    this.dy = 15; //length of vertical step 

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    // Sets the boundaries of location and resets if players 
    // step on water or reach the top of location  
    if (this.x > 810) {
        this.x = 808;
    } else if (this.x < 0) {
        this.x = 0;
    } else if (this.y > 641) {
        this.y = 641;
    } else if (this.y < -12) {
        this.y = -11;
        alert('Congratulations! Finished!');
        resetGame();
    } else if (this.y <= 200 &&
        (this.x < ctx.canvas.width / 3.4 ||
            this.x > ctx.canvas.width / 1.6)) { //assing the location which will reset the position of player if he will step on it

        resetGame();
    }
};

function resetGame() {
    location.reload();
}

// Player action keys
Player.prototype.handleInput = function(keys) {
    if ('up' === keys) {
        this.y -= this.dy;
    }
    if ('down' === keys) {
        this.y += this.dy;
    }
    if ('left' === keys) {
        this.x -= this.dx;
    }
    if ('right' === keys) {
        this.x += this.dx;
    }
};
//Creates  enemies
var player = new Player();
var allEnemies = [];
function createEnemies() {
    for (var i = 0, enemiesLenght = 9; i < enemiesLenght; i++){
        allEnemies.push(new Enemy());
    }; 
    return allEnemies;
};


/*allEnemies = allEnemies.map(function(enemyNum) {
     return new Enemy(enemyNum);   
    });
*/




//Detect collisions of player with enemies and reset the game
var checkCollisions = function (spriteWidth, spriteHeight) {
    spriteWidth = 50;
    spriteHeight = 83;
    for (var i = 0; i < allEnemies.length; i++)

        if (player.x < allEnemies[i].x + spriteWidth &&
        player.x + spriteWidth > allEnemies[i].x &&
        player.y < allEnemies[i].y + 10 &&
        player.y + spriteHeight > allEnemies[i].y) {
        resetGame();       
    }
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});