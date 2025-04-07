class Defence {
  constructor(x, y, heading) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.dirForce = p5.Vector.fromAngle(heading * PI / 180);
    this.dirForce.mult(1.5);
    this.heading = heading;
  }
  applyMovement() {
    this.acceleration.add(this.dirForce);
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration = createVector(0, 0);
  }
  render(display) {
    if(display == true){
      push();
      translate(this.position.x, this.position.y);
      rotate(this.heading);
      fill("black");
      stroke(1)
      rect(0 + 45, 0, 10, 2.5);
      pop();
    }
    
  }
  drawHitbox(display) {
    if (display == true) {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.heading);
      fill("red");
      circle(0 + 45, 0, 10);
      pop();
    }

  }
  setJustify(bool) {
    this.boolean = bool
  }
  Boolean() {
    return this.boolean;
  }
  kill() {
    if (this.position.x > 600 || this.position.x < 0 || this.position.y < 0) {
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