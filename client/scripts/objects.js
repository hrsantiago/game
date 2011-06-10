function CollisionObject()
{
    this.type = null; // "rect", "circle"
    this.x = 0;
    this.y = 0;
    this.radius = 0;
    this.width = 0;
    this.height = 0;
    
    this.draw = draw;
    
    function draw(ctx)
    {
        ctx.strokeStyle = "#ff0000";
        ctx.strokeRect(this.x * PPM, this.y * PPM, this.width * PPM, this.height * PPM);
    }
}

function Object()
{
    // Default properties.
    this.x = 0;
    this.y = 0;
    this.fillStyle = "#000000";
    this.strokeStyle = null;
    this.font = "12px Arial";
    this.text = "";
    
    this.ignoreGravity = true;
    this.moveable = false;
    this.touchable = false;
    
    this.angle = 0;
    this.bounce = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.accelerationX = 0;
    this.accelerationY = 0;

    // Functions.
    this.loaded = loaded;
    this.draw = draw;
    this.drawRect = drawRect;
    this.drawTexturedRect = drawTexturedRect;
    this.drawParabola = drawParabola;
    this.drawCatenary = drawCatenary;
    this.drawText = drawText;
    
    function loaded()
    {
        if(this.texture && !this.texture.complete)
            return false;
            
        return true;
    }
    
    function draw(ctx)
    {
        // Does nothing, used by virtual objects.
    }
    
    function drawRect(ctx)
    {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(this.x * PPM, this.y * PPM, this.width * PPM, this.height * PPM);
        
        if(this.strokeStyle) {
            ctx.strokeStyle = this.strokeStyle;
            ctx.strokeRect(this.x * PPM, this.y * PPM, this.width * PPM, this.height * PPM);
        }
        
        if(this.collisionObject)
            this.collisionObject.draw(ctx);
    }
    
    function drawTexturedRect(ctx)
    {
        if(this.textureX && this.textureY && this.textureWidth && this.textureHeight && this.width && this.height) {
            ctx.drawImage(this.texture, this.textureX, this.textureY, this.textureWidth, this.textureHeight, this.x * PPM, this.y * PPM, this.width * PPM, this.height * PPM);
        }
        else if(this.width && this.height) {
            ctx.drawImage(this.texture, this.x * PPM, this.y * PPM, this.width * PPM, this.height * PPM);
        }
        else {
            ctx.drawImage(this.texture, this.x * PPM, this.y * PPM);
        }
        
        if(this.collisionObject)
            this.collisionObject.draw(ctx);
    }
    
    function drawParabola(ctx)
    {
        var d = (this.x2 - this.x) / 2;
        ctx.fillStyle = this.fillStyle;

        for(var x = -d; x <= d; x++) {
            ctx.fillRect(x + this.x + d, -this.y -(this.a*x*x + this.b*x + this.c) + (this.a*d*d + this.b*d + this.c), 1, 1);
        }
    }
    
    function drawCatenary(ctx)
    {
        var d = (this.x2 - this.x) / 2;
        ctx.fillStyle = this.fillStyle;
        
        for(var x = -d * PPM; x <= d * PPM; x++) {
            x /= PPM;
            ctx.fillRect((x + this.x + d) * PPM, (-this.y -(this.a * Math.cosh(x / this.a)) + (this.a * Math.cosh(d / this.a))) * PPM, 1, 1);
            x *= PPM;
        }
    }
    
    function drawText(ctx)
    {
        ctx.fillStyle = this.fillStyle;
        ctx.font = this.font;
        
        ctx.fillText(this.text, this.x * PPM, this.y * PPM);
    }
}

var g_objects = new Objects();

function Objects()
{
    this.objects = new Array();
    
    // Create object functions. Its arguments must only require things indispensable for its existance.
    this.createRect = createRect;
    this.createTexturedRect = createTexturedRect;
    this.createParabola = createParabola;
    this.createCatenary = createCatenary;
    this.createText = createText;

    // Draw
    this.draw = draw;
    
    // Remove object.
    this.removeObject = removeObject;
    
    // Functions
    function createRect(x, y, width, height)
    {
        var object = new Object();
        
        object.draw = object.drawRect;
        object.x = x;
        object.y = y;
        object.width = width;
        object.height = height;
        
        this.objects.push(object);
        return object;
    }
    
    function createTexturedRect(url, x, y)
    {
        var object = new Object();
        
        object.draw = object.drawTexturedRect;
        object.x = x;
        object.y = y;
        object.texture = new Image();
        object.texture.src= url;
        
        this.objects.push(object);
        return object;
    }
    
    function createParabola(fromX, fromY, toX, toY, a, b, c)
    {
        var object = new Object();
        
        object.draw = object.drawParabola;
        object.x = fromX;
        object.y = fromY;
        object.x2 = toX;
        object.y2 = toY;
        object.a = a;
        object.b = b;
        object.c = c;
        
        this.objects.push(object);
        return object;
    }
    
    function createCatenary(fromX, fromY, toX, toY, a)
    {
        var object = new Object();
        
        object.draw = object.drawCatenary;
        object.x = fromX;
        object.y = fromY;
        object.x2 = toX;
        object.y2 = toY;
        object.a = a;
        
        this.objects.push(object);
        return object;
    }
    
    function createText(x, y, text)
    {
        var object = new Object();
        
        object.draw = object.drawText;
        object.x = x;
        object.y = y;
        object.text = text;
        
        this.objects.push(object);
        return object;
    }
    
    function draw(ctx)
    {
        for(var i in this.objects) {
            if(!this.objects[i].loaded())
                continue;
                
            if(this.objects[i].ignoreCamera) {
                ctx.restore();
                this.objects[i].draw(ctx);
                
                ctx.save();
                ctx.translate(-g_window.camera.position.x, g_window.camera.position.y);
                ctx.scale(g_window.camera.zoom, g_window.camera.zoom);
            }
            else {
                this.objects[i].draw(ctx);
            }
        }
    }
    
    function removeObject(object)
    {
        for(var i in this.objects) {
            if(this.objects[i] == object) {
                this.objects.splice(i,1);
                delete object;
                return true;
            }
        }
        return false;
    }
}
