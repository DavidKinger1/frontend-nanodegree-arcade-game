// Enemies our player must avoid
var Enemy = function(spriteImg, eNum) {
    // image hieght and width
    this.width = 101;
    this.height = 171;
    // Random enemy speed generator so enemies change speeds
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
    // create bounding box dimensions for collision detection
    this.col = 0;
    this.bottom = this.row + this.height;
    this.top = this.row;
    this.right = 0;
    this.left = this.row;

    // The image/sprite for our enemies, this uses
    // temp image statement
    if( spriteImg ==="") {
        spriteImg = 'images/enemy-bug.png';
    }
    this.sprite = spriteImg ;
    // dimensions of the enemy sprite for collision detection
    // add postion properties
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

    //update bounding box
    this.bottom = this.row + this.height;
    this.top = this.row;
    this.right = this.col * 150 + this.width;
    this.left = this.col;
    // check if enemy off screen and reset poition to 0
    // assign a new speed to enemy when leaves canvas
    if (this.col > 4) {
        this.col=0;
        this.speedMulti = (Resources.gameLevel * Math.random()) / 1000; 
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col * 150, this.row);
};

// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    
    // image hieght and width
    this.width = 101;
    this.height = 171;
    
    // col set to zero so enemy doesn't appear on screen till time
    this.currentCol = 2;
    this.currentRow = 4;
    this.col = this.currentCol * 101;
    this.row = this.currentRow * 101;
    
    // create bounding box dimensions for collision detection
    this.bottom = this.row + this.height;
    this.top = this.row;
    this.right = (this.col);
    this.left = this.row;
    
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
}

//reset player to start position
Player.prototype.reset = function () {
    // TODO: Add Reset code
}

// Update the players position and bounding box, required method for game
Player.prototype.update = function() {
    this.col = player.currentCol * 101;
    this.row = player.currentRow * 83 + 70;

    //update bounding box
    this.bottom = this.row + this.height;
    this.top = this.row;
    this.right = this.col + this.width;
    this.left = this.col;
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.col, this.row);
};

// Checks the key pressed and moves the player and also checks boundries so player 
// cannot go off the playfield
Player.prototype.handleInput = function(keyPress) {
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

    //initialize player object
    player = new Player();
    // number of enemies to deploy and initialize    
    var i = 0;
    for (i; i < 3; i+=1) 
        allEnemies[i] = new Enemy('images/enemy-bug.png', i%3);

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
})
    var textOverlay = {
        level:1,
        score:9999,
        levelText: "LEVEL:",
        scoreText: "SCORE:"
    }
var RenderOverlay () {
    ctx.fillText(textOverlay.levelText, ctx.width/3,0, ctx.width/3)
};


