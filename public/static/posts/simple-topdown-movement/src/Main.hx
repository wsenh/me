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
