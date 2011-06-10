var g_physics = new Physics();

function Physics()
{
    this.gravity = -50.8; // m/s²
    
    this.update = update;
    this.isColliding = isColliding;
    this.collideRectRect = collideRectRect;
    this.isPointInside = isPointInside;
    
    function update(t)
    {
        // Convert to seconds.
        t /= 1000;
        
        for(var i in g_objects.objects) {
            var objectA = g_objects.objects[i];
            
            if(!objectA.moveable)
                continue;
                
            var startX = objectA.x;
            var startY = objectA.y;
        
            var colliding = false;
            if(objectA.touchable)
                colliding = this.isColliding(objectA);
        
            if(objectA.moveable) {
                if(!objectA.ignoreGravity) {
                    // Update object Y speed.
                    // V = Vo + a * t
                    objectA.speedY += (objectA.accelerationY + this.gravity) * t;
                    
                    objectA.accelerationTimeY -= t;
                    if(objectA.accelerationTimeY <= 0)
                        objectA.accelerationY = 0;
                        
                    objectA.speedX += (objectA.accelerationX) * t;
                        
                    objectA.accelerationTimeX -= t;
                    if(objectA.accelerationTimeX <= 0)
                        objectA.accelerationX = 0;
                }
            }

            if(objectA.moveable) {
                // Update objects position.
                // S = So + Vo*t + a*t²/2
                objectA.x += (objectA.speedX * t);
                objectA.y -= (objectA.speedY * t);
                
                objectA.collisionObject.x += (objectA.speedX * t);
                objectA.collisionObject.y -= (objectA.speedY * t);
                
                // atrito
                if(objectA.speedX > 0)
                    objectA.speedX = Math.max(objectA.speedX - 0.2, 0);
                else if(objectA.speedX < 0)
                    objectA.speedX = Math.min(objectA.speedX + 0.2, 0);
            }
        
            if(objectA.touchable) {
                colliding2 = this.isColliding(objectA);
                
                if(!colliding && colliding2)
                    objectA.speedY *= -1 * objectA.bounce;
                else if(colliding && colliding)
                    objectA.speedY = 0;
            }
        
            

        }
    }
    
    function isColliding(objectA)
    {
        for(var i in g_objects.objects) {
            var objectB = g_objects.objects[i];
                   
            if(!objectB.touchable || objectA == objectB)
                continue;
                
            if(objectA.collisionObject.type == "rect" && objectB.collisionObject.type == "rect")
                if(this.collideRectRect(objectA, objectB))
                    return true;
                    
        }
        return false;
    }
    
    function collideRectRect(objectA, objectB)
    {
        // Check for collision first.
        var leftA = objectA.collisionObject.x;
        var leftB = objectB.collisionObject.x;
        var rightA = objectA.collisionObject.x + objectA.collisionObject.width;
        var rightB = objectB.collisionObject.x + objectB.collisionObject.width;
        var topA = objectA.collisionObject.y;
        var topB = objectB.collisionObject.y;
        var bottomA = objectA.collisionObject.y + objectA.collisionObject.height;
        var bottomB = objectB.collisionObject.y + objectB.collisionObject.height;
        
        if(bottomA < topB - c_collisionDistance)
            return false;
	    if(topA > bottomB + c_collisionDistance)
	        return false;
	    if(rightA < leftB - c_collisionDistance)
	        return false;
	    if(leftA > rightB + c_collisionDistance)
	        return false;
	        
	    // Check where is the touching side.
	    
	    // Move object outside.
	    if((leftA < rightB && rightA > leftB)) {
	        // top outside OR fully inside THEN push object up
	        if((bottomA > topB && topA < topB) || (topA > topB && bottomA < bottomB)) {
	            objectA.y -= Math.abs(bottomA - topB);
	            objectA.collisionObject.y -= Math.abs(bottomA - topB);
	        }
	        // bottom outside THEN push object down
	        else if(topA < bottomB && bottomA > bottomB) {
	            objectA.y += Math.abs(topA - bottomB);
	            objectA.collisionObject.y += Math.abs(topA - bottomB);
	        }
	    }
	    else if(bottomA + c_collisionDistance > topB && topA - c_collisionDistance < bottomB) {
	        if(leftA - rightB <= c_collisionDistance) {
	            objectA.x -= c_collisionDistance - Math.abs(leftA - rightB);
	            objectA.collisionObject.x -= c_collisionDistance - Math.abs(leftA - rightB);
	        }
	        else if(Math.abs(rightA - leftB) <= c_collisionDistance) {
	            objectA.x -= c_collisionDistance - Math.abs(rightA - leftB);
	            objectA.collisionObject.x -= c_collisionDistance - Math.abs(rightA - leftB);
	        }
	    }
	        
	    return true;
    }
    
    function isPointInside(aX, aY, bX, bY, bWidth, bHeight)
    {
        return (aX >= bX && aX <= bX + bWidth && aY >= bY && aY <= bY + bHeight);
    }
}
