const TOTAL_PARTICLES = 50;
const SCALE = 600;

const ALL_COLORS = [
  { r: 227, g: 21, b: 12 },
  { r: 21, g: 83, b: 157 },
  { r: 6, g: 190, b: 194 },
  { r: 221, g: 132, b: 69 },
  { r: 14, g: 197, b: 50 },
  { r: 190, g: 71, b: 33 },
];

let AllCurves;
let board;

class Particle {
  constructor(position) {
    this.pos = position;
    this.speed = 0.4;
  }
  update() {
    const noiseScale =
      noise(this.pos.x / SCALE, this.pos.y / SCALE) * TWO_PI * SCALE;
    const veclocity = createVector(cos(noiseScale), sin(noiseScale)).mult(
      this.speed
    );
    this.pos.add(veclocity);
  }
  display() {
    ellipse(this.pos.x, this.pos.y, 2, 2);
  }
}

class Curve {
  constructor({ r, g, b }) {
    this.curveColor = color(r, g, b);
    this.collection = [];
  }
  addParticle(particle) {
    this.collection = [...this.collection, particle];
  }
  createCurve() {
    fill(this.curveColor);
    this.collection.map((item) => {
      item.update();
      item.display();
    });
  }
}

class Board {
  constructor(height, width) {
    this.board = [...new Array(height)].map((_) =>
      [...new Array(width)].map((__) => false)
    );
  }
  generateParticle() {
    let position;
    do {
      position = createVector(floor(random(width)), floor(random(height)));
    } while (this.check(position.x, position.y));
    this.active(position.x, position.y);
    return new Particle(position);
  }
  check(x, y) {
    return this.board[y][x];
  }
  active(x, y) {
    this.board[y][x] = true;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(5, 6, 5);
  noStroke();
  board = new Board(height, width);
  AllCurves = ALL_COLORS.map((color) => new Curve(color));
  [...new Array(TOTAL_PARTICLES)].map((_) =>
    AllCurves.map((curve) => curve.addParticle(board.generateParticle()))
  );
}

function draw() {
  AllCurves.map((curve) => curve.createCurve());
}
