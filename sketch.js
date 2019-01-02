let total = 80;
let scale = 600;

let PartOne = new Array(total);
let PartTwo = new Array(total);
let PartThree = new Array(total);
let taken;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255,245,204);
    noStroke();
    taken = new Array(height);

    for(let j = 0; j < height; j++){
        taken[j] = new Array(width);
    }

    for(let j = 0; j < height; j++){
        for(let i = 0; i < width; i++){
            taken[j][i] = false;
        }
    }

    for (let i = 0; i < total; i++) {
        PartOne[i] = new Particle();
    }
    for (let i = 0; i < total; i++) {
        PartTwo[i] = new Particle();
    }
    for (let i = 0; i < total; i++) {
        PartThree[i] = new Particle();
    }

}

function draw() {

    for (let i of PartOne) {
        fill(255,65,98);
        i.update();
        i.display();
    }
    for (let i of PartTwo) {
        fill(23,222,238);
        i.update();
        i.display();
    }
    for (let i of PartThree) {
        fill(0,244,0);
        i.update();
        i.display();
    }
}

class Particle {
    constructor() {

        do {
          this.pos = createVector(floor(random(width)), floor(random(height)));
        } while(taken[this.pos.y][this.pos.x]);

        taken[this.pos.y][this.pos.x] = true;


        this.speed = 0.4;
    }

    update() {
        let scl = noise(this.pos.x / scale, this.pos.y / scale) * TWO_PI * scale;
        let vel = createVector(cos(scl), sin(scl)).mult(this.speed);
        this.pos.add(vel);
    }

    display() {
        ellipse(this.pos.x, this.pos.y, 2, 2);
    }

    edges() {
        if (this.pos.x < 0 || this.pos.x > width || this.pos.y < 0 || this.pos.y > height) {
            this.pos = createVector(random(width), random(height));
        }
    }
}