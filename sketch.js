let phrases = [];
let allPhrases = [
  "Odio gli indifferenti.",
  "L'indifferenza è complicità.",
  "L'indifferenza uccide.",
  "Chi tace acconsente.",
  "Solo chi partecipa può cambiare.",
  "L'indifferenza mantiene l'ingiustizia.",
  "Il silenzio è colpevole.",
  "L'indifferenza è il peso morto della storia.",
  "Agisci, non restare indifferente.",
  "Il mondo non cambia da solo.",
];
let currentPhraseIndex = 0;
let phraseDisplayTime = 3000;
let lastPhraseTime = 0;
let oscillators = [];
let baseFrequency = 200;
let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  startVideo();

  background(0);

  for (let i = 0; i < allPhrases.length; i++) {
    let osc = new p5.Oscillator("sine");
    osc.freq(baseFrequency + i * 50);
    osc.amp(0);
    osc.start();
    oscillators.push(osc);
  }

  resetMovementDetectionReference();

  // Crea pallini più grandi con velocità di base lenta
  for (let i = 0; i < 30; i++) {
    dots.push({
      x: random(width),
      y: random(height),
      size: random(5, 15), // Aumentata la dimensione dei pallini
      baseSpeedX: random(-0.2, 0.2),
      baseSpeedY: random(-0.2, 0.2),
      speedX: 0,
      speedY: 0,
    });
  }
}

function draw() {
  background(0); // Sfondo sempre nero

  video.loadPixels();

  detectMovement();
  drawPhrases();
  drawDots();

  prevFrame = video.pixels.slice();
}

function keyPressed() {
  if (key === " ") {
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].amp(0, 0.5);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  video.size(windowWidth, windowHeight);
  prevFrame = new Array(video.width * video.height * 4).fill(0);
}

//

function detectMovement() {
  if (prevFrame) {
    movementDetected = false;

    for (let i = 0; i < video.pixels.length; i += 4) {
      let r = video.pixels[i];
      let g = video.pixels[i + 1];
      let b = video.pixels[i + 2];
      let gray = (r + g + b) / 3;
      let prevGray = (prevFrame[i] + prevFrame[i + 1] + prevFrame[i + 2]) / 3;
      let diff = abs(gray - prevGray);

      if (diff > 50) {
        movementDetected = true;
        break;
      }
    }
  }
}

function drawDots() {
  fill(255);
  noStroke();
  for (let dot of dots) {
    let speedMultiplier = movementDetected ? 50 : 1;
    dot.speedX = dot.baseSpeedX * speedMultiplier;
    dot.speedY = dot.baseSpeedY * speedMultiplier;

    let trembleAmount = movementDetected ? random(-3, 3) : 0;
    ellipse(dot.x + trembleAmount, dot.y + trembleAmount, dot.size);
    dot.x += dot.speedX;
    dot.y += dot.speedY;

    // Fai rimbalzare i pallini sui bordi del canvas
    if (dot.x < 0 || dot.x > width) {
      dot.baseSpeedX *= -1;
      dot.x = constrain(dot.x, 0, width);
    }
    if (dot.y < 0 || dot.y > height) {
      dot.baseSpeedY *= -1;
      dot.y = constrain(dot.y, 0, height);
    }
  }
}

function drawPhrases() {
  if (movementDetected) {
    if (millis() - lastPhraseTime > phraseDisplayTime) {
      if (currentPhraseIndex >= allPhrases.length) {
        currentPhraseIndex = 0;
        phrases = [];
      }

      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let size = random(12, 36);
      phrases.push({
        text: allPhrases[currentPhraseIndex],
        x: x,
        y: y,
        size: size,
      });
      oscillators[currentPhraseIndex].amp(0.5, 0.5);
      currentPhraseIndex++;
      lastPhraseTime = millis();
    }

    for (let i = 0; i < currentPhraseIndex; i++) {
      oscillators[i].amp(0.5, 0.5);
    }

    fill(255); // Scritte sempre bianche
    for (let phrase of phrases) {
      textSize(phrase.size);
      textAlign(CENTER, CENTER);
      text(phrase.text, phrase.x, phrase.y);
    }
  } else {
    for (let i = 0; i < oscillators.length; i++) {
      oscillators[i].amp(0, 0.5);
    }
  }
}
