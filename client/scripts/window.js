function Window()
{
    this.date = new Date();
    
    // Fps
    this.fps = 0;
    this.fpsTarget = 45;
    this.fpsWaitTime = 0;
    this.totalElapsedTime = 0;
    this.fpsText = "FPS: 0";

    // Functions
    this.initialize = initialize;
    this.mainLoop = mainLoop;
    this.loaded = loaded;
    this.update = update;
    this.draw = draw;
    
    function initialize()
    {
        // Initialize input events
        initializeEvents();
        
        // Set canvas width and height
        var canvas = document.getElementById("CanvasWidget");
        canvas.width = c_width;
        canvas.height = c_height;
        
        // Resize browser
        window.onresize();
        
        // Create player TODO THIS SHOULD NOT BE HERE
        var player = new Player("Test");
        g_game.player = player;
        
        this.mainLoop();
    }
    
    function mainLoop()
    {
        if(this.loaded()) {
            this.update();
        }
        this.draw();
        
        setTimeout("g_window.mainLoop();", this.fpsWaitTime);
    }

    function loaded()
    {
        if(!g_game.loaded())
            return false;
            
        return true;
    }
    
    function update()
    {
        var elapsedTime = (new Date()).getTime() - this.date.getTime();
        delete this.date;
        this.date = new Date();
        
        // Fps
        this.totalElapsedTime += elapsedTime;
        if(this.totalElapsedTime >= 1000) {
            this.totalElapsedTime -= 1000;
            this.fpsText = "FPS: "+this.fps;
            this.fps = 0;
        }
        else {
            this.fpsWaitTime = (1000 - this.totalElapsedTime) / (this.fpsTarget-this.fps);
            this.fps++;
        }
        
        g_game.update(elapsedTime);
    }
    
    function draw()
    {
        // Get canvas.
        var canvas = document.getElementById("CanvasWidget");
        var ctx = canvas.getContext("2d");
    
        // Clear
        ctx.clearRect(0, 0, c_width, c_height);
    
        // Draw loading screen
        if(!this.loaded()) {
            ctx.fillStyle = "#ff0000";
            ctx.font = "20px Arial";
            ctx.fillText("Loading...", (c_width / 2) - (ctx.measureText("Loading...").width / 2), c_height / 2);
            return;
        }

        // Draw game
        g_game.draw(ctx);
        
        // Draw fps
        ctx.fillStyle = "#000000";
        ctx.font = "12px Arial";
        
        ctx.fillText(this.fpsText, 10, 20);
    }
}
