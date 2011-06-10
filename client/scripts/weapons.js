function Shot(startX, startY, angle, speed, maxDistance)
{
    // Create variables.
    this.position = {x:startX, y:startY};
    this.angle = angle;
    this.speed = speed;
    this.distance = 0;
    this.maxDistance = maxDistance;
    this.done = false;
    
    // Create functions.
    this.checkEvents = checkEvents;
    this.draw = draw;
    
    function checkEvents()
    {
        this.position.x += speed * Math.cos(angle * Math.PI / 180);
        this.position.y += speed * Math.sin(angle * Math.PI / 180);
        this.distance += this.speed;
        if(this.distance > this.maxDistance)
            this.done = true;
    }
    
    function draw(ctx)
    {
        ctx.fillStyle = "#000000";
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, 3, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}

function Weapon()
{
    // Create variables.
    this.firerate = 2; // Shots per second.
    this.lastShot = gDate.getTime() - (1000 / this.firerate);
    this.shots = new Array();
    
    // Create functions.
    this.checkEvents = checkEvents;
    this.draw = draw;
    
    function checkEvents()
    {
        if(gHoldMouse[0] && gDate.getTime() - this.lastShot >= (1000 / this.firerate)) {
            this.shots.push(new Shot(gGameWidth / 2, gGameHeight / 2, gGame.player.angle, 12, 1000));
            this.lastShot = gDate.getTime();
        }
        
        for(var i in this.shots) {
            if(this.shots[i].done) {
                delete this.shots[i];
            }
            else {
                this.shots[i].checkEvents();
            }
        }
    }
    
    function draw(ctx)
    {
        for(var i in this.shots) {
            this.shots[i].draw(ctx);
        }
    }
}
