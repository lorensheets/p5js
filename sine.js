W = 800;
H = 600;

function setup() {
  createCanvas(W, H);
  l1 = new Line(W/2, H/2, 100, PI, 0.1);
  l2 = new Line(l1.x2, l1.y2, 75, PI/2, 0.25);
  l3 = new Line(l2.x2, l1.y2, 35, PI/3, -0.33);
  l4 = new Line(l3.x2, l3.y2, 25, PI/4, 0.5);
}

function draw() {
  background(255);
  l1.update();
  l1.draw();
  l2.update(l1);
  l2.draw();
  l3.update(l2);
  l3.draw();
  l4.update(l3);
  l4.draw(1);
}


class Line {

  constructor(x, y, l, theta, freq) {
    this.x1 = x;
    this.y1 = y;
    this.l = l;
    this.theta = theta;
    this.x2 = this.l * Math.sin(this.theta) + this.x1;
    this.y2 = this.l * Math.cos(this.theta) + this.y1;
    this.freq = freq;
    this.history = [];
  }

  update(parent) {
    if (parent) {
      this.x1 = parent.x2;
      this.y1 = parent.y2;
    }
    let delta = PI * 2 / 60 * this.freq;
    this.theta += delta;
    this.x2 = this.l * Math.sin(this.theta) + this.x1;
    this.y2 = this.l * Math.cos(this.theta) + this.y1;
  }

  draw(last) {
    if (last) {
      this.history.push(createVector(this.x2, this.y2));
    }
    noFill();
    stroke(200,200,0);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      vertex(this.history[i].x, this.history[i].y);
    }
    endShape();
    stroke(0);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}
