let ico;
const ICOSUBDIVISION = 1;
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
  const mCanvas = createCanvas(windowWidth, windowHeight, WEBGL);
  smooth();
  ico = new Icosahedron();
}

function draw() {
  background(255);
  noFill();
  stroke(0);

  let f1 = createVector();
  let f2 = createVector();
  let f3 = createVector();

  push();
  rotateX(frameCount / 800);
  rotateY(frameCount / 420);

  for (let i = 0; i < ico.vertexList.length; i += 9) {
    f1.x = ico.vertexList[i] * 200;
    f1.y = ico.vertexList[i+1] * 200;
    f1.z = ico.vertexList[i+2] * 200;
    f2.x = ico.vertexList[i+3] * 200;
    f2.y = ico.vertexList[i+4] * 200;
    f2.z = ico.vertexList[i+5] * 200;
    f3.x = ico.vertexList[i+6] * 200;
    f3.y = ico.vertexList[i+7] * 200;
    f3.z = ico.vertexList[i+8] * 200;

    beginShape();
    vertex(f1.x, f1.y, f1.z);
    vertex(f2.x, f2.y, f2.z);
    vertex(f3.x, f3.y, f3.z);
    endShape(CLOSE);
  }
  pop();
}

class Icosahedron {
  constructor() {
    this.vertexNormalsList = [];
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
      this.vertexNormalsList.push(v[k]);
    }
  }

  subdivide(v1, v2, v3, depth) {

    if (depth == 0) {
      this.add(v1);
      this.add(v2);
      this.add(v3);
      return;
    }

    const v12 = [0, 0, 0];
    const v23 = [0, 0, 0];
    const v31 = [0, 0, 0];

    for (let i = 0; i < 3; ++i) {
      v12[i] = (v1[i] + v2[i]) / 2;
      v23[i] = (v2[i] + v3[i]) / 2;
      v31[i] = (v3[i] + v1[i]) / 2;
    }

    const v12n = this.norm(v12);
    const v23n = this.norm(v23);
    const v31n = this.norm(v31);

    this.subdivide(v1, v12n, v31n, depth - 1);
    this.subdivide(v2, v23n, v12n, depth - 1);
    this.subdivide(v3, v31n, v23n, depth - 1);
    this.subdivide(v12n, v23n, v31n, depth - 1);
  }
}
