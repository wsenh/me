package;

import hxd.Key;

class Entity {
	var g:h2d.Graphics;

	var x:Float = 0.;
	var y:Float = 0.;
	var dx:Float = 0.;
	var dy:Float = 0.;
	var spd:Float = 25.;
	var drag:Float = .85;

	public function new(p:h2d.Scene) {
		g = new h2d.Graphics(p);
		drawPlayer();
	}

	public function update(dt:Float) {
		dx *= drag;
		dy *= drag;

		var moveDir = capturePlayerInput();

		move(moveDir.vx, moveDir.vy, dt);

		x += dx;
		y += dy;

		g.x = x;
		g.y = y;
	}

	function move(xdir:Float, ydir:Float, dt:Float) {
		if (xdir != 0 && ydir != 0) {
			var dist = Math.sqrt(xdir * xdir + ydir * ydir);
			xdir /= dist;
			ydir /= dist;
		}

		if (xdir != 0)
			dx += xdir * spd * dt;
		if (ydir != 0)
			dy += ydir * spd * dt;
	}

	function capturePlayerInput() {
		var vx = 0.;
		var vy = 0.;

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

	function drawPlayer() {
		g.beginFill(0xf7f6e7);
		g.drawRect(0, 0, 32, 32);
		g.endFill();
	}
}
