package;

class Main extends hxd.App {
	var entity:Entity;

	override function init() {
		entity = new Entity(s2d);
	}

	override function update(dt:Float) {
		super.update(dt);
		entity.update(dt);
	}

	static function main() {
		new Main();
	}
}
