function Player(nickname)
{
    // Create variables.
    this.nickname = nickname;
    
    this.nicknameObject = g_objects.createText(0, -2, nickname);
    this.nicknameObject.align = Align.HorizontalCenter;
    
    // Create player
    this.playerObject = g_objects.createTexturedRect("images/player/mario.png", -0.6, -1.6);
    this.playerObject.width = 1.2;
    this.playerObject.height = 1.6;
    this.playerObject.textureX = 192;
    this.playerObject.textureY = 64;
    this.playerObject.textureWidth = 48;
    this.playerObject.textureHeight = 64;
    this.playerObject.align = Align.TopCenter;
    
    var playerCollisionObject = new CollisionObject();
    playerCollisionObject.x = -0.5;
    playerCollisionObject.y = -1.6;
    playerCollisionObject.width = 0.9;
    playerCollisionObject.height = 1.6;
    playerCollisionObject.type = "rect";
    this.playerObject.collisionObject = playerCollisionObject;
    
    this.playerObject.moveable = true;
    this.playerObject.touchable = true;
    this.playerObject.ignoreGravity = false;
    
    this.currentDrawPos = 0;
    this.currentDrawTimer = 0;

    // Create functions.
    this.loaded = loaded;
    this.update = update;
    this.checkEvents = checkEvents;
    this.draw = draw;
    
    function loaded()
    {   
        return true;
    }
    
    function update(elapsedTime)
    {
        if(this.currentDrawTimer > (0.2 / Math.abs(this.playerObject.speedX)) * 1000) {
            this.currentDrawTimer = 0;
            this.currentDrawPos++;
            if(this.currentDrawPos == 3)
                this.currentDrawPos = 0;
        }
        this.currentDrawTimer += elapsedTime;
        
        if(this.playerObject.speedX < 0) {
            this.playerObject.textureX = 144 + this.currentDrawPos * 48;
            this.playerObject.textureY = 192;
        }
        else if(this.playerObject.speedX == 0)
            this.playerObject.textureX = 192;
        else if(this.playerObject.speedX > 0) {
            this.playerObject.textureX = 240 - this.currentDrawPos * 48;
            this.playerObject.textureY = 64;
        }
            
        if(this.playerObject.speedY != 0)
            this.playerObject.textureX = 48;
        
            
        this.checkEvents(elapsedTime);
    }
    
    function checkEvents(elapsedTime)
    {
        // Check for actions
        if(g_holdKeys[37]) { // West
            if(this.playerObject.speedX > -5.5) {
                this.playerObject.accelerationX = -20;
                this.playerObject.accelerationTimeX = elapsedTime / 1000;
            }
        }
        if(g_holdKeys[38]) { // North
            if(this.playerObject.speedY == 0) {
                this.playerObject.speedY = 20;
            }
        }
        if(g_holdKeys[39]) { // East
            if(this.playerObject.speedX < 5.5) {
                this.playerObject.accelerationX = +20;
                this.playerObject.accelerationTimeX = elapsedTime / 1000;
            }
        }
        if(g_holdKeys[40]) { // South
        }
    }
    
    function draw(ctx)
    {
        /*// Weapon
        ctx.fillStyle = "#444444";
        ctx.fillRect(gPlayer.position.x - 5 - 25, gPlayer.position.y - 10, 10, 45);
        
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(gPlayer.position.x - 5 - 25, gPlayer.position.y - 10, 10, 45);
        
        // Shoulders
        ctx.fillStyle = "#007000";
        ctx.fillRect(gPlayer.position.x - 10 + 25, gPlayer.position.y - 10, 20, 20);
        ctx.fillRect(gPlayer.position.x - 10 - 25, gPlayer.position.y - 10, 20, 20);
        
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(gPlayer.position.x - 10 + 25, gPlayer.position.y - 10, 20, 20);
        ctx.strokeRect(gPlayer.position.x - 10 - 25, gPlayer.position.y - 10, 20, 20);
        
        // Head
        ctx.fillStyle = "#8B4513";
        ctx.beginPath();
        ctx.arc(gPlayer.position.x, gPlayer.position.y, 20, 0, 2 * Math.PI, false);
        ctx.fill();
        
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(gPlayer.position.x, gPlayer.position.y, 20, 0, 2 * Math.PI, false);
        ctx.stroke();*/
        
        // Draw player.
        //ctx.save();
        //ctx.translate(c_width / 2, c_height / 2);
        //ctx.rotate(this.angle * Math.PI / 180); 
        //ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
        //ctx.restore();

        // Screen center pos.
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(c_width / 2, c_height / 2, 1, 1);
    }
}

