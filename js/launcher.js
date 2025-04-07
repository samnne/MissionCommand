class Tank {
  constructor(x, y) {
    this.position = createVector(x, y)
    this.angle = 0;
    this.boolean = false;
    this.radius = 50;
  }
  render(display) {
    if (display === true) {
      push()
      translate(this.position.x, this.position.y)
      rotate(this.angle);
      fill("lightGrey");
      stroke(1)
      rect(0 + 20, 0, 40, 10);
      pop()
    }
    if (display === true) {
      push();
      translate(this.position.x, this.position.y);
      rotate(180);
      stroke(1)
      fill("darkOliveGreen");
      rect(0, -10, 30, 20, 5);
      circle(0 - 20, -10, 20)
      circle(0 + 20, -10, 20)
      rect(0, 0, 50, 15, 5);
      rect(0, 10, 30, 10, 5);
      fill("black");
      circle(0 - 20, 0 - 15, 15)
      circle(0, 0 - 15, 15)
      circle(0 + 20, 0 - 15, 15)
      pop();
    }

  }
  follow() {
    this.angle = atan2(mouseY - this.position.y, mouseX - this.position.x);
    if (this.angle < 180 && this.angle > 90) {
      this.angle = 180;
    }
    if (this.angle < 90 && this.angle > 0) {
      this.angle = 0;
    }


  }
  getRadius() {
    return this.radius;
  }
  getAngle() {
    return this.angle;
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