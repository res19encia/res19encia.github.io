let ico;
let ICOSUBDIVISION = 2;

function setup() {
  createCanvas(800, 600,WEBGL);
  ico = new Icosahedron();
  noStroke();
  fill(255, 0, 0);
}

function draw() {
  let rx = frameCount / 800;
  let ry = frameCount / 430;
  background(255);

  fill(255, 0, 0);
  let f1;
  let f2;
  let f3;
  let col = 0;
  stroke( 0 );
  push();
  translate( width * 0.5, height * 0.5, 0 );
  rotateX( rx );
  rotateY( ry );
  for ( let i = 0; i < ico.vertexList.length; i+=9 ) {
    f1.x = ico.vertexList.get(i) * 200;
    f1.y = ico.vertexList.get(i+1) * 200;
    f1.z = ico.vertexList.get(i+2) * 200;
    f2.x = ico.vertexList.get(i+3) * 200;
    f2.y = ico.vertexList.get(i+4) * 200;
    f2.z = ico.vertexList.get(i+5) * 200;
    f3.x = ico.vertexList.get(i+6) * 200;
    f3.y = ico.vertexList.get(i+7) * 200;
    f3.z = ico.vertexList.get(i+8) * 200;
    if (col == 0) {
      fill( 255,60,0 );
      col++;
    } else if (col == 1) {
      fill( 100,255,0 );
      col++;
    } else if (col == 2) {
      fill( 255,180,0 );
      col++;
    } else {
      fill( 0,255,255 );
      col = 0;
    }
    beginShape();
    vertex( f1.x, f1.y, f1.z );
    vertex( f2.x, f2.y, f2.z );
    vertex( f3.x, f3.y, f3.z );
    endShape( CLOSE );

  }
  pop(); 

  fill( 0,0,0 );
  text("icosahedron division: "+int( ICOSUBDIVISION ),20,40);
  text("vertices: "+int( ico.vertexList.length ),20,60);
  text("fps: "+int(frameRate),20,80);
  text("press up & down to change division",20,100);
}

class Icosahedron {

  constructor() {
    this.vertexNormalsList = [];
    this.vertexList = [];
    const X = 0.525731112119133606;
    const Z = 0.850650808352039932;

    this.vdata = [ [ -X, 0.0, Z ], 
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

    this.tindices = [ [ 0, 4, 1 ], [ 0, 9, 4 ], [ 9, 5, 4 ], [ 4, 5, 8 ], [ 4, 8, 1 ], [ 8, 10, 1 ], [ 8, 3, 10 ], [ 5, 3, 8 ], [ 5, 2, 3 ], [ 2, 7, 3 ], [ 7, 10, 3 ], [ 7, 6, 10 ], [ 7, 11, 6 ], [ 11, 0, 6 ], [ 0, 1, 6 ], [ 6, 1, 10 ], [ 9, 0, 11 ], [ 9, 11, 2 ], [ 9, 2, 5 ], [ 7, 2, 11 ] ];
  }

  Icosahedron() {     
    this.texCoordsList = [];
    this.indicesList = [];

    // Iterate over points
    for (let i = 0; i < 20; ++i) {
      subdivide(
        vdata[tindices[i][0]], 
        vdata[tindices[i][1]],
        vdata[tindices[i][2]], ICOSUBDIVISION );
    }
  }

  norm(v){

    this.len = 0;

    for(let i = 0; i < 3; ++i){
      this.len += this.v[i] *  this.v[i];
    }

    len = Math.sqrt(len);

    for(let i = 0; i < 3; ++i){
      this.v[i] /= this.len;
    }
  }

  add(v){
    for (let k = 0; k < 3; ++k) {
      this.vertexList.add(this.v[k]);
      this.vertexNormalsList.add(this.v[k]);
    }
  }

  subdivide(v1, v2, v3, depth) {

    if (this.depth == 0) {
      add(v1);
      add(v2);
      add(v3);
      return;
    }

    this.v12 = [3];
    this.v23 = [3];
    this.v31 = [3];

    for (let i = 0; i < 3; ++i) {
      this.v12[i] = (this.v1[i] + this.v2[i]) / 2;
      this.v23[i] = (this.v2[i] + this.v3[i]) / 2;
      this.v31[i] = (this.v3[i] + this.v1[i]) / 2;
    }

    norm(v12);
    norm(v23);
    norm(v31);

    subdivide(v1, v12, v31, depth - 1);
    subdivide(v2, v23, v12, depth - 1);
    subdivide(v3, v31, v23, depth - 1);
    subdivide(v12, v23, v31, depth - 1);
  }
}
