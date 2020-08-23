let ico;
let rotataeXangle, rotateYangle, icoRadius;

const ICOSUBDIVISION = 1;
const WIDTH_SCALE_TRANSLATE = 1.95;
const X = 0.525731112119133606;
const Z = 0.850650808352039932;

const VDATA = [
  [ -X, 0.0, Z ],
  [ X, 0.0, Z ],
  [ -X, 0.0, -Z ],
  [ X, 0.0, -Z ],
  [ 0.0, Z, X ],
  [ 0.0, Z, -X ],
  [ 0.0, -Z, X ],
  [ 0.0, -Z, -X ],
  [ Z, X, 0.0 ],
  [ -Z, X, 0.0 ],
  [ Z, -X, 0.0 ],
  [ -Z, -X, 0.0 ]
];

const TI = [
  [ 0, 4, 1 ],
  [ 0, 9, 4 ],
  [ 9, 5, 4 ],
  [ 4, 5, 8 ],
  [ 4, 8, 1 ],
  [ 8, 10, 1 ],
  [ 8, 3, 10 ],
  [ 5, 3, 8 ],
  [ 5, 2, 3 ],
  [ 2, 7, 3 ],
  [ 7, 10, 3 ],
  [ 7, 6, 10 ],
  [ 7, 11, 6 ],
  [ 11, 0, 6 ],
  [ 0, 1, 6 ],
  [ 6, 1, 10 ],
  [ 9, 0, 11 ],
  [ 9, 11, 2 ],
  [ 9, 2, 5 ],
  [ 7, 2, 11 ]
];

function setup() {
  const mCanvas = createCanvas(WIDTH_SCALE_TRANSLATE * windowWidth, windowHeight, WEBGL);
  addScreenPositionFunction();
  mCanvas.parent('icosa');
  smooth();
  noLoop();
  ico = new Icosahedron();
  rotataeXangle = -0.2;
  rotateYangle = -0.3;
  icoRadius = height / 2.5;
}

function windowResized() {
  resizeCanvas(WIDTH_SCALE_TRANSLATE * windowWidth, windowHeight);
  addScreenPositionFunction();
  icoRadius = height / 2.5;
}

function draw() {
  background(255, 255, 255);
  noFill();
  stroke(0);

  push();
  rotateX(rotataeXangle);
  rotateY(rotateYangle);

  for (let i = 0; i < ico.vertexList.length; i += 3) {
    const f0 = p5.Vector.mult(ico.vertexList[i+0], icoRadius);
    const f1 = p5.Vector.mult(ico.vertexList[i+1], icoRadius);
    const f2 = p5.Vector.mult(ico.vertexList[i+2], icoRadius);

    beginShape();
    vertex(f0.x, f0.y, f0.z);
    vertex(f1.x, f1.y, f1.z);
    vertex(f2.x, f2.y, f2.z);
    endShape(CLOSE);
  }
  pop();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rotataeXangle += .01;
  } else if (keyCode === DOWN_ARROW) {
    rotataeXangle -= .01;
  } else if (keyCode === LEFT_ARROW) {
    rotateYangle -= .01;
  } else if (keyCode === RIGHT_ARROW) {
    rotateYangle += .01;
  }
}

class Icosahedron {
  constructor() {
    this.vertexList = [];

    for (let i = 0; i < TI.length; ++i) {
      this.subdivide(
        createVector(VDATA[TI[i][0]][0], VDATA[TI[i][0]][1], VDATA[TI[i][0]][2]),
        createVector(VDATA[TI[i][1]][0], VDATA[TI[i][1]][1], VDATA[TI[i][1]][2]),
        createVector(VDATA[TI[i][2]][0], VDATA[TI[i][2]][1], VDATA[TI[i][2]][2]),
        ICOSUBDIVISION
      );
    }
  }

  subdivide(v0, v1, v2, depth) {
    if (depth === 0) {
      this.vertexList.push(v0);
      this.vertexList.push(v1);
      this.vertexList.push(v2);
      return;
    }

    const v01 = p5.Vector.add(v0, v1).mult(0.5).normalize();
    const v12 = p5.Vector.add(v1, v2).mult(0.5).normalize();
    const v20 = p5.Vector.add(v2, v0).mult(0.5).normalize();

    this.subdivide(v0, v01, v20, depth - 1);
    this.subdivide(v1, v12, v01, depth - 1);
    this.subdivide(v2, v20, v12, depth - 1);
    this.subdivide(v01, v12, v20, depth - 1);
  }
}

$(document).ready(function() {
  AOS.init();
});
