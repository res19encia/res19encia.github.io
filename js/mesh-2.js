class Particle {
  constructor(x, y, zones) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-1, 1);
    this.size = 8;
    this.ZONES = zones;
  }

  move() {
    this.x = (this.x + this.vx) % width;
    this.y = (this.y + this.vy) % height;

    let inZone = false;

    for (let zone of this.ZONES) {
      inZone |= (this.x > zone.x0 &&
                 this.x < zone.x1 &&
                 this.y > zone.y0 &&
                 this.y < zone.y1);
    }

    if (inZone) {
      particlesInZones.push(this);
    }
  }

  draw() {
    noStroke();
    fill(0, 100);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

let particleCount = 512;
let particles = [];
let particlesInZones = [];

let ZONES = [
  {
    x: .1,
    y: .2,
    w: 100,
    h: 50
  },
  {
    x: .3,
    y: .4,
    w: 150,
    h: 50
  },
  {
    x: .1,
    y: .6,
    w: 60,
    h: 50
  },
  {
    x: .7,
    y: .5,
    w: 150,
    h: 50
  }
];

function preload() {
  // NOOP
}

function setup() {
  const mCanvas = createCanvas(windowWidth, windowHeight);
  for (let z of ZONES) {
    z.x0 = z.x * width;
    z.x1 = z.x0 + z.w;
    z.y0 = z.y * height;
    z.y1 = z.y0 + z.h;
  }
  initParticles();
}

function initParticles() {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(random(-width, width), random(-height, height), ZONES));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  initParticles();
}

function draw() {
  clear();
  background(255);

  particlesInZones.length = 0;

  for (let p of particles) {
    //p.draw();
    p.move();
  }

  for(let i = 0; i < particlesInZones.length; i++) {
    for(let j = i+1; j < particlesInZones.length; j++) {
      strokeWeight(2);
      stroke(0, 64);
      line(particlesInZones[i].x, particlesInZones[i].y, particlesInZones[j].x, particlesInZones[j].y);
    }
  }

  for (let z of ZONES) {
    noStroke();
    fill('#E93A7D');
    rect(z.x0, z.y0, z.w, z.h);
  }
}
