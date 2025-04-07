class CollisionCheck {



  constructor() {

  }
  static coll(x, y) {
    if (y < 510 && y > 495) {
      return true;
    }
  }
  static collisionCheck(x1, y1, r1, x2, y2, r2) {
    let result = false;

    let d = dist(x1, y1, x2, y2);

    let totalRad = r1 / 2 + r2 / 2;

    if (d < totalRad) {
      result = true;
    }
    return result;
  }

  
  static tankCheck(x, y, x2) {
    if (x <= x2 + 30 && x >= x2 - 30 && y > 470) {
      return true;
    }

  }
  static tankCheck2(x, y, x2) {

    if (x <= x2 + 30 && x >= x2 - 30 && y > 470) {
      return true;
    }

  }
  static tankCheck3(x, y, x2) {

    if (x <= x2 + 30 && x >= x2 - 30 && y > 470) {
      return true;
    }

  }
}