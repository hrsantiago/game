var MapData = [
    {name:"Test", width:16, height:16, items:{}, data:[
    1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,1,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,
    3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
    }
];

function Maps()
{
    this.currentMap = null;

    this.load = load;
    this.loaded = loaded;
    this.draw = draw;
    
    function load(id)
    {
        this.currentMap = MapData[id];
        if(this.currentMap) {
            for(var i = 0; i < this.currentMap.width * this.currentMap.height; i++) {
                gGame.items.load(this.currentMap.data[i]);
                this.currentMap.items[this.currentMap.data[i]] = true;
            }
        }
    }
    
    function loaded()
    {
        if(!this.currentMap)
            return false;
        for(var i in this.currentMap.items) {
            if(!gGame.items.loaded(i))
                return false;
        }
        
        return true;
    }
    
    function draw(px, py, ctx)
    {
        totalTilesX = (gGameWidth / ItemWidth);
        totalTilesY = (gGameHeight / ItemHeight);
        
        dX = Math.max((gGameWidth / 2)-px, 0);
        dY = Math.max((gGameHeight / 2)-py, 0);
        
        fTileX = Math.floor(px / ItemWidth);
        fTileY = Math.floor(py / ItemHeight);
        
        xOffset = (px + dX) & (ItemWidth-1);
        yOffset = (py + dY) & (ItemHeight-1);
        
        for(var x = 0; x < Math.min(totalTilesX, (gGame.maps.currentMap.width+fTileX)); x++) {
            for(var y = 0; y < Math.min(totalTilesY, (gGame.maps.currentMap.height+fTileY)); y++) {
                gGame.items.draw(dX + x * ItemWidth  - xOffset, 
                                 dY + y * ItemHeight - yOffset, 
                                 this.currentMap.data[(y)*this.currentMap.height+(x)], ctx);
            }
        }
        
        ctx.fillStyle = "#ff0000";
        ctx.font = "20px Arial";
        var textm = dX;
        ctx.fillText(textm, 50, 50);
    }
}
