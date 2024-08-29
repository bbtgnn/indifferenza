let allSentences = [
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

let sentences = [];

let currentSentenceIndex = 0;
let sentenceDisplayTime = 3000;
let lastSentenceTime = 0;
let oscillators = [];
let baseFrequency = 200;

function setupSentences() {
  for (let i = 0; i < allSentences.length; i++) {
    let osc = new p5.Oscillator("sine");
    osc.freq(baseFrequency + i * 50);
    osc.amp(0);
    osc.start();
    oscillators.push(osc);
  }
}

function drawSentences() {
  if (movementDetected) {
    if (millis() - lastSentenceTime > sentenceDisplayTime) {
      if (currentSentenceIndex >= allSentences.length) {
        currentSentenceIndex = 0;
        sentences = [];
      }

      let x = random(50, width - 50);
      let y = random(50, height - 50);
      let size = random(12, 36);
      sentences.push({
        text: allSentences[currentSentenceIndex],
        x: x,
        y: y,
        size: size,
      });
      oscillators[currentSentenceIndex].amp(0.5, 0.5);
      currentSentenceIndex++;
      lastSentenceTime = millis();
    }

    for (let i = 0; i < currentSentenceIndex; i++) {
      oscillators[i].amp(0.5, 0.5);
    }

    fill(255); // Scritte sempre bianche
    for (let phrase of sentences) {
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
