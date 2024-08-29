let video;
let prevFrame;
let movementDetected = false;
let threshold = 1;

//

function startVideo() {
  video = createCapture(VIDEO);
  video.size(windowWidth, windowHeight);
  video.hide();
}

function loadVideoPixels() {
  video.loadPixels();
}

function updateVideoSize() {
  video.size(windowWidth, windowHeight);
}

//

function resetMovementDetectionReference() {
  prevFrame = new Array(video.width * video.height * 4).fill(0);
}

function updateMovementDetectionReference() {
  prevFrame = video.pixels.slice();
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

      if (diff > threshold) {
        movementDetected = true;
        break;
      }
    }
  }
}
