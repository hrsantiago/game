var g_holdKeys = new Array();
var g_holdMouse = new Array();
var g_mousePosition = {x:0, y:0};

function initializeEvents()
{
    for(var i = 0; i < 256; i++)
        g_holdKeys[i] = false;
        
    for(var i = 0; i < 3; i++)
        g_holdMouse[i] = false;
}

function onResize(event)
{
    var body = document.getElementsByTagName("body")[0];

    var canvas = document.getElementById("CanvasWidget");
    canvas.style["left"] = ((body.clientWidth / 2) - (canvas.clientWidth / 2))+"px";
    canvas.style["top"] = ((body.clientHeight / 2) - (canvas.clientHeight / 2))+"px";
}

function onMouseMove(event)
{
    var e = window.event || event;
    
    g_camera.onMouseMove(g_mousePosition.x, g_mousePosition.y, event.layerX, event.layerY);
    
    g_mousePosition.x = event.layerX;
    g_mousePosition.y = event.layerY;
}

function onMouseUp(event)
{
    var e = window.event || event;
    g_holdMouse[e.button] = false;
}

function onMouseDown(event)
{
    var e = window.event || event;
    g_holdMouse[e.button] = true;
}

function onKeyUp(event)
{
    var e = window.event || event;
    g_holdKeys[e.keyCode] = false;
}

function onKeyDown(event)
{
    var e = window.event || event;
    g_holdKeys[e.keyCode] = true;
}

function onMouseWheel(event)
{
    var e = window.event || event;
    g_camera.onMouseWheel(event.wheelDelta);
}

