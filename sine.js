var W = 1200;
var H = 800;
var lines = [];
var num_lines = 4;

function setup() {
  createCanvas(W, H);
  for (let i = 0; i < num_lines; i++) {
    if (i==0) {
      width = W/2;
      height = H/2;
    } else {
      width = lines[i-1].x2;
      height = lines[i-1].y2;
    }
    length = random(1) * 200;
    angle = random(1) * PI;
    frequency = random(1) * 2 - 1;
    lines.push(new Line(width, height, length, angle, frequency));
  }

}

function draw() {
  background(255);
  for (let i = 0; i < num_lines; i++) {
    if (i==0) {
      lines[i].update();
      lines[i].draw();
    } else if (i==num_lines-1) {
      lines[i].update(lines[i-1]);
      lines[i].draw(1);
    } else {
      lines[i].update(lines[i-1]);
      lines[i].draw();
    }
  }
}


class Line {

  constructor(x, y, l, theta, freq) {
    this.x1 = x;
    this.y1 = y;
    this.l = l;
    this.theta = theta;
    this.freq = freq;
    this.update();
    this.history = [];
    this.color = [random(1) * 255, random(1) * 255, random(1) * 255];
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
    stroke(this.color[0],this.color[1], this.color[2]);
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      vertex(this.history[i].x, this.history[i].y);
    }
    endShape();
    stroke(100);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}
