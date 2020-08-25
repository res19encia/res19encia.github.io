---
layout: none
---

let ico;
let rotataeXangle, rotateYangle, icoRadius;

const ICOSUBDIVISION = 1;
const WIDTH_SCALE_TRANSLATE = 1.95;
const X = 0.525731112119133606;
const Z = 0.850650808352039932;

const FONT_SIZE = 28;

const VERTEX = [
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

const FACE_VERTICES = [
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

const indexed = {};

const button = [
  {
    vertex: 3,
    label: 'EMBODY',
    content_pt: '{{ site.data.strings["pt"]["embody"] }}',
    content_en: '{{ site.data.strings["en"]["embody"] }}'
  },
  {
    vertex: 13,
    label: 'FRAME',
    content_pt: '{{site.data.strings["pt"]["frame"]}}',
    content_en: '{{site.data.strings["en"]["frame"]}}'
  },
  {
    vertex: 148,
    label: 'INFOX',
    content_pt: '{{ site.data.strings["pt"]["infox"] }}',
    content_en: '{{ site.data.strings["en"]["infox"] }}'
  },
  {
    vertex: 208,
    label: 'FLUX',
    content_pt: '{{ site.data.strings["pt"]["flux"] }}',
    content_en: '{{ site.data.strings["en"]["flux"] }}'
  }
];

let mFont;
function preload() {
  mFont = loadFont('../media/fonts/font.otf');
}

function setup() {
  const mCanvas = createCanvas(WIDTH_SCALE_TRANSLATE * windowWidth, windowHeight, WEBGL);
  addScreenPositionFunction();
  mCanvas.parent('icosa');
  smooth();
  noLoop();
  ico = new Icosahedron();
  rotataeXangle = 0;
  rotateYangle = 0;
  rotataeXangle = -0.2;
  rotateYangle = -0.3;
  icoRadius = height / 2.5;
  textFont(mFont);
  textSize(FONT_SIZE);
  textAlign(CENTER, CENTER);
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

  for (let i = 0; i < ico.vertexList.length; i += 3) {
    push();
    rotateX(rotataeXangle);
    rotateY(rotateYangle);

    const f0 = p5.Vector.mult(ico.vertexList[i+0], icoRadius);
    const f1 = p5.Vector.mult(ico.vertexList[i+1], icoRadius);
    const f2 = p5.Vector.mult(ico.vertexList[i+2], icoRadius);

    const p0 = screenPosition(f0.x, f0.y, f0.z);
    const p1 = screenPosition(f1.x, f1.y, f1.z);
    const p2 = screenPosition(f2.x, f2.y, f2.z);
    pop();

    beginShape();
    vertex(p0.x, p0.y, 0);
    vertex(p1.x, p1.y, 0);
    vertex(p2.x, p2.y, 0);
    endShape(CLOSE);
  }

  //drawVertexLabels();
  //calculateButtonLocation();
  drawButtons();
}

function drawVertexLabels() {
  for (let i = 0; i < ico.vertexList.length; i += 3) {
    push();
    rotateX(rotataeXangle);
    rotateY(rotateYangle);

    const f0 = p5.Vector.mult(ico.vertexList[i+0], icoRadius);
    const f1 = p5.Vector.mult(ico.vertexList[i+1], icoRadius);
    const f2 = p5.Vector.mult(ico.vertexList[i+2], icoRadius);

    const p0 = screenPosition(f0.x, f0.y, f0.z);
    const p1 = screenPosition(f1.x, f1.y, f1.z);
    const p2 = screenPosition(f2.x, f2.y, f2.z);
    pop();

    fill(255, 0, 0);
    if (!(`${p0.x}x${p0.y}` in indexed)) {
      indexed[`${p0.x}x${p0.y}`] = true;
      text(`${i+0}`, p0.x, p0.y);
    }
    if (!(`${p1.x}x${p1.y}` in indexed)) {
      indexed[`${p1.x}x${p1.y}`] = true;
      text(`${i+1}`, p1.x, p1.y);
    }
    if (!(`${p2.x}x${p2.y}` in indexed)) {
      indexed[`${p2.x}x${p2.y}`] = true;
      text(`${i+2}`, p2.x, p2.y);
    }
  }
}

function calculateButtonLocation() {
  for (let i = 0; i < button.length; i++) {
    if(!('x' in button[i]) || !('y' in button[i])) {
      push();
      rotateX(rotataeXangle);
      rotateY(rotateYangle);
      const f = p5.Vector.mult(ico.vertexList[button[i].vertex], icoRadius);
      const p = screenPosition(f.x, f.y, f.z);
      pop();
      button[i]['x'] = p.x;
      button[i]['y'] = p.y;
    }
  }
}

function drawButtons() {
  calculateButtonLocation();
  document.getElementById('my-home-buttons').innerHTML = '';

  for (let i = 0; i < button.length; i++) {
    const be = document.createElement('div');
    be.classList.add('home-button');
    be.innerHTML = button[i].label;
    be.style['left'] = `${button[i].x + width / 2 - (6 * button[i].label.length)}px`;
    be.style['top'] = `${button[i].y + height / 2}px`;

    be.addEventListener('click', () => {
      const lightboxOverlay = document.getElementById('my-home-lightbox-overlay');
      const lightboxTitle = document.getElementById('my-home-lightbox-title');
      const lightboxContent = document.getElementById('my-home-lightbox-content');
      lightboxOverlay.classList.add('show');
      lightboxTitle.innerHTML = button[i].label;

      if (window.location.href.includes('pt')) {
        lightboxContent.innerHTML = button[i]['content_pt'];
      } else {
        lightboxContent.innerHTML = button[i]['content_en'];
      }
    });
    document.getElementById('my-home-buttons').appendChild(be);
  }
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

    for (let i = 0; i < FACE_VERTICES.length; ++i) {
      this.subdivide(
        createVector(VERTEX[FACE_VERTICES[i][0]][0],
                     VERTEX[FACE_VERTICES[i][0]][1],
                     VERTEX[FACE_VERTICES[i][0]][2]),
        createVector(VERTEX[FACE_VERTICES[i][1]][0],
                     VERTEX[FACE_VERTICES[i][1]][1],
                     VERTEX[FACE_VERTICES[i][1]][2]),
        createVector(VERTEX[FACE_VERTICES[i][2]][0],
                     VERTEX[FACE_VERTICES[i][2]][1],
                     VERTEX[FACE_VERTICES[i][2]][2]),
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

  const lightboxOverlay = document.getElementById('my-home-lightbox-overlay');
  const lightboxContainer = document.getElementById('my-home-lightbox-container');
  const lightboxTitle = document.getElementById('my-home-lightbox-title');
  const lightboxContent = document.getElementById('my-home-lightbox-content');
  const homeBallMenu = document.getElementById('my-home-ball-menu');

  homeBallMenu.addEventListener('click', () => {
    lightboxOverlay.classList.add('show');

    if (window.location.href.includes('pt')) {
      lightboxTitle.innerHTML = 'CURADORIA';
      lightboxContent.innerHTML = '{{ site.data.strings["pt"]["curadoria"] }}';
    } else {
      lightboxTitle.innerHTML = 'CURATION';
      lightboxContent.innerHTML = '{{ site.data.strings["en"]["curadoria"] }}';
    }
  });

  lightboxOverlay.addEventListener('click', () => {
    lightboxOverlay.classList.remove('show');
  });

  lightboxContainer.addEventListener('click', (e) => {
    const event = e || window.event;
    event.stopPropagation();
  });
});
