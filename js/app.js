// Enemies our player must avoid
var Enemy = function(spriteImg, eNum) {
    // Random enemy speed generator
    this.speedMulti = (8* Math.random())/ 1000; 
    // absolute row settings to align enemies to their rows eNum is row assigned
    switch (eNum) {
        case 0:
            this.row = 65;
            break;
        case 1:
            this.row = 140;
            //alert(this.enemyRow = 145);
            break;
        case 2:
            this.row = 225;
            //alert(this.enemyRow = 225);
        default:
            break;
        }
    // col set to zero so enemy doesn't appear on screen till time
    this.col = 0    ;
    // The image/sprite for our enemies, this uses
    // temp image statement
    if( spriteImg ==="") {
        spriteImg = "images/enemy-bug.png";
    }
    this.sprite = spriteImg ;
    // dimensions of the enemy sprite for collision detection
    // add postion properties
    this.width = spriteImg.width;
    this.height = spriteImg.height;
    this.left = 0;
    this.right = this.width;
    this.bottom = this.height + this.row;
    this.top = this.row;
};

// Update the enemy's position ajusting for different cpu speeds
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // update the position the enemy is
    this.col += dt + this.speedMulti;
    this.bottom = this.row + this.height;
    this.top = this.row;
    this.right = this.col * 150;
    this.left = this.row;
    // check if enemy off screen and reset poition to 0
    // assign a new speed to enemy when leaves canvas
    if (this.col > 4) {
        this.col=0;
        this.speedMulti = (Resources.gameLevel * Math.random()) / 1000; 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  var x, y ;
        x = this.col * 150;
        y = this.row;
    ctx.drawImage(Resources.get(this.sprite), x, y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //Use current Row and Column * 101 to move player
    this.currentCol = 2;
    this.currentRow = 4;
    this.x = this.currentCol * 101;
    this.y = this.currentRow * 101;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
    // dimensions of the enemy sprite for collision detection
    // add postion properties
    this.width = spriteImg.width;
    this.height = spriteImg.height;
    this.left = 0;
    this.right = this.width;
    this.bottom = this.height + this.row;
    this.top = this.row;
}
//reset player to start position
Player.prototype.reset = function () {
    // TODO: Add Reset code
}

// Update the players position, required method for game
Player.prototype.update = function() {
    this.x += this.col;
    this.y += this.row;
    this.bottom = this.y + this.height;
    this.top = this.y;
    this.right = this.x + this.width;
    this.left = this.x;
};
// Box type collision test
Enemy.prototype.isColliding = function(enemy,player){
    return !(enemy.right< player.left ||
            player.right < enemy.left ||
            enemy.bottom < player.top ||
            plqyer.bottom < enemy.top);
};

// if enemy and player touch then reset player to starting position
Enemy.prototype.checkCollisions = function(enemy, player) {
    if (this.isColliding(enemy, player)) {
        cpnsole.log('collision!');
        // debugger;
        player.reset();
    }
}

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    // added offset values to correctly align player on grid
    this.x = player.currentCol * 101;
    this.y = player.currentRow * 83 + 70;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    // Checks the key pressed and moves the player and also checks boundries so player 
    // cannot go off the playfield
    switch (keyPress.keyIdentifier) {
        case "Up":
            if (player.currentRow > -1 ?  player.currentRow -=1: player.currentRow = -1);
        break;
        case "Down":
            if (player.currentRow < 4 ?  player.currentRow +=1: player.currentRow = 4);
        break;
        case "Right":
            if (player.currentCol < 4 ?  player.currentCol +=1: player.currentCol = 4);
        break;
        case "Left":console.log(keyPress.keyIdentifier);
            if (player.currentCol > 0 ?  player.currentCol -=1: player.currentCol = 0);
        break;
        default:
            console.log('invalid key input');
        break;
}
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
    var allEnemies = [], player = {};
    var i=0;
    for (i; i < 9; i+=1) {
        allEnemies[i] = new Enemy('images/enemy-bug.png', i%3);
    }
    player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(e);
});




