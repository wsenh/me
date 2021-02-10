---
title: "A Simple Responsive Topdown Movement Approach"
timestamp: 1612775790
coverImage: "/static/imgs/simple-topdown-movement/cover.webm"
excerpt: 'To create a "good feeling" in action games, player movement is one of the essential mechanics in modern action games. I am going to introduce a way of making a top down movement that aims on simplicity and responsiveness.'
ogImage:
  url: "/static/imgs/simple-topdown-movement/cover.gif"
---

To create a "good feeling" in action games, player movement is one of the essential mechanics in modern action games. I am going to introduce a way of making a top down movement that aims on simplicity and responsiveness.

<a href="/static/posts/simple-topdown-movement/p8/topdownmovement.html" alt="PICO-8 Movement Demo" target="_blank" rel="noopener">
  <img src="/static/imgs/pico8.png" alt="PICO-8 Movement Demo" />
</a>

_Use Arrows to move the block_

## Game Engine?

The method I provide is not limited to any game engine. As long as the tools you are using can draw stuff on a screen, the method will work.

I am going to use <a href="https://heaps.io/" target="_blank" rel="noopener">Heaps.io</a> here. The programming language Heaps.io uses is <a href="https://haxe.org/" target="_blank" rel="noopener">Haxe</a> which is a JavaScript like language. You can easily translate the code to your desired language and game engine.

## Draw Player

Before creating movement code, we need to draw our player on to the screen.

First create a `src/Entity.hx` file that acts as our player.

```haxe
package;

class Entity {
    // The 2D graphic.
    var g:h2d.Graphics;

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
     * Draw a 32x32 entity with color 0xff0000.
     */
    function drawPlayer() {
        g.beginFill(0xff0000);
        g.drawRect(0, 0, 32, 32);
        g.endFill();
    }
}
```

Then create our game entry `src/Main.hx`

```haxe
package;

class Main extends hxd.App {
    // The moving entity we will be controlling.
    var entity:Entity;

    /**
     * Heaps.io will start from here.
     */
    static function main() {
        new Main();
    }

    /**
     * Will be called to create the game.
     */
    override function init() {
        // s2d is the default 2D scene in Heaps.io.
        entity = new Entity(s2d);
    }
}
```

After creating the Haxe compile file <a href="https://github.com/wsenh/me/blob/main/public/static/posts/simple-topdown-movement/base.hxml" target="_blank" rel="noopener">base.hxml</a> and <a href="https://github.com/wsenh/me/blob/main/public/static/posts/simple-topdown-movement/index.html" target="_blank" rel="noopener">index.html</a>, we can call the following to build the JavaScript output.

```shell
haxe base.hxml
```

Open `index.html` will show a red square on the top left corner.

![Player Top Left](/static/imgs/simple-topdown-movement/player-top-left.png)

## Define Some Variables

That was a lot of code to draw a little square. The fun part starts here.

Let's define some variables in our entity class. Those variables will be used to compute and keep track of player's location.

In our `src/Entity.hx`:

```haxe
package;

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

    public function new(p:h2d.Scene) {
        /* ... */
    }

    function drawPlayer() {
        /* ... */
    }
}
```

## Movement

We use `x`, `y`, `dx`, `dy` to track the entity's position, and velocity. In our `src/Entity.hx`, we first define a function `capturePlayerInput` to capture the player's movement input. When player is pressing WASD/Arrows, our vector will be set to the corresponding value.

```haxe
package;

class Entity {
    /* ... */

    var x:Float = 0.;
    var y:Float = 0.;
    var dx:Float = 0.;
    var dy:Float = 0.;
    var spd:Float = 50.;
    var drag:Float = .85;

    /* ... */

    /**
     * Read player movement inputs from keyboard.
     */
    function capturePlayerInput() {
        // The movement direction vector is initialized to zero.
        var vx = 0.;
        var vy = 0.;

        // When pressing WASD/Arrows,
        // we modify the movement direction vector.
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

    /* ... */
}
```

Then the `move` function will update `dx` and `dy` to the desired value. Remember to normalize the direction vector so that we remain a consistent velocity through all directions.

```haxe
package;

class Entity {
    /* ... */

    /**
     * Move the entity towards the given direction by updating dx and dy.
     * The actual movement is handled in update function.
     *
     * @param xdir
     * @param ydir
     */
    function move(xdir:Float, ydir:Float) {
        /*
         * Normalize the direction vector so walking
         * diagonally will travel the same distance
         * as walking horizontally or vertically.
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

    /* ... */
}
```

In the `src/Entity.hx` update function, we "drag" the velocity towards 0 so when the player inputs nothing, `dx` and `dy` go to 0 smoothly. In every update call, we detect player keyboard input using `capturePlayerInput` and call `move` to update `dx` and `dy`. Finally we should apply `dx` and `dy` to our coordinates `x` and `y` in order to move our entity. Then we move the graphic accordingly _(this step is not required for advanced game engines since the graphics are moved with the entity usually)_.

```haxe
package;

class Entity {
    /* ... */

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

    /* ... */
}
```

In Heaps.io, we also need to call our self defined update function in the `src/Main.hx` main function. _Advanced game engine will call the update in entity by default._

```haxe
package;

class Main extends hxd.App {
    /* ... */

    /**
     * Update function will be called around 60 times per second.
     *
     * @param dt
     */
    override function update(dt:Float) {
        super.update(dt);
        entity.update(dt);
    }
}
```

## Result

Run the game and you will get the following results:

<iframe src="/static/posts/simple-topdown-movement/index.html"
  width="300" height="300" frameborder="0" allowfullscreen sandbox="allow-scripts">
  <p>
    <a href="/static/posts/simple-topdown-movement/index.html" target="_blank" rel="noopener">
       Fallback link for browsers that don't support iframes
    </a>
  </p>
</iframe>

_Use WASD/Arrows to move the red block_

The movement is responsive since once the player pressed the key, the block reaches highest move speed. By adjusting `drag` in `src/Entity.hx`, we can fine-tune the game feel.
