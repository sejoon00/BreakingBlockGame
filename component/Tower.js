class Tower {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.range = 100;
        this.damage = 10;
        this.rateOfFire = 1000; // ms
        this.lastShotTime = 0;
    }

    inRange(enemy) {
        let distance = Math.hypot(enemy.x - this.x, enemy.y - this.y);
        return distance < this.range;
    }

    shoot(enemy) {
        if (Date.now() - this.lastShotTime > this.rateOfFire) {
            enemy.health -= this.damage;
            this.lastShotTime = Date.now();
        }
    }

    draw(context) {
        context.fillStyle = 'blue';
        context.fillRect(this.x, this.y, 20, 20);
    }
}