var g_game = new Game();

function Game()
{
    this.zoom = 1;
    
    //this.sprites = new Sprites();
    //this.items = new Items();
    //this.maps = new Maps();
    this.player = null;
    //this.weapons = new Weapon();
    
    this.block = g_objects.createRect(5, -2, 2, 2);
    this.block.fillStyle = "#00ff00";
    this.block.strokeStyle = "#000000";
    this.block.align = Align.BottomRight;
    this.block.touchable = true;
    
    var blockCollisionObject = new CollisionObject();
    blockCollisionObject.x = 5;
    blockCollisionObject.y = -2;
    blockCollisionObject.width = 2;
    blockCollisionObject.height = 2;
    blockCollisionObject.type = "rect";
    this.block.collisionObject = blockCollisionObject;
    
    this.ground = g_objects.createRect(-20, 0, 40, 3);
    this.ground.fillStyle = "#00ff00";
    this.ground.strokeStyle = "#000000";
    this.ground.align = Align.BottomRight;
    this.ground.touchable = true;
    
    var groundCollisionObject = new CollisionObject();
    groundCollisionObject.x = -20;
    groundCollisionObject.y = 0;
    groundCollisionObject.width = 40;
    groundCollisionObject.height = 3;
    groundCollisionObject.type = "rect";
    this.ground.collisionObject = groundCollisionObject;

    this.loaded = loaded;
    this.update = update;
    this.draw = draw;

    function loaded()
    {
        if(!this.player || !this.player.loaded())
            return false;
   
        return true;
    }
    
    function update(elapsedTime)
    {
        g_physics.update(elapsedTime);
        this.player.update(elapsedTime);
    }
    
    function draw(ctx)
    {
        ctx.save();
        ctx.translate(-g_camera.position.x, g_camera.position.y);
        ctx.scale(g_camera.zoom, g_camera.zoom);
        
        g_objects.draw(ctx);
        this.player.draw(ctx);
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(-10000, 0, 10000*2, 1);
        ctx.fillRect(0, -10000, 1, 10000*2);
        
        ctx.restore();
        
        ctx.fillStyle = "#000000";
        ctx.fillRect(c_width / 2 - 1, c_height / 2 - 1, 2, 2);
    }
}
