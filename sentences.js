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

let sentenceDisplayTime = 3000;
let baseFrequency = 200;

let ticksBeforeAdd = 20;

let textColor = "black";
let sentencesBackgroundColor = "white";

//

class SentenceManager {
  constructor() {
    /** @type {Sentence[]} */
    this.sentences = [];
    this.ticksCount = 0;
  }

  get nextSentenceIndex() {
    return this.sentences.length;
  }

  get nextText() {
    return allSentences[this.nextSentenceIndex];
  }

  get areAllSentencesDrawn() {
    return this.nextSentenceIndex == allSentences.length;
  }

  addSentence() {
    const sentence = new Sentence(this.nextSentenceIndex, this.nextText);
    this.sentences.push(sentence);
  }

  resetSentences() {
    this.sentences.forEach((s) => s.delete());
    this.sentences = [];
  }

  render() {
    if (this.areAllSentencesDrawn) this.resetSentences();
    for (const sentence of this.sentences) sentence.render();

    if (this.ticksCount == ticksBeforeAdd) {
      this.ticksCount = 0;
      this.addSentence();
    }

    this.ticksCount++;
  }

  stopOscillators() {
    this.sentences.forEach((s) => s.stopOscillator());
  }
}

//

class Sentence {
  /**
   *
   * @param {number} index
   * @param {string} text
   */
  constructor(index, text) {
    this.index = index;
    this.text = text;

    this.startTime = millis();
    this.oscillator = this.createOscillator();

    const m = 50;
    this.fontSize = random(12, 36);
    this.x = random(m, width - this.getTextWidth() - m);
    this.y = random(m + this.fontSize, height - m - this.fontSize);
  }

  get life() {
    return millis() - this.startTime;
  }

  get isAlive() {
    return this.life < sentenceDisplayTime;
  }

  createOscillator() {
    let osc = new p5.Oscillator("sine");
    osc.freq(baseFrequency + this.index * 50);
    osc.amp(0);
    osc.start();
    return osc;
  }

  getTextWidth() {
    let w;
    push();
    textSize(this.fontSize);
    w = textWidth(this.text);
    pop();
    return w;
  }

  render() {
    this.startOscillator();
    push();
    fill(sentencesBackgroundColor);
    const correction = this.fontSize / 10;
    rect(
      this.x,
      this.y - this.fontSize + correction,
      this.getTextWidth(),
      this.fontSize + correction
    );
    fill(textColor);
    textSize(this.fontSize);
    textAlign(LEFT);
    text(this.text, this.x, this.y);
    pop();
  }

  startOscillator() {
    this.oscillator.amp(0.5, 0.05);
  }

  stopOscillator() {
    this.oscillator.amp(0, 0.5);
  }

  delete() {
    this.oscillator.stop();
  }
}
