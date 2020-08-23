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
}

function draw() {
  background(255,255,255,0);
  noFill();
  stroke(0);

  let f1 = createVector();
  let f2 = createVector();
  let f3 = createVector();

  push();
  rotateX(rotataeXangle);
  rotateY(rotateYangle);

  for (let i = 0; i < ico.vertexList.length; i += 9) {
    f1.x = ico.vertexList[i+0] * icoRadius;
    f1.y = ico.vertexList[i+1] * icoRadius;
    f1.z = ico.vertexList[i+2] * icoRadius;
    f2.x = ico.vertexList[i+3] * icoRadius;
    f2.y = ico.vertexList[i+4] * icoRadius;
    f2.z = ico.vertexList[i+5] * icoRadius;
    f3.x = ico.vertexList[i+6] * icoRadius;
    f3.y = ico.vertexList[i+7] * icoRadius;
    f3.z = ico.vertexList[i+8] * icoRadius;

    beginShape();
    vertex(f1.x, f1.y, f1.z);
    vertex(f2.x, f2.y, f2.z);
    vertex(f3.x, f3.y, f3.z);
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
        VDATA[TI[i][0]],
        VDATA[TI[i][1]],
        VDATA[TI[i][2]],
        ICOSUBDIVISION);
    }
  }

  norm(v){
    let len = (v[0] * v[0]) + (v[1] * v[1]) + (v[2] * v[2]);
    len = Math.sqrt(len);
    return [v[0] / len, v[1] / len, v[2] / len];
  }

  add(v) {
    for (let k = 0; k < 3; ++k) {
      this.vertexList.push(v[k]);
    }
  }

  subdivide(v1, v2, v3, depth) {

    if (depth === 0) {
      this.add(v1);
      this.add(v2);
      this.add(v3);
      return;
    }

    let v12 = [0, 0, 0];
    let v23 = [0, 0, 0];
    let v31 = [0, 0, 0];

    for (let i = 0; i < 3; ++i) {
      v12[i] = (v1[i] + v2[i]) / 2;
      v23[i] = (v2[i] + v3[i]) / 2;
      v31[i] = (v3[i] + v1[i]) / 2;
    }

    v12 = this.norm(v12);
    v23 = this.norm(v23);
    v31 = this.norm(v31);

    this.subdivide(v1, v12, v31, depth - 1);
    this.subdivide(v2, v23, v12, depth - 1);
    this.subdivide(v3, v31, v23, depth - 1);
    this.subdivide(v12, v23, v31, depth - 1);
  }
}


$(document).ready(function() {
  AOS.init();
});
