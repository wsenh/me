package;

import hxd.Key;

class Entity {
    // The 2D graphic.
    var g:h2d.Graphics;

    // The top left coordinate of the entity.
    var x:Float = 0.;
    var y:Float = 0.;

    // The delta displacement of the entity.
    var dx:Float = 0.;
    var dy:Float = 0.;

    // The entity moving speed.
    var spd:Float = 50.;

    // The friction that slows down the entity.
    var drag:Float = .85;

    /**
     * Create an entity and draw it on a scene.
     *
     * @param p
     */
    public function new(p:h2d.Scene) {
        g = new h2d.Graphics(p);
        drawPlayer();
    }

    /**
     * Update will be called roughly 60 times per second.
     * We will do our movement logic here.
     *
     * @param dt
     */
    public function update(dt:Float) {
        /*
         * We first apply drag to the entity.
         * When player inputs nothing,
         * the delta movement will eventually goes to 0.
         */
        dx *= drag;
        dy *= drag;

        // Read player intented movement direction from keyboard.
        var moveDir = capturePlayerInput();

        // Move the entity to the direction.
        move(moveDir.vx, moveDir.vy);

        // We displace entity coordinates every update call.
        x += dx * dt;
        y += dy * dt;

        // We move the entity graphic to the correspond coordinates.
        g.x = x;
        g.y = y;
    }

    /**
     * Move the entity towards the given direction by updating dx and dy.
     * The actual movement is handled in update function.
     *
     * @param xdir
     * @param ydir
     */
    function move(xdir:Float, ydir:Float) {
        /*
         * Normalize the direction vector so walking diagonally
         * will travel the same distance as walking horizontally or vertically.
         */
        if (xdir != 0 && ydir != 0) {
            var dist = Math.sqrt(xdir * xdir + ydir * ydir);
            xdir /= dist;
            ydir /= dist;
        }

        /*
         * Apply displacement to dx and dy.
         */
        if (xdir != 0)
            dx += xdir * spd;
        if (ydir != 0)
            dy += ydir * spd;
    }

    /**
     * Read player movement inputs from keyboard.
     */
    function capturePlayerInput() {
        // The movement direction vector is initialized to zero.
        var vx = 0.;
        var vy = 0.;

        // When pressing WASD/Arrows, we modify the movement direction vector.
        if (Key.isDown(Key.A) || Key.isDown(Key.LEFT))
            vx -= 1;
        if (Key.isDown(Key.D) || Key.isDown(Key.RIGHT))
            vx += 1;
        if (Key.isDown(Key.W) || Key.isDown(Key.UP))
            vy -= 1;
        if (Key.isDown(Key.S) || Key.isDown(Key.DOWN))
            vy += 1;

        return {vx: vx, vy: vy};
    }

    /**
     * Draw a 32x32 entity with color 0xff0000.
     */
    function drawPlayer() {
        g.beginFill(0xff0000);
        g.drawRect(0, 0, 32, 32);
        g.endFill();
    }
}
