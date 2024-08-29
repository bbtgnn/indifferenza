let sentenceManager = new SentenceManager();

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupMovementDetection();
}

function draw() {
  background(dotsBackgroundColor); // Sfondo sempre nero
  const isMoving = detectMovementAndDrawDots();
  if (isMoving) {
    console.log("moving");
    sentenceManager.render();
  } else {
    sentenceManager.stopOscillators();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateMovementDetectionOnWindowResize();
}
