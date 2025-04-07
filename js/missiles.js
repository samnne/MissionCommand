class Missiles {
  constructor(x, y, heading) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.dirForce = p5.Vector.fromAngle(heading * PI / 180);
    this.dirForce.mult(0.05);
    this.heading = heading;
    this.angle = 0;
    this.angularAcceleration = 0;
    this.angularVelocity = 0;
    this.blue = false;
  }

  updateRotation() {
    this.angularVelocity += this.angularAcceleration;
    this.heading += this.angularVelocity;
    this.angularAcceleration = 0;
  }
  applyForce() {
    this.acceleration.add(this.dirForce);
  }
  updateVelocity() {

    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifeSpan -= 3;
    this.acceleration = createVector(0, 0);
  }
  applyRotation(rot) {
    this.angularVelocity += rot;
  }
  isDead() {
    return (this.lifeSpan < 0)
  }

  render() {
    push()
    translate(this.position.x, this.position.y)
    rotate(this.heading);
    stroke(1);
    fill("LightSlateGrey");
    rect(0, 0, 20, 6);
    fill("DarkOliveGreen");
    triangle(0 + 20, 0, 0 + 10, 0 - 3, 0 + 10, 0 + 3);
    fill("dimGrey");
    triangle(0 + 10, 0 - 2.5, 0, 0 - 5, 0 - 20, 0);
    triangle(0 + 10, 0 + 2.5, 0, 0 + 5, 0 - 20, 0);
    fill("DarkSlateGrey");
    triangle(0, 0 + 5, 0 + 10, 0 + 5, 0 - 5, 0 + 10);
    triangle(0, 0 - 5, 0 + 10, 0 - 5, 0 - 5, 0 - 10);
    pop()
  }
  boundries() {
    if (this.position.x > 600 || this.position.x < 0) {
      return true;
    }
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