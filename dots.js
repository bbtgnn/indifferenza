let dots = [];

function setupDots() {
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
