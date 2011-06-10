var ItemWidth = 32;
var ItemHeight = 32;

// Item flags:
// Name, walkable, speed, spritesX, spritesY, sprites

// Sprites:
// {1,2,3,4}
// 4,3
// 2,1

var ItemData = [
    ["void", false, 0, 1, 1, [0]],
    ["white floor", true, 1, 1, 1, [1]],
    ["black floor", true, 1, 1, 1, [2]],
    ["water", false, 0, 1, 1, [5]]
];

function Items()
{
    this.items = new Array(); // Fast loaded check.

    this.load = load;
    this.loaded = loaded;
    this.draw = draw;
    
    function load(id)
    {
        for(var i = 0; i < ItemData[id][3] * ItemData[id][4]; i++)
            gGame.sprites.load(ItemData[id][5][i]);
    }
    
    function loaded(id)
    {
        if(this.items[id])
            return true;
            
        for(i = 0; i < ItemData[id][3] * ItemData[id][4]; i++)
            if(!gGame.sprites.loaded(ItemData[id][5][i]))
                return false;
                
        this.items[id] = true;
        return true;
    }
    
    function draw(x, y, id, ctx)
    { 
        for(var sx = 0; sx < ItemData[id][3]; sx++)
            for(var sy = 0; sy < ItemData[id][4]; sy++)
                gGame.sprites.draw(x-ItemWidth*sx, y-ItemHeight*sy, ItemData[id][5][sy*ItemData[id][4]+sx], ctx);
    }
}

function Sprites()
{
    this.sprites = new Array();
    
    this.load = load;
    this.loaded = loaded;
    this.draw = draw;
    
    function load(id)
    {
        if(!this.sprites[id]) {
            this.sprites[id] = new Image();
            this.sprites[id].src = "images/sprites/"+id+".png";
        }
    }
    
    function loaded(id)
    {
        if(!this.sprites[id] || !this.sprites[id].complete)
            return false;
        return true;
    }
    
    function draw(x, y, id, ctx)
    {
        ctx.drawImage(this.sprites[id], x, y);
    }
}

