class Explode {

  constructor(x, y, heading, truth) {
    this.position = createVector(x, y);
    this.lifeSpan = 255
    this.radius = 1;
    this.explode = truth;
  }
  expand() {

    this.radius += 1.5;
    this.render(true);
    this.lifeSpan -= 5;


    if (this.radius >= 100) {
      this.radius = 0;
    }



  }
  setExplode(exp) {
    this.explode = exp;
  }
  render(display) {
    if (display == true) {
      fill(255, 0, 0, this.lifeSpan)
      stroke(0, this.lifeSpan)
      circle(this.position.x, this.position.y, this.radius)
      if (this.radius > 15) {
        fill(255, 165, 0, this.lifeSpan)
        circle(this.position.x, this.position.y, this.radius - 15)
      }
      if (this.radius > 50) {
        fill(255, 255, 255, this.lifeSpan)
        circle(this.position.x, this.position.y, this.radius - 50)
      }

    }

  }
  getExplode() {
    return this.explode
  }
  isDead() {
    if (this.radius >= 95) {
      return true;
    }

  }
  getRadius() {
    return this.radius;
  }
  getX() {
    return this.position.x;

  }
  getY() {
    return this.position.y;
  }
  setX(x) {
    this.position.x = x;

  }
  setY(y) {
    this.position.y = y;
  }
}