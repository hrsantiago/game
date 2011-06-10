var g_camera = new Camera()

function Camera()
{
    this.speed = 5; // 5 pixels / 50 ms or 100 pixels / 1 second
    this.zoom = 1;
    this.position = {x:-(c_width / 2), y:(c_height / 2)};
    this.canvas = document.getElementById("mainWidget");

    this.checkEvents = checkEvents;
    this.onMouseMove = onMouseMove;
    this.onMouseWheel = onMouseWheel;
    this.setZoomIn = setZoomIn;
    this.setZoomOut = setZoomOut;
    
    function checkEvents()
    {
        if(g_holdKeys[32]) { // Space bar, center.
            this.position.x = 0;
            this.position.y = gHeight;
        }
        if(g_holdKeys[33]) { // Page up, zoom in.
            this.setZoomIn();
        }
        if(g_holdKeys[34]) { // Page down, zoom out.
            this.setZoomOut();
        }
        if(g_holdKeys[37]) { // West
            this.position.x -= this.speed;
        }
        if(g_holdKeys[38]) { // North
            this.position.y += this.speed;
        }
        if(g_holdKeys[39]) { // East
            this.position.x += this.speed;
        }
        if(g_holdKeys[40]) { // South
            this.position.y -= this.speed;
        }
    }
    
    function onMouseMove(oldX, oldY, x, y)
    {
        if(g_holdMouse[0]) {
            var deltaX = x - oldX;
            var deltaY = y - oldY;
            
            this.position.x -= deltaX;
            this.position.y += deltaY;
        }
    }
    
    function onMouseWheel(wheelDelta)
    {
        if(wheelDelta > 0) {
            this.setZoomIn();
        }
        else if(wheelDelta < 0) {
            this.setZoomOut();
        }
    }
    
    function setZoomIn()
    {
        this.zoom *= 1.1;
    }
    
    function setZoomOut()
    {
        this.zoom /= 1.1;
    }
}
